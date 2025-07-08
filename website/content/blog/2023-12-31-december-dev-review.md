---
title: 'Dev Review: December 2023'
thumbnail: /img/blog/dev-review-dec-2023/thumbnail.png
description: A recap of everything Modrunner that happened in 2023!
author: beansquared
date: 2023-12-27
---

# Introduction

Hey all,

Welcome back to another episode of Dev Review! For those of you who were around this time last year, you may remember I did a blog post called [Modrunner End-of-Year Recap](/blog/2022-12-29-modrunner-recap-2022). In this post I went over the timeline of events for Modrunner's development throughout the year and went over some statistics about tracked projects, akin to something like a Spotify Wrapped sorta thing. I want to bring that back again for this year, however making separate posts for both the recap and dev review seemed a little extraneous, considering both series cover roughly the same things. So this month, I'm combining the end-of-year recap into this Dev Review post. Anyway, onwards!

# Timeline of Events

Compared to last year's relatively packed timeline, this year's will definitely be a bit slimmer. For the vast majority of the year, I was focused on the new website redesign; which, coupled with the fact I was working full-time now, meant that my free time to work on Modrunner was much more limited than the previous year. Regardless, there were still some big happenings this year with the full release of the new website being the major one, but let's break it all down and see everything that happened in the world of Modrunner this year:

## January

**Website**

- Started initial work on the new website redesign

While technically the first commit happened in December 2022, I'm not really counting that considering it was just a README at that point. So I'm pronouncing the official birth of the new website as starting in the first month of 2023.

## February

**Discord Bot**

- Fixed some major bugs

I always manage to break things when adding in new stuff.

## April

**Website**

- Switched the tech stack from pure Vue to Nuxt

While I described in detail the reason for this change in [this post](/blog/2023-07-12-july-2023-dev-log), I'm sum it up here briefly: I wanted to make sure the new website was going to be future-proof, and I wanted to be able to do more with it. At this point I was already four months into development with Vue, but I decided to make the switch to Nuxt, despite that fact I would be setting myself back in terms of progress. Painful, but I think it was worth it, personally.

## May

**Discord Bot**

- Minor bug fix

## September

**Website**

- Released the new website redesign into beta

At long last, some major news worth talking about! After months of work, I launched the new website as a beta release (it would have been stupid to simply release it). I did not have much experience with full-stack website development and there were bound to be bugs I hadn't caught during development. And there sure were! Luckily I was able to patch most of them out throughout the subsequent months.

## October

**Discord Bot**

- Released "AI" style notifications

This was released without a whole lot of fanfare, and the main reason why is sorta funny: I completely forgot I added it. When I was working on Modrunner's backend to support the upcoming release of the new website, I got distracted by an online tutorial on how to add AI to your discord bot. Completely on a whim, I added a quick basic notification style that requests an AI-generated announcement using the information for a new release of a project. It's rather barebones and probably using an outdated model, considering how many new releases of ChatGPT we got this year, but at least it's there for those that want to experiment with it. Down the line I definitely want to improve and iterate upon it, but that will have to wait for the future...

- More bug fixes (including the incorrect spelling of "CurseForge", the saga of which is documented in the [previous dev review post](/blog/2023-11-30-november-dev-review))

## November

**Website**

- Released the new website as stable

November _almost_ got away without a mention, but the release of the new website as stable is certainly worth mentioning. The website was stable enough to be ready to take over responsibility as the primary website of Modrunner, and serve as the new face of home base, so to speak.

## December

**Discord Bot**

- Aaaaaand more bug fixes

These were the most significant of the year, fixing several longstanding issues that weren't bot-breaking but could definitely be mildly annoying.

# Numbers and Sense

Now onto tracked project statistics for this year! We'll be including all the same numbers from last year, like top tracked projects, number of Modrinth vs CurseForge projects, etc. But since this is the second year of doing this, I'll also be including percentage changes from last year, to make easy comparisons to how things have changed from last year.

