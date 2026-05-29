
**XIANXIA IDLE GAME**

Meta-Design Use Case Catalog

*A comprehensive catalog of detectable player behaviors, their diegetic interpretations within xianxia cosmology, and their game design applications. Each use case turns a player-level action into a character-level event without breaking the fourth wall.*

**Categories**

**1. Forbidden Knowledge** — Attempts to see beyond the veil

**2. Presence & Absence** — When the guiding spirit comes and goes

**3. Emotional Fingerprint** — How the player feels, revealed through behavior

**4. Environmental Resonance** — The real world bleeds into the game world

**5. Identity & Intent** — Who the player is and what they want

**6. Interface Transgression** — Using the browser itself as a cultivation tool

**7. Social & External** — The player’s relationship with the world beyond the game

*Companion document to: Xianxia Meta-Design System Brief*


# **Category 1: Forbidden Knowledge**
These use cases detect the player attempting to see, read, or access information they’re not meant to have. In xianxia cosmology, forbidden knowledge is guarded by the Heavenly Dao. The player’s natural curiosity — zooming, inspecting, copying — becomes an act of cosmic transgression.

## **1.1 — Zooming to Read Hidden Values**

|**Detection**|CSS media queries, viewport resize events, visual viewport API, pinch-zoom detection on mobile.|
| :- | :- |
|**Diegetic Name**|Peering at Heavenly Secrets (天机)|
|**What Happens**|Blurred/hidden values (like the lifespan) become progressively MORE distorted the closer the player looks. Reality defends its secrets. Each zoom level adds noise, glitch effects, or visual chaos.|
|**Game Response**|Track zoom attempts per element. Flag player as having "gazed at forbidden knowledge." Unlock hidden story branches for persistent gazers. Apply subtle karmic consequences. NPCs with high spiritual awareness may comment on the player’s "marked eyes."|
|**Cultivation Tier**|Mortal through Immortal. At higher cultivation, some values may become readable — the player earns the right to see what was always hidden.|
|**Impact**|**Very High** — Already implemented (lifespan blur). Template for all forbidden-knowledge patterns.|
|**Difficulty**|**Low** — CSS + JS viewport listeners. Already proven.|

## **1.2 — Inspecting Page Source / Dev Tools**

|**Detection**|Devtools-detect libraries, debugger statement timing, window.outerHeight vs window.innerHeight delta, console.log traps with getters.|
| :- | :- |
|**Diegetic Name**|Reading the Heavenly Dao’s Source Code|
|**What Happens**|The player opens dev tools expecting to find game data. Instead, HTML comments are written as in-world annotations — notes left by whatever entity maintains cosmic law. Variable names are cultivation terms. The source code IS the Dao, and it reads like scripture.|
|**Game Response**|Plant actual lore in the source code, written from the perspective of a cosmic scribe. Obfuscate game-critical values but leave breadcrumbs. Track that dev tools were opened and flag the player as a "Dao Seeker." Late-game NPCs could reference this: "You’ve seen the threads that hold this world together, haven’t you?"|
|**Impact**|**Very High** — Players who find lore in the source will share it. Community-building moment.|
|**Difficulty**|**Medium** — Detection is imperfect (false positives possible). Lore planting requires deliberate build-pipeline work.|

## **1.3 — Copy-Pasting Game Content**

|**Detection**|The copy event on document or specific elements. Clipboard API to intercept and modify copied content.|
| :- | :- |
|**Diegetic Name**|Transcribing Heavenly Scripture|
|**What Happens**|At low cultivation, copied text transforms in the clipboard. A cryptic poem becomes garbled. The blurred lifespan number copies as nonsense characters. The mortal mind cannot retain the true form of what it saw. At high cultivation, copy works perfectly — the cultivator can now comprehend and transcribe divine text.|
|**Game Response**|Track what was copied and when. Copying a cultivation manual before you’ve unlocked cultivation is "stealing techniques above your realm." Could trigger sect hostility or attract the attention of the technique’s guardian. Copying after unlocking the content is legitimate study.|
|**Impact**|**High** — Extremely surprising moment when the clipboard contains something unexpected.|
|**Difficulty**|**Low** — Copy event + Clipboard API are well-supported.|

## **1.4 — Editing Save Data**

|**Detection**|Checksum validation on save data, integrity hashes, detecting impossible state transitions (stats that jump beyond possible gain rates).|
| :- | :- |
|**Diegetic Name**|Defying the Mandate of Heaven|
|**What Happens**|The player has altered fate itself. The Heavenly Dao detects the corruption. Rather than simply blocking the cheat or punishing silently, the game world reacts: reality becomes unstable, spatial cracks appear, NPCs comment on the wrongness in the air. The player has torn the fabric of their world.|
|**Game Response**|"Fate distortion" events that are unique content only accessible through tampering. A hidden NPC who only appears when destiny has been altered, offering a questline about repairing (or further exploiting) broken fate. This rewards the behavior with unique content rather than just punishing it — making tampering feel like discovering a secret path.|
|**Impact**|**Very High** — Turns cheating into a story event. Players who find this will be amazed.|
|**Difficulty**|**Medium** — Requires robust save integrity system. Edge cases around legitimate vs. tampered states.|


