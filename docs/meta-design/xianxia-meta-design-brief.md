
**XIANXIA IDLE GAME**

Meta-Design System Brief

*A design document for four interconnected systems that blur the boundary between player and cultivator, making the act of playing the game inseparable from the act of ascending through it.*

**Design Pillars**

**1. The Karma Ledger** — Tracking the player behind the character

**2. Progressive UI Revelation** — The interface as cultivation

**3. The Prestige/Tribulation Loop** — Resets as narrative events

**4. Narrative Diegesis** — The world responds to all of the above

*Dependency order: 1 → 2 → 3 → 4 (each pillar reads from those before it)*


# **Pillar 1: The Karma Ledger**
The foundational data layer. Everything else in the meta-design reads from this system. The Karma Ledger silently observes player-level behaviors and interprets them through the lens of xianxia cosmology. The player never sees a "karma score" — instead, the ledger is a hidden, multi-dimensional record that the game’s other systems query when deciding how to respond.
## **Core Design Principle**
The player commits a transgression (or virtue) they were never prompted to commit, and the world responds through its own cosmology. No tooltip, no achievement pop-up. The heavens simply act.
## **What To Track**
The ledger should track behaviors across several categories. Each detected behavior needs a diegetic interpretation (how the world’s cosmology explains it) and one or more system responses (what actually changes in the game).

|**Player Behavior**|**Detection Method**|**Diegetic Interpretation**|**Potential Responses**|
| :- | :- | :- | :- |
|Zooming / inspecting hidden info|CSS media queries, viewport events, resize observers|Peering at Heavenly Secrets (天机)|Karmic consequences, hidden event unlocks, attract attention of higher beings|
|Inspecting page source / dev tools|Debugger detection, devtools-detect library, timing-based checks|Attempting to read the Heavenly Dao’s source code|Hidden lore in HTML comments (written in-world), obfuscated source, NPC reactions|
|Tab switching / leaving the game|Visibility API (document.hidden, visibilitychange)|Closed-door cultivation / seclusion|Time-based events while away, different outcomes based on state left in|
|Rapid/frantic clicking during events|Click frequency tracking, input pattern analysis|Panicking under Heavenly Tribulation|Different tribulation outcomes for calm vs. panicked players|
|Dialog read speed (skipping vs. lingering)|Time between dialog advances|Spiritual comprehension / respect for elders|NPCs react to your attentiveness, hidden insights for slow readers|
|Attempting to manually edit save data|Checksum validation, integrity hashes|Defying the Mandate of Heaven|Corruption events, "fate distortion" narrative, special encounters|
|Time of day / play session patterns|System clock, session timestamps|Cultivating under moonlight vs. sunlight|Subtle affinity shifts, different ambient events, yin/yang balance|
|Prestige timing (optimal vs. early vs. late)|Compare reset point to calculated optimal|Patience / greed / recklessness of the cultivator’s Dao heart|Affects tribulation difficulty, NPC trust, available paths in next cycle|

## **Persistence Rules**
The ledger must define what persists across different scopes. This is critical because the prestige system will reset most game state, and the tension between what the character forgets and what the heavens remember is itself a design tool.

- **Within a single run:** All behaviors accumulate. The character’s current karma is the sum of actions this cycle.
- **Across prestiges:** The Karma Ledger persists in full. The character may forget, but the Heavenly Dao does not. This is how NPCs can reference past-life behavior without breaking fiction.
- **Across hard resets (if supported):** Decide carefully. Some games (Undertale) make the save file remember even after deletion. If you implement this, it should be reserved for the highest-impact moments.
## **Key Design Questions To Resolve**
- Is karma a single axis (virtue ↔ transgression) or multi-dimensional? Multi-dimensional is richer but harder to balance. Consider separate tracks: Curiosity, Patience, Mercy, Hubris, Defiance.
- Can the player ever see their karma directly? If so, at what cultivation level? Seeing it could be a late-game enlightenment reward. Alternatively, it’s never shown — only reflected in the world’s behavior.
- How do you handle false positives? A player might zoom in by accident. Consider thresholds: one zoom is a glance; ten zooms is deliberate prying.
- Should the player be able to "cultivate" good karma intentionally once they realize the system exists? Or should awareness of the system change how it works (Heisenberg’s karma)?
- How does karma interact with the prestige system? Does accumulated karma from past lives make tribulations easier, harder, or different?
## **Implementation Priority**
Start with the data structure and two to three detectable behaviors (zoom, tab-switch, click patterns). Build the tracking silently and only later build the systems that read from it. This lets you collect real player data before committing to responses.
## **Reference: The Lifespan Blur Pattern**
Already implemented. The player’s lifespan is displayed as a blurred number. Zooming in makes it progressively more distorted rather than clearer. The game detects this zoom attempt and can flag the player as having “peered at Heavenly Fate.” This is the template for all karma tracking: detect a player-level action, interpret it as a character-level action within the world’s cosmology, respond diegetically.


