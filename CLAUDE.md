# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A Chrome extension (Manifest V3) that adds a right-click context menu item on Jira issue pages to copy a formatted rich-text link: `Issue Title: PROJ-123` where the issue key is a hyperlink.

## Development

No build step, no dependencies, no package manager. Load the extension directly into Chrome:

1. Navigate to `chrome://extensions/`
2. Enable **Developer mode**
3. Click **Load unpacked** and select this repository folder

After editing any file, click the refresh icon on the extension card in `chrome://extensions/` to reload.

There are no tests or linting tools configured.

## Architecture

Two JS execution contexts communicate via Chrome's messaging API:

- **`background.js`** — Service worker. Registers the "Copy Jira issue link" context menu item on install (scoped to Jira URLs via `documentUrlPatterns`). On click, sends `{ action: 'copyJiraLink' }` to the content script via `chrome.tabs.sendMessage`.

- **`content.js`** — Injected into matching Jira pages (`/browse/` URL pattern). Listens for the `copyJiraLink` message and handles all clipboard logic: `buildClipboardContent` constructs the HTML+plaintext pair, `writeToClipboard` uses `navigator.clipboard.write()` with `ClipboardItem`, and `showToast` injects a temporary notification.

## Key details

- Host permissions in `manifest.json` match any URL with `/browse/` (not just `*.atlassian.net`), supporting Jira Server/Data Center instances. The same patterns are used in the context menu's `documentUrlPatterns` so the menu item only appears on Jira pages.
- `getIssueTitle()` in `content.js` tries multiple CSS selectors for Jira Cloud vs. Server DOM layouts before falling back to `document.title` parsing.
- Clipboard writes both `text/html` and `text/plain` MIME types simultaneously so paste behavior matches the target app's capabilities.
