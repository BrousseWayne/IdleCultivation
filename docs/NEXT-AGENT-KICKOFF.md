# Kickoff — Next Agent (2026-07-18)

You are picking up an in-progress **passion project** — a solo dev's dream game. No deadline, no money pressure, and one non-negotiable: **quality is the goal, and nothing gets sacrificed from it. Ever.** Not for speed, not for convenience, not to "ship". The human building this wants to *play this game themselves* — they are its first and most demanding player. Every shortcut you're tempted to take, they will feel in their own hands later.

The bar is **craft**: the perfection of the project, not development velocity. The previous collaborators held a specific balance: invest heavily in foundations that pay for content, refuse architecture for its own sake. Match that balance.

This document gives you a factual map and a mandate. It deliberately does **not** hand you the previous pair's design conclusions about the open work — that part is yours to form with fresh eyes. Where this doc states a *fact*, trust it but verify. Where it gestures at *what's next*, treat it as a question, not an answer.

One meta-fact that shapes everything: **this game has no assets — no art, no music, no physics. The code IS the game.** Adding content means writing typed data; the compiler is the level editor. Code quality is game quality, directly.

---

## Part 1 — What the project is (brief)

An incremental / idle **xianxia cultivation life-sim**. One run = one life; death → reincarnation = prestige. The deeper thesis (read `docs/vision/identity.md`): three nested games — a life-sim, a cultivation simulator, and **a game about understanding itself**, where every prestige grants comprehension rather than just multipliers, and the player continuously reinterprets earlier experiences. Currently only the **mortal phase** exists — one city (Ironveil), a poor kid, no qi yet. Endgame ambition is Antimatter-Dimensions-scale: billions of simulated years, absurd magnitudes (see the ENGINE CONSTRAINT in `docs/design/core-loop.md`).

Stack: React 19 + Vite + Zustand + react-router 7 + Tailwind 4 + TypeScript (strict) + vitest. No backend; save = localStorage.

The docs under `docs/` are a maintained, verified-against-code knowledge base — **read all of it before touching anything**:

- `docs/vision/` — the soul: identity, three layers, the reinterpretation pillar
- `docs/design/` — core-loop (incl. all DECIDED pacing/event records), realms, events philosophy, explore-and-places, survival-and-lifestyle (unbuilt intent), scaling (unbuilt math), ui-ux (the full visual standard), roadmap (historical)
- `docs/architecture/` — architecture (the WIRED truth) + conventions (incl. working-style rules)
- `docs/meta-design/` — the parked fourth-wall layer + its 2026-07 refinements (Dao Observation, causes, soul temperaments)
- `prompts/` — claude.ai generation prompts (event batch, first-run interview), kept in sync with the real schema

Docs flag INTENDED vs CURRENT-REALITY vs DECIDED. They were accurate on 2026-07-18; the code may have moved — **distrust any claim you can't confirm in source.**

---

## Part 2 — Where things stand (facts, verify them)

Wired and verified as of this writing:

- **Chrome**: horizontal tabs, Self card right rail, Thread drawer (bottom ticker; the stage for narrative events), 24h day-track queue bar, ink-stone neutral palette, calligraphic glyph iconography (文/工/武/…), copper wen currency.
- **Unlock pipeline**: single `unlockStore`, `allUnlockables()` derived from content, idempotent `applyUnlock` with stream announcements, category gating live, conditions authored via the `when` grammar.
- **Narrative events**: four kinds (interrupt/dialogue/ambient/activityOutcome), recurrence bookkeeping, clock pauses while an event holds the stage, plays in the Thread drawer. Content: ONE placeholder dialogue — the ~20-event generation batch (prompts ready) has not been run yet.
- **Typed content foundations**: `define*` helpers with derived key unions (`ActivityKey`, `PlaceKey`…), self-referential `defineEvent` step graphs (entry/goto compile-checked), readonly content types, named unions, zero classes (one sanctioned exception: `ErrorBoundary`), seeded deterministic RNG, canonical time module, declarative persistence manifest (drives both SaveManager and reincarnation), dev-boot content validator.
- **Tooling**: `npm test` (12 simulation tests that play whole lives headlessly in ~1s), `npm run simulate -- --days=N --policy=income|training` (balancing curves), `npm run check:content`. A puppeteer-core scratchpad pattern was used for browser e2e (scripts not committed).
- **Decisions on record** (see DECIDED markers in core-loop.md): 1 day = 1s at ×1, no day/night cycle, 60-day abstract year, interactive events pause the clock, no routine-acceleration for now, copper currency.

Known-open (also verify): **no meta-state — reincarnation wipes everything**; economy has no ceiling (simulate shows millions of copper by age 17) and no sink beyond a 5-copper food stall; survival/lifestyle runtime unbuilt; stats have no consumer; Quests/Lifestyle tabs are empty scaffolds; background is always "orphan" (the intro interview is parked); no offline progress.

---

## Part 3 — The exploration mandate (do this first, thoroughly)

**Do not start building. Do not propose solutions yet.** Your first job is to understand this project — code AND design — more deeply than the people who wrote it, and to form your *own* independent read of its state and tensions. This is the part where laziness shows. Resist it.

### Code exploration

