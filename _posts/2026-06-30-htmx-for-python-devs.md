---
layout: post
title: "HTML Over the Wire: HTMX Night with Alamo Python"
date: 2026-06-30
categories: [community, tutorials]
author: Alamo Tech Collective
description: "Alamo Python came to Alamo Tech Collective's Hackerspace for a build-along HTMX session. Here's what we covered, the Big 6 attributes, and two repos you can clone tonight."
permalink: /community/meetups/2026/06/30/htmx-for-python-devs/
---
<div class='featured-image-container'>
  <img src="/assets/images/blogs/htmx_django.png" alt="HTMX and Django" class="featured-image">
</div>

Monday night, a room full of Python devs showed up at the Hackerspace to do something most of us have been trained to think is impossible: build a reactive, no-page-reload web app without writing a single line of JavaScript.

If you've felt the JavaScript fatigue creeping in (the build steps, the framework churn, the npm install that pulls down half the internet to render a to-do list), this one was for you. We didn't come to talk down on React. We came to show what the other path looks like, and let the code make the argument.

The session, HTMX for Python Devs, was a collaboration with <a href="https://www.meetup.com/alamo-python/" target="_blank" rel="noopener">Alamo Python</a>, ran build-along style. Roughly two hours of HTMX introduction and how to integrate it into Django.

## The One Line That Anchors Everything

Before any attribute, any demo, any Django view, there's one main takeaway the whole night:

**The server returns HTML, not JSON.**

That's the whole pitch. In a typical SPA, your server ships JSON, and a pile of client-side JavaScript turns that JSON into a DOM. HTMX flips it: the server returns the actual HTML fragment, and HTMX drops it into the right spot on the page. No client-side state to sync, no serialization layer to babysit. You already know how to generate HTML on the server (you've been doing it since day one), so HTMX meets you where you are.

## What We Built

We started with a simple Django to-do app. Full page reloads, nothing fancy. Then we added HTMX one move at a time and watched the reloads disappear.

The whole HTMX integration came down to three moves, and once you see them, you see them everywhere:

1. **Load HTMX.** One `<script>` tag from a CDN. That's the entire install. We also set `hx-headers` on the `<body>` so Django's CSRF token rides along on every request automatically.
2. **Mark up the controls.** The add form, the checkboxes, the delete buttons, the pagination links, each one gets a couple of `hx-*` attributes telling HTMX *what to request* and *where to put the response*.
3. **Return fragments.** The Django views return a partial template (a single task row, or just the list region), instead of a whole page.

By the end, adding a task, checking it off, deleting it, and paging through the list all updated just the part of the page that changed. Nothing flashed. Nothing reloaded. Open the Network tab to watch it: each action is a small request that returns a snippet of HTML.

## The Big 6

If you remember nothing else, remember these six attributes cover roughly 80 – 90% of real HTMX apps:

- `hx-get` — fetch HTML with a GET
- `hx-post` — send data with a POST
- `hx-target` — which element the response lands in
- `hx-swap` — *how* it lands (replace the inner HTML, the whole element, append, prepend…)
- `hx-trigger` — what fires the request (a click, a keyup, hover, even polling)
- `hx-swap-oob` — "out of band" swaps, so one response can update several spots at once

Everything else (inline editing, infinite scroll, loading spinners, confirmation dialogs) is a remix of those six. That's genuinely the surface area you need to be dangerous.

## Two Repos You Can Clone Today

The best part of an event like this is what you walk away with. Two artifacts came out of this session, and are ready to run.

### HTMX Explorer, by Richard Gower

<a href="https://github.com/rchrdgwr/htmx-explorer" target="_blank" rel="noopener">HTMX Explorer</a> is the one to open first. Richard built an interactive app that walks through 16 progressive concepts, from “basic request” all the way up to server-driven UI patterns like CRUD, wizards, and master/detail. Each concept gets a diagram, a code snippet, a live demo, and (the part that makes it click) a request/response inspector showing you the actual HTML fragment the server sent back.

It's about as frictionless as it gets:

