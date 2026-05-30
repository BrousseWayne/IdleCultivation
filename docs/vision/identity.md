---
purpose: Source of truth for what the game is — genre blend, inspirations, design philosophy, and the four macro phases
status: stable
last-verified: 2026-05-30
related: [docs/design/core-loop.md, docs/meta-design/meta-design.md]
---

## Key facts
- Genre blend: roguelike prestige loop + idle/incremental scaling + xianxia RPG life sim.
- Design mantra: easy to learn, hard to master.
- Setting: a xianxia (Chinese cultivation fantasy) universe.
- Has a deep meta-design layer that blurs the line between player and character (detail lives in `docs/meta-design/meta-design.md`).
- Each run = one life; the incremental game IS the reincarnation cycle. Death ends a run; reincarnation is prestige.
- Four macro phases: Early (Mortal/Wuxia), Mid (Immortal Cultivation), Late (Supreme Ascension), Endgame (Cosmic Cultivation).
- Currently building the Early (Mortal/Wuxia) phase.
- Inspirations: Antimatter Dimensions, Universal Paperclip, Increlution, Progress Knight, xianxia novels (RMJI, BTTH, Top Tier Providence).
- Core design pillars: diegetic mechanics, story through mechanics, freedom in progression, cultivation IS grinding, hidden depth.
- Story text uses xianxia novel tone; UI text is always clear and unambiguous.

## What the game is

An incremental idle/life sim set in a xianxia (Chinese cultivation fantasy) universe. The genre blend is a roguelike prestige loop, idle/incremental scaling, and a xianxia RPG life sim, guided by the principle of being easy to learn and hard to master. The player's journey runs from a humble mortal (e.g. a farmer) toward an immortal cultivator, managing resources, completing quests, exploring locations, and progressing along a cultivation path.

Beneath the moment-to-moment game sits a deep meta-design layer that deliberately blurs the line between the player and the character they control. That meta-thesis is the subject of its own source-of-truth document; see `docs/meta-design/meta-design.md` for the detail.

## Inspirations

Each inspiration contributes a specific mechanic or sensibility:

- **Antimatter Dimensions** — number scaling, stacked prestige layers, big numbers.
- **Universal Paperclip** — story unfolds through mechanics; new systems reveal as you progress.
- **Increlution** — queue-based action management, instinct levels.
- **Progress Knight** — life sim structure, skills/jobs, XP multipliers that persist across runs.
- **Xianxia novels (RMJI, BTTH, Top Tier Providence)** — cultivation realms, alchemy, artifacts, and genre tropes.

## The four macro phases

The game scales across four phases, each expanding the world and time scale:

- **Early (Mortal/Wuxia)** — Small world, life sim, jobs/skills, survival. Progression spans farmer to general to king. Multiple paths lead to checkpoints rather than rails. This is the player's first contact with martial arts. *(Currently under construction.)*
- **Mid (Immortal Cultivation)** — World expands, lives span centuries, cultivation realms, alchemy, and artifacts appear, and deeper systems unlock.
- **Late (Supreme Ascension)** — Cosmic scale; eons pass; universe-level resources.
- **Endgame (Cosmic Cultivation)** — True immortality and ultimate prestige layers.

## Design philosophy

The design rests on a few pillars:

- **Diegetic mechanics** — everything is explainable in-world (automation = disciples/formations, prestige = reincarnation, UI unlocks = enlightenment).
- **Story through mechanics, not exposition** — new systems reveal as thresholds are hit.
- **Freedom in progression** — checkpoints exist, but how you reach them is up to you.
- **Cultivation IS grinding** — lean into it; prestige acceleration plus roguelike variance prevent monotony.
- **Hidden depth** — hidden stats (karma, luck, accumulated choices) influence outcomes invisibly.

A consistent tone rule supports this: story text uses a xianxia novel voice, while UI text is always clear and unambiguous.