# **Pillar 2: Progressive UI Revelation**
The interface itself is something the player cultivates. Every UI element that appears — stat panels, labels, numbers, automation controls — is framed as the character perceiving more of reality. The player’s growing understanding of the game’s systems mirrors the character’s growing understanding of the cosmos.
## **Revelation Arc**
The following table maps cultivation stages to what the player can see and interact with. Each transition should be a narrative moment, not a silent UI update.

|**Stage**|**What The Player Sees**|**What’s Hidden**|**Narrative Trigger**|**Player Feeling**|
| :- | :- | :- | :- | :- |
|Mortal|Unlabeled shapes (red square = strength, blue circle = agility). No numbers. No stat panel. Activities have visual feedback only.|All numbers, labels, stat panel, prestige currency, qi, cultivation system, automation.|Game start|Confusion, tactile learning, curiosity|
|Awakened Mortal|Shapes get labels ("Strength", "Agility"). Still no numbers. A vague sense of relative magnitude through shape size.|Exact numbers, prestige layer, qi, automation. Events reference stats by shape, not value.|First major event that requires stat awareness (e.g., lifting a boulder, outrunning a threat).|"Oh, the shapes MEAN something"|
|Martial Artist|Full stat panel with numbers. Activities show XP bars. Basic resource tracking. The game looks like a "normal" idle game now.|Prestige layer, qi/cultivation, automation, deeper systems. A faint flickering element the player can’t interact with yet (qi foreshadowing).|Character meditates and "perceives their own body" for the first time. Narrative enlightenment = UI unlock.|Relief, mastery, "now I understand the game"|
|Early Cultivator|Qi bar appears. Cultivation techniques visible. The flickering element resolves into a new resource. A second layer of reality becomes perceptible.|Prestige mechanics, automation, higher realms, the full scope of the system.|Character discovers qi after hitting the ceiling of martial arts. "There’s something beyond strength."|Wonder, scope revelation, "the game is bigger than I thought"|
|Cultivator|Prestige mechanics visible. The player can now see the reset button / tribulation option. Cross-run persistence becomes apparent.|Automation, higher realms, karma visibility, the full meta-structure.|First tribulation / breakthrough attempt. The game explicitly presents the choice to sacrifice everything for power.|Vertigo, risk assessment, "do I really reset?"|
|Immortal+|Automation unlocks ("Dao Comprehension"). Systems that once needed clicks now run themselves. Higher-realm resources. The meta-game becomes the game.|Whatever the final layer is (if any). Potentially nothing — full perception achieved.|Varies per realm. Each major breakthrough reveals another layer of systems that were always running invisibly.|Power, transcendence, "I AM the system"|

## **Critical Design Rules**
- **Every UI reveal is a narrative beat.** The stat panel doesn’t just “appear” — it’s earned through a story moment. The character learns something, and the interface reflects that learning.
- **Hidden elements should leave traces.** The flickering dot that later becomes qi should be visible (but uninteractable) from the very start. When it finally resolves, the player should think “THAT’S what that was.” Foreshadowing through UI, not dialog.
- **Replaying early content should feel different.** After a prestige, the player returns to the mortal stage but with knowledge. Consider showing the shapes AND the numbers on subsequent runs, or letting the player “see through” the mortal UI based on karma/cultivation memory.
- **The Karma Ledger can accelerate revelation.** A player who has been particularly attentive (reading all dialog, exploring carefully) might unlock UI elements slightly earlier — framed as the character having higher “spiritual root” quality.
## **The Foreshadowing Inventory**
List every hidden system and decide when it first becomes faintly visible versus when it becomes interactive. This inventory is crucial for pacing — you want the player to always have at least one mystery on screen they can’t yet explain.

