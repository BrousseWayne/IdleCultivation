# Xianxia Idle Cultivation Game — Project Context Brief

> **Purpose**: Paste this document into new Claude conversations to provide full context on the game, its architecture, design philosophy, and meta-layer vision. It replaces the need to re-explain the project from scratch each session.

---

## What This Game Is

An incremental idle/life sim set in a xianxia (Chinese cultivation fantasy) universe, with a deep meta-design layer that blurs the line between player and character. Genre blend: **roguelike prestige loop + idle/incremental scaling + xianxia RPG life sim**.

**Inspirations**: Antimatter Dimensions (stacked prestige layers, big number scaling), Universal Paperclip (story through mechanics, progressive system reveals), Increlution (queue-based action management), Progress Knight (life sim structure, XP multipliers across runs), xianxia novels (RMJI, BTTH, Top Tier Providence).

### The Core Loop

- Each run = one life, starting at ~1 min/year (~80 min for a mortal life)
- Procedural background (farmer, orphan, soldier's son) — random start conditions
- Player directs the life through choices, action queues, event reactions
- Death = end of run. Reincarnation = prestige. Bonuses carry over.
- Next life is faster/richer. The incremental game IS the reincarnation cycle.

### Game Phases

- **Early (Mortal/Wuxia)**: Small world, life sim, jobs/skills, survival. Multiple paths to checkpoints. First contact with martial arts. ← **Currently building this phase.**
- **Mid (Immortal Cultivation)**: World expands, lives span centuries, cultivation realms, alchemy, artifacts, deeper systems unlock.
- **Late (Supreme Ascension)**: Cosmic scale, eons pass, universe-level resources.
- **Endgame (Cosmic Cultivation)**: True immortality, ultimate prestige layers.

### Design Philosophy

- **Diegetic mechanics**: Everything is explainable in-world (automation = disciples/formations, prestige = reincarnation, UI unlocks = enlightenment).
- **Story through mechanics**, not exposition. New systems reveal as thresholds are hit.
- **Freedom in progression**: Checkpoints exist, how you reach them is up to you.
- **Cultivation IS grinding** — lean into it. Prestige acceleration + roguelike variance prevent monotony.
- **Hidden depth**: Hidden stats (karma, luck, choices) influence outcomes invisibly.
- **Story text** uses xianxia novel tone. **UI text** is always clear and unambiguous.
