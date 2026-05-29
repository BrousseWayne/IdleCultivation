# Immortal Cultivation — UI/UX Reference Guide

> Updated against current build (Day 740 screenshots). Completed items removed.
> Scope: visual design, layout, animation, color, typography, and interaction patterns only.

---

## Current state summary

The foundation is solid. Section accent colors with left-border indicators replace the old purple monoculture. Cinzel display font gives titles personality. The Activities page uses a row-based layout with inline controls, Time Budget panel, and Queue panel. The top bar stat capsule (gold/red/blue with shape indicators) is compact and accessible. The denomination money system (G/S/B) reinforces the setting. Icon-only navigation is compact.

**What remains is juice, polish, and information density** — the difference between "good layout" and "feels like a game."

---

## 1. Sidebar: rates of change and cultivation progress

The sidebar currently shows static values. Idle games live on **rates of change** — the number going up *per tick* matters more than the current total.

**Add rate displays:**

```
Satiety    100/100  (-3/day)
HP         100/100  (+0/day)
Net        +0g      ← already shown, good
```

Color-code rates: green for positive, red for negative, gray for zero. Use a smaller font size (0.75rem) for the rate, inline after the value. When satiety starts draining, the red rate becomes the most important signal on screen.

**Add a Cultivation section** below Attributes:

```
| CULTIVATION
  Realm: Mortal
  Progress: ████░░░░░░ 42%
  Next: Qi Condensation
```

This gives players a persistent long-term goal visible from every page. The "Mortal" badge in the top bar is good for identity; the sidebar bar is for tracking progress. When a breakthrough approaches, the bar should pulse with the next realm's accent color.

**Conditional display:** Only show the Cultivation section once the mechanic unlocks. Don't show rate displays for stats that haven't started changing yet (e.g., if HP is always 100/100 in early game, skip the rate until combat begins).

---

## 2. Activity efficiency metrics

The Activities page layout is strong. The missing piece is **comparative efficiency** — letting players optimize without mental math.

Each activity row currently shows: icon, name, level, reward badges, ±stepper, hours allocated, multiplier, base cost. Add a faint **per-hour efficiency rate** after the reward badges:

```
Beg         Lv.1   ● +100    (12.5/h)   —  0h  +   x166  8h
Farm Fields Lv.1   ● +80     (13.3/h)   —  0h  +   x6    6h
```

Display as muted text (`opacity: 0.5`, same color as the reward). This single number makes optimization intuitive: Farm Fields is more efficient than Beg per hour despite lower absolute reward. Progress Knight and Increlution both validate that players want this number visible.

**Resource projections** (lower priority): When the player hovers over an activity row or adjusts hours, show a tooltip: "If you allocate 8h → +800●/day, reach next level in ~3 days." This eliminates guesswork and rewards planning.

---

## 3. Empty states that direct player action

The Explore page shows "No locations discovered yet" with a gray icon. This is the default empty state pattern, but for a game it's a missed opportunity.

**Good empty states tell the player what to do next:**

```
🌲 The Whispering Forest stretches endlessly before you.
   Allocate time to Exploration in Activities to chart the unknown.
   [→ Go to Activities]
```

Every empty page should follow this pattern: atmospheric flavor text + clear instruction + link/button to the relevant action. The Travel page empty state could show a faded silhouette of the map with a "Begin your journey" prompt. The Quest page empty state could tease upcoming quest availability.

The bottom bar "No activities scheduled" across all pages should either become a **call-to-action** when empty ("Plan your day → Activities") or hide entirely. Once activities are running, it becomes a useful ticker showing current activity progress.

---

## 4. Tab navigation: tooltips and hints

Icon-only navigation with 9 icons works for experienced players but has a learnability gap. **Add tooltips on hover** with the tab name and a keyboard shortcut hint:

```
[icon hover tooltip]
Activities (3)
```

Where `(3)` is the keyboard shortcut. This costs almost nothing to implement and eliminates the memorization burden.

**Notification dots:** Add a small colored dot on tabs with pending actions — unallocated time on Activities, completable quest on Quests, available breakthrough on Cultivation. The Prestige Tree uses red outlines when an upgrade is purchasable; a dot is the lighter-weight version of this pattern.

---

## 5. Travel map node differentiation

