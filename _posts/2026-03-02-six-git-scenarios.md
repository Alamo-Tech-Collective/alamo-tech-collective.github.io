---
layout: post
title: "Six Git Scenarios Every Collaborative Project Will Hit: And How to Handle Them"
date: 2026-03-02
categories: [developer-tools, open-source]
author: Alamo Tech Collective
---

Someone pushed a half-finished route filter to `main` the night before a contributor demo. SATrack broke. The map wouldn't render. Nobody knew whose commit did it, and three people were pointing at each other over Slack.

This wasn't a Git skills problem. Everyone on the team knew how to commit. It was a workflow problem, and it's the kind of thing that quietly kills open-source projects before they ever find their footing.

Here's what the team learned.

---

## Meet SATrack

SATrack is a fictional (but completely plausible) open-source project: a real-time VIA Metropolitan Transit tracker for San Antonio. It pulls live bus and route data from VIA's public API and displays it on an interactive map; think a community-built alternative to checking the VIA app.

A handful of devs started it. A few more contributors found it on GitHub and opened PRs. It's async, volunteer-driven, and built on nights and weekends, exactly the kind of project that ends up on the [ATC GitHub](https://github.com/orgs/Alamo-Tech-Collective/).

These are the six scenarios SATrack hit, in roughly the order they happened.

---

## Scenario 1: "We all just committed to main"

**What happened:** Early days. Three contributors, no agreed workflow. Everyone cloned the repo and pushed directly to `main`. It worked fine until it didn't, two people edited the same file on the same afternoon, and the merge conflict took longer to resolve than the actual features.

