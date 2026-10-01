---
layout: post
title: "Building Your Own AI Agent with Hermes"
date: 2026-09-19
categories: [community, events, ai]
author: "Alamo Tech Collective"
description: "Brandon Howard showed San Antonio devs how he runs Hermes as his AI operating layer. Here's the recap, and how to build your own AI agent from scratch."
---

<div class='featured-image-container'>
  <img src="/assets/images/blogs/hermes/hermes_agent.png" alt="Title slide: Build Your Own AI Agent with Hermes, presented by Brandon Howard of Zelifcam, September 19, 2026" class="featured-image">
</div>
Most mornings at 6 AM, Brandon Howard's AI agent scans his inbox, his projects, and his calendar. Then it says nothing at all.

That's not a bug. Brandon, founder and CEO of Zelifcam and organizer of the Alamo Tech Collective, calls it the feature. A good agent doesn't report that it ran. It speaks up only when there's a new decision, deadline, blocker, or approval waiting on you.

On Saturday, September 19th, guests showed up to the Alamo Tech Collective to watch how that actually works. No polished vendor demo, no slide full of logos. Just Brandon walking through how he runs Hermes every day, what broke, what he fixed, and how to set it up from scratch.

If you missed it, or you were there and want every command in one place, here's the recap.

## What Hermes is
Hermes is an open-source AI agent built by Nous Research. Not a chatbot window. An agent with file system access, terminal control, a browser, persistent memory, reusable skills, scheduled jobs, and connections to Discord, Telegram, and email.

The difference fits on one slide. A chatbot takes your question, gives you an answer, and forgets the job ever existed. An agent sits in the middle of your tools and does the job.

<div class='blog-image-container full-width'>
  <img src="/assets/images/blogs/hermes/hermes-chatbot-vs-agent.jpg" alt="Slide comparing a chatbot, which answers and forgets, with an agent connected to files, terminal, browser, memory, cron, and channels" class="featured-image">
</div>

That line isn't just marketing. Anthropic's widely cited guide to agents draws the same distinction: workflows follow predefined code paths, while agents direct their own process and tool use to finish a task. The research goes back further. ReAct showed in 2022 that language models get more reliable when they alternate between reasoning about a problem and taking actions in the world.

Brandon's framing was shorter: AI agents aren't science fiction. They're running businesses right now.

## The loop, and where the human sits
The most important slide of the afternoon was five boxes in a row: **Read** (files, mail, tasks), **Verify** (against the source), **Draft** (no send button), **Approve** (a person), **Act** (only then).

The agent can read everything and draft anything. Nothing leaves the building until a human signs off.

<div class='blog-image-container full-width'>
  <img src="/assets/images/blogs/hermes/hermes-the-loop.jpg" alt="The agent loop: Read, Verify, Draft, Approve, Act, repeating with a human gate between draft and action" class="featured-image">
</div>

That's not paranoia. It's decades-old automation design. Parasuraman, Sheridan, and Wickens argued back in 2000 that the right level of automation depends on the stage: gathering and analyzing information can be heavily automated, while decisions and actions with real consequences deserve a human in the loop.

The security world agrees. OWASP's Top 10 for LLM Applications lists "Excessive Agency," giving a model more permissions or autonomy than the task needs, as one of the core risks. We covered how fast AI-powered attacks are evolving in <a href="{% post_url 2026-01-04-cyber-city-sa %}">Cyber City SA</a>. An agent with your inbox and a terminal is exactly the kind of thing you scope tightly.

Brandon put it this way: *"Not trustworthy because it has access. Trustworthy because access is scoped and outputs are verified."*

## Treat it like an entry-level employee
This was the most practical idea of the day. Don't expect your agent to just know your process. Train it the way you'd train a new hire: do the process together and correct it. Then have the agent write that process down as a script, usually Python. Now it runs the same way every time.

Why the script? An LLM is non-deterministic. A script is not. Train the process, then lock it in code.

<div class='blog-image-container full-width'>
  <img src="/assets/images/blogs/hermes/hermes-the-method.jpg" alt="Slide: Treat it like an entry-level employee. Train, then Codify into a Python script, then Consistent results every time" class="featured-image">
</div>