# **Category 2: Presence & Absence**
These use cases track when the player is present, absent, attentive, or distracted. In xianxia, the guiding spirit (the player) has a presence that the world can feel. When the spirit withdraws, the world continues — but differently.

## **2.1 — Tab Switching / Leaving the Game**

|**Detection**|Page Visibility API (document.hidden, visibilitychange event). Reliable across all modern browsers.|
| :- | :- |
|**Diegetic Name**|Closed-Door Seclusion / The Guiding Spirit Withdraws|
|**What Happens**|Standard idle accumulation, but framed as the character entering meditation or seclusion. What happened while the player was gone depends on the state they left the game in. Left during combat? The character fought alone without guidance. Left during peaceful cultivation? Deep meditation occurred. Left during a crisis? Consequences unfolded without the player’s hand.|
|**Game Response**|"Emerging from seclusion" narrative on return. Session log shows what happened in the player’s absence, written as the character’s experience. Departing at critical moments (mid-tribulation, during NPC encounters) should have consequences — "The guiding presence vanished and you were left to fend for yourself."|
|**Impact**|**High** — Makes every return to the game feel like a narrative beat, not just checking numbers.|
|**Difficulty**|**Low** — Visibility API is trivial. The complexity is in designing meaningful state-dependent outcomes.|

## **2.2 — Idle Time Patterns Across Days**

|**Detection**|Session start/end timestamps stored over time. Build a histogram of the player’s typical active hours across days and weeks.|
| :- | :- |
|**Diegetic Name**|The Guiding Spirit’s Celestial Rhythm|
|**What Happens**|The game learns when the player is typically present. A morning player is a "dawn cultivator." A late-night player cultivates under yin energy. The game world synchronizes to the player’s real-world rhythm. Events trigger shortly after typical login times, so the player always seems to arrive at the right moment. Cultivation is most effective when the guiding spirit is strongest (the player is present).|
|**Game Response**|Subtle affinity bonuses aligned to real play schedule. Dawn players gain solar-aspected bonuses; night players gain lunar-aspected bonuses. Important events scheduled to coincide with the player’s typical return. An NPC fortune-teller could describe the player’s "celestial chart" in terms that suspiciously match their actual schedule.|
|**Impact**|**High** — Creates a deeply personal feeling of synchronization with the game world.|
|**Difficulty**|**Medium** — Needs several days of data before patterns emerge. Requires graceful fallback for new players.|

## **2.3 — Rage-Quitting and Return Timing**

|**Detection**|beforeunload event combined with game state context. If the player closes during or immediately after a failure event (tribulation loss, character death, bad RNG), and the session was short or ended abruptly, flag as potential rage-quit. Track time until next session.|
| :- | :- |
|**Diegetic Name**|Seclusion After Setback / The Wandering Period|
|**What Happens**|The player slammed the tab shut after failure. Days later, they return. The game acknowledges the absence without judgment. "You retreated from the world. The silence was long. But you returned. The Dao does not abandon those who return." The character spent the intervening time in solitary reflection. The world waited.|
|**Game Response**|Welcome-back narrative scaled to absence length. Short absence (hours): "You took a breath and steadied yourself." Long absence (days): "The seasons turned in your absence. The mountain is unchanged. Are you?" Very long (weeks+): "Many believed you would not return. There were those who waited." Optionally grant a small "perseverance" bonus for returning after failure.|
|**Impact**|**Very High** — Emotionally powerful. Players feel welcomed back and recognized. Strong retention mechanic.|
|**Difficulty**|**Low** — Simple timestamp comparison. The writing is the hard part, not the tech.|

## **2.4 — Multiple Tabs (Simultaneous Instances)**

|**Detection**|BroadcastChannel API or SharedWorker to detect multiple active instances. localStorage event listeners across tabs.|
| :- | :- |
|**Diegetic Name**|Clone Cultivation / Split Consciousness|
|**What Happens**|A single soul existing in two places at once. At low cultivation, this is dangerous and forbidden. The duplicate tab behaves slightly wrong — visual glitches, desynchronized state, ominous warnings about "spatial instability." At high cultivation, dual-tab play becomes an actual mechanic: the Clone Technique, where the player legitimately manages two parallel instances.|
|**Game Response**|Early game: warn and destabilize the clone tab. "This body is not real. Return to your true self." Track the attempt. Late game: unlock clone cultivation as a prestige-layer mechanic. The player’s earlier transgression was foreshadowing of a power they’d eventually earn. The game eventually gives you permission to do what it once punished.|
|**Impact**|**Very High** — The early-game punishment becoming a late-game feature is an incredible meta-narrative moment.|
|**Difficulty**|**High** — Cross-tab state synchronization is technically complex. Clone mechanics need careful balance design.|


