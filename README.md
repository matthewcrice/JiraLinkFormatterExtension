# Jira Link Formatter — Chrome Extension

A Chrome extension that formats Jira issue links for pasting into rich-text tools like Slack, Notion, Google Docs, and Confluence.

**Output format:** `Issue Title: PROJ-123` where `PROJ-123` is a hyperlink to the issue.

---

## How to use

Open any Jira issue page, then trigger a copy using any of these methods:

| Method | How |
|---|---|
| Keyboard shortcut | Press `Alt+C` |
| Empty copy | Press `Ctrl+C` with no text selected |
| Copy a Jira URL | Select a Jira issue URL and press `Ctrl+C` |
| Toolbar button | Click the extension icon → **Copy Current Issue Link** |

A toast notification confirms the copy. Paste into any app that supports rich text to get the hyperlinked format.

---

## Installation

> The extension is not published to the Chrome Web Store. Install it manually via Developer Mode.

1. Clone or download this repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** (toggle in the top-right corner).
4. Click **Load unpacked** and select the repository folder.
5. The extension icon will appear in your toolbar.

---

## Compatibility

Works on any Jira instance where issue URLs follow the `/browse/PROJ-123` pattern:

- Jira Cloud (`*.atlassian.net`)
- Jira Server / Data Center (any hostname)

---

## Files

```
manifest.json   Extension manifest (Manifest V3)
content.js      Copy interception and clipboard formatting logic
background.js   Keyboard shortcut handler
popup.html      Toolbar popup UI
popup.js        Popup button logic
```