Starting us off with our table of the top 10 most tracked projects across all servers, [Sodium](https://modrinth.com/mod/sodium), [Fabric API](https://modrinth.com/mod/fabric-api), and [Lithium](https://modrinth.com/mod/lithium) have all retained their number one, two and three spots from last year. While the number of servers each project is tracked in has risen, the percentage of total servers has dropped. This is simply due to the fact that Modrunner is being used by so many more total servers than last year, a total of **221** compared to just **31** this time last year (a **612.9%** increase!!) For specifics for each project in the list, I've added percentage increases or decreases next to the numbers for easy comparison to last year's results. For newcomers to the list, they were not included for obvious reasons. [Check out last year's recap to see the exact numbers](/2022-12-19-modrunner-recap-2022). It's also worth mentioning that all the projects on this list are from Modrinth, similarly to last year.

| Project Name                                                   | Project Author                                           | Servers Tracked In | Percentage of Servers Tracked In |
| -------------------------------------------------------------- | -------------------------------------------------------- | ------------------ | -------------------------------- |
| 1. [Sodium](https://modrinth.com/mod/sodium)                   | jellysquid3, IMS                                         | 22 (+175%)         | 9.95% (-15.85%)                  |
| 2. [Fabric API](https://modrinth.com/mod/fabric-api)           | modmuss50, sfPlayer1                                     | 14 (+133.33%)      | 6.33% (-13.02%)                  |
| 3. [Lithium](https://modrinth.com/mod/lithium)                 | 2No2Name, jellysquid3                                    | 13 (+333.33%)      | 5.88% (-3.8%)                    |
| 4. [Sodium Extra](https://modrinth.com/mod/sodium-extra)       | FlashyReese                                              | 12 (+300%)         | 5.43% (-4.25%)                   |
| 5. [FerriteCore](https://modrinth.com/mod/ferrite-core)        | malte0811                                                | 11                 | 4.98%                            |
| 6. [Indium](https://modrinth.com/mod/indium)                   | comp500                                                  | 11 (+266.67%)      | 4.98% (-4.7%)                    |
| 7. [Mod Menu](https://modrinth.com/mod/modmenu)                | modmuss50, NeusFear, jackassmc, Prospector, Terraformers | 11                 | 4.98%                            |
| 8. [EntityCulling](https://modrinth.com/mod/entityculling)     | tr7zw                                                    | 10                 | 4.52%                            |
| 9. [ImmediatelyFast](https://modrinth.com/mod/immediatelyfast) | RaphiMC                                                  | 10                 | 4.52%                            |
| 10. [Iris Shaders](https://modrinth.com/mod/iris)              | coderbot, IMS                                            | 10 (+233.33%)      | 4.52% (-5.16%)                   |

This year, projects [FerriteCore](https://modrinth.com/mod/ferrite-core) by [malte0811](https://modrinth.com/user/malte0811), [Mod Menu](https://modrinth.com/mod/modmenu) by [Prospector](https://modrinth.com/user/Prospector), [EntityCulling](https://modrinth.com/mod/entityculling) by [tr7zw](https://modrinth.com/user/tr7zw), and [ImmediatelyFast](https://modrinth.com/mod/immediatelyfast) by [RaphiMC](https://modrinth.com/user/RaphiMC) all claimed spots on this year's list, ousting [Reese's Sodium Options](https://modrinth.com/mod/reeses-sodium-options), [Debugify](https://modrinth.com/mod/debugify), [Continuity](https://modrinth.com/mod/continuity) and [Fabulously Optimized](https://modrinth.com/modpack/fabulously-optimized) from last year. So a round of applause for all our contenders! Think you can keep your spot on next year's leaderboard?

Let's discuss Modrunner's tracked projects more broadly. 

- The bot now tracks a whopping **1,030** projects across CurseForge and Modrinth, a rise of **188.52%** from last year's total of **357** projects.
- Breaking the numbers down by platform, Modrunner now tracks more Modrinth projects that CurseForge ones. To be exact, **578** Modrinth projects (up **254.6%** from last year's total of **163**), and **452** CurseForge projects (up **132.99%** from last year's **194**).
- For servers, the server with the most tracked projects totals at **155**, which accounts for just **15.05%** of the total number of projects Modrunner tracks (last year's server with **170** tracked projects accounted for **47.62%**, almost half!). 
- The average number of projects tracked per server is about **9.6** (up **37.14%** from last year's average of **7**).
- In terms of server settings, most servers still use the default "Normal" notification style (**208** or **94.12%** of them to be exact). That leaves **11** (**4.98%**) of servers using the "Compact" style, and just **2** (**0.9%**) using the beta "AI" style.
- Most servers also use the default maximum changelog lengths. **218** (**98.64%**) servers have theirs set to 4000 characters. The remaining **3** use custom changelog lengths.

And that's it! Before I conclude things, I want to quickly send everyone a quick thank-you. Modrunner has been an awesome and fulfilling project to work on, and the fact that so many people find it useful is greatly empowering to me. So thank you, to everyone that uses Modrunner, to those that provide feedback, ideas, and submit bug reports.

Here's to another year of great things for Modrunner in 2024!

\- [Shane](https://github.com/smcmo)