- **Qi:** Faint flicker from game start. Resolves at martial arts pinnacle.
- **Prestige currency:** Invisible but accumulating from run start? Or only appears when the player first hears of tribulations? Decide which creates more impact.
- **Karma indicators:** Does the player ever see their karma reflected in the UI? Perhaps as a subtle color shift in the background, an ambient particle effect, or nothing at all.
- **Higher-realm resources:** Visible as incomprehensible symbols in the late-game UI that only resolve after the next prestige? This mirrors how a mortal can’t comprehend immortal script.
## **Key Design Questions To Resolve**
- How does subsequent-run UI differ from first-run UI? Does the player see through the mortal veil immediately, or does each prestige only slightly expand their starting perception?
- Where is the line between "intriguing mystery" and "frustrating confusion" in the early mortal stage? Playtesting will be essential. Consider the red-square-to-event-dialog link as your minimum viable clarity.
- Should automation unlocks be permanent across prestiges, or do you re-earn them (but faster)? This affects whether "Dao Comprehension" is a one-time enlightenment or a deepening practice.
- How do you handle tutorial/onboarding for players who don’t realize the shapes are stats? The absence of explanation is the point, but there’s a threshold where players will just quit.


# **Pillar 3: The Prestige/Tribulation Loop**
The structural backbone of the game as an incremental. In most idle games, prestige is a mechanical reset with a multiplier reward. In this game, prestige IS the xianxia narrative. Breaking through to a new realm means destroying your current foundation to rebuild stronger — that’s literally what a prestige reset does. The goal is to make every reset feel like a dramatic narrative event, not a menu selection.
## **The Tribulation Framework**
In xianxia, Heavenly Tribulations are cosmic trials that test cultivators when they attempt to ascend. This maps directly to the prestige mechanic, but the implementation should feel nothing like clicking a “reset” button.
### **Proposed Loop Structure**
- **Accumulation phase:** The player cultivates within their current realm, gaining power, resources, and understanding. Standard idle game progression.
- **Tribulation trigger:** The player reaches a threshold where they CAN attempt breakthrough. This should be signaled diegetically — the sky darkens, NPCs comment on gathering heavenly pressure, the UI subtly shifts. The player chooses when to face it.
- **The tribulation itself:** NOT a confirmation dialog. An active gameplay sequence whose nature depends on the player’s karma, cultivation path, and choices. Could be a survival challenge, a moral dilemma, an inner-demon confrontation, or a test of accumulated knowledge.
- **Outcome:** Success = prestige reset with multipliers, new realm, new UI revelations. Failure = partial reset, “cultivation deviation,” karmic consequences. The failure state should still be interesting, not just punishing.
- **New cycle:** The player returns to an earlier state but with persistent knowledge, karma, and potentially some carried-over resources. The world is the same but they perceive it differently.
## **What Persists Across Prestiges**

|**Persists Always**|**Persists Conditionally**|**Resets Always**|**Diegetic Reason**|
| :- | :- | :- | :- |
|Karma Ledger (full history)|Partial UI revelation (based on karma / realm reached)|Mortal-realm stats (strength, agility, etc.)|The body is new; the soul carries echoes|
|Prestige currency ("Heavenly Merit" or equivalent)|NPC relationships (faint recognition, not full memory)|Mortal-realm resources (gold, items)|Material possessions don’t transcend reincarnation|
|Highest realm ever reached|Cultivation technique knowledge (unlocked but needs re-leveling)|Cultivation level within a realm|The foundation must be rebuilt on the new Dao|
|Meta-progression unlocks (automation tiers)|Specific event flags ("has seen the hidden truth")|Event progress / quest state|Fate weaves a new thread each cycle|

## **Tribulation Types**
Each tribulation should feel distinct and should reference the player’s actual behavior, not just their stats. The Karma Ledger is what makes this possible.

