---
layout: post
title: "Byte Night August: Corrina Shows Off Charlotte AI Security Tool"
date: 2025-08-09
categories: [community, events, cybersecurity]
author: "Brandon Howard"
excerpt: "August's Byte Night featured Corrina demonstrating Charlotte, an AI-powered security tool for red teaming and vulnerability assessment. Plus great discussions about everything from GlusterFS nightmares to career advice."
---

# Byte Night Recap: Charlotte AI and Real Tech Talk

Last night's Byte Night (August 8th) was exactly what these meetups should be - genuine tech people having real conversations about real problems. Corrina gave us a demo of Charlotte, her AI-powered cybersecurity tool, and then we all hung around talking about everything from distributed storage disasters to career development in tech.

## Charlotte: AI for Security Testing

Corrina presented [Charlotte](https://www.c-h-a-r-l-o-t-t-e.org/) (Cybernetic Heuristic Assistant for Recon, Logic, Offensive Tactics, Triage & Exploitation), an open-source AI tool she's building for security testing. It's modular, self-hosted, and integrates with tools like Metasploit. The interesting part is it's designed to work for red teaming, blue teaming, and reverse engineering - basically a Swiss Army knife for security work.

You can check out the [GitHub repo](https://github.com/Core-Creates/C-H-A-R-L-O-T-T-E) if you want to contribute or just poke around. It's GPL-3 licensed and Corrina made it clear the goal isn't to profit but to train up the next generation of security tools.

During Q&A, we got into some good discussions about prompt injection attacks and how to handle AI safety in security tools. The consensus was basically "it's your system, you control it" but there's definitely some interesting challenges there.

## The Real Conversations

After the presentation is when things got interesting. We had developers at various career stages sharing experiences and advice. One conversation that stuck with me was about not trying to speedrun your career - "I went from help desk to IT director in 7 years and completely burned myself out. Take your time, find what you actually like."

We had a bunch of system admins discover they could use Git for config file backups and version control. One person's mind was basically blown - "I can just git init my /etc directory?" Yes. Yes you can. It's way better than the old "copy the file and add .bak.2024-08-08" approach.

## Storage Horror Stories

Someone mentioned they're dealing with 200TB of split-brain data in a GlusterFS cluster. That triggered a whole conversation about distributed storage nightmares. Another person had successfully run petabyte-scale storage on GlusterFS under OwnCloud (before NextCloud was even a thing). 

The real lesson from the discussion wasn't "use this tool, not that tool" - it was that you need to actually understand whatever storage solution you're implementing. The folks having GlusterFS problems admitted they went into it without much experience. Meanwhile, someone else had it working fine at petabyte scale because they knew how to configure it properly. The infrastructure matters as much as the software choice.

There was also this whole discussion about how infrastructure issues get blamed on software. Like when your file previews are slow, maybe it's not your compression algorithm - maybe it's your disk I/O or network setup. Sometimes the simple answer is the right one.

## DoD Stories and Workarounds

A few veterans shared stories about dealing with government IT restrictions. The best was someone who discovered that as long as you didn't download anything to the government computer, you could do web development. "Just don't view source," they joked. Another group actually paid for commercial internet rather than deal with the Air Force network restrictions.

## Open Source and Imposter Syndrome

We talked about the Taco Price Index project and why people are hesitant to push their code. "People are afraid to show what they're doing," but honestly, we're all learning. The code doesn't have to be perfect. Just push it.

Someone mentioned they struggle with social cues and reading expressions. The response? "That's most of us here." It's true though - tech meetups are where the socially awkward unite over shared interests. We script our conversations and hate small talk but can talk for hours about the right technical problem.

## Random Tangents

At various points we discussed:
- Quantum computing and consciousness
- Why Arch Linux doesn't include SSH by default
- Using Upwork to build a software company
- The old Napster/Kazaa/LimeWire days
- How a bank became a hackerspace (our building used to get robbed so often they shut it down)
- International development teams and offshore challenges

## Come Next Time

Byte Night is the second Friday of every month. Next Tuesday (August 13th) is Open Source Builder Night - bring whatever you're working on or want to work on. The WiFi password is on the signs, Discord link is on the back of them.

Check out our [Meetup page](https://www.meetup.com/alamotechcollective) to RSVP for upcoming events and stay in the loop.

We're not trying to be everything to everyone. As I keep saying, "We're trying to get the right people, not all the people." If you want real technical discussions without the corporate BS, you'll fit right in.

Pizza's usually gone by 7pm, so show up on time.