# **Category 3: Emotional Fingerprint**
These use cases read the player’s emotional state through behavioral proxies. Speed, hesitation, aggression, patience — the game interprets these as the character’s Dao Heart, the spiritual core that determines how a cultivator faces the world.

## **3.1 — Rapid/Frantic Clicking During Events**

|**Detection**|Click frequency tracking within time windows. Compare clicks-per-second during tribulations/events versus baseline idle play.|
| :- | :- |
|**Diegetic Name**|Dao Heart Stability Under Heavenly Pressure|
|**What Happens**|During a tribulation, the game measures whether the player is panicking (spam-clicking) or calm (deliberate, measured input). Composure under tribulation is a core xianxia trope. A calm player’s character channels energy efficiently. A panicked player’s character wastes spiritual energy flailing against the heavens.|
|**Game Response**|Different tribulation outcomes based on input pattern. Calm players may receive "Immovable Dao Heart" bonuses. Frantic players face a harder tribulation but may unlock a berserker-type cultivation path. Neither is strictly better — they’re different paths that reflect the player’s genuine temperament.|
|**Impact**|**High** — The player’s real emotional state directly shapes their character’s cultivation path.|
|**Difficulty**|**Low** — Simple click-rate tracking. Threshold calibration is the main design challenge.|

## **3.2 — Dialog Read Speed**

|**Detection**|Timestamp between dialog box appearance and player advancing to next line. Calculate words-per-second read rate. Distinguish skimmers, readers, and lingerers.|
| :- | :- |
|**Diegetic Name**|Spiritual Comprehension / Respect for Elders|
|**What Happens**|A player who lingers on a cryptic elder’s words absorbs hidden meaning that a skimmer misses. This isn’t punishing skippers — it’s rewarding attention. Certain cultivation insights are only "comprehended" if the player spent enough time with the text. The character sat with the master’s words and reflected; the impatient disciple rushed ahead.|
|**Game Response**|NPCs react to attentiveness. A master whose teachings were skipped might say "You heard my words but did not listen." Hidden technique hints embedded in dialog only register if read at comprehension speed. An NPC might later quiz the player on something they said — attentive players know the answer, skimmers don’t. Cumulative read-speed across the game shapes "spiritual comprehension" stat.|
|**Impact**|**High** — Rewards genuine engagement with the game’s writing. Players feel that paying attention matters.|
|**Difficulty**|**Low** — Trivial to implement. The challenge is writing dialog worth lingering on.|

## **3.3 — Decision Deliberation Time**

|**Detection**|Time between choice options appearing and the player’s click. Track across all branching decisions to build a hesitation profile.|
| :- | :- |
|**Diegetic Name**|Dao Heart Conviction / The Weight of Choice|
|**What Happens**|A snap decision and a five-minute deliberation produce the same choice but reveal different characters. In xianxia, a wavering Dao Heart is a genuine vulnerability — inner demons exploit doubt. The game silently profiles the player’s decisiveness across every choice they’ve ever made.|
|**Game Response**|Decisive players build "Dao Heart Stability" that provides resistance during inner demon tribulations. Hesitant players face harder inner demon trials but may gain access to "contemplation" techniques that reward careful thinking. An elder could comment: "You act without hesitation. Your Dao Heart is firm" or "You weigh every step. There is wisdom in that, but also a crack where demons enter."|
|**Impact**|**High** — The player’s actual personality becomes their character’s personality. Deeply personal.|
|**Difficulty**|**Low** — Simple timestamp delta. Needs good thresholds to distinguish deliberation from distraction.|

## **3.4 — Typing Patterns in Free-Text Inputs**

|**Detection**|Keydown/keyup timing, backspace frequency, pause duration between keystrokes. Track deletions and rewrites.|
| :- | :- |
|**Diegetic Name**|The Shape of the Spoken Dao|
|**What Happens**|When an ancient being asks "What is your Dao?" and the player types, deletes, retypes, deletes again — that hesitation IS the answer. The being responds not just to what was typed, but to how it was typed. "You reached for an answer and pulled it back twice before speaking. Your Dao is not yet formed. This is not weakness — it is the mark of one still seeking."|
|**Game Response**|Confident typing (fast, no deletions): the character speaks with authority. NPCs take notice. Hesitant typing (many backspaces, long pauses): the character’s uncertainty is palpable. The content of the text matters, but the rhythm of its creation reveals what the content alone cannot.|
|**Impact**|**Very High** — One of the most "the game knows me" moments possible. Players will tell others about this.|
|**Difficulty**|**Medium** — Keystroke analysis is straightforward. Writing believable responses to the typing patterns requires nuance.|

## **3.5 — Mouse Movement During Idle Phases**