That's also how Hermes skills work. A correction becomes a reusable procedure that survives across sessions, with defined inputs, evidence, output, failure behavior, and an approval boundary. If that sounds familiar, it echoes the "skill library" idea from Voyager, a 2023 research agent that stores working code as skills it can reuse and build on.

Brandon was blunt about the limits: <em>"It does not learn magic. It learns what you correct, and writes it down."</em>

## SOUL.md, memory, and why one giant brain fails
Every Hermes setup has a **SOUL.md** file. Brandon was clear that it sets the agent's stance, not a cute personality. His rules: read before acting, verify against the source, draft external messages instead of sending them, and surface material changes only.

**Memory** keeps durable facts across sessions, with a weekly review to prune and consolidate so recall stays sharp instead of bloated. Persistent memory beyond a single context window is an active research area; MemGPT is a good starting read if you want the theory.

<div class='blog-image-container full-width'>
  <img src="/assets/images/blogs/hermes/hermes-profiles.jpg" alt="Slide showing one primary profile and two specialist profiles, each with separate memory, skills, cron, and sources" class="featured-image">
</div>

Then there are <strong>profiles</strong>. Brandon doesn't run one giant agent that knows everything. He runs a primary profile for executive decisions and client operations, plus a specialist profile for each isolated workstream, each with its own memory, skills, schedules, and sources. Channels route to the right profile automatically.

The payoff: no cross-contamination between clients, and every profile is easier to trust and easier to audit.

## The agent works when you're not asking
Scheduled cron jobs are where an agent stops being a fancy chat window. Brandon's run on their own: an exceptions brief at 6 AM on weekdays, an activity scan at 8:30, a meeting brief before each real meeting, an hourly reconciliation of client channels, and a weekly health review.

<div class='blog-image-container full-width'>
  <img src="/assets/images/blogs/hermes/hermes-cron-schedule.jpg" alt="Cron timeline: 6:00 exceptions brief, 8:30 activity scan, pre-meeting edge brief, hourly reconcile changes, weekly health review" class="featured-image">
</div>

The rules that keep them quiet: silent on success, alerts that resend only when an owner, deadline, or status changes, and a watchdog that checks the output, not just the exit status.

Compare a bad alert ("Scan completed. Three tasks remain open.") with a good one ("Decision needed: one task overdue 7 days. Owner: PM. Approve reassignment. Evidence checked."). Silence beats unchanged noise every time.

Brandon also walked through what broke. Noise destroyed trust, so normal success went silent. A job once reported OK while its actual work was skipped, so now the output gets checked. The agent assigned ownership based on half the conversation, so now it needs inbound, outbound, and the latest record before it names an owner. And a data schema changed under an automation, so now it probes the live schema first. Every one of those is a lesson you'd rather learn from someone else's demo than your own inbox.

## How to build your own AI agent with Hermes
Here's the setup from the workshop. Hermes is MIT-licensed and works with whatever model provider you want: Nous Portal, OpenRouter, OpenAI, your own endpoint, and more.

**1. Install.** On Linux, macOS, or WSL2:

```bash
curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash
source ~/.bashrc   # or: source ~/.zshrc
```

On Windows (native PowerShell):

```powershell
iex (irm https://hermes-agent.nousresearch.com/install.ps1)
```

Prefer a desktop app? The Mac and Windows installer lives at <a href="https://hermes-agent.nousresearch.com" target="_blank" rel="noopener">hermes-agent.nousresearch.com</a>. Windows heads-up: some antivirus tools flag the bundled `uv.exe` as malware. The Hermes README documents it as a false positive and shows how to verify your copy.

**2. Connect a model.** The easiest path is Nous Portal, where one login covers the model plus built-in tools like web search and a cloud browser:

```bash
hermes setup --portal
```

