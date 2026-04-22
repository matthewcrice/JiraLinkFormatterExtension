chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'copy-jira-link',
    title: 'Copy Jira issue link',
    contexts: ['page', 'link'],
    documentUrlPatterns: [
      '*://*.atlassian.net/*',
      '*://jira.unity3d.com/*',
      '*://*/browse/*',
    ],
    targetUrlPatterns: [
      '*://*.atlassian.net/browse/*',
      '*://*/browse/*',
    ],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'copy-jira-link' && tab) {
    const msg = { action: 'copyJiraLink' };
    if (info.linkUrl) msg.url = info.linkUrl;
    chrome.tabs.sendMessage(tab.id, msg);
  }
});
