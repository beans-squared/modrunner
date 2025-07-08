---
title: 'Dev Review: November 2023'
thumbnail: /img/blog/dev-review-nov-2023/dev-review-nov-2023.png
description: A new series about reviewing recent development on Modrunner, reflecting on past progress and events, and looking forward to what's in store for the future.
author: beansquared
date: 2023-11-30
---

Hello, hello!

The end-of-year holiday season is a time of celebration and reflection for many, thus I've got something new to announce! Starting this November, I'm trying out a new reoccurring blog series called Dev Review. The main point of this series being to serve as a summary of all the recent development work that has gone into Modrunner and its adjacent projects. Ideally I'd like to be able to post these on a monthly basis, at the end of each month, so that I can neatly summarize all the work that was done in the past month, but we'll see. As you're probably aware I'm not exactly known for my consistency with these kinds of things.

Regardless, let's get into the first one!

# Newsy news

Before we dive into the review itself, the main announcement I have is that today the current official website is being retired and replaced with the new website, currently in beta. I believe the new website is stable and feature-complete enough to serve as the official mainstay of all Modrunner resources and information moving forward. You can access the new website where the old one used to be, at [modrunner.net](https://modrunner.net).

# The past month

I'll be fully honest, November was a fairly slow month for Modrunner. The bot itself saw only a single commit this month, which was to touch up the contributing guidelines. We can pretty much ignore the bot for the rest of this post. All of the dev work that did happen this month was to the new website. [After its beta launch in late September](https://discord.com/channels/764169561003130881/1154476363617681521), I've mostly been quietly working on bugfixes and pushing out minor features that escaped my oversight in time for the release.

## Platform name funkiness

First up was a bugfix for an issue that [caused the platform name on tracked projects in the Dashboard to appear like this](https://github.com/users/smcmo/projects/11/views/5?pane=issue&itemId=41999955):

![picture of the dashboard where the platform names have the wrong first letter](/img/blog/dev-review-nov-2023/platform-name-issue.png)

This cause of this one is pretty funny, I think. Back in October, I pushed an update to the bot to fix a spelling error. On notification embeds, there is a button that allows you to open the file page on the project's host platform and either says "View on CurseForge" or "View on Modrinth". However, before this fix, the text for CurseForge notifications read "View on Curseforge". Just one uncapitalized letter, and probably isn't even technically an incorrect way to spell CurseForge, depending on who you ask. But it bugged me, so I decided to fix it after having it exist for several months now. 

Now, the text for these buttons is dynamically generated using information from the bot's database. Every tracked project has the name of the platform it's hosted on as part of its stored information, stored in undercase format. For example, `modrinth` or `curseforge`. The bot uses this name to put the correct name on the view button on notification embeds. But wait! "CurseForge" and "Modrinth" are proper names, so they need to be capitalized! Easy solution, I simply wrote a function that capitalizes the first character in any string passed to it. Problem solved. Mostly...

This function only capitalizes the first letter, which works great for Modrinth. But it doesn't work as well for CurseForge, which has the F capitalized as well. I could write a second function that also capitalizes the F in CurseForge, but this seemed like unnecessary code, so I went with a more long-term solution. In the future, I may want to add it so that Modrunner supports more platforms that just CurseForge and Modrinth. Rather than writing oodles of code that auto-capitalizes the letters in each unique platform name that need it, why don't we store the names of the platforms in the database as they're spelled? This way, we don't have to use capitalization functions to fix names for display time. Now, this way required a little more work to be done: since all the platform names are currently stored in lowercase, I had to write a script that would go though every entry in the database and replace `modrinth` with `Modrinth` and `curseforge` with `CurseForge`. I pushed the changes, the spelling mistake on the notification embeds was fixed, problem solved!

Nope. Instant problem: when the bot checks its tracked projects for updates, it asks the database for all of its CurseForge projects, then all of its Modrinth projects, so that it can make separate API calls to each respective platform. But the code asks for all projects with the platforms named `curseforge` and `modrinth`, the uncapitalized versions. When this happens, that bot sees that are no projects with those platforms, and goes "Well! I guess I don't have to check any projects for updates, since there are none!" This was a quick and easy fix, luckily.

So how does this relate to this spelling issue on the website dashboard where `Modrinth` becomes `-odrinth` and `CurseForge` becomes `#urseForge`? Simply, the website receives the tracked project's platform name as lowercase through the API, just as it was stored in the database. So the website needed its own capitalization function to correctly display the platform names, just like the bot did. But once the fix when live on the bot, the API now returned the names of the platforms capitalized correctly, which we don't need that capitalization function anymore. I won't go into the specifics of how it works internally, but put shortly, attempting to capitalize the letter "M" results in the "-" character, and trying to capitalize "C" returns the "#" character. Another easy fix, simply remove the capitalization function from the website. At the end of the day, this was a great lesson and example of how a simple bugfix for a small spelling error can affect so many other seemingly unconnected systems.

## UI confusion

This next bug is not quite as interesting. When the new website's beta first went live, user [HypherionSA](https://hypherionsa.bio.link/) reported that [the values for the fields on the settings tab don't update until a page reload](https://github.com/users/smcmo/projects/11/views/5?pane=issue&itemId=41365525). This is a slightly misleading title, since changing the bot settings via the dashboard actually did work correctly at launch. The main issue was that you would change one of the values, for example, changing the default changelog character length from `4000` to `500`, then navigate away to the tracked projects tab and back. It would then display the old value of `4000`, making you think nothing happened. If you switched to a different server or reloaded the page, the field would update and show you the correct value, demonstrating that it was actually changing the value correctly. But, switching tabs made it change back, and there was no way to know if changing that value worked, since there was no feedback, either. No little checkmark or anything.

This was relatively simple to fix, but was probably still the trickiest to figure out for me since I was still new to the technology framework. Eventually I figured out that I was forgetting to update the value displayed in the field when it was changed and fixed it. I also added a little confirmation dialog box that shows whenever you change a setting so show that it's actually doing something. Done and dusted!

## Security brush-up

Security is something that many people tend to forget about or ignore until not having it negatively impacts them in some way. I'm going to avoid talking about the specifics of OAuth2 and how signing in through Discord works since it's a complicated process and I would probably get several things wrong or describe them inaccurately. But to put it simply, a part of that process involves something called the `state` variable. This variable is a unique string that you send alongside the request to Discord to sign yourself in. On the return request, Discord re-sends you the `state` variable, allowing you to compare it to the value you sent Discord in the first request. If the value has changed, you've likely been clickjacked and someone is trying to steal your Discord information. We can't have that!

Sending the `state` variable is optional, however Discord recommends using it for the sake of security. When the new website beta launched, it did not initially support the `state` variable, since I wanted to ensure that the Discord login was working correctly before I went ahead and made the code more complicated. Now that we're past that, I can happily say that support for the `state` variable has been added. We're just that much more secure now!

## Holiday fun

For Halloween and Christmas, I did also decide to add in some custom holiday themes for fun. You can access them by using the "Switch theme" button at the top right. I kinda think that the Halloween one almost looks better than the regular theme!

# What's next?

So what's happening next in the Modrunner world? As things stand, I plan December being a month where I primarily focus on the bot, rather than the website, though it will probably still see a little love. You can see everything that's planned for the next month [over on the roadmap](https://github.com/users/smcmo/projects/11), but here's a few standout features:

- Being able to receive project update notifications via direct message
- Being able to re-send notifications that were already sent previously
- Being able to sort tracked projects by column headings on the dashboard

And of course, there should be a good assortment of bugfixes for both the bot and the website.

I suspect December will primarily serve as a "maintenance" month, that is, most of the work done will be behind the scenes and the primary focus will be to serve as the foundation for later updates in early 2024. This should hopefully make it easier to add new features, such as support for additional modding platforms, and quality of life updates such as filtering notifications by release type and detection of third-party downtime.

And that's it for this month! Hope you all have a good month.

-beansquared