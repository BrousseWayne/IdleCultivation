---
purpose: The Explore tab as the "live" location hub — places, navigation, place-scoped activities, contextual actions (talk/shop/enter), and the time/reward rule that prevents free-action exploits.
status: in-progress (first slice building)
last-verified: 2026-07-18
related: [docs/design/core-loop.md, docs/design/survival-and-lifestyle.md]
---

## What Explore is

- Explore is the **live "you are here" tab**. It renders: a small city graph (clickable place nodes + connections), the current place's name/description, a **Here** list of contextual actions (talk/shop/enter), and a **What you can do here** list of the place's activities. The persistent narrative stream ("the thread") hosts the running log.
- DECIDED (pacing session, 2026-07): there is **no day/night cycle** and no time-of-day mechanic or display. At 1 day = 1 real second the cycle is unreadable and gates nothing; "night" survives only as narrative flavor in event text, never as a clock state.
- This is where the mortal-phase game is *played*: beg in the streets, speak to someone, step into a shop. Content is bound to where you physically are, not a global menu.
- Self-scoped activities (meditate/train/study — `scope: "self"`) are NOT shown here; they live in the Activities tab. Explore = place activities + contextual actions + walking.
- The mortal phase is one city (Ironveil). No inter-region Travel yet (that tab is hidden).
- INTENDED — the mortal world beyond: Imperial Capital → Great Sect Territories → Merchant Cities → Frontier Lands → **Ironveil**. Ironveil is not the biggest place; it is the origin point of the reincarnation lineage — the place where the soul first learned to perceive reality (see core-loop.md, "Root Realm"). Later incarnations may start elsewhere; Ironveil keeps its weight regardless.

## The time/reward rule (design law — prevents exploits)

The core tension: navigation must be free (entering a shop 100k times can't cost 100k hours — that would be unplayable), but free + repeatable + rewarding = infinite-farm exploit. Resolution:

- **Navigation is free and grants nothing.** Walking to a place, entering a shop, opening a dialogue costs no time and gives no reward by itself. It only changes what you're looking at. Spammable with zero consequence.
- WIRED: place actions may carry `effects: Effect[]` (resolved through `performPlaceAction` in `engine/gameLoop.ts`); any `spend_currency` in them doubles as the affordability gate, so a rewarding action is always coin-costed — the exploit rule holds (free actions grant nothing; granting actions cost). First live example: the Market Square food stall (spend 5).
- **Activities cost time.** Queued, tick-consuming (the existing activity/queue system). Reward scales with time spent. Not exploitable — time is the hard limiter.
- **Rewards are gated or costed.** Anything that grants must be one of:
  - time-costed (activities),
  - coin-costed (shop purchases — self-limiting),
  - one-shot / condition-gated (events fire once or once-per-rearmed-trigger, never freely repeatable).
- Restated: **free ⇒ no reward; reward ⇒ gated or costed.** This makes the farm exploit structurally impossible.

## Model (fresh, replaces the abandoned cosmic-map LocationEntry scaffold)

- A **Place** is a node in the city: `{ key, name, description, activityKeys[], actions?, connections[], unlocked, unlockConditions?, x, y, glyph, color }` (`types/domain.ts`, data in `data/places.ts`). `x`/`y`/`glyph`/`color` drive the city-graph node; `connections` are free-navigation edges; places are part of the unlock pipeline (discoverable via conditions).
- `activityKeys` reference the single source of truth (`activityData`); placement is a layer over activities, NOT a copy (effect system stays intact). Only `unlocked` activities render.
- `actions?: PlaceAction[]` are the place's contextual verbs (see below).
- Current place lives in `gameStore.currentPlaceKey`; walking sets it.

## Contextual actions (verbs)

- A **PlaceAction** is `{ key, label, detail, glyph, kind, effects? }` where `kind ∈ "talk" | "shop" | "enter"` (`types/domain.ts`). Kind drives color: talk → violet, shop → gold, enter → sky.
- They render in the Explore **Here** section as free buttons. Per the time/reward law, an action is pure navigation: clicking it costs nothing and grants nothing.
- WIRED: clicking an action first offers it to the event system (`openDialogueFor` — a bound dialogue event takes the stage in the Thread drawer); otherwise its `effects` resolve (coin-gated); otherwise it just narrates. The Place model needed no change.
- Ironveil today: a `talk` action (the ragged elder) on the streets, a `shop` action (food stall) at the market.

## Deferred (not in first slice)

- ~~Events~~ — WIRED (see architecture.md + design/events.md). The `talk`/`enter` actions are the trigger surface, as planned.
- Shop view (coin-costed purchases) — needs item pricing. The `shop` action (food stall) is the entry point.
- Sleep hours / lifestyle first-night trigger — see survival-and-lifestyle.md.
- The old mock had shop/conversation/combat sub-views (exploreView switch) — all mock (addEventLog only). Recovered for reference at commit 8302c41; not reused directly.