All map nodes are currently the same gray circle with no way to distinguish current location, accessible destinations, or locked regions.

**Recommended node states:**

| State | Visual |
|-------|--------|
| Current location | Accent-colored node with breathing glow animation |
| Accessible (can travel to) | Lighter colored node, full opacity |
| Discovered but inaccessible | Dimmed node, reduced opacity |
| Undiscovered (adjacent to known) | Gray "?" silhouette |
| Unknown | Hidden entirely |

The **current location** is the most important — give it a distinct glow or ring. Connection lines between accessible nodes should be solid; lines to inaccessible nodes should be dashed (you already use dashes, good). Consider labeling discovered nodes directly on the map rather than only in cards below.

The destination cards below the map are well-structured (name, description, travel time badge). Add a visual indicator for which locations are reachable from the current position vs. requiring intermediate travel.

---

## 6. Animation and juice — implementation priority list

These are ordered by impact-to-effort ratio. Each tier builds on the previous.

### Tier 1 — immediate impact (30 min each)

**Button press feedback:**
```css
.activity-button:active {
  transform: scale(0.95);
  transition: transform 50ms ease;
}
```
Every +/- stepper, every navigation icon, every action button should compress on press. This is the single cheapest way to make a UI feel interactive rather than static.

**Progress bar stripe animation** (for active bars — Time Budget, HP, Satiety, any training in progress):
```css
.progress-bar-active {
  background-image: repeating-linear-gradient(
    -45deg,
    transparent,
    transparent 8px,
    rgba(255,255,255,0.05) 8px,
    rgba(255,255,255,0.05) 16px
  );
  background-size: 200% 100%;
  animation: stripe-move 1s linear infinite;
}
@keyframes stripe-move {
  to { background-position: -32px 0; }
}
```
Moving stripes on an active bar signal "something is happening" — crucial for an idle game where the player is often watching and waiting.

**Tabular numeric figures:**
```css
.number, .resource-value, .stat-value {
  font-variant-numeric: tabular-nums;
}
```
One line that stops number columns from jittering when digits change. If already applied, good — verify it's on every numeric display including the top bar capsule.

**Breathing glow on primary action buttons** (Play/Fast-forward when time is allocated):
```css
.action-ready {
  animation: breathe 2s ease-in-out infinite;
}
@keyframes breathe {
  0%, 100% { box-shadow: 0 0 4px rgba(45, 212, 191, 0.3); }
  50% { box-shadow: 0 0 12px rgba(45, 212, 191, 0.6); }
}
```

### Tier 2 — first sprint (1–3 hours each)

**Floating number popups** for resource gains:
```css
@keyframes float-up {
  0% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(-40px); }
}
.popup-number {
  animation: float-up 1s ease-out forwards;
  pointer-events: none;
  position: absolute;
}
```
Color-code: green for gains, red for losses, gold for money. Object-pool DOM elements (max ~15 simultaneous) to prevent garbage collection stalls.

**Progress bar completion flash:**
When any bar reaches 100% (activity level-up, cultivation milestone), trigger:
```css
@keyframes completion-flash {
  0% { filter: brightness(1); }
  30% { filter: brightness(2.5); }
  100% { filter: brightness(1); }
}
```
Plus a brief glow expansion. This is the single most satisfying micro-interaction in an idle game — the visual payoff for patience.

