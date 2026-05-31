import { useGameStore } from "../stores/gameStore";
import type { GamePhase, NavigationItem } from "../types/domain";

type ContentEntry = { default: string } & Partial<Record<GamePhase, string>>;

const CONTENT = {
  "app.title": { default: "A kind of something" },
  "app.rank": { default: "Mortal" },
  "app.label.day": { default: "Day" },
  "app.settings.exportSave": { default: "Export Save" },
  "app.settings.importSave": { default: "Import Save" },
  "app.settings.wipeSave": { default: "Wipe Save" },
  "app.confirm.wipeSave": { default: "Wipe all save data? This cannot be undone." },

  "nav.Explore": { default: "Explore" },
  "nav.Inventory": { default: "Inventory" },
  "nav.Activities": { default: "Activities" },
  "nav.Quests": { default: "Quests" },
  "nav.Lifestyle": { default: "Lifestyle" },
  "nav.Travel": { default: "Travel" },
  "nav.Stats": { default: "Stats" },
  "nav.Recap": { default: "Recap" },
  "nav.Story": { default: "Story" },

  "page.explore.title": { default: "Explore" },
  "page.explore.empty": { default: "No locations discovered yet." },
  "page.inventory.title": { default: "Inventory" },
  "page.inventory.subtitle": { default: "What Fortune Has Bestowed" },
  "page.activities.title": { default: "Daily Activities" },
  "page.activities.subtitle": { default: "Manage your time wisely" },
  "page.activities.label.scale": { default: "Scale:" },
  "page.activities.label.autoRepeat": { default: "Auto-Repeat:" },
  "page.activities.section.timeBudget": { default: "Time Budget" },
  "page.activities.label.free": { default: "Free" },
  "page.activities.section.projectedGains": { default: "Projected Gains" },
  "page.activities.section.queue": { default: "Queue" },
  "page.activities.queue.empty": { default: "No activities scheduled" },
  "page.quests.title": { default: "Quests" },
  "page.quests.empty": { default: "No quests available yet." },
  "page.quests.section.active": { default: "Active Quests" },
  "page.quests.section.completed": { default: "Completed Quests" },
  "page.quests.label.progress": { default: "Progress:" },
  "page.quests.label.reward": { default: "Reward:" },
  "page.quests.label.completed": { default: "Completed:" },
  "page.lifestyle.title": { default: "Lifestyle Management" },
  "page.lifestyle.empty": { default: "No lifestyle options available yet." },
  "page.travel.title": { default: "Travel the World" },
  "page.travel.subtitle": { default: "Explore different locations and unlock new opportunities" },
  "page.travel.label.currentLocation": { default: "Current Location:" },
  "page.travel.map.title": { default: "Cultivation World Map" },
  "page.travel.label.travelTime": { default: "Travel Time:" },
  "page.travel.hint": { default: "Travel consumes time points and may unlock new activities and opportunities" },
  "page.stats.title": { default: "Your Statistics" },
  "page.stats.subtitle": { default: "Comprehensive overview of your cultivation progress and abilities" },
  "page.recap.title": { default: "Cultivation Chronicle" },
  "page.recap.subtitle": { default: "Navigate through your journey" },
  "page.recap.backToCalendar": { default: "Back to Calendar" },
  "page.recap.dayEvents": { default: "Day {day} Events" },
  "page.recap.badge.upcoming": { default: "Upcoming" },
  "page.recap.badge.completed": { default: "Completed" },
  "page.recap.empty": { default: "No events recorded for this day" },
  "page.recap.view.era": { default: "Era" },
  "page.recap.view.decade": { default: "Decade" },
  "page.recap.view.year": { default: "Year" },
  "page.recap.view.month": { default: "Month" },
  "page.recap.weekday.sun": { default: "Sun" },
  "page.recap.weekday.mon": { default: "Mon" },
  "page.recap.weekday.tue": { default: "Tue" },
  "page.recap.weekday.wed": { default: "Wed" },
  "page.recap.weekday.thu": { default: "Thu" },
  "page.recap.weekday.fri": { default: "Fri" },
  "page.recap.weekday.sat": { default: "Sat" },
  "page.story.title": { default: "Your Story" },
  "page.story.subtitle": { default: "Your journey so far" },
  "page.story.empty": { default: "Your story has not yet begun." },

  "sidebar.section.status": { default: "Status" },
  "sidebar.section.resources": { default: "Resources" },
  "sidebar.section.attributes": { default: "Attributes" },
  "sidebar.label.age": { default: "Age" },
  "sidebar.label.money": { default: "Money" },
  "sidebar.label.income": { default: "Income" },
  "sidebar.label.expenses": { default: "Expenses" },
  "sidebar.label.net": { default: "Net" },

  "stat.age": { default: "Age" },
  "stat.hp": { default: "HP" },
  "stat.satiety": { default: "Satiety" },
  "stat.mortality": { default: "Mortality" },

  "stats.section.core": { default: "Core Stats" },

  "inventory.location.personal": { default: "Personal" },
  "inventory.location.bank": { default: "Bank Vault" },
  "inventory.location.barn": { default: "Barn Storage" },
  "inventory.label.currency": { default: "Currency" },
  "inventory.label.categories": { default: "Categories" },
  "inventory.label.carried": { default: "carried" },
  "inventory.cost.free": { default: "Free" },
  "inventory.category.currency": { default: "Currency & Valuables" },
  "inventory.category.herbs": { default: "Medicinal Herbs" },
  "inventory.category.minerals": { default: "Ores & Minerals" },
  "inventory.category.consumable": { default: "Consumables" },
  "inventory.category.artifact": { default: "Artifacts & Tools" },
  "inventory.category.book": { default: "Books & Scrolls" },
  "inventory.category.material": { default: "Raw Materials" },

  "lifestyle.cost.free": { default: "Free" },

  "queue.empty": { default: "No activities scheduled" },

  "death.title": { default: "Cultivation Ended" },
  "death.subtitle": { default: "The candle burns out. The flame remembers." },
  "death.label.yearsLived": { default: "Years lived" },
  "death.label.origin": { default: "Origin" },
  "death.label.activitiesCompleted": { default: "Activities completed" },
  "death.action.newCycle": { default: "Begin a new cycle" },
} satisfies Record<string, ContentEntry>;

export type ContentKey = keyof typeof CONTENT;

export function navKey(name: NavigationItem): ContentKey {
  return `nav.${name}` as ContentKey;
}

function getPhase(): GamePhase {
  return useGameStore.getState().phase;
}

export function text(
  key: ContentKey,
  params?: Record<string, string | number>
): string {
  const entry: ContentEntry = CONTENT[key];
  const raw = entry[getPhase()] ?? entry.default;
  if (!params) return raw;
  return raw.replace(/\{(\w+)\}/g, (match, name) =>
    name in params ? String(params[name]) : match
  );
}
