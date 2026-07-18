---
purpose: Event design philosophy — events as nodes in a causal graph, invisible gates, layers of perception, and the archetype-first authoring method. Complements the WIRED runtime in architecture.md.
status: active (runtime wired; the causal/perception layers are design intent)
last-verified: 2026-07-18
related: [docs/architecture/architecture.md, docs/design/core-loop.md, docs/meta-design/meta-design.md, prompts/claude-ai-event-generation.md]
---

## Key facts

- WIRED today: the four-kind event runtime (interrupt / dialogue / ambient / activityOutcome), authored via `defineEvent()`, playing in the Thread drawer with clock pause. See `architecture.md`. Batch one (the claude.ai generation) is deliberately **standalone events** — no cross-event chains yet.
- DECIDED (2026-07-18): the `training` activity category has no condition-based unlock — **a batch-one event opens it** (`unlock_category`), staged as the player's first deliberate step onto the martial road. The prompt (§1) instructs the batch accordingly.
- DECIDED (2026-07-18): the batch is imported only AFTER a scaling session re-bases the economy — activity amounts today (beg 100/8h) dwarf the COIN magnitude table the batch is written against; importing first would make every event payload noise. See scaling.md.
- INTENDED: events are not isolated content — they are **nodes in the world's causal network**. An important choice may unlock future events, silently close branches, change NPC behavior, alter places, modify future prestige layers, or lie dormant for dozens of hours before paying off. The player rarely knows when this happens.
- INTENDED: **hidden Causes**, not quest flags. Internal, never-shown markers (`showedMercy`, `covetedProfit`, `watchedTheSky`, `learnedNames`, `acceptedCharity`, `buriedTheDead`, `keptWorthlessStone`, `owedFavor`, …) that future events quietly check. The player only ever observes consequences — the xianxia concept of 因果 (cause and effect) unfolding across lifetimes.
- INTENDED: **invisible gates**. The best gate never announces itself. No "branch locked" notification — the *absence* of a storyline is itself meaningful (see The Broken Bowl below).
- LAW: avoid the obvious twist. The beggar does not have to secretly be the strongest immortal (expected trope). Consequences should mostly flow through ordinary human connections — someone saw your kindness, someone's life changed — which makes the world feel alive rather than boobytrapped with secret identities.
- INTENDED: some hidden branches require near-impossible combinations (ignored the young master + exactly one month in the mines + never begged + died before adulthood…). Individually undiscoverable; communities map the graph over time — deliberate mythology-building.
- INTENDED: **multi-layer causality** — event conditions eventually read the current life, previous lives, previous prestiges, highest realm reached, reincarnation count, cosmic alignment… The graph becomes multidimensional, not just branching.
- METHOD: build the **event architecture, not a thousand events** — the real ambition is "a machine that writes different cultivation stories", not an encyclopedia. Author *archetypes* whose meaning deepens with perception; a future "Mortal World Event Bible" (Ironveil as root city, other regions, event families, hidden future meanings, karma interactions, what changes after reincarnation) is the planned next content document.
- The proposed **generative event schema** (the shape that machine produces, once the causal/karma layers exist): a `Context` (realm, location, current Dao tendency, karma profile, previous choices, luck) feeds a `Question` (a temptation, an opportunity, or a crisis), which yields a `Resolution` with three time horizons — `immediate consequence`, `delayed consequence`, and `future-life echo`. Every event is then a node in a cultivation-novel generator; the player isn't following a novel, they're cultivating their own. (Batch one is hand-authored standalone events — this generative layer is later.)
- PRINCIPLE — **layers of perception**: the same event reads differently at each realm. A mortal sees an old man / a broken jade / a locked door; a martial artist sees a test / an artifact / a formation; a cultivator sees a karmic encounter / a heavenly relic / an inheritance; an immortal sees a deliberate arrangement by fate. Content is not unlocked — *eyes are*.
- PRINCIPLE — events should occasionally reward the *inefficient* choice (the player who spent years on medicine instead of martial arts hears, much later: "Your foundation is unusual"). Optimization must never be the only valid way to play.

## Events do five jobs at once

An event must be small when it happens and enormous in hindsight. Each one should: (1) teach mechanics without tutorials, (2) reveal the world, (3) create choices with long consequences, (4) feed hidden causes, (5) plant future regret. An event is a seed planted in the player's first life that may only bloom hundreds of hours later — that is the part worth protecting.

## Reference archetypes (mortal phase)

- **The Old Man by the Road** — help / ignore / mock a beggar; nothing visible happens. Much later: he was testing for spiritual roots. The player's *instinct* mattered, not the optimal choice.
- **The Broken Bowl** (the invisible-gate exemplar) — share bread or don't. Thirty in-game years later, either a messenger arrives ("Someone remembers your face") or someone remarks that Senior Cloudwalker took no disciple this century — and the player never learns why.
- **The Strange Red Square** — a choice button contains the unlabeled strength glyph before the player can read stats. When the stat panel later unlocks, they realize the square was always strength: only perception changed.
- **The Locked Room in Ironveil** — a sealed door most players ignore; after a martial breakthrough the same house reveals a formation. Eyes were unlocked, not content.
- **The Merchant's Broken Jade** — an overpriced "worthless" trinket; lives later, an immortal gasps at what the player once held (or didn't buy).
- **The First Death** — must not feel like failure: "Your soul approaches the river of reincarnation" with three options (Return / Remain / Observe), of which only Return works at first. The other two are promises.
- **The Child Who Remembers You** — after several reincarnations: "Strange. I remember someone who looked exactly like you." The first crack — the world remembers.

## Runtime evolution this implies (not yet wired)

The current schema covers standalone events. The causal layer will need, in rough order: hidden cause markers (set by choices, checked by conditions — likely a `cause` condition type + `set_cause` effect over meta-persistent state), event conditions over previous-life history (depends on the meta-layer), and perception-layered text (same event key, realm-dependent step text). Each is an extension of the existing vocabularies, not a new system.