**Number interpolation (lerp) for resource displays:**
```javascript
let display = 0;
function tick(target) {
  display += (target - display) * 0.1;
  el.textContent = format(display);
  requestAnimationFrame(() => tick(target));
}
```
Apply to money total and primary XP displays. Snap (don't animate) per-second rates and values updating more than 5×/second.

**Tab unlock animation:**
When a new tab icon appears: scale-up from 0→1 over 0.3s with ease-out, plus a "NEW" dot badge that auto-dismisses on first visit. A toast notification confirms: "🔓 Travel Unlocked." This is already planned via progressive disclosure — just make sure the reveal has visual ceremony.

### Tier 3 — polish (2–5 hours each)

**Prestige/rebirth death ceremony:**
1. Mortality critical → screen edges redden (CSS vignette overlay, `box-shadow: inset 0 0 80px rgba(239,68,68,0.4)`)
2. Death → 0.3s screen shake + pulse
3. Fade to black (0.5s) with text: *"The cycle continues..."*
4. Reward screen: clearly show what carries over and what's gained
5. Fade in to new life (0.5s)
6. If realm advanced: CSS custom properties transition to new realm palette over 1s + confetti burst

**Scale prestige animation with frequency:** first rebirth gets the full 2.5s; after the 10th, abbreviate to 0.5s; auto-rebirth gets no animation, just a subtle notification.

**Cultivation realm color shift:**
When breaking through to a new realm, transition all CSS custom properties (accent colors, surface tints) to the new realm's palette over 1s. This is how Antimatter Dimensions marks Infinity→Eternity→Reality. Map your realm progression:

| Realm | Accent |
|-------|--------|
| Mortal | Silver-gray `#94A3B8` |
| Qi Condensation | Pale teal `#14B8A6` |
| Foundation Establishment | Amber `#F59E0B` |
| Core Formation | Soft violet `#A78BFA` |
| Nascent Soul | Deep blue `#3B82F6` |
| Spirit Transformation | Indigo `#6366F1` |
| Void Refinement | Emerald `#10B981` |
| Mahayana | Crimson-to-gold gradient |

**Ambient particles:** tsParticles or canvas-based floating motes matching the current realm color. Keep count under 50. Add a `prefers-reduced-motion` fallback that disables all non-essential animation.

---

## 7. Activity multiplier label clarity

The "x166", "x6", "x4" labels on activity rows are ambiguous — is that repetitions, an efficiency multiplier, or something else? If it's repetition count, consider labeling as "166×" or "repeats 166" or displaying it as a completion count: "▶ 166 runs". If it's a multiplier, prefix with "×" and use a different color from the other numbers to distinguish it from hour costs.

Similarly, "Body Condition..." truncation suggests the name column is too narrow. Allow the name to flex wider, or use a consistent abbreviation scheme.

---

## 8. Color palette reference (current implementation)

Preserving the full palette for reference since it's partially implemented:

**Section accents (sidebar left-borders):**

| Section | Color | Status |
|---------|-------|--------|
| Status | Orange-red | ✅ Implemented |
| Resources | Gold | ✅ Implemented |
| Attributes | Teal | ✅ Implemented |
| Cultivation | (needs assignment) | Not yet added |

**Page title accents:**

| Page | Color | Status |
|------|-------|--------|
| Explore | Cinnabar red | ✅ Implemented |
| Activities | Gold | ✅ Implemented |
| Travel | Sky blue | ✅ Implemented |
| Other pages | TBD | Pending |

**Background surface hierarchy:**
```css
--bg-base: #0B0F14;
--bg-surface: rgba(255,255,255,0.03);
--bg-elevated: rgba(255,255,255,0.06);
--bg-overlay: rgba(255,255,255,0.09);
```

---

## 9. Typography reference (current implementation)

| Role | Font | Status |
|------|------|--------|
| Display (titles, realm names) | Cinzel | ✅ Implemented |
| Body (labels, descriptions) | Inter or current sans | Verify |
| Numbers (all resource counts) | JetBrains Mono or monospace | Verify `font-variant-numeric: tabular-nums` |

Ensure every number in the sidebar, top bar, and activity rows uses the mono/tabular font. The denomination display (3G 68S 38B) should have each segment in mono with the denomination letter in a lighter weight or opacity.

---

## 10. Quick-win checklist

Ranked by impact per hour of development:

1. ☐ Rate-of-change displays on sidebar stats (Satiety, HP)
2. ☐ Cultivation progress bar in sidebar
3. ☐ Button `:active` scale on all interactive elements
4. ☐ Progress bar stripe animation on active bars
5. ☐ Efficiency per-hour rates on activity rows
6. ☐ Tab icon tooltips with names + keyboard shortcuts
7. ☐ Explore empty state with flavor text + CTA
8. ☐ Bottom bar CTA when no activities scheduled
9. ☐ Travel map current-location glow
10. ☐ Notification dots on tabs with pending actions
11. ☐ Floating number popups for resource gains
12. ☐ Progress bar completion flash
13. ☐ Number lerp on money/primary resource
14. ☐ Activity multiplier label clarification
15. ☐ Prestige/death ceremony sequence
