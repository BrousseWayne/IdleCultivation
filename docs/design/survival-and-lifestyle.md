---
purpose: The mortal-phase survival loop — satiety, rest, lifestyle upkeep, and how they double as hidden progression boosts. Captures design intent ahead of implementation.
status: planned (not yet implemented)
last-verified: 2026-07-19
related: [docs/design/core-loop.md, docs/design/ui-ux.md, docs/vision/identity.md]
---

## Key facts (intent)

- DECIDED (2026-07-19): EATING IS A LIFESTYLE OPTION, NOT AN ACTION. The player picks a standing **diet tier** in Lifestyle. Each in-game period, if the diet's upkeep is affordable it is paid **automatically** and satiety holds; if it is not, satiety **drains**. Eating therefore costs coin but **zero time**, is never a place you travel to, and is never a manual click — it is a passive consequence of the chosen diet and available coin. (The current place-bound "food stall" is a throwaway placeholder; a real economy has diet upkeep against a simple merchant, not an Explore errand.)
- SURVIVAL IS UPKEEP, NOT A CHORE. At gameSpeed 1, one day ≈ 1 real second, so anything "per day" cannot be a manual click. Satiety/rest drain slowly; the player offsets them by standing **lifestyle choices** (a diet tier, a sleep/lodging tier), not by repeated actions. Pressure is economic (income vs upkeep), not micro-management.
- LIFESTYLE = UPKEEP + BOOST. Each diet/lodging tier costs recurring coin AND modifies run output. Examples (illustrative): "scraps" = cheap, minimal/with-penalty; "decent meal" = costs more, boosts activity xp gain. Sleep tier similar. The tiers are the first real coin **sink** in the game.
- EFFECTS ARE HIDDEN AT FIRST. A mortal has no data on themselves. Tier effects are written nowhere in the UI initially; as the player progresses and unveils UI (cultivation perception), the numbers/effects become visible. Same progressive-revelation principle as the rest of the UI.
- BARS ARE QUALITATIVE, NOT NUMERIC, AT FIRST. Satiety and vitality (HP) show as words — e.g. "faint / … / full" — not `x/100`. Numeric self-knowledge is a later cultivation unlock. Applies to HP too: a mortal cannot read their own vitality as a number.
- FOREGO IS ALLOWED, AND COSTS. The player may skip meals/sleep. Consequences: amplifies **mortality** (the bar that lets time kill the player — currently starts at 1), and reduces activity xp / output. Foregoing sleep is the riskier of the two.
- MORTALITY IS THE TIME-KILL VECTOR. Distinct from lifespan-based aging death. Neglecting upkeep raises mortality; high mortality is how a run ends early (mechanism TBD — drain, death-rolls, or threshold).
- FIRST-NIGHT ONBOARDING. Survival systems are introduced diegetically: the player arrives with nothing to do but Beg; night falls; hunger + sleepiness fire an event that opens the lifestyle table (diet + lodging choice) for the first time. The meters exist to motivate that event, then settle into passive upkeep. (Note — pacing decision 2026-07: there is no clock-level day/night; "night falls" is narrative framing for a day-1 event trigger, not a time-of-day mechanic.)

## Day structure (intent)

- A day is NOT 24 freely-usable hours. Some hours are **sleep** and unavailable for activities. Usable hours < 24.
- The player MAY forego sleep to reclaim those hours, at a cost (mortality / reduced output).
- Current code: a day is 24 schedulable hours, no sleep reservation; the schedule replays each dawn (see core-loop). Free hours = `24 − scheduledHours(queue)`. Unscheduled hours already sit idle — that idle block is the natural home for sleep, but no sleep reservation/mechanic exists yet.

## Status vs code

- NOT IMPLEMENTED. satiety/vitality/mortality bars exist in `cultivatorStore` but nothing drains or reads them; no lifestyle data (`lifestyle.ts` is empty); no event system. The day cycle and daily-replaying schedule now exist (core-loop), but the day is still a flat 24h with no sleep carved out. This doc is design intent to build against, not current behavior.
- Depends on: an event/interrupt system (does not exist), the lifestyle data+cost wiring (data types exist, empty), and qualitative-bar UI.