- **Heavenly Lightning Tribulation (standard):** A resource-gated survival check. Do you have enough cultivated power to withstand the heavens? This is your baseline prestige gate — the mechanical minimum.
- **Inner Demon Tribulation (karma-driven):** The game confronts the player with their own past actions. If they’ve been greedy (hoarding resources past optimal reset), the inner demon tempts them with more. If they’ve been reckless, the demon shows consequences. The UI itself could become unreliable during this sequence.
- **Heart Demon Trial (curiosity-driven):** Triggered by high curiosity karma (zooming, source inspection, etc.). The game tests whether the player’s desire for forbidden knowledge is wisdom or hubris. Could unlock secret paths for those who pass.
- **Fate Tribulation (pattern-driven):** The game analyzes the player’s overall play pattern across runs and generates a trial that targets their specific tendencies. A speed-runner gets a patience test. A cautious player gets forced into urgency.
## **Failed Prestiges: Cultivation Deviation**
Failing a tribulation shouldn’t be a hard wall. In xianxia, cultivation deviation (走火入魔) is a narrative staple — a cultivator’s qi goes berserk, causing damage but sometimes also unpredictable breakthroughs. Design options:

- Partial reset: lose some progress but not all. The player is weakened but not back to zero.
- Deviation path: a temporary alternate progression that’s mechanically different. The character is damaged and must heal, opening unique content.
- Demonic cultivation unlock: failure opens a darker path. The player gains power through a different system that has its own tradeoffs and karma implications.
## **Key Design Questions To Resolve**
- How many prestige layers? Antimatter Dimensions has multiple nested layers. Each layer could correspond to a major realm (Mortal → Foundation → Core Formation → Nascent Soul → etc.). How deep does it go?
- Is there a final ascension / true ending? Or is the game infinite? If there’s an end state, what does "becoming a supreme being" look like when the player already functions as one?
- How long should the first run be before the first prestige? This sets expectations. Too short and the reset feels cheap. Too long and players may not realize the game has prestige at all.
- Can the player fail a tribulation permanently, or can they always retry? Permanent failure is more dramatic but could feel punishing in an idle game context.
- How does the tribulation interact with idle play? If the player is offline during a triggered tribulation, what happens?


# **Pillar 4: Narrative Diegesis**
This is the output layer — how the world responds to everything the other three systems produce. The goal is that no element of the game ever feels "gamey" in a way that breaks the fiction. Every system, every UI element, every NPC response has a diegetic justification within the xianxia cosmology.
## **The Player-As-Entity**
The most ambitious layer. In xianxia, supreme beings manipulate fate, perceive across timelines, and exist outside normal causality. The player already does all of these things — saving, loading, resetting, optimizing. The question is: when and how does the world acknowledge this?
### **Levels of Acknowledgment**

|**Level**|**What Happens**|**Example**|
| :- | :- | :- |
|Ambient (always active)|The world subtly reflects the player’s meta-behaviors without anyone commenting on it. Environmental storytelling only.|After many prestiges, the starting village has a shrine to “a cycle-walker” that wasn’t there before. No NPC mentions it.|
|Indirect (mid-game)|NPCs and events reference something they can’t quite perceive. They sense a presence, a pattern, a guiding fate — but can’t identify it.|An elder says: “This one’s fate thread is... strange. It loops back on itself, again and again. As if something beyond the Dao is pulling the strings.”|
|Direct (late-game)|A high-level entity addresses the guiding presence explicitly. Still diegetic — they’re speaking to what they perceive as a cosmic force, not “a player.”|An ancient immortal, facing the player-character, looks past them and says: “You. The one who watches. I know you’re there. You’ve been here many times before, haven’t you?”|
|Transcendent (end-game)|The distinction between game system and narrative collapses. The player manipulating the meta-game IS the character achieving supreme cultivation. These become the same thing.|The final prestige layer has no fiction wrapper at all. The raw numbers, the idle mechanics, the optimization — that IS the highest plane of existence. Enlightenment is understanding that it was always a game, and the game was always real.|

## **NPC Response Framework**
NPCs should react to the Karma Ledger in ways that feel organic, not scripted. The key is that they respond to patterns, not individual events. A single transgression might go unnoticed; a pattern of behavior shapes how the world treats you.

- **Low-awareness NPCs (mortals, villagers):** React to surface-level consequences of karma. If the player has been patient, these NPCs are warmer. If the player has been reckless, they’re nervous. They don’t know why — they just feel it.
- **Mid-awareness NPCs (martial masters, early cultivators):** Can perceive something unusual. They comment on the character’s “aura” or “fate.” A master might refuse to teach you if your karma is wrong, or offer a secret technique if it’s right.
- **High-awareness NPCs (immortals, ancient beings):** Can perceive the prestige cycle. They know you’ve lived before. They may reference events from previous runs. They’re the closest thing to characters who “know” about the meta-layer, but they interpret it through their own cosmological framework.
## **Unreliable Presentation**
Drawing from Omori and Katana Zero: what the player sees on screen is not always objective reality. It’s the character’s perception, which can be distorted.