|**Detection**|Mousemove events during periods of no meaningful interaction. Track whether the cursor is active (present, fidgeting) or absent (player walked away). Distinguish patterns: circles, random jitter, hovering over specific elements.|
| :- | :- |
|**Diegetic Name**|Wu Wei — Action Through Non-Action / Ambient Spiritual Radiation|
|**What Happens**|A player who is physically present but not actively engaging is emanating presence without intention. The game treats idle-but-present differently from idle-and-absent. Resources accumulate slightly differently. Ambient events are more likely to trigger when the guiding spirit is watching but not interfering — the Dao acts best when not forced.|
|**Game Response**|"Wu Wei" cultivation bonus for being present but not clicking. Rare ambient events (a crane landing in the courtyard, a falling star) that only occur when the player is watching passively. These teach the player that sometimes the best action is no action — a real xianxia lesson delivered through game mechanics.|
|**Impact**|**Medium** — Subtle but philosophically rich. Rewards a meditative relationship with the game.|
|**Difficulty**|**Low** — Mousemove listeners are trivial. Distinguishing present-idle from absent-idle needs heuristics.|

## **3.6 — Failed Attempts and Repetition**

|**Detection**|Attempt counter on any skill-based moment: timing minigames, tribulation challenges, puzzle elements. Track consecutive failures and total attempts.|
| :- | :- |
|**Diegetic Name**|The Dao of Perseverance / Bottleneck Tempering|
|**What Happens**|In xianxia, failing to break through a bottleneck repeatedly is a classic trope. A player who fails ten times and persists has demonstrated something a first-try player hasn’t. The game doesn’t artificially gate content behind failure — but it recognizes genuine struggle and reflects it back.|
|**Game Response**|The "Dao of Perseverance" cultivation path only opens for players who have genuinely struggled. A unique technique tree that scales with total failures across the game. NPCs who failed their own breakthroughs recognize a kindred spirit. "I see it in you. You have fallen many times. So have I. Let me show you what the ground teaches."|
|**Impact**|**High** — Transforms frustration into meaningful progression. Players who struggle feel rewarded, not punished.|
|**Difficulty**|**Low** — Simple counter. The path design requires balancing against success-oriented progression.|


# **Category 4: Environmental Resonance**
These use cases let the real world bleed into the game world. The player’s physical environment — time, season, hardware, energy level — becomes a variable in the cultivation simulation. The game doesn’t just exist on a screen; it exists in the player’s life.

## **4.1 — Seasonal and Calendar Awareness**

|**Detection**|System clock: Date object for current date, astronomical calculations for lunar phases, solstices, equinoxes. Cultural calendar libraries for regional events.|
| :- | :- |
|**Diegetic Name**|Celestial Cycle Resonance / Heavenly Calendar|
|**What Happens**|Xianxia cosmology is deeply tied to celestial cycles. Full moons, solstices, equinoxes, and Lunar New Year become real in-game events tied to actual dates. A player who attempts a breakthrough during a real-world full moon receives a genuine celestial bonus. The game never reveals this connection. The player who figures it out has "comprehended the celestial calendar" — a real cultivation milestone.|
|**Game Response**|Yin-aspected techniques are stronger at night and during winter. Lunar phases affect spiritual herb potency. Solstice events offer once-a-year cultivation opportunities. A fortune-teller NPC who speaks in terms that map to the real calendar without ever breaking fiction. Community discovery of the calendar system becomes a shared secret.|
|**Impact**|**Very High** — Creates genuine mystique. Players who discover the real-date connection will feel like they’ve cracked a cosmic code.|
|**Difficulty**|**Medium** — Date math is easy. Balancing content so calendar-unaware players aren’t disadvantaged is the challenge.|

## **4.2 — Screen Size and Device Type**

|**Detection**|window.innerWidth/innerHeight, CSS media queries, touch event support for mobile detection, screen.width for full display size.|
| :- | :- |
|**Diegetic Name**|Spiritual Domain Breadth|
|**What Happens**|A mobile player literally sees less of the world. The fog of war is tighter, the mortal world feels claustrophobic. When a mobile player opens the game on desktop for the first time, the world expands. That feeling of suddenly perceiving more — that’s a breakthrough moment the hardware delivered. The character’s spiritual domain has widened.|
|**Game Response**|On small screens: tighter viewport creates natural tension and mystery. Content at the edges is partially obscured. On first switch to larger screen: a narrative moment acknowledging expanded perception. Could be tied to cultivation realm — higher cultivation = more visible world, which naturally correlates with players who invest more (and may play on desktop).|
|**Impact**|**Medium** — Mostly ambient. The device-switch moment is strong but not controllable.|
|**Difficulty**|**Medium** — Responsive design is standard. Making it feel intentional rather than just adaptive requires careful art/UX work.|

## **4.3 — Battery Level**

|**Detection**|Battery Status API (navigator.getBattery()). Note: deprecated in some browsers, best on Chrome/Android. Feature-detect and gracefully degrade.|
| :- | :- |
|**Diegetic Name**|Life Force Depletion / Spiritual Energy Waning|
|**What Happens**|The device’s battery becomes the player’s spiritual energy reserve. Low battery triggers ambient messages in the cultivation log: "You feel your life force waning. The world grows dim." The screen could subtly desaturate. If the player attempts a tribulation on low battery, the heavens are literally consuming their power source.|
|**Game Response**|Purely ambient — never gate real content behind battery level. Flavor text in logs, subtle visual shifts, maybe an NPC comment about the character looking tired. If battery dies mid-game, the next session could reference "your spirit nearly faded from this world." A fun discovery moment, not a mechanic.|
|**Impact**|**Medium** — A delightful surprise for players who notice. Low stakes but high charm.|
|**Difficulty**|**Low** — Simple API call with feature detection. Limited browser support reduces reach but zero downside for unsupported browsers.|

