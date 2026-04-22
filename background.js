chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'copy-jira-link',
    title: 'Copy Jira issue link',
    contexts: ['page'],
    documentUrlPatterns: [
      '*://*.atlassian.net/browse/*',
      '*://*/browse/*',
    ],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'copy-jira-link' && tab) {
    chrome.tabs.sendMessage(tab.id, { action: 'copyJiraLink' });
  }
});

chrome.commands.onCommand.addListener((command) => {
  if (command === 'copy-jira-link') {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      if (tab) {
        chrome.tabs.sendMessage(tab.id, { action: 'copyJiraLink' });
      }
    });
  }
});