**What they did:** Adopted [GitHub Flow](https://docs.github.com/en/get-started/using-github/github-flow). The rules are simple: `main` is always deployable, all work happens on short-lived feature branches, and nothing merges without a pull request.

```bash
# Start every piece of work like this
git checkout -b feature/add-route-filter

# When it's ready
git push origin feature/add-route-filter
# Open a PR → get a review → merge → delete the branch
```

<br>
**The lesson:** You don't need Gitflow. You don't need a complicated branching strategy. You need one rule everyone actually follows. For most small collaborative projects, GitHub Flow is that rule. It's lightweight enough that it doesn't get ignored, and strict enough that it prevents the worst problems.

---

## Scenario 2: A contributor built an entire feature on the wrong branch

**What happened:** A contributor sat down at Open Source Night, cloned the repo, and spent two hours building a stop search feature. Good work, clean code, except they'd forgotten to create a feature branch first. Everything was sitting on `main`, locally, uncommitted and unsaved to the remote. One `git pull` away from a conflict with everyone else's work.

**What they did:** Two options depending on the situation.

**Option 1 — Work is uncommitted: use `git stash`**

If the changes haven't been committed yet, `git stash` is the cleanest escape hatch:

```bash
# Stash all uncommitted changes
git stash

# Create the correct branch
git checkout -b feature/stop-search

# Pop the stashed changes onto the new branch
git stash pop
```
<br>

Done. The work is exactly where it should be, and `main` is untouched.

**Option 2 — Work has already been committed: use `git cherry-pick`**

If the contributor already committed to `main`, `git cherry-pick` lets you copy specific commits onto the correct branch:

```bash
# Grab the commit hash(es) you need to move
git log --oneline

# Create and switch to the correct branch
git checkout -b feature/stop-search

# Cherry-pick the commit(s) by hash
git cherry-pick a3f2c19

# Go back to main and reset before the commit
git checkout main
git reset --hard origin/main
```
<br>

**The lesson:** Neither of these is a crisis, that's the point. Git gives you the tools to recover cleanly from workflow mistakes without losing work. `git stash` is your "hold on, wrong branch" button. `git cherry-pick` is your "let me move just that commit" button. Know both, use them without panic.

---

## Scenario 3: A big feature takes six weeks to build

**What happened:** Real-time service alerts were a significant feature; new API integration, new UI components, state management changes. The branch lived for six weeks. By the time it was ready to merge, it had diverged so far from `main` that integrating it was a multi-day project.

**What they did:** Introduced feature flags. The concept is simple: merge your incomplete code behind a flag that turns it off in production. You keep shipping to `main` regularly, the incomplete feature stays hidden, and you never end up with a six-week-old branch again.

```javascript
// config/features.js
export const FEATURES = {
  realtimeAlerts: process.env.FEATURE_REALTIME_ALERTS === true
};

// In the component
import { FEATURES } from '../config/features';

if (FEATURES.realtimeAlerts) {
  // Render the alerts panel
}
```
<br>

Set `FEATURE_REALTIME_ALERTS=false` in production, `true` in development. Merge early, often, and safely.

**The lesson:** Long-lived branches are a symptom, not a strategy. If a feature is going to take more than a week or two, figure out how to ship it incrementally. Feature flags are one way. Vertical slices (ship the API, then the UI, then the state layer) are another.

---

## Scenario 4: Something broke in production and nobody knows when

**What happened:** A bug appeared in the map clustering logic. Stops were grouping incorrectly at certain zoom levels. Nobody introduced this intentionally, it was a side effect of a refactor. Nobody knew which commit caused it, and the git log had 40+ commits since the last known-good state.

**What they did:** Two options depending on how much you know going in.

**Option 1 — You know which file is involved: use `git blame`**

When the bug is traceable to a specific file, `git blame` annotates every line with the commit hash, author, and date that last touched it. No searching required.

```bash
# See who last changed each line in the file
git blame src/components/MapClustering.js

# Output looks like this:
# e9d1a83 (Dana Rivera  2026-01-14 22:31:05) const clusterRadius = getZoomRadius(zoom);
# 7bd84e2 (Marcus Webb  2026-02-02 19:45:12) if (stops.length > threshold) {

# Once you spot the suspicious commit, inspect it
git show 7bd84e2
```
<br>

If the clustering logic looks wrong and you can eyeball which lines changed, `git blame` takes you straight to the culprit in one step. `git show` tells you everything that changed in that commit.

**Option 2 — You have no idea where to look: use `git bisect`**

When the bug could be anywhere and you have no clear starting point, `git bisect` performs a binary search through your commit history and lets you zero in on the culprit without reading a single line of code.

```bash
# Start the bisect session
git bisect start

# Tell Git the current state is bad
git bisect bad

# Tell Git a known-good commit (check git log --oneline or a previous release tag)
git bisect good e9d1a83

# Git will now checkout a commit in the middle
# Test it. Is the bug present?
git bisect bad   # yes, bug is here
# or
git bisect good  # no, bug isn't here

# Repeat until Git identifies the exact culprit commit
# When done, reset back to your original branch
git bisect reset
```
<br>

Git performs a binary search through your commit history. For 40 commits, that's about six tests to find the exact commit that introduced the bug. For 1,000 commits, it's ten.

**The lesson:** `git blame` when you know the file. `git bisect` when you don't. But here's the part that actually matters with `git blame`, the goal isn't to assign fault, it's to find the right person to fix it with. When `git blame` points to a commit, it points to a developer who understands exactly why that code was written that way. That context is valuable. Dana didn't break the clustering logic on purpose; she refactored it based on what she knew at the time. When Marcus found the bug, he didn't open a Slack thread asking why Dana broke production. He opened `git show`, understood what changed, and tagged her in the PR with a question. They fixed it in an afternoon. That's the workflow. Use `git blame` to find context, not to point fingers.

---

## Scenario 5: A hotfix is needed mid-release

**What happened:** The team was polishing a `v1.2` release (testing, minor tweaks, and docs), when a contributor spotted an exposed API key in the codebase. It had been committed two PRs ago and was now in `main`. It needed to come out immediately, but the release branch couldn't be destabilized.

**What they did:** The one Gitflow concept worth knowing: the hotfix branch.

```bash
# Branch from main (the deployed version)
git checkout main
git checkout -b hotfix/remove-exposed-api-key

# Make the fix
git add .
git commit -m "fix: remove hardcoded API key, move to env var"

# Merge into main
git checkout main
git merge hotfix/remove-exposed-api-key

# Also merge into the release branch so it ships with v1.2
git checkout release/v1.2
git merge hotfix/remove-exposed-api-key

# Tag it
git tag -a v1.1.1 -m "Hotfix: remove exposed API key"

# Clean up
git branch -d hotfix/remove-exposed-api-key
```
<br>

You don't need to adopt all of Gitflow to use the hotfix pattern. It solves one specific problem, patching production without disrupting in-progress work, and it solves it cleanly.

---

## Scenario 6: A new contributor clones the repo and has no idea what's going on

**What happened:** Someone showed up to Open Source Night, found SATrack, thought it was a cool project, cloned it, and opened the repo in their editor. Twenty minutes later they were still trying to figure out where to start, what the branch naming convention was, whether PRs needed two reviewers or one, and what "in progress" meant on the project board.

They didn't submit a PR. They moved on to something else.

**What they did:** Added three things that should have existed from day one.

**Branch naming convention** (in `CONTRIBUTING.md`):
```
feature/  → new functionality
fix/      → bug fixes  
docs/     → documentation only
chore/    → maintenance, deps, tooling
hotfix/   → critical production fixes

Examples:
feature/add-route-filter
fix/map-clustering-zoom-bug
docs/update-contributing-guide
```
<br>

**PR template** (`.github/pull_request_template.md`):
```markdown
## What does this PR do?

## How to test it

## Related issue (if any)

## Checklist
- [ ] Tested locally
- [ ] No console errors
- [ ] Branch is up to date with main
```
<br>

**A `CONTRIBUTING.md`** that covers: how to set up the dev environment, the branching convention, how to open a PR, and what "ready for review" means.

**The lesson:** Documentation isn't busywork. It's the difference between a project that stays at three contributors forever and one that actually grows. If someone can clone your repo and be productive in 20 minutes, you've done it right. If they can't, you're going to keep losing contributors at the exact moment they're most interested.

---

## TL;DR

| Scenario | Fix |
|----------|-----|
| Everyone committing to main | Adopt GitHub Flow — branch, PR, merge, done |
| Built on the wrong branch | Uncommitted? `git stash`. Already committed? `git cherry-pick` |
| Long-running feature branches | Feature flags + merge early and often |
| Mystery regression | `git bisect` — binary search your commit history |
| Hotfix needed mid-release | Hotfix branch from main, merge to both main and release |
| New contributors bouncing | CONTRIBUTING.md + PR template + branch naming conventions |

---
## Come Build With Us

SATrack is fictional. The problems are not.

If you're working on an open-source project, or looking for one to contribute to, the [ATC GitHub](https://github.com/orgs/Alamo-Tech-Collective/) has real community projects including [SATX-Data](https://alamotechcollective.com/community/open-source/civic-tech/2025/08/11/satx-data-dashboard-open-source-crime-analytics-san-antonio/) (San Antonio public safety dashboard) and [River City Resources](https://alamotechcollective.com/community/accessibility/open-source/2025/08/01/building-bridges-through-code-river-city-resources/) (disability services platform).

Better yet, come to **Open Source Night**, every third Thursday at the Alamo Tech Collective, 10200 San Pedro Ave. Bring your project, bring your problems, bring your laptop. Real devs, real code, real tacos.

Check the [Meetup page](https://www.meetup.com/alamotechcollective/) for the next date and RSVP.

---
*Further reading: [Git bisect docs](https://git-scm.com/docs/git-bisect) · [GitHub's CONTRIBUTING.md guide](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/setting-guidelines-for-repository-contributors) · [ATC GitHub](https://github.com/orgs/Alamo-Tech-Collective/)*