## **4.4 — Language and Locale**

|**Detection**|navigator.language, navigator.languages array. Detect changes via languagechange event (rare but possible).|
| :- | :- |
|**Diegetic Name**|Regional Spiritual Heritage / Birthplace of the Soul|
|**What Happens**|Without asking the player where they’re from, the game subtly flavors the starting environment. Technique names carry regional resonance. The sect’s traditions feel aligned with the player’s cultural context. If the browser language changes mid-playthrough, the character has been "reincarnated into a foreign land" — NPCs speak differently, the Dao has a different flavor.|
|**Game Response**|Subtle flavor differences: naming conventions for techniques, architectural style of the starting sect, philosophical emphasis (Daoist, Buddhist, Confucian undertones). Never a hard mechanical difference — just atmosphere. Language-change detection as a narrative event is a rare but powerful moment for bilingual players or players traveling internationally.|
|**Impact**|**Medium** — Mostly atmospheric. The language-change event is high impact but extremely rare.|
|**Difficulty**|**Medium** — API is simple. Writing culturally sensitive flavor variations requires care and research.|

## **4.5 — Sound and Silence**

|**Detection**|Web Audio API context state. Track whether audio has ever been enabled (requires user gesture). Detect mute/unmute transitions.|
| :- | :- |
|**Diegetic Name**|Silent Meditation / Opening the Heavenly Ear|
|**What Happens**|A player who plays in silence is cultivating in stillness. A player with sound on is attuned to the world’s vibrations. The first time a silent player unmutes, the game introduces a sound it has been "making all along" — a distant bell, a heartbeat, a whispered voice. The character has been deaf to the world’s true sounds. Now they hear.|
|**Game Response**|Silent-meditation path: subtle bonuses to contemplative activities, inner-world focus. Sound-attuned path: ambient awareness, better detection of hidden events through audio cues. The unmute moment: a carefully designed audio reveal that feels like awakening a new sense. If the player has been playing for hours in silence, this lands with enormous emotional weight.|
|**Impact**|**High** — The unmute moment is potentially one of the most goosebump-inducing events in the entire game.|
|**Difficulty**|**Medium** — Web Audio API has quirks around autoplay policies. The sound design itself needs to be excellent for the reveal to land.|


# **Category 5: Identity & Intent**
These use cases read the player’s identity signals — who they are, what they want, and how they approach the world. These are the inputs that shape the player’s unique cultivation path.

## **5.1 — Character Naming**

|**Detection**|Analyze the text input: length, character set (Latin, CJK, etc.), profanity detection, comparison to known names (pop culture references, meme names, serious fantasy names).|
| :- | :- |
|**Diegetic Name**|True Name / Destiny Inscription|
|**What Happens**|The name tells you about the player’s approach. On second prestige, the name field pre-fills with the previous name, slightly altered — a past-life echo. The player can change it, but the game remembered. After multiple cycles with the same name: "That name echoes through the heavenly records. It has been spoken before, in lives you do not remember."|
|**Game Response**|Consistent name across prestiges builds "name karma" — NPCs start to feel the weight of it. Changing names each cycle makes the character a "wandering soul" — harder to track, less connected to the world, but more free. A name that matches a historical figure in-world could trigger unique encounters. The name field itself is a choice the player didn’t realize they were making.|
|**Impact**|**High** — The pre-filled name on prestige is a quiet, unsettling moment. Builds over multiple cycles.|
|**Difficulty**|**Low** — String storage and comparison. Name analysis can be as simple or complex as desired.|

## **5.2 — The Very First Click**

|**Detection**|Track the first interactive element the player engages with after the game opens. The starting screen presents multiple options without guidance.|
| :- | :- |
|**Diegetic Name**|Spiritual Root Awakening / First Instinct of the Soul|
|**What Happens**|The player is presented with a mortal village, no instructions. Training grounds, market, forest edge, elder’s house, temple. Where they go first reveals instinct: ambition, pragmatism, curiosity, respect, devotion. This initial unconscious choice quietly seeds their "spiritual root affinity" — a hidden stat that influences cultivation compatibility.|
|**Game Response**|Runs later, when the spiritual root type finally appears on the cultivation panel, it traces back to that first unconscious click. The player realizes the game was watching from the very first second. This single moment retroactively reframes the entire early game as a silent assessment. The village was a test. Everything was always a test.|
|**Impact**|**Very High** — The retroactive realization that the first click mattered is one of the strongest meta-moments possible.|
|**Difficulty**|**Low** — Single event listener on game start. The design challenge is making the starting screen feel neutral, not like a test.|

