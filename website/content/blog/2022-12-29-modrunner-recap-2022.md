---
title: Modrunner End-of-Year Recap
description: A look at the history of Modrunner and its accomplishments for 2022.
authors: beansquared
date: 2022-12-29
---

## Introduction

Hey everyone,

Seems like this concept of an end of the year recap has been gaining popularity in recent years, with the most notable
example being [Spotify Wrapped](https://www.spotify.com/us/wrapped/), and recently with other services like
[Steam Replay](https://store.steampowered.com/replay). I even got one from Jimmy John's today! So I thought it might be
kinda neat if I made something similar for Modrunner this year. This project has personally had my time and attention
more than most anything else this year, and it's been very rewarding for me. So thank you for using Modrunner, I'm glad
so many find my work useful.

## Timeline of Events

A lot has happened since Modrunner was initially released in June of this year. Originally launched with the name
Modrinth Bot, Modrunner initially only supported searching for projects on Modrinth, and did not have any sort of update
tracking functionality. Over many updates using community feedback, Modrunner has grown into a mature project with
hundreds of projects tracked for updates across both CurseForge and Modrinth, in many servers of various shapes and
sizes. Let's take a quick look at the timeline for major improvements made to Modrunner this year:

**June**

> - Initial release of Modrunner, under the name of "Modrinth Bot"
> - Addition of the ability to track updates to projects
> - Addition of support for CurseForge projects

**July**

> - Addition of buttons on update notifications that link to the new project version on its respective website
> - Addition of notification styles, with Normal and Compact mode offered as options
> - Addition of changelogs in update notifications

**August**

> - Improvements to update checking, making Modrunner detect them much faster
> - Addition of allowance to track a project in multiple channels at once
> - Improvements to the /list command, changing it to use embeds rather than a big block of text
> - Migration from hard-coded permissions to Discord's built-in permission system
> - Many subsequent bug fixes, notably missing notifications for CurseForge projects (this one is still a reason why I don't sleep at night)

**November**

> - Addition of project ID and channel parameters to the /untrack command, for better management of tracked projects
> - Addition of channel parameter to the /list command and change of listing projects in alphabetical order
> - Addition of new setting to limit the max length of display changelogs in update notifications

**December**

> - Addition of the ability to add roles to be notified when an update notification is sent
> - Addition of support for update notifications in Discord's forum channels

Something that I constantly worry about as a developer is thinking that I'm never doing enough, that I'm working too
slowly or not efficiently enough on something. Looking back on this timeline, and considering everything during this
period (finishing up my final semester of college), I think that the amount I've accomplished with Modrunner is something
to be satisfied with, and I'm looking forward to adding even more improvements in the future!

## Tracked Project Statistics

Now, how about some statistics? Big numbers? New records? Everyone loves those, right?

As of this blog post's posted date, the project that has been tracked in the greatest amount of times is the Modrinth
version of [Sodium](https://modrinth.com/mod/sodium), a modern rendering engine and client-side optimization mod for
Minecraft, which has been tracked in **8** different Discord servers, which is over **25.8%** of the servers that Modrunner
is present in!

The second-most tracked project is the Modrinth version of [Fabric API](https://modrinth.com/mod/fabric-api), a
lightweight and modular API providing common hooks and intercompatibility measures utilized by mods using the Fabric
toolchain, which has been tracked in **6** unique servers, or **19.35%** of the total servers Modrunner serves in.

Here's the top ten tracked projects, as ordered by the number of different servers it's tracked in. For projects with
the same number of servers tracked in, they are ordered by total downloads. All the listed projects are for their
Modrinth versions; guess Modrunner is a popular choice for those working closely with the Modrinth community!

| Project Name                                                                  | Project Author | Servers Tracked In | Percentage of Servers Tracked In |
| ----------------------------------------------------------------------------- | -------------- | ------------------ | -------------------------------- |
| 1. [Sodium](https://modrinth.com/mod/sodium)                                  | jellysquid3    | 8                  | 25.8%                            |
| 2. [Fabric API](https://modrinth.com/mod/fabric-api)                          | modmuss50      | 6                  | 19.35%                           |
| 3. [Lithium](https://modrinth.com/mod/lithium)                                | jellysquid3    | 3                  | 9.68%                            |
| 4. [Iris Shaders](https://modrinth.com/mod/iris)                              | coderbot       | 3                  | 9.68%                            |
| 5. [Indium](https://modrinth.com/mod/iris)                                    | comp500        | 3                  | 9.68%                            |
| 6. [Sodium Extra](https://modrinth.com/mod/sodium-extra)                      | FlashyReese    | 3                  | 9.68%                            |
| 7. [Reese's Sodium Options](https://modrinth.com/mod/reeses-sodium-options)   | FlashyReese    | 3                  | 9.68%                            |
| 8. [Debugify](https://modrinth.com/mod/debugify)                              | isxander       | 3                  | 9.68%                            |
| 9. [Continuity](https://modrinth.com/mod/continuity)                          | peppercode1    | 2                  | 6.45%                            |
| 10. [Fabulously Optimized](https://modrinth.com/modpack/fabulously-optimized) | robotkoer      | 2                  | 6.45%                            |

Overall, Modrunner keeps tabs on **357** unique projects across both CurseForge and Modrinth. That's a lot of projects!

Despite the top ten tracked projects all being from Modrinth, Modrunner keeps track of more CurseForge projects (**194**)
than it does Modrinth projects (**163**).

Of all the **31** servers that Modrunner serves, just **3** of them use the "Compact" notification style, with the rest
of them sticking with using the default Normal style. Additionally, **2** servers have custom changelog lengths, with
rest keeping with the default maximum.

In terms of tracked projects, one server has **170** total tracked projects in it, accounting for **47.62%** of the total tracked projects
that Modrunner keeps track of. Most other servers track about **7** projects each on average, and the median amount of
tracked projects is just **3**.

And that's the wrap on the 2022 Modrunner recap! This isn't the end, of course, for Modrunner and I have many ideas still
in store for the bot in the year(s) to come, including some major things like **receiving project updates via direct messages**,
**project discoverability features** (maybe a "mod of the week" kinda thing?) and **localization implementation**, so
that everyone can enjoy and use Modrunner in their language of choice. Look out for these features in the near future!

Thanks again and let's have a great 2023!

- Shane, aka beansquared
