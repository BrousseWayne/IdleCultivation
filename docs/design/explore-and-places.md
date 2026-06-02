---
purpose: The Explore tab as the "live" location hub — places, navigation, place-scoped activities, contextual actions (talk/shop/enter), and the time/reward rule that prevents free-action exploits.
status: in-progress (first slice building)
last-verified: 2026-06-02
related: [docs/design/core-loop.md, docs/design/survival-and-lifestyle.md]
---

## What Explore is

- Explore is the **live "you are here" tab**. It renders: a small city graph (clickable place nodes + connections), the current place's name/description and time-of-day, a **Here** list of contextual actions (talk/shop/enter), and a **What you can do here** list of the place's activities. The persistent narrative stream ("the thread") hosts the running log.
- This is where the mortal-phase game is *played*: beg in the streets, speak to someone, step into a shop. Content is bound to where you physically are, not a global menu.
- Self-scoped activities (meditate/train/study — `scope: "self"`) are NOT shown here; they live in the Activities tab. Explore = place activities + contextual actions + walking.
- The mortal phase is one city (Ironveil). No inter-region Travel yet (that tab is hidden).

## The time/reward rule (design law — prevents exploits)

The core tension: navigation must be free (entering a shop 100k times can't cost 100k hours — that would be unplayable), but free + repeatable + rewarding = infinite-farm exploit. Resolution:

- **Navigation is free and grants nothing.** Walking to a place, entering a shop, opening a dialogue costs no time and gives no reward by itself. It only changes what you're looking at. Spammable with zero consequence.
- **Activities cost time.** Queued, tick-consuming (the existing activity/queue system). Reward scales with time spent. Not exploitable — time is the hard limiter.
- **Rewards are gated or costed.** Anything that grants must be one of:
  - time-costed (activities),
  - coin-costed (shop purchases — self-limiting),
  - one-shot / condition-gated (events fire once or once-per-rearmed-trigger, never freely repeatable).
- Restated: **free ⇒ no reward; reward ⇒ gated or costed.** This makes the farm exploit structurally impossible.

## Model (fresh, replaces the abandoned cosmic-map LocationEntry scaffold)

- A **Place** is a node in the city: `{ key, name, description, activityKeys[], actions?, connections[], unlocked, x, y, icon, color }` (`types/domain.ts`, data in `data/places.ts`). `x`/`y`/`icon`/`color` drive the city-graph node; `connections` are free-navigation edges to adjacent places.
- `activityKeys` reference the single source of truth (`activityData`); placement is a layer over activities, NOT a copy (effect system stays intact). Only `unlocked` activities render.
- `actions?: PlaceAction[]` are the place's contextual verbs (see below).
- Current place lives in `gameStore.currentPlaceKey`; walking sets it.

## Contextual actions (verbs)

- A **PlaceAction** is `{ key, label, detail, icon, kind }` where `kind ∈ "talk" | "shop" | "enter"` (`types/domain.ts`). Kind only drives color today: talk → violet, shop → gold, enter → sky.
- They render in the Explore **Here** section as free buttons. Per the time/reward law, an action is pure navigation: clicking it costs nothing and grants nothing.
- **Current behavior is a stub.** `doAction` only narrates to the stream (talk → `dialogue` theme, else `ambient`). This is the deliberate plug point for the event/shop/dialogue systems — they will hang off the action click without changing the Place model.
- Ironveil today: a `talk` action (the ragged elder) on the streets, a `shop` action (food stall) at the market.

## Deferred (not in first slice)

- Events (gated, reward-bearing interrupts) — needs the event system. The `talk`/`enter` actions are the trigger surface.
- Shop view (coin-costed purchases) — needs item pricing. The `shop` action (food stall) is the entry point.
- Sleep hours / lifestyle first-night trigger — see survival-and-lifestyle.md.
- The old mock had shop/conversation/combat sub-views (exploreView switch) — all mock (addEventLog only). Recovered for reference at commit 8302c41; not reused directly.