1. **Read the whole `src/` tree, not a sample.** Every store, service, the engine, every page, data file, type. Trace at least four full flows end-to-end by reading actual code:
   - a game tick → systems in order → what they mutate
   - queuing an activity → completion → effects, income log, XP, level payout
   - a narrative event → eligibility → fire → Thread stage → choice → resolution → clock resume
   - save → load → boot (including the persistence manifest, v1 migration, RNG state)
   If you can't draw the flows from memory after, you haven't read enough.
2. **Find the load-bearing walls.** Stores never import each other; the engine/services orchestrate; content is data authored through typed helpers; everything run-scoped goes through the persistence manifest; all randomness goes through `rng`. Confirm these by observation. A good sign you understand: you can predict where a feature *should* live without being told.
3. **Use the instruments.** Run `npm test`, `npm run simulate` under both policies, `npm run check:content`. Read the simulation suite — it encodes the invariants the previous pair considered load-bearing. Break something on purpose locally and watch what catches it.
4. **Play it.** `npm run dev`, actually click through a life as a player. Speak to the elder. Buy from the food stall. Watch a day bar cycle. Die if you have the patience (48 min — or `npm run simulate` for the fast version). Note what feels alive, hollow, confusing, missing. The code-read and the play-through will disagree in useful ways.

### Design exploration

5. **Read the entire docs corpus critically, in this order**: `vision/identity.md` → `design/core-loop.md` → `design/events.md` + `design/realms.md` → `meta-design/meta-design.md` → the rest. These aren't documentation of code; they're the design's soul, including layers that won't be built for months. Understand the three-layers thesis and the reinterpretation pillar well enough to explain them in your own words.
6. **Separate intent / decision / reality yourself.** For each system: what do the docs *intend*, what has been *decided* (DECIDED markers are settled — don't relitigate without new evidence), what does the code *do*? Build your own gap list. Don't inherit anyone's list — make yours, then compare.
7. **Pressure-test the design against the ambition.** The endgame is billions of years and AD-scale numbers; the mortal phase must feel like a grounded wuxia life. Where do current systems fight either ambition? Where does the pacing (1s days) strain? What would the first meta-state layer honestly need to be?
8. **Form hypotheses, hold them loosely.** Keep a running notes file with competing theories and confidence levels. Update it. Self-critique.

**Output of this phase**: a written, structured map — flows, state model, design intent vs reality, your own honest list of tensions and open questions, with confidence levels. Present it BEFORE proposing any work. If it felt quick, you skimmed.

---

## Part 4 — The open threads (questions, not directives)

Pressure-test these; some may be mis-scoped or out of order. Say so if you think so.

- **The event content batch.** The generation prompt (`prompts/claude-ai-event-generation.md`) is ready and schema-synced; the human runs it on claude.ai. Your side: integrating the output, wiring whatever its Proposed Extensions Register asks for, and keeping the anti-farm laws honest. Open question: is the runtime missing anything the batch will need on day one?
- **Survival / lifestyle runtime.** The designed next system (`design/survival-and-lifestyle.md`): satiety drain, upkeep tiers, the first real coin sink, first-night onboarding (which is an *event*, day-1 triggered — the systems meet here). Open question: smallest honest version, and does the doc's framing survive contact with the wired event system?
- **Scaling / balance session.** `design/scaling.md` is pure intent; `npm run simulate` gives evidence (economy is uncapped). This is a *design dialogue with the human*, fed by simulation runs — not a solo tuning exercise.
- **Meta-state.** The central promise (next life shaped by the last) is still unbuilt. The docs now contain rich intent (information prestige, causes, incarnation choice, calendar knowledge). Open question: what's the honest first slice, and does it want the event-sourcing direction the pair once discussed (see conversation-archaeology note below) or something simpler?
- **Remaining frictions** (from an earlier audit, partially resolved): stats consume nothing, empty scaffold tabs, always-orphan background (the parked intro interview + `prompts/claude-ai-first-run-interview.md`), no offline progress, Recap/calendar oddities (a 2-month year).

---

## Part 5 — Working agreement

- **The human dialogues in French**, decides fast, point-by-point, and enjoys the craft ("se faire plaisir" on code quality is explicitly welcome; string-parsing DSLs and speculative architecture are explicitly not). Design decisions are made in conversation sessions and recorded in docs with DECIDED markers.
- **Investigate before answering.** Read files before claiming things about them.
- **Keep it green.** `npm run typecheck`, `lint`, `build`, `test`, `check:content` all pass before claiming done. Verify UI changes in a real browser (the puppeteer-core scratchpad pattern works well). Commit per milestone; **no Co-Authored-By trailer**.
- **Hold the code conventions** (`docs/architecture/conventions.md`): no classes, no `Math.random()` in game logic, full-word naming (no abbreviations), content through `define*` + `when`, new stores registered in the persistence manifest, comments only where they state a constraint the code can't show — match existing density.
- **Docs move with the code.** Every refactor or decision lands in the relevant doc the same session. The docs' credibility is a feature of this project.
- **Surface disagreement plainly.** Fresh eyes are the point. But distinguish "I found evidence this is wrong" from "I would have done it differently" — the first is gold, the second needs a strong case against a settled decision.

`src/ui/proto/` (routes `/proto/*`) and `_parked/` are reference/archive, not active code. The raw vision notes that fed the current docs are archived at `../IdleCultivationFront-archive/`.

Start with Part 3. Go deep.