🎁 **Workshop offer:** Brandon shared a link that gets you **$10 in API credit** when you subscribe to Nous Portal: [portal.nousresearch.com/r/theretroroot](https://portal.nousresearch.com/r/theretroroot)

Rather bring your own API keys? Pick a provider and model instead:

```bash
hermes model
```

**3. Check your install.**

```bash
hermes doctor
```

**4. Turn off what you don't need.** Start read-only. Turn on writes, the browser, and skills only after you trust the result.

```bash
hermes tools                               # toggle toolsets on and off
hermes tools disable skills                # drop a whole category in one line
hermes config set approvals.mode manual    # always prompt before dangerous commands
```

Manual mode prompts you before Hermes runs any flagged command. Set it explicitly rather than trusting the default.

**5. Talk to it from your phone.**

```bash
hermes gateway setup
hermes gateway start
```

Then message your bot on Telegram, Discord, or another supported platform.

<div class='blog-image-container full-width'>
  <img src="/assets/images/blogs/hermes/hermes-start-small.jpg" alt="Staircase slide: 1 read-only brief, 2 add read access, 3 schedule it, 4 writes last" class="featured-image">
</div>

<strong>6. Climb the ladder slowly.</strong> Brandon's four steps, in order: a read-only brief, then more read access, then put it on a schedule, and writes last.

No send button until you trust it. Add automation only after the result earns it.

## Not an AI that runs your business
Brandon closed on the line that summed up the whole afternoon. Hermes isn't an AI that runs your business without you. *"It's an assistant that does the reconstruction, shows the evidence, and leaves the judgment to you."*

## Bring your agent to Byte Night
Got Hermes running? Stuck on step 4? Bring your laptop to **Byte Night on Friday, October 9th** at 6 PM. Show off your first brief, swap SOUL.md files, and debug alongside other San Antonio devs in the same room that hosted <a href="{% post_url 2026-07-28-velocicode-playtest-night %}">VelociCode Playtest Night</a>.

👉 [RSVP for Byte Night](https://www.meetup.com/alamotechcollective/events/316781097/)

Missed the workshop entirely? Here's the <a href="https://www.meetup.com/alamotechcollective/events/316359316/" target="_blank" rel="noopener">original event page</a>. Follow us on Meetup so you catch the next one.

See you at the next one.

Alamo Tech Collective

Building San Antonio's tech community, one event at a time.

## Resources & Further Reading
-	Nous Research. Hermes Agent: documentation. <a href="https://hermes-agent.nousresearch.com/docs/" target="_blank" rel="noopener">https://hermes-agent.nousresearch.com/docs/</a>
-	Nous Research. Hermes Agent: security (command approvals, DM pairing). <a href="https://hermes-agent.nousresearch.com/docs/user-guide/security" target="_blank" rel="noopener">https://hermes-agent.nousresearch.com/docs/user-guide/security</a>
-	Nous Research. Hermes Agent source code (MIT). <a href="https://github.com/NousResearch/hermes-agent" target="_blank" rel="noopener">https://github.com/NousResearch/hermes-agent</a>
-	Anthropic. (2024). Building effective agents. <a href="https://www.anthropic.com/engineering/building-effective-agents" target="_blank" rel="noopener">https://www.anthropic.com/engineering/building-effective-agents</a>
-	Yao, S. et al. (2022). ReAct: Synergizing reasoning and acting in language models. arXiv:2210.03629. <a href="https://arxiv.org/abs/2210.03629" target="_blank" rel="noopener">https://arxiv.org/abs/2210.03629</a>
-	Wang, G. et al. (2023). Voyager: An open-ended embodied agent with large language models. arXiv:2305.16291. <a href="https://arxiv.org/abs/2305.16291" target="_blank" rel="noopener">https://arxiv.org/abs/2305.16291</a>
-	Packer, C. et al. (2023). MemGPT: Towards LLMs as operating systems. arXiv:2310.08560. <a href="https://arxiv.org/abs/2310.08560" target="_blank" rel="noopener">https://arxiv.org/abs/2310.08560</a>
-	Parasuraman, R., Sheridan, T. B., & Wickens, C. D. (2000). A model for types and levels of human interaction with automation. IEEE Transactions on Systems, Man, and Cybernetics, Part A, 30(3), 286–297. <a href="https://doi.org/10.1109/3468.844354" target="_blank" rel="noopener">https://doi.org/10.1109/3468.844354</a>
-	OWASP. (2025). OWASP Top 10 for LLM Applications 2025 (LLM06: Excessive Agency). <a href="https://genai.owasp.org/llm-top-10/" target="_blank" rel="noopener">https://genai.owasp.org/llm-top-10/</a>
