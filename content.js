const JIRA_URL_PATTERN = /^https?:\/\/[^/]+\/browse\/([A-Z][A-Z0-9_]+-\d+)/;

function getIssueIdFromUrl(url) {
  const match = url.match(JIRA_URL_PATTERN);
  return match ? match[1] : null;
}

function getIssueTitle() {
  // Try Jira Cloud heading first
  const selectors = [
    'h1[data-testid="issue.views.issue-base.foundation.summary.heading"]',
    'h1[data-component-selector="issue-title"]',
    '#summary-val',
    '.issue-header-content h1',
    'h1.issue-summary',
  ];

  for (const sel of selectors) {
    const el = document.querySelector(sel);
    if (el && el.textContent.trim()) {
      return el.textContent.trim();
    }
  }

  // Fall back to document.title: typically "PROJ-123 Title - Jira"
  const titleMatch = document.title.match(/^[A-Z][A-Z0-9_]+-\d+\s+(.+?)(?:\s[-|].*)?$/);
  if (titleMatch) return titleMatch[1].trim();

  return null;
}

function buildClipboardContent(issueId, issueTitle, url) {
  const label = issueTitle ? `${issueTitle}: ${issueId}` : issueId;
  const html = issueTitle
    ? `${issueTitle}: <a href="${url}">${issueId}</a>`
    : `<a href="${url}">${issueId}</a>`;
  const plain = label;
  return { html, plain };
}

function writeToClipboard(html, plain) {
  const htmlBlob = new Blob([html], { type: 'text/html' });
  const textBlob = new Blob([plain], { type: 'text/plain' });
  const item = new ClipboardItem({ 'text/html': htmlBlob, 'text/plain': textBlob });
  return navigator.clipboard.write([item]);
}

function handleCopyEvent(e) {
  const selection = window.getSelection();
  const selectedText = selection ? selection.toString().trim() : '';

  const currentUrl = window.location.href;
  const currentIssueId = getIssueIdFromUrl(currentUrl);

  // If user selected text that is a Jira URL, format that URL
  if (selectedText && JIRA_URL_PATTERN.test(selectedText)) {
    const issueId = getIssueIdFromUrl(selectedText);
    // We're on this page only if the selected URL matches the current issue
    const title = issueId === currentIssueId ? getIssueTitle() : null;
    const { html, plain } = buildClipboardContent(issueId, title, selectedText);
    e.preventDefault();
    writeToClipboard(html, plain).catch(console.error);
    showToast(`Copied: ${plain}`);
    return;
  }

  // If nothing selected and we're on a Jira issue page, copy the current issue
  if (!selectedText && currentIssueId) {
    const title = getIssueTitle();
    const { html, plain } = buildClipboardContent(currentIssueId, title, currentUrl);
    e.preventDefault();
    writeToClipboard(html, plain).catch(console.error);
    showToast(`Copied: ${plain}`);
  }
}

function showToast(message) {
  const existing = document.getElementById('jira-copy-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'jira-copy-toast';
  toast.textContent = message;
  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    background: '#0052cc',
    color: '#fff',
    padding: '10px 16px',
    borderRadius: '4px',
    fontSize: '13px',
    zIndex: '999999',
    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
    maxWidth: '360px',
    wordBreak: 'break-all',
    transition: 'opacity 0.3s',
  });

  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

document.addEventListener('copy', handleCopyEvent);

// Also listen for the keyboard command from background.js
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === 'copyJiraLink') {
    const url = window.location.href;
    const issueId = getIssueIdFromUrl(url);
    if (!issueId) return;
    const title = getIssueTitle();
    const { html, plain } = buildClipboardContent(issueId, title, url);
    writeToClipboard(html, plain)
      .then(() => showToast(`Copied: ${plain}`))
      .catch(console.error);
  }
});
