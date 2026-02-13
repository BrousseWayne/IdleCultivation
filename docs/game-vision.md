# Game Vision

## Core Identity

Genre blend: roguelike prestige loop + idle/incremental scaling + xianxia RPG life sim.
Easy to learn, hard to master.

### Inspirations
- **Antimatter Dimensions**: Number scaling, stacked prestige layers, big numbers
- **Universal Paperclip**: Story unfolds through mechanics, new systems reveal as you progress
- **Increlution**: Queue-based action management, instinct levels
- **Progress Knight**: Life sim structure, skills/jobs, XP multipliers persist across runs
- **Xianxia novels (RMJI, BTTH, Top Tier Providence)**: Cultivation realms, alchemy, artifacts, tropes

## The Core Loop

- Each run = one life, starting at ~1 min/year (~80 min for a mortal life)
- Procedural background: farmer, orphan, soldier's son — random start conditions
- Player directs the life through choices, action queues, event reactions
- Death = end of run. Reincarnation = prestige. Bonuses carry over.
- Next life is faster/richer. The incremental game IS the reincarnation cycle.

## Run Types

- **Grind runs**: set up queue, go idle, farm a specific resource
- **Push runs**: active play, trying to reach new thresholds
- Automation unlocks progressively (even in mortal phase)
- Player chooses the run's purpose

## State Layers

- **Run state**: resets on death (vitality, age, inventory, realm, run-scoped stats)
- **Meta state**: persists forever (prestige currencies, hidden stats, permanent unlocks)
- Hidden stats (karma, luck, accumulated choices) are meta state — they shape run variance invisibly

## Game Phases

- **Early (Mortal/Wuxia)**: Small world, life sim, jobs/skills, survival. Farmer to general to king. Multiple paths to checkpoints, not rails. First contact with martial arts.
- **Mid (Immortal Cultivation)**: World expands, lives span centuries, cultivation realms, alchemy, artifacts, deeper systems unlock.
- **Late (Supreme Ascension)**: Cosmic scale, eons pass, universe-level resources.
- **Endgame (Cosmic Cultivation)**: True immortality, ultimate prestige layers.

## Design Philosophy

- Diegetic mechanics: everything explainable in-world (automation = disciples/formations)
- Story unfolds through mechanics, not exposition. New systems reveal as thresholds are hit.
- Freedom in progression: checkpoints exist, how you reach them is up to you.
- Cultivation IS grinding — lean into it. Prestige acceleration + roguelike variance prevent monotony.
- Hidden depth: hidden stats, karma, luck influence outcomes without player seeing the numbers.
- Xianxia tropes are features: young masters, jade beauties, heavenly tribulations.

## Architectural Implications

- All game entities need to support the effect system (declarative effects, not hardcoded handlers)
- Two-layer state architecture: run state vs meta state
- Procedural generation system needed for backgrounds/events
- Time system must scale across phases (minutes to years to eons)
- Unlock/progression system must be data-driven (no hardcoded thresholds)
