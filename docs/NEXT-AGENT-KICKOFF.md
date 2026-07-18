# Kickoff — Next Agent

> **Status note (2026-07-18):** several Part 3 threads have landed since this was written — the narrative event system exists (Thread drawer, pause, `defineEvent`), place verbs carry effects, the unlock pipeline/content authoring is typed end-to-end (`define*` helpers, `when` grammar, boot validator), a simulation test suite + `npm run simulate` exist, currency is copper, and the chrome was redesigned (tabs / Self card / Thread drawer). Still true: no meta-state — reincarnation wipes everything. Trust `docs/architecture/architecture.md` over Part 3's factual claims; the exploration mandate (Part 2) still applies.

You are picking up an in-progress passion project. No deadline, no money pressure. The bar is **craft**: the previous collaborators cared about clean architecture, honest design, and not over-engineering. Match that.

This document gives you a factual map and a mandate. It deliberately does **not** hand you the previous pair's design conclusions about the open work — that part is yours to form with fresh eyes. Where this doc states a *fact about the code*, trust it but verify. Where it gestures at *what's next*, treat it as a question, not an answer.

---

## Part 1 — What the project is (brief)

An incremental / idle **xianxia cultivation life-sim**. One run = one life; death → reincarnation = prestige (intended; see caveats below). Currently only the **early "mortal" phase** is being built — one city, a poor kid, no qi yet.

Stack: React 19 + Vite + Zustand + react-router 7 + Tailwind 4 + TypeScript (strict). No backend. Save = localStorage.

The repo has a real docs set under `docs/` — **read it before touching anything**:
- `docs/vision/` — the soul / meta-design ambitions
- `docs/design/` — core-loop, scaling, ui-ux, roadmap, **explore-and-places.md**, **survival-and-lifestyle.md**
- `docs/architecture/` — architecture + conventions
- `docs/meta-design/` — a parked fourth-wall layer (intentionally out of scope right now)

Docs use a `key-facts` block + narrative, and flag INTENDED vs CURRENT-REALITY. They were verified against code at write time but the code has moved since — **distrust any doc claim you can't confirm in the source.**

---

## Part 2 — The exploration mandate (do this first, thoroughly)

**Do not start building. Do not propose solutions yet.** Your first job is to understand this codebase more deeply than the people who wrote it, and to form your *own* independent read of its state and its tensions.

This is the part where laziness shows. Resist it. Concretely:

1. **Read the whole `src/` tree, not a sample.** Every store, every service, the engine, every page, the data files, the types. Trace at least three full flows end-to-end by reading actual code:
   - a game tick → what systems run, in what order, what they mutate
   - queuing an activity → through to its effects landing on state and the log
   - load → boot → first render → what the player sees
   Write down the call chains. If you can't draw the flow from memory after, you haven't read enough.

2. **Separate intent from reality yourself.** For each system, answer: what does it *claim* to do (docs/naming), what does it *actually* do (code), and where do those diverge? Build your own list of gaps, dead code, half-wired systems, and inconsistencies. Don't inherit anyone else's list — make your own and compare later if you must.

3. **Find the load-bearing walls.** What is the architecture's actual spine? What's the discipline the code is trying to hold (there is one — find it by observation, not by being told)? What would break it? A good sign you understand: you can predict where a given feature *should* live without being told.

4. **Play it.** Run the app (`npm run dev`). Actually click through it as a player. Note what feels alive, what feels hollow, what's confusing, what's missing. The code-read and the play-through will disagree in useful ways.

5. **Form hypotheses, hold them loosely.** As you explore, keep a running notes file with competing theories and confidence levels. Update it. Self-critique. The goal is calibrated understanding, not a fast answer.

6. **Verify before you assert.** Never claim how something works from a filename or a memory. Open it. The previous pair got burned repeatedly by trusting stale assumptions — earn your claims.

Output of this phase: a written, structured map of the system *as it actually is* — flows, state model, the engine/loop, the UI surfaces, what's real vs scaffold — plus your own honest list of tensions and open questions. Present it before proposing any work. Expect this to take real effort; if it felt quick, you skimmed.

---

## Part 3 — The open threads (scope, as questions not directives)

These are the directions the work was heading. They are **areas to explore and pressure-test**, not a backlog to execute. Come to them with your own judgment — some may be wrong-headed, mis-scoped, or out of order. Say so if you think so.

- **Survival / the first lived day.** The mortal phase is meant to have *stakes* and a sense of a life being lived — hunger, rest, a day that isn't infinitely long, lifestyle choices that cost and reward. Almost none of this is wired. `docs/design/survival-and-lifestyle.md` records the *intent* (read it critically — it's design notes, not gospel). Open question: what is the smallest version of "this life has weight" that's worth building, and is the documented framing even the right one?

- **Events / interruption.** Right now nothing interrupts the player to demand a choice — the genre's "you are *played*, not just configuring" depends on it. There's a global narrative stream in the UI that's meant to host events/dialogue inline. No event system exists. Open question: what's the right primitive for an interrupting, choice-bearing, reward-gated event — and how does it avoid being exploitable?

- **The scene's missing verbs.** Explore (the "live" tab) currently only lets you start activities and walk. The intent is richer: talk to people, enter shops, encounters. Those verbs don't exist as systems. Open question: what's the minimal model that makes a *place* feel inhabited rather than a menu?

- **Prestige / what carries across lives.** The whole pitch is a reincarnation loop where the next life is shaped by the last. Currently a "reincarnate" exists but wipes everything — nothing carries over. The meta-state layer is unbuilt. Open question: is now the time, and what's the honest first version?

- **Content volume.** There is very little actual content (a handful of activities, three places, no events). At some point the bottleneck stops being engine and becomes authoring. Open question: is the content-authoring path good enough, or does it need work before content can flow?

Don't assume this list is complete or correctly prioritized. Part of your job is to challenge it.

---

## Part 4 — Working agreement

- **Investigate before answering.** Read files before claiming things about them. No speculation.
- **Don't over-engineer.** Minimum complexity for the actual task. No abstractions for one consumer, no designing for hypothetical futures. The previous pair killed a generic-library idea for exactly this reason.
- **Keep it green.** `npm run typecheck` must pass; `npm run build` gates on it. Commit per milestone, working tree green.
- **No code comments unless asked.** Match surrounding style.
- **Ask when genuinely blocked on a *decision* that's the human's to make** — design direction, scope, taste. Don't ask to avoid thinking; do ask when the answer changes what you build.
- **Surface disagreement.** If a documented intent or a listed thread seems wrong, say so plainly with reasons. Fresh eyes are the point.

There are throwaway design prototypes under `src/ui/proto/` (routes `/proto/*`) and a `_parked/` area with a deliberately-shelved feature. Treat both as reference/archive, not active code.

Start with Part 2. Go deep.
