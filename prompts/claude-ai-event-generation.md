# Event Batch Generation

---

You are a game content designer and xianxia genre expert. You have deep literacy in cultivation-novel tropes (RMJI, BTTH, Top Tier Providence, ISSTH, Reverend Insanity, classic wuxia) and you know how to adapt them faithfully rather than generically.

Your mission: design a batch of **~20 game events** for the opening hour of an incremental xianxia life-sim, following the frozen schema, laws, and process below.

## 1. The game

An incremental idle/life-sim. One run = one life; death → reincarnation is the prestige loop. Four macro phases (Mortal/Wuxia → Immortal Cultivation → Supreme Ascension → Cosmic); **only the Mortal phase exists today and that is what you are writing for**.

The player is a 12-year-old who just arrived alone in **Ironveil City** with 10 copper coins, chosen one of three backgrounds (farmer / orphan / soldier's child) via an opening dialogue with a strange old man on an ox-cart — an elder with "eyes sharp as broken jade" who stepped off the moving cart _and was simply gone before he touched the ground_. That vanishing is the ONLY supernatural thing the player has ever witnessed.

Core design pillars you must serve:

- **Diegetic mechanics** — everything explainable in-world.
- **Story through mechanics, not exposition** — the world reveals itself through play.
- **Cultivation IS grinding** — time spent is the engine of progress.
- **Tone rule** — narrative text uses xianxia novel voice; UI labels are always plain and unambiguous.

### Time and world facts

- 1 day = 24 hours of schedulable time. 30 days = 1 month. 60 days = 1 year. Starting age 12, lifespan 60.
- The player schedules activities into a daily plan; activities consume hours and grant rewards.
- Stats are only **Strength** and **Dexterity** for now. The player perceives them as words, not numbers ("Feeble → Wiry → Sturdy → Strong → Mighty"; "Clumsy → Spry → Nimble → Deft → Fleet"). Most early players sit in the bottom two tiers.
- Currency is copper coin. For scale only (do NOT use raw numbers, see §6): a full day of begging earns roughly one day of poor food; honest labor earns a bit more; the player starts nearly destitute.

### Places (the whole map today)

- **Ironveil Streets** (`cityStreets`, start) — "Mud and noise. The city churns past you without a glance." Activity: Beg. Existing action: _Speak to the ragged elder_ ("he watches you from the gutter", kind: talk).
- **Labor Yard** (`laborYard`) — "Carts, crates, and foremen barking for hands." Activities: Mine Ore, Farm Fields.
- **Market Square** (`marketSquare`) — "Merchants haggle beneath faded banners." Activities: Help the Elders, Network with Merchants. Existing action: _Food stall_ ("spend coin to eat", kind: shop).

### Activities (the full list)

Place-bound: `beg`, `mineOre`, `farmFields`, `helpElders`, `networkMerchants`.
Self-scoped (doable anywhere, live in a separate tab): `liftWeights`, `bodyConditioning`, `footworkDrills`, `readClassics`, `studyFormations`, `copyScrolls`.

Activity categories gate visibility: `work` is open from the start; `study` unlocks at age 15; `social` at Strength 20. The **`training` category (liftWeights / bodyConditioning / footworkDrills) has NO unlock path by design — one of YOUR events must open it** via `{ type: "unlock_category", category: "training" }`: someone or something teaches the player that a body can be *built*, not just spent. Make that event earn the moment (it is the player's first step on the martial road); gate it so it can't fire in the opening minutes (e.g. a labor threshold, a stat floor, or a cost).

### Tone exemplar (Feels too generic, a more xianxia feel would be good)

> "The ox-cart groans along a mud road. Beside you, an old man with white hair and still eyes watches the passing trees. He does not look at you when he speaks."

> "You arrive in Ironveil with mud still on your boots and a hunger you have learned to ignore. The city is loud. Everything costs money you do not have."

Grounded, economical, second person, present tense, no purple prose. Dialogue is sparse and weighted.

One seasoning on top of that register: the genre's English is _translation-English_, and its slightly broken, slightly formal cadence is part of the charm — calques and stock idiom like "courting death", "this one", "Senior", "giving face", "a mere mortal". That idiom is shared genre language, owned by no single work or translator. Let it color **dialogue and spoken idiom** where a character would plausibly talk that way; keep narration in the exemplar's voice. Seasoning, not parody — one calque that lands beats five that wink.

## 2. The frozen event schema

You generate content **against this schema**. The structure is non-negotiable; the _effect and condition vocabularies_ may be extended via flagged proposals (§3).

```ts
type EventKind = "interrupt" | "dialogue" | "ambient" | "activityOutcome";

type Recurrence =
  | { type: "once" } // once per life — narrative beats
  | { type: "cooldown"; days: number } // re-arms after N in-game days
  | { type: "calendar"; every: "month" | "year"; day: number }; // monthly sale, annual auction…

type Magnitude = "trivial" | "small" | "medium" | "large" | "windfall"; // coin/damage/heal
type StatMagnitude = "minor" | "moderate" | "major";
type Chance = "common" | "uncommon" | "rare";

type GameEventDefinition = {
  key: string; // unique camelCase
  kind: EventKind;
  title: string; // plain UI text (shown in modal header / log)
  recurrence: Recurrence;
  conditions: UnlockCondition[]; // eligibility gate — when may this fire at all
  placeKey?: string; // interrupt/ambient: only fires while player is here
  actionKey?: string; // dialogue: which place action opens it (may propose new actions)
  activityKey?: string; // activityOutcome: which activity rolls it on completion
  chance?: Chance; // for rolled kinds (interrupt, ambient, activityOutcome)
  entry: string; // id of the opening step
  steps: Record<string, EventStep>; // the step graph, keyed by step id
};

type EventStep = {
  text: string; // xianxia novel voice
  speaker?: string; // for dialogue lines
  effects?: Effect[]; // applied on reaching this step
  choices?: EventChoice[]; // ABSENT = terminal step (event resolves after text)
};

type EventChoice = {
  label: string; // short; in-character quotes allowed
  requires?: UnlockCondition[]; // unmet ⇒ shown but locked (telegraphs depth)
  costs?: Effect[]; // paid when picked (coin, hp…)
  goto?: string; // next step id; ABSENT = picking this resolves the event
  effects?: Effect[]; // applied when picked
};
```

### How the four kinds behave at runtime

- **interrupt** — pauses the entire game; a modal demands a choice. The world is frozen mid-moment: write the text accordingly (present, immediate, something is happening TO you).
- **dialogue** — the player clicks a place action (free, repeatable navigation). Opening it costs and grants nothing; any reward inside must sit behind a costed/conditioned/once-gated choice.
- **ambient** — a single terminal step, no choices, **zero mechanical effects**. Pure world texture dropped into the narrative stream.
- **activityOutcome** — rolls when a specific activity unit completes. The hook is "the hours you spent took an unexpected turn."

### Existing vocabularies (And more could be created if needed)

```ts
type UnlockCondition =
  | { type: "stat"; stat: "Strength" | "Dexterity"; operator: ">=" | ">" | "<=" | "<" | "=="; value: number }
  | { type: "age"; operator: ...; value: number }
  | { type: "activity_completions"; activityKey: string; count: number }
  | { type: "activity_level"; activityKey: string; level: number }
  | { type: "currency"; operator: ...; value: number }
  | { type: "day"; operator: ...; value: number }
  | { type: "and"; conditions: UnlockCondition[] }
  | { type: "or"; conditions: UnlockCondition[] };

type Effect =
  | { type: "grant_currency"; amount: number; uncertain?: boolean }
  | { type: "grant_stat"; stat: Stats; amount: number }
  | { type: "spend_currency"; amount: number }
  | { type: "log"; message: string }
  | { type: "damage"; amount: number }
  | { type: "heal"; amount: number }
  | { type: "unlock_category"; category: ActivityCategory }
  | { type: "unlock_nav"; tab: NavigationItem }
  | { type: "unlock_activity"; key: string }   // reveal a gated activity
  | { type: "unlock_place"; key: string };     // reveal a gated place
```

## 3. Proposing beyond the vocabularies

The existing unions are deliberately narrow. You MAY use condition or effect types that don't exist yet (e.g. `set_flag`/`flag` checks, `grant_item`, `unlock_place`, `unlock_action`, background checks, karma) when an event genuinely needs them — but every use must be **flagged**:

- Mark it `PROPOSED` wherever it appears.
- Maintain a **Proposed Extensions Register** at the end of your output: each proposed type, its shape, one-line rationale, and which events depend on it.
- Prefer the existing vocabulary when it can express the idea. An event that needs three new systems is probably the wrong event for batch one.

## 4. Hard laws (violations = rejected event)

1. **Free ⇒ no reward; reward ⇒ gated or costed.** Navigation and opening dialogues are free and grant nothing. Anything that grants must be time-costed, coin-costed, condition-gated, or once/cooldown/calendar-limited. No event may be farmable if it breaks the game.
2. **Ambient events carry zero mechanical payload.** Text only.
3. **Grounded trope dial: cultivation at the edges.** This is street-level mortal life. The supernatural may appear ONLY as rumor, glimpse, aftermath, or ambiguity — never on-screen power, never confirmed qi, no realms, no spirit stones changing hands in front of the player. A sect's servant buying odd herbs: yes. A cultivator flying overhead: no. Honor the genre's slow-reveal promise.
4. **Standalone events only.** No cross-event chains, no flag-driven arcs in this batch. Multi-step branching INSIDE one event is encouraged.
5. **Every choice must matter** — different text at minimum, different consequences ideally. No fake choices.
6. **Locked choices telegraph.** When you gate a choice (`requires`), its visible label should make the player feel the build they don't have ("[Sturdy] Shoulder the cart off him").
7. **Narrative recurrence sense.** `once` for anything a person could only live once; `calendar` for institutional rhythms (monthly market sale, annual festival/auction); `cooldown` for re-armable texture. Never make a unique stranger reappear via cooldown.
8. **Tone rule.** Step text = novel voice. Titles and choice labels = plain and readable (in-character quoted lines allowed as labels).
9. **The player may be any background** (farmer/orphan/soldier). Write background-agnostic, or use a flagged PROPOSED background condition for at most 1–2 events.

## 5. Genre use and originality

Work without hesitation: I want your **full, deep, specific** knowledge of this genre — its tropes, conventions, archetypes, story grammar, pacing instincts, and the accumulated craft of hundreds of novels. Tropes and conventions are the genre's shared inheritance; engaging with them deeply is exactly what every author in this tradition does, and it is what you are asked to do here. Analyze, name, and discuss existing works freely. Originality lives in the staging: take the shared pattern, then invent everything specific yourself. Depth and specificity are the quality bar — go all the way in.

How to stay original while going deep:

- **The many-sources test.** Build from elements that recur across the genre (the destitute elder who is more than he seems, the auction, the talent test — staples owned by no one). When an element traces to exactly one identifiable novel — a distinctive artifact, a signature scene staged a particular way, a unique mechanic — dig down to the genre pattern underneath it and build from that instead.
- **Invent every proper noun.** Characters, sects, techniques, artifacts, places: all named fresh, fitted to Ironveil's grounded register.
- **Write every line fresh.** All prose is composed new for this game in the §1 tone, in your own phrasing (this applies to translated prose too — English translations carry their own copyright).
- **Beats, not scenes.** The trope a card names is the genre-level pattern; the staging — who, where, what's said, what's at stake, every concrete detail — is your original invention inside this game's world.
- **Cite freely.** Works named as tonal or genre reference points (as §1 does) are exactly that — touchstones for register and craft.

## 6. All magnitudes are placeholders

Use NO raw numbers in costs, rewards, damage, or chance. Use the tokens: `Magnitude` for coin/damage/heal, `StatMagnitude` for stat grants, `Chance` for roll likelihood. Condition _thresholds_ (stat ≥ X, day ≥ X) may use the real scales given in §1 — those define WHEN, not how much. Balance is tuned at import.

## 7. The batch

No need for quotat, you are given complete freedom

- **interrupt** events (the "you are played" moments)
- **dialogue** events — must include content for the two existing actions (the ragged elder in the streets; the food stall) and may propose new place actions
- **ambient** events
- **activityOutcome** events, spread across different activities (include at least one on `beg` and one on a self-scoped activity)

Draw deliberately on xianxia/wuxia staples adapted to mortal street level — e.g. the condescending young master and his entourage, the destitute elder who is more than he seems, the fortune teller who refuses payment, the bone-age/talent test rumor, the auction house, the pawnshop that undervalues a strange trinket, the recruitment notice, the overheard rooftop footsteps, the herb-buying servant, the beggars' pecking order, the too-cheap manual of dubious provenance. **Name the trope you're using in each design card** — and subvert or ground at least a third of them.

## 8. Process — two phases, stop between them

### Phase A — design cards (do this first, then STOP and wait for my approval)

For each event, output a compact design card:

```
### <key> — <title>
kind / recurrence / chance · trope: <named trope> (+ subversion if any)
trigger: <conditions + place/action/activity binding, in words>
beat: <2-3 sentences — what happens, why it's interesting>
steps: <step graph sketch: step ids, choices with [requires]/[costs], goto arrows, outcomes>
payload: <effects per outcome, placeholder magnitudes; PROPOSED items marked>
why it's not exploitable: <one line against law #1>
```

After the cards, append the draft Proposed Extensions Register. Then stop. I will cut, edit, and approve.

### Phase B — data (only after I approve)

Emit the approved events as a single TypeScript `data/events.ts`-style file: one `defineEvent({ ... })` call per event (the game's authoring helper — steps as a `Record<stepId, step>` plus `entry`), camelCase keys, full step text written out, `// PROPOSED` comments on every extension use, and the final Proposed Extensions Register as a comment block at the end. No prose outside the file.

Magnitudes in Phase B are written as identifiers from the game's tuning table (`import { COIN, STAT, HP } from "@/game/data/balance"`): `COIN.trivial|small|medium|large|windfall` for currency amounts, `STAT.minor|moderate|major` for stat grants, `HP.trivial|small|medium|large` for damage/heal. `chance` stays a string literal (`"common"` etc.). Never a raw number.

Begin with Phase A.
