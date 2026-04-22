# Jira Link Formatter — Chrome Extension

A Chrome extension that formats Jira issue links for pasting into rich-text tools like Slack, Notion, Google Docs, and Confluence.

**Output format:** `Issue Title: PROJ-123` where `PROJ-123` is a hyperlink to the issue.

---

## How to use

Right-click on any Jira page and select **Copy Jira issue link**. There are two ways to trigger it:

| Trigger | Result |
|---|---|
| Right-click anywhere on an issue page | Copies the current issue (title read from the page) |
| Right-click a Jira issue link | Copies that linked issue (title fetched from the target page) |

A toast notification confirms the copy. Paste into any app that supports rich text to get the hyperlinked format.

---

## Installation

> The extension is not published to the Chrome Web Store. Install it manually via Developer Mode.

1. Clone or download this repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** (toggle in the top-right corner).
4. Click **Load unpacked** and select the repository folder.

---

## Compatibility

Fully supported (issue pages and query/board/list pages):

- `jira.unity3d.com`
- Jira Cloud (`*.atlassian.net`)

Supported on issue pages (`/browse/`) only:

- Other Jira Server / Data Center instances

---

## Files

```
manifest.json   Extension manifest (Manifest V3)
content.js      Clipboard formatting and title fetching logic
background.js   Context menu registration and click handler
```
