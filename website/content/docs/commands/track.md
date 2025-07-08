---
title: Track Command
layout: doc
---

# Track

Add a project to tracking using its project ID. Tracked projects are monitored for new file uploads, upon which a
notification is sent into a specified channel in Discord, optionally with a role to ping when sending a notification.

## Usage

`/track [project_id] <channel> <role>`

- `project_id` (required) - the ID of the project you want to track.
- `channel` (optional) - the channel you want the project's updates to be posted to. If not specified, will default to
  the channel the command was used in.
- `role` (optional) - a role that you want Modrunner to ping when posting an update notification for this project

::admonition{type="tip"}

You can get a project's ID from its project page on the Modrinth or CurseForge website, or by using the
[Search](../commands/search) command.

::

::admonition{type="tip"}

You can add more than one role to notify running the command again with the same project ID and channel, and specifying
a different role.

::