## **5.3 — Cursor Hover Patterns**

|**Detection**|Mouseenter/mouseleave events on interactive and non-interactive elements. Track hover duration and frequency on elements the player cannot yet access.|
| :- | :- |
|**Diegetic Name**|Spiritual Intuition / The Pull of Destiny|
|**What Happens**|Before the player clicks anything, they hover. A cursor that keeps drifting toward the cultivation master’s hut at the edge of town — before cultivation is even unlocked — reveals unconscious attraction. The character doesn’t know what qi is, but something pulls them toward that place. The player doesn’t know what that building does, but they keep looking at it.|
|**Game Response**|When the player finally unlocks cultivation: "You have always been drawn to this place, haven’t you?" The player feels a chill because they WERE. Hover patterns on locked content can influence which path opens first or which NPC approaches the character. "I noticed you lingering outside my door these past weeks. Perhaps it is time we spoke."|
|**Impact**|**High** — Transforms passive browsing into narrative destiny. The player’s idle curiosity becomes their character’s fate.|
|**Difficulty**|**Low** — Standard DOM events. Needs noise filtering — distinguish intentional hovering from cursor-passing-through.|

## **5.4 — Scroll Attention on Lore Content**

|**Detection**|Intersection Observer API on lore/text sections. Track scroll position, time spent with each section in viewport, scroll direction (did they scroll back up to re-read?).|
| :- | :- |
|**Diegetic Name**|Scripture Study / Sutra Comprehension|
|**What Happens**|If the game has a log, journal, or any scrollable lore, you know exactly what the player read. Most players skip cultivation manual flavor text. But a player who scrolls through the entire "Sutra of the Azure Sky" has studied the scripture. The character studied. The player studied. Same act, same reward.|
|**Game Response**|Hidden techniques embedded in lore text that only unlock if the section was actually read (time in viewport). Comprehension bonuses for studied scriptures. An NPC who tests your knowledge of a text you were given — attentive players pass, skimmers fail. Re-reading (scrolling back up) could deepen comprehension further, mirroring how xianxia cultivators meditate on scriptures repeatedly.|
|**Impact**|**High** — Makes lore genuinely mechanically relevant. Players learn that the game rewards real reading.|
|**Difficulty**|**Low** — Intersection Observer is performant and well-supported. Needs reading-speed calibration.|


# **Category 6: Interface Transgression**
These use cases repurpose browser-level interactions — right-click, refresh, bookmarking, the tab bar itself — as cultivation tools. The browser is not a container for the game; it IS part of the game world.

## **6.1 — Right-Click as Dao Manipulation**

|**Detection**|contextmenu event. Intercept and replace with custom context menu or suppress entirely.|
| :- | :- |
|**Diegetic Name**|Grasping at the Fabric of Reality|
|**What Happens**|At mortal level, right-click does nothing — mortals cannot interact with the Dao directly. At cultivator level, right-click opens a "Dao Menu" — a themed context menu for manipulating underlying laws. At the highest level, the Dao Menu contains options that genuinely alter game rules. The player’s instinct to right-click was always correct — they just lacked the cultivation to make it work.|
|**Game Response**|Progressive right-click functionality tied to cultivation. Early: nothing, or a single cryptic symbol. Mid: a context menu with inspect/analyze options for game elements. Late: reality-editing tools disguised as context menu items. The player earns the power they were always instinctively reaching for.|
|**Impact**|**High** — Repurposing a universal browser interaction as a cultivation gate is unexpected and delightful.|
|**Difficulty**|**Medium** — Custom context menus require careful positioning and mobile considerations (long-press equivalent).|

## **6.2 — Browser Refresh / Back Button as Fate Reversal**

|**Detection**|beforeunload event, performance.navigation.type, or PerformanceNavigationTiming to distinguish refresh from close. Aggressive auto-save on every state change.|
| :- | :- |
|**Diegetic Name**|Attempting to Reverse the River of Time|
|**What Happens**|A player hits refresh after a bad outcome, hoping to undo it. At mortal level, fate is sealed — the outcome was already saved, the refresh changes nothing. The character cannot reverse time. At the highest cultivation level, the game grants an in-game rewind ability that does exactly what the refresh was trying to do. The player eventually EARNS the power they were always trying to steal.|
|**Game Response**|Track refresh-after-failure attempts. If repeated: "The River of Time does not bend to mortal will. You have tried to turn it back [N] times. Perhaps one day you will have the power." Late-game time-reversal technique that legitimizes what was once transgression. The payoff is enormous because the player remembers every frustrated refresh that did nothing.|
|**Impact**|**Very High** — The long-arc payoff of earning time-reversal is one of the best possible meta-narrative moments.|
|**Difficulty**|**Medium** — Aggressive auto-save to prevent actual state reversal. Distinguishing refresh from close is imperfect.|

## **6.3 — Window Title and Favicon Manipulation**