- **Cultivation breakthrough distortion:** During tribulations, the UI lies. Stats display wrong values. Enemy health bars are deceptive. The player must rely on their own accumulated knowledge, not the interface. This is the “inner demon” making you doubt reality.
- **Memory bleed:** After several prestiges, fragments of past-run events appear in current-run scenes. A location triggers a brief flash of how it looked in a previous cycle. The character — and the player — experience deja vu.
- **Perception-gated content:** Certain NPCs, locations, or objects are literally invisible at lower cultivation levels. Replaying early areas after advancing reveals hidden content that was always there. The game world was always complete; the player just couldn’t see it.
## **Environmental Storytelling Across Runs**
The world should accumulate evidence of the player’s passage even when characters don’t remember.

- Shrines, carvings, or ruins that reference events from past runs (placed as if they’re ancient, because from this timeline’s perspective, they are).
- NPCs who “inherit” traits or knowledge from their past-run versions without knowing why. A merchant who gave you a key item in a past life has a vague compulsion to be generous to you.
- The landscape itself shifting slightly based on cumulative karma. A forest grows darker or lighter. A river changes course. Subtle enough to be uncertain, persistent enough to be unsettling.
## **Key Design Questions To Resolve**
- How explicit should the player-as-entity acknowledgment get? There’s a spectrum from “subtle environmental hints” to “an NPC directly addresses the player.” Where is the right stopping point for your vision?
- How do you handle the transition from “the game is a xianxia story” to “the game IS the xianxia?” This is the most philosophically ambitious moment and needs to land perfectly.
- How much environmental persistence is feasible to implement? Each persistent element requires tracking and conditional rendering. Start with a few high-impact ones and expand.
- Should there be a “true ending” that can only be reached by a player who has engaged deeply with the meta-layer? Or should all players eventually reach the same endpoint regardless of karma?
- How do you balance the narrative pacing for players who prestige quickly vs. those who linger in each cycle? The story needs to work at different speeds.


# **Appendix: Cross-Pillar Interactions**
The four pillars are not independent — they form a system. The following maps key interaction points to track during design.

|**System A**|**System B**|**Interaction**|
| :- | :- | :- |
|Karma Ledger|UI Revelation|High curiosity karma can accelerate UI unlocks (“high spiritual root”). Certain UI elements only appear for specific karma profiles.|
|Karma Ledger|Tribulation Loop|Karma determines tribulation type and difficulty. A patient player faces different trials than a reckless one. Prestige timing affects karma.|
|Karma Ledger|Narrative|NPC reactions, environmental changes, and acknowledgment level all read from karma. The world’s tone shifts based on cumulative player behavior.|
|UI Revelation|Tribulation Loop|Each prestige tier unlocks new UI layers. Failed prestiges may temporarily distort the UI. The tribulation sequence itself may manipulate the interface.|
|UI Revelation|Narrative|UI reveals are narrative moments. Perception-gated content means the same scene renders differently at different cultivation levels.|
|Tribulation Loop|Narrative|Prestiges are the major plot beats. What persists across resets defines what the story can reference. Environmental accumulation tracks prestige count.|

## **Session Planning**
Tackle each pillar in a dedicated session, in order. Bring this document to each session as context. The recommended sequence:

- **Session 1 — Karma Ledger:** Define the data model, choose initial trackable behaviors, design the persistence layer, and prototype the zoom-detection pattern for additional behaviors.
- **Session 2 — UI Revelation:** Map the full revelation timeline, design the visual language for each stage (shapes, colors, particle effects), build the foreshadowing inventory, and define the narrative triggers for each unlock.
- **Session 3 — Tribulation Loop:** Design the prestige economy (currencies, multipliers, costs), script the tribulation sequences, define persistence rules, and prototype the first tribulation type.
- **Session 4 — Narrative Diegesis:** Write the NPC response framework, design environmental persistence, script the player-as-entity acknowledgment arc, and define the endgame vision.



*End of Design Brief*
