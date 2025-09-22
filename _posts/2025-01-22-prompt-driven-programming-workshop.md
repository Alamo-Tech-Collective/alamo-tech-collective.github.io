---
layout: post
title: "Prompt Driven Programming Workshop: San Antonio MUD"
date: 2025-01-22
categories: [workshops, programming, ai]
author: "Alamo Tech Collective"
attendees: 12
---

On Saturday we hosted our first Prompt Driven Programming Workshop at the Alamo Tech Collective. The project for the day was a San Antonio themed multiuser dungeon (MUD) that participants could connect to over telnet. The requirements were simple: SQLite persistence, room and global chat, and a handful of basic commands like say, shout, move, and quit. Stretch goals included NPCs, tick based movement, and ASCII art.

We set aside three hours for the session, with a kickoff at 12:30. Everyone worked on the same project idea but used different AI assistants and approaches. Every 20 minutes we paused to share progress, challenges, and what was or was not working.

Throughout the afternoon, people got their servers up and running, tested player movement, and verified that logging in and out saved state to SQLite. Some focused on core functionality, while others jumped straight into stretch goals like adding NPCs, attacks, or ASCII art logos. A few experiments broke things in funny ways. Fixing backspace support sometimes destroyed text rendering, and adding logos triggered unexpected issues in Claude Code.

Despite the bugs, most participants had working servers by the end of the session. We were able to connect to each other's worlds, move between rooms, and chat both locally and globally. Some tried pushing the limits by stress testing with extra accounts, experimenting with rate limiting, and even attempting crash scripts. Others added creative touches like over engineered borders, colored text, or combat mechanics.

The format worked well. Collaborative, but with everyone free to explore their own path. By the end, we had multiple playable versions of a San Antonio MUD with Alamo Plaza, River Walk, Southtown, the Pearl, and more. Everyone walked away with a better feel for how to use AI assistants for architecture and prompting rather than just one shot code generation.

Thanks to everyone who came out and built with us. We will be doing more of these sessions, so if this sounds like your kind of Saturday, keep an eye on our events calendar.