|**Detection**|Not detection — output. document.title and dynamic favicon updates (canvas-drawn favicons).|
| :- | :- |
|**Diegetic Name**|Reality Leaking Beyond Its Container|
|**What Happens**|The browser tab is part of the player’s perceptual field but OUTSIDE the game window. The tab title changes to reflect the character’s state: their mortal name at first, then their cultivation title. During inner demon sequences, the tab title changes to something unsettling — "I can see you" or "turn back" — because the inner demon is a psychic entity that attacks through perception, and the tab bar IS perception.|
|**Game Response**|Progression-based title evolution: "[Name] — Village Life" → "[Name] — Qi Condensation Stage 3" → "[Title] [Name] — Nascent Soul Realm." The favicon could shift from a plain icon to a glowing cultivation symbol. During tribulations, the favicon could flash or change to a lightning bolt. The title becomes a status display that’s always visible, even when the tab is in the background.|
|**Impact**|**High** — The inner-demon-in-the-tab-title moment is genuinely unsettling. Low-cost, high reward.|
|**Difficulty**|**Low** — document.title is one line of code. Dynamic favicons require canvas but are well-documented.|

## **6.4 — Bookmark and Return Method**

|**Detection**|document.referrer on page load. Distinguish: direct navigation (typed URL or bookmark), search engine referral, external link referral. Heuristic, not perfect.|
| :- | :- |
|**Diegetic Name**|The Method of Return / How the Soul Finds Its Way|
|**What Happens**|A bookmarked player has "engraved the path to this world in memory." A player typing the URL finds "the path through willpower." A search engine referral means "fate guided them to rediscover what was lost." Each return method subtly flavors the opening moments of the session. The character wakes from meditation feeling certain, determined, or destined.|
|**Game Response**|Subtle flavor text on session start based on referrer. Build a "return method" profile over time. Consistent bookmarkers show discipline. Varied methods show a wandering spirit. Mostly atmospheric, but could influence NPC greetings or the ambient state of the world on load.|
|**Impact**|**Low** — Subtle atmospheric layer. Most players won’t consciously notice.|
|**Difficulty**|**Low** — Referrer detection is simple. Bookmark detection is heuristic at best.|

## **6.5 — Screenshot Detection**

|**Detection**|Keyboard shortcut detection (PrintScreen, Cmd+Shift+3/4 on Mac). Heuristic — cannot detect all screenshot methods. Best effort.|
| :- | :- |
|**Diegetic Name**|Creating a Recording Jade / Capturing a Moment in Crystal|
|**What Happens**|At low cultivation, screenshots capture a slightly different image than what’s on screen — the recording jade is imperfect, mortal tools can’t perfectly capture spiritual reality. At high cultivation, screenshots could contain hidden details not visible during normal play. Secrets embedded in the act of sharing.|
|**Game Response**|Flash a brief overlay during detected screenshot that adds or removes elements — invisible during play, visible in the capture. A watermark-like cultivation seal. Hidden text that only appears in screenshots. "If you are seeing these words, this image was captured from within the Dao. What you see here may not match what the capturer saw."|
|**Impact**|**Medium** — Community discovery potential is high. Detection unreliability limits consistent delivery.|
|**Difficulty**|**High** — Unreliable detection. Screen-recording and third-party tools are invisible to the page.|


# **Category 7: Social & External**
These use cases connect the player’s game experience to the world beyond the game — other players, external communities, and the act of sharing itself.

## **7.1 — Prestige Timing Optimization**

|**Detection**|Compare the player’s prestige point to the mathematically optimal reset point. Track whether they prestige early (impatient), late (greedy/cautious), or optimally (analytical).|
| :- | :- |
|**Diegetic Name**|The Patience of the Dao Heart / Greed and Restraint|
|**What Happens**|The player’s prestige timing across multiple cycles reveals their fundamental approach to the game. Early prestigers are reckless but adaptable. Late prestigers are greedy or thorough. Optimal prestigers have studied the Dao of Numbers. The game interprets this pattern as the character’s "Dao temperament" and adjusts the world accordingly.|
|**Game Response**|Tribulation difficulty and type shifts based on prestige pattern. An impatient player faces tribulations about patience. A greedy player faces temptation trials. An optimal player faces trials that can’t be optimized — forcing them out of their comfort zone. NPCs comment on the cultivator’s approach: "You always reach for the next realm before this one is complete. There is power in that, and danger."|
|**Impact**|**High** — Connects the core incremental-game loop to narrative characterization. Every prestige becomes a character-defining act.|
|**Difficulty**|**Medium** — Requires calculating optimal prestige point, which depends on game economy balance.|

## **7.2 — Guide/Wiki Consultation Detection**

