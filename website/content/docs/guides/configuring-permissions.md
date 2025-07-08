---
title: Configuring Permissions
layout: doc
---

# Configuring Permissions

Most bots typically use a "admin" or "manager" role to determine which server members get to use certain privileged commands on a bot. Modrunner does not use this method; instead it uses Discord's own built-in command permissions system. This is not as simple as a role-based permission system to set up but is significantly more flexible.

## Accessing bot permission settings

Modrunner's permission settings can be accessed a few different ways:

- Right-clicking on Modrunner on the server member list and choosing "Manage Integration"
- Going to Server Settings > Integrations > Modrunner

Regardless of method you will end up on the same screen.

## Role-based and member-based permissions

The first section allows you to restrict command usage to certain members or certain roles. By default Modrunner allows everyone to use its commands, but will enact certain default command-level restrictions (see [command-based permissions](#command-based-permissions)).

Let's say that I have a "admin" role on my server and I want members with that role to be able to use Modrunner's commands, but not anyone else. First thing we do is disable command usage for everyone by toggling it off:

![Disable for Everyone](/img/docs/guides/configuring-permissions/0.png)

Then we want to add our "admin" role to be allowed to use Modrunner's commands. Click "Add Roles or Members". We'll check the box next to "Guildmasters", our admin role, then click add.

![Roles and Members Button](/img/docs/guides/configuring-permissions/1.png)
![Add Admin Role](/img/docs/guides/configuring-permissions/2.png)

Now we can see that our "Guildmasters" role has permissions to use Modrunner's commands, and only this role.

![Role Addded Successfully](/img/docs/guides/configuring-permissions/3.png)

## Channel-based permissions

The process is similar for restricting usage to specific channels. Say for example, we have a `#bot-commands` channel in our server and we only want commands run here, to keep `#general` nice and tidy. We can achieve this by disabling usage in all channels, and adding our bot commands channel (called `#terminal` here) to be allowed.

![Channel Permissions](/img/docs/guides/configuring-permissions/4.png)

## Command-based permissions

This is where things get interesting. You can restrict usage of specific commands based on specific members, roles or channels. By default, Modrunner restricts usage of commands like `/track` and `/settings` to members with the "Manage Channels" permission, but you can override this here.

Let's suppose we want to restrict usage of the `/list` command to our moderator role, and only in our `#staff-terminal` channel. First we start by clicking the command name, then disabling the command usage from all channels and members:

![Select Command](/img/docs/guides/configuring-permissions/5.png)
![Disable All Access](/img/docs/guides/configuring-permissions/6.png)

Now we just add our moderator role (Magistrates) and staff channel (`#staff-terminal`) to be allowed, and we're set!

![Add Staff role and Channel](/img/docs/guides/configuring-permissions/7.png)
