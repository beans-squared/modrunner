---
title: 'Dev Review: February 2024'
thumbnail: /img/blog/dev-review-feb-2024/thumbnail.png
description: So what's up with this rewrite?
author: beansquared
date: 2024-02-29
---

Hey all,

Gonna be honest, I totally forgot it was the end of the month. So here I am, quickly banging out another one of these Dev Reviews at 11pm without much of an idea of what I'm going to write. So let's see what I produce for you all today!

# All the upcoming fun stuff

Usually I try to avoid revealing specific details about features in development too early, as I often tend to change things over time as I'm building things out, and thus anything I say about updates or new features will often become outdated over time. But it's been a while since I've provided literally _any_ news about _anything_, so I figure it's about time I share some of that with you all.

So what's been happening? I'm still hard at work on the backend for Modrunner, hoping to have a testable version ready by mid-March so that I can push the new changes to staging, so I can perform some testing to make sure it's ready for prime time on the main bot. But what exactly will be coming with the completion of this rewrite? Let's go through the main changes together!

## Support for additional modding platforms

This is something that I've been wanting to do for a while now, but I've held off on for a while since the current code handling CurseForge and Modrinth on the current version of the bot is not particularly modular, and adding support for even *one* additional platform would be a significant amount of work and would likely be very messy code-wise. So instead, I've decided to integrate additional platform support into the rewrite, to make adding support for additional platforms a breeze down the line (or at least significantly simpler). At the moment, the platforms I'm planning on adding include:

- FTB
- GitHub
- Mod.io
- NexusMods

When first starting the backend on staging, I will probably still only have CurseForge and Modrinth available, just to make sure that the new systems handling those platforms are stable, and then I will gradually add in the new platforms slowly before pushing the changes to the main bot.

Also, FTB will most likely be implemented in an "experimental" state, since they don't have an official API for Modrunner to interact with, and the plan is to just hijack off the API their website uses. It's possible that FTB might end up blocking my traffic, or they might make a change to their API without notice which could break everything. So FTB project tracking will probably remain in an indefinite "use at your own risk" state.

## New places to receive notifications

Modrunner has since its inception always had only Discord channel-based notifications, but with the rewrite, we're freeing the notifications to go to so many more places! These places specifically being:

- Discord DMs
- Email
- Webhook

First up: Discord DMs! Fairly straightforward in concept, you will now be able to receive notifications for tracked projects directly in your direct messages in Discord. No server required!

Email-based notifications will also be an option going forward. This, of course, will require you to submit your email address to Modrunner so that it can, well, email you. You'll be able to do this on the dashboard once the rewrite goes live.

And lastly, webhooks! This one will be more for the more technical Modrunner users, but if you don't know what a webhook is, It's basically a process where Modrunner will send an API request to an endpoint you specify, with all the information about a project's new update. This will allow you to programmatically receive and process project update notifications however you'd like! You might also recognize the name from Discord, since Discord allows you to create webhooks in server channels. This is one way you can utilize Modrunner's webhooks, although there's not much point to doing so aside from not needing the bot in your server to receive notifications.

## Customizable text notifications

This one has been a highly requested feature for a LONG time, and one I've definitely been guilty of kicking down the road for a while now. At first, I was just planning it into the bot around mid-2023, but there wasn't really a good way to implement it just using Discord slash commands, so I pushed it back to coincide with the release of the website revamp. Eventually, as I had to keep nipping features to try and get the website revamp out sooner rather than later, I had to temporarily can this idea again. Now, with me finally being able to give the backend the attention it deserves, I can make customizable text notifications a reality. This is pretty much what it sounds like: you'll be able to customize the text of a project's update notification to your liking. This kind of notification will be sent as a regular Discord message, rather than an embed, like the existing Normal and Compact styles.

## More customization options for notifications

Since I'm already making radical changes to the database as a requirement for most of the other changes mentioned above, I figured I might as well go a step further and make it possible to customize project notifications at the project level, rather than just at the server level. At the moment, Modrunner has two settings: notification style and changelog maximum length. You can only set these at the server level, meaning all projects tracked in that server have to have the specified notification style and changelog length. With this change, you'll now be able to specify these two settings per project, so for example, you can have one tracked project with the Normal style, and other one with the Compact or Text style. You will still be able change server-level settings, and this will determine the default settings for each project.

A new setting will also be entering the battle: filtering notifications by release type! Have you ever wanted to receive notifications for only "release" updates, because you don't care about "beta" or "alpha" releases? Well now you can set it so that it is the case! This will work per-project just like the older settings will as well.

## Viewable notification histories and re-sending previously sent notifications

Another highly requested feature, with the rewrite's release, you'll now be able to see a list of all the past notifications that have been sent for a project (or have been attempted, at least). You'll also be able to re-send a previously sent notification, which will be particularly useful if a notification fails due to a permissions issue, for example. This will most likely only be available from the dashboard, but it might be possible to do directly from the bot in the future.

## Quality of life improvements and bugfixes

There will also be a slew of other, smaller quality of life improvements and bugfixes (and probably new bugs, but hey that's inevitable). A couple of them include:

- Support for other games on CurseForge (this was possible up until like 2 weeks ago when CurseForge decided to make random changes to their API without telling anyone, so this will be kind of a new feature/bugfix in one, lol)
- Displaying API outages on the dashboard and on the bot's rich presence

And that's about it for this Dev Review! Look forward to all the upcoming features within the next month or so (hopefully!) I appreciate your time, and if you have any questions about anything in this post, feel free to ask me in my [Discord](https://discord.gg/fm88jhzEbt).

-beansquared