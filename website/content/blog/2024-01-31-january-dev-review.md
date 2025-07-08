---
title: 'Dev Review: January 2024'
thumbnail: /img/blog/dev-review-jan-2024/thumbnail.png
description: New year's resolutions and rewrites, oh my!
author: beansquared
date: 2024-01-31
---

Hey all,

Welcome to the first dev review of 2024! January, a time of new year's resolutions (to succeed or fail at), a time of cold temperatures and heaps of snow (at least where I live), and time for me to provide to you all the monthly Dev Review! This month I've got a breakdown of the backend rewrite, which is what I have been primarily focusing on for the past month. Read on to learn more!

# Why rewrites are painful and important

This month's development focus has been primarily on a complete rewrite of Modrunner's backend service. This is something that I've been planning to do for some time now, and something I've recently begun to prioritize because of a number of other factors. 

Modrunner, since its inception and initial prototyping back in early 2022, has functioned as own self-contained monolithic application. This means that a single application handles handled every aspect of its functionality, including bot commands, API requests, and so on. This made sense early on since Modrunner was just a Discord bot at this point; its requirements were relatively simple and easy to contain in a single app. 

Requirements, however, change and evolve over time. This is particularly the case when I began development on the new website. Now, the bot had to have a web server and an internet-accessible API so that the website's dashboard would be able to function. This is how the bot currently functions as of this moment, and it works well enough. But considering the number of new features that are planned for Modrunner, these requirements are only going to increase and evolve further, beyond where it makes sense to have all this functionality in a single application.

Enter the rewrite. Before I explain in more detail, a quick little explanation for those who may be unfamiliar with how web apps like Modrunner are generally structured. Typically applications have two parts: the **frontend** and the **backend**. The frontend is the part of the application that is user-facing, such as a website or desktop app interface. The backend is the part of the app that powers the frontend, by performing work such as storing and processing data. When you think of a single app like Modrunner, remember that it's actually two (or more) separate parts working together.

At the current moment, Modrunner is composed of two parts. The first component is the Discord bot backend service; this is a Node.js application that handles the Discord bot. So whenever you run a command in Discord, or when Modrunner posts an update notification in a Discord channel, that's being handled by the backend. However, Discord is not the only way you can interact with Modrunner. You can also manage the projects tracked in a Discord server through the website dashboard. When you perform actions on here, such as tracking a project, the website communicates with the backend requesting it to perform certain changes to the database of tracked projects. This means the backend has to handle a whole lot of internet traffic by itself, including:

- Communication with Discord, such as sending messages and receiving interactions (such as when you use a command)
- Communication with CurseForge and Modrinth, to periodically request information about projects on the platform
- Communication with the website, to send and receive signals to manage tracked projects

It should come as no surprise that Modrunner's computing resource with the highest consumption is bandwidth, considering the above.

So why do we need a rewrite? To simplify and divide up the responsibilities of Modrunner. Separating the functionalities specific to the Discord bot and those more relevant to the website allows me as a developer to create a physical separation of concerns, which will make it easier to fix bugs, add new features and improve existing functionality. This will also add some measure of resiliency to the system, an attack or flaw in one system will make it less likely to affect other systems as much or at all.

# The Modrunner roadmap for 2024

In order to make sure that I'm setting expectations appropriately, new features and updates will always be released **when they are ready to be released**. I cannot and will not give release dates for these kinds of things due to the inherently unpredictable nature of software development, as well as the slightly more predictable but still time-consuming responsibilities of IRL work and life. I will work on these kinds of things whenever I can; a few hours here, a couple minutes there. This makes it extremely difficult to know when something will be ready for public release; however, I do still want to be able to provide a general idea of the time frame of when certain features or bugfixes can be expected. The [public roadmap](https://github.com/users/smcmo/projects/11/views/5) will always have the most up-to-date information about what I'm working on and when items are expected to be completed by. Still keep in mind that things are always subject to change, I might have to push back things, and certain features may depend on me finishing other items on the list first.

Thanks for reading and hope you have a great day!

-beansquared