chrome.commands.onCommand.addListener((command) => {
  if (command === 'copy-jira-link') {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      if (tab) {
        chrome.tabs.sendMessage(tab.id, { action: 'copyJiraLink' });
      }
    });
  }
});
