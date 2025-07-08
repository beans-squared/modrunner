---
title: Settings Command
layout: doc
---

# Settings

Modrunner has a variety of different settings that you can modify, which you can do with this command.

## Usage

`/settings <changelog_length> <notification_style>`

- `changelog_length` (optional) - allows you to specify the maximum size for changelogs in update notifications. Useful if you track projects which commonly have extremely long changelogs.

  - Must be an integer between 0 and 4000
  - Defaults to 4000

- `notification_style` (optional) - allows you to specify how notifications look. The current options are:
  - Normal (default)
	- Normal - Alternate (same as Normal, but changelogs are displayed with markdown formatting instead of in a code block)
  - Compact (information is smaller and more densely packed, and does not include changelogs)
	- AI Generated (in Beta - asks ChatGPT to write an announcement-type message for each notification)