```bash
git clone https://github.com/rchrdgwr/htmx-explorer.git
cd htmx-explorer
python server.py
```
<br />
Then open `http://localhost:8765`. Python 3.7+, zero other dependencies. If you want to *understand* HTMX rather than just copy-paste it, start here.

### Django + HTMX ToDo App, by Sly

<a href="https://github.com/Alamo-Tech-Collective/ToDo" target="_blank" rel="noopener"><strong>The ToDo app</strong></a> is the project we built together and now lives in the ATC GitHub org. It's the full end-to-end picture: Django 5.2 views returning fragments, templates wired up with `hx-*` attributes, CSRF handled once, pagination that swaps just the list and still updates the URL so you can bookmark `?page=2`. Not one line of hand-written JavaScript in the whole thing.

It runs in Docker, so there's nothing to install but Docker Desktop:

```bash
git clone https://github.com/Alamo-Tech-Collective/ToDo.git
cd ToDo
docker compose up
```
<br />
Open `http://localhost:8000`, add a few tasks, and watch the Network tab. Toggling a checkbox is the action to trace end-to-end, follow it from the `hx-post` in the template to the view that returns the row, and you've basically seen everything the app does.

## So When Do You *Not* Reach for HTMX?

We're not here to sell you a silver bullet, and the Q&A got into the honest version of this. HTMX shines when your UI is fundamentally server-driven (forms, lists, dashboards, and CRUD), the bread and butter of most business apps. You get interactivity without the build pipeline and without duplicating your data model on the client.

Where a React or Vue still earns its keep: heavy client-side state, offline-first apps, rich real-time interactions, anything where the browser is doing serious work independent of the server. The point isn't “HTMX wins.” It's that for a huge slice of the apps we actually build, the heavy framework was solving a problem we didn't have, and HTMX gives you a lighter way through.

## TL;DR

- The server returns HTML, not JSON. That's the whole model.
- Three moves: load HTMX, mark up the controls with `hx-*`, return fragments from your views.
- The Big 6 — `hx-get`, `hx-post`, `hx-target`, `hx-swap`, `hx-trigger`, `hx-swap-oob` — cover most real apps.
- Clone Richard's <a href="https://github.com/rchrdgwr/htmx-explorer" target="_blank" rel="noopener">HTMX Explorer</a> to learn the concepts, and the <a href="https://github.com/Alamo-Tech-Collective/ToDo" target="_blank" rel="noopener">ATC ToDo app</a> to see it wired into Django.
- HTMX is a great fit for server-driven UIs; reach for a heavy framework when you genuinely need heavy client-side state.

## Thanks + What's Next

Big thanks to **Alamo Python** for collaborating on this one, and to <a href='https://www.linkedin.com/in/rchrdgwr/' target='_blank' rel='noopener'>Richard Gower</a> for building the Explorer; that kind of teaching tool is exactly the sort of thing that makes San Antonio's independent tech scene worth showing up for.

Both repos are open, clone them, break them, send a PR. And come build with us at the next one.

- **Join the community:** <a href="https://alamotechcollective.com" target="_blank" rel="noopener">Alamo Tech Collective</a> · <a href="https://discord.gg/2CjSV93tBV" target="_blank" rel="noopener">Discord</a>
- **Alamo Python:** <a href="https://www.meetup.com/alamo-python/" target="_blank" rel="noopener">Meetup</a>

## Resources & Further Reading

- <a href="https://htmx.org/" target="_blank" rel="noopener">htmx.org</a> — official docs
- <a href="https://hypermedia.systems/" target="_blank" rel="noopener">Hypermedia Systems</a> — free book by HTMX's author, Carson Gross
- <a href="https://github.com/adamchainz/django-htmx" target="_blank" rel="noopener">django-htmx</a> — Django integration helpers
- <a href="https://github.com/rchrdgwr/htmx-explorer" target="_blank" rel="noopener">HTMX Explorer</a> — Richard Gower's interactive concept walkthrough
- <a href="https://github.com/Alamo-Tech-Collective/ToDo" target="_blank" rel="noopener">Django + HTMX ToDo</a> — the build-along app
- <a href="https://www.meetup.com/alamo-python/events/314864036/" target="_blank" rel="noopener">The event on Meetup</a>