|**Detection**|Heuristic: player tabs away, returns, and immediately makes an optimal or unusual choice they were struggling with. Tab-away duration + post-return behavior change = probable external consultation. Not provable, but statistically inferrable.|
| :- | :- |
|**Diegetic Name**|Consulting the Oracle / Receiving Guidance from Beyond|
|**What Happens**|The player left the game, consulted a wiki or guide, and returned with knowledge they didn’t earn in-world. In xianxia terms, they "received a divine transmission" — knowledge from a higher source. The game doesn’t punish this. It acknowledges it. "You seem to know things you should not. Has someone been whispering the Dao’s secrets to you?"|
|**Game Response**|Light-touch acknowledgment, never punishment. An NPC who acts as an in-world "wiki" — "You could figure this out yourself, or I could tell you. But knowledge given is not the same as knowledge earned." The game offers its own guidance system that’s diegetically framed, competing with external wikis by being more atmospheric and in-character.|
|**Impact**|**Medium** — The wink-and-nod acknowledgment is charming. Over-doing it would feel invasive.|
|**Difficulty**|**High** — Entirely heuristic. High false-positive rate. Should be very subtle and never consequential.|


# **Implementation Priority Matrix**
Organized by the combination of impact and difficulty. Start with Tier 1 — these are the highest-impact, lowest-difficulty use cases that establish the meta-design language early.

## **Tier 1: Build First (High Impact, Low Difficulty)**

|**#**|**Use Case**|**Why First**|
| :- | :- | :- |
|1\.1|Zooming to Read Hidden Values|Already implemented. Template for everything else. Proves the pattern works.|
|1\.3|Copy-Pasting Game Content|Trivial to implement, extremely surprising moment. Immediate viral potential.|
|2\.1|Tab Switching / Leaving the Game|One API call. Transforms every return-to-game into narrative. Essential for idle game.|
|2\.3|Rage-Quit Detection & Return|Simple timestamp math. Extremely emotionally powerful. Strong retention mechanic.|
|3\.1|Click Patterns During Events|Simple frequency tracking. Directly shapes tribulation outcomes.|
|3\.2|Dialog Read Speed|Trivial implementation. Rewards engagement with writing. Shapes NPC relationships.|
|3\.3|Decision Deliberation Time|Timestamp delta. Builds Dao Heart profile that feeds into tribulations.|
|5\.1|Character Naming + Cross-Prestige Echo|String storage. The pre-filled name on prestige is quietly devastating.|
|5\.2|The Very First Click|Single event listener. Retroactive payoff runs later is one of the strongest moments.|
|5\.3|Cursor Hover Patterns|Standard DOM events. Turns idle browsing into destiny.|
|6\.3|Window Title / Favicon Manipulation|One line of code for title. Inner-demon-in-tab is high-impact horror moment.|

## **Tier 2: Build Second (High Impact, Medium Difficulty)**

|**#**|**Use Case**|**Why Second**|
| :- | :- | :- |
|1\.2|Dev Tools / Source Inspection|High community impact (shared lore). Needs build-pipeline work for embedded comments.|
|1\.4|Save Data Editing|Requires integrity system. The "cheating unlocks content" payoff is extraordinary.|
|2\.2|Idle Time Patterns Across Days|Needs multi-day data before activating. Build the tracker early, use the data later.|
|3\.4|Typing Patterns in Free-Text|Keystroke analysis is easy; writing believable responses to patterns requires nuance.|
|4\.1|Seasonal / Calendar Awareness|Date math is simple. Balancing so calendar-unaware players aren’t disadvantaged takes care.|
|4\.5|Sound and Silence|Web Audio quirks. The unmute reveal needs excellent sound design to land.|
|5\.4|Scroll Attention on Lore|Intersection Observer is simple. Needs enough written lore to reward attention.|
|6\.1|Right-Click as Dao Menu|Custom context menu needs positioning work. Mobile long-press equivalent needed.|
|6\.2|Refresh / Back as Fate Reversal|Aggressive auto-save needed. Long-arc payoff of earning time-reversal is incredible.|
|7\.1|Prestige Timing Optimization|Needs prestige economy to be balanced before optimal-point calculation works.|

## **Tier 3: Build When Ready (Medium Impact or High Difficulty)**

|**#**|**Use Case**|**Notes**|
| :- | :- | :- |
|2\.4|Multiple Tabs (Clone Cultivation)|Complex cross-tab sync. The early-punishment-to-late-feature arc needs the late game to exist first.|
|3\.5|Mouse Movement During Idle|Philosophically rich but subtle. Good for polish phase.|
|3\.6|Failed Attempts / Perseverance|Needs skill-based moments to exist first. Build the tracker, design the path later.|
|4\.2|Screen Size / Device Type|Mostly ambient. The device-switch moment is strong but not controllable.|
|4\.3|Battery Level|Delightful but limited browser support. Pure flavor, no mechanical weight.|
|4\.4|Language and Locale|Requires culturally sensitive writing. Best done with consultation.|
|6\.4|Bookmark / Return Method|Very subtle. Atmospheric layer for polish phase.|
|6\.5|Screenshot Detection|Unreliable detection limits consistency. Fun community moments when it works.|
|7\.2|Wiki Consultation Detection|Entirely heuristic. Must stay extremely subtle to avoid feeling invasive.|



*End of Use Case Catalog*
