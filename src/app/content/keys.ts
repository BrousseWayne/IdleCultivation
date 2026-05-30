import type { NavigationItem } from "../types/domain";

export const K = {
  appTitle: "app.title",
  appRank: "app.rank",

  navExplore: "nav.Explore",
  navInventory: "nav.Inventory",
  navActivities: "nav.Activities",
  navQuests: "nav.Quests",
  navLifestyle: "nav.Lifestyle",
  navTravel: "nav.Travel",
  navStats: "nav.Stats",
  navRecap: "nav.Recap",
  navStory: "nav.Story",

  pageExploreTitle: "page.explore.title",
  pageExploreEmpty: "page.explore.empty",
  pageInventoryTitle: "page.inventory.title",
  pageActivitiesTitle: "page.activities.title",
  pageActivitiesSubtitle: "page.activities.subtitle",
  pageQuestsTitle: "page.quests.title",
  pageLifestyleTitle: "page.lifestyle.title",
  pageLifestyleEmpty: "page.lifestyle.empty",
  pageTravelTitle: "page.travel.title",
  pageTravelSubtitle: "page.travel.subtitle",
  pageStatsTitle: "page.stats.title",
  pageStatsSubtitle: "page.stats.subtitle",
  pageRecapTitle: "page.recap.title",
  pageRecapSubtitle: "page.recap.subtitle",
  pageStoryTitle: "page.story.title",
  pageStorySubtitle: "page.story.subtitle",
  pageStoryEmpty: "page.story.empty",

  sidebarSectionStatus: "sidebar.section.status",
  sidebarSectionResources: "sidebar.section.resources",
  sidebarSectionAttributes: "sidebar.section.attributes",
  sidebarLabelAge: "sidebar.label.age",
  sidebarLabelMoney: "sidebar.label.money",
  sidebarLabelIncome: "sidebar.label.income",
  sidebarLabelExpenses: "sidebar.label.expenses",
  sidebarLabelNet: "sidebar.label.net",

  statAge: "stat.age",
  statHp: "stat.hp",
  statSatiety: "stat.satiety",
  statMortality: "stat.mortality",

  statsSectionCore: "stats.section.core",
} as const;

export type ContentKey = (typeof K)[keyof typeof K];

export const ALL_CONTENT_KEYS = Object.values(K) as ContentKey[];

export function navKey(name: NavigationItem): ContentKey {
  return `nav.${name}` as ContentKey;
}
