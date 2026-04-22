const JIRA_URL_PATTERN = /^https?:\/\/[^/]+\/browse\/([A-Z][A-Z0-9_]+-\d+)/;

document.getElementById('copyBtn').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const status = document.getElementById('status');

  if (!tab || !JIRA_URL_PATTERN.test(tab.url)) {
    status.textContent = 'Not on a Jira issue page.';
    return;
  }

  chrome.tabs.sendMessage(tab.id, { action: 'copyJiraLink' });
  status.textContent = 'Done! Link copied to clipboard.';
});
