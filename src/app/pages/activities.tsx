import { ChevronDown, Minus, Plus, type LucideIcon } from "lucide-react";
import { activityData } from "../data/data";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGameState } from "../contexts/gameStateContext";
import { useState } from "react";

const ALL_CATEGORIES = [
  "work",
  "training",
  "study",
  "social",
  "life",
  "hobby",
  "adventure",
] as const;

type ActivityCategory = (typeof ALL_CATEGORIES)[number];
type Categories = Record<ActivityCategory, Activity[]>;
export type ActivityUnlockState = Record<ActivityCategory, boolean>;
const INITIALLY_UNLOCKED: ActivityCategory[] = ["work"];

export const initialActivityCategoriesUnlockState: ActivityUnlockState =
  (() => {
    const state = {} as ActivityUnlockState;
    for (const category of ALL_CATEGORIES) {
      state[category] = INITIALLY_UNLOCKED.includes(category);
    }
    return state;
  })();

export type Activity = {
  key: string;
  name: string;
  icon: LucideIcon;
  cost: number;
  reward: string;
  category: ActivityCategory;
  unlocked: boolean;
};

export const RenderActivitiesPage = () => {
  const [collapsedCategories, setCollapsedCategories] = useState<
    Record<string, boolean>
  >({});
  const {
    maxTimePoints,
    setTimePoints,
    activities,
    setActivities,
    activityCategoriesUnlockState,
  } = useGameState();

  const categorizeActivities = (activityData: Activity[]) => {
    const categories: Categories = {} as Categories;

    for (const category of ALL_CATEGORIES) {
      categories[category] = [];
    }

    activityData.forEach((activity) => {
      if (activity.unlocked === true) {
        categories[activity.category].push(activity);
      }
    });

    return categories;
  };

  const toggleCategory = (categoryName: string) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }));
  };

  const categories = categorizeActivities(activityData);

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent mb-2">
          Daily Activities
        </h2>
        <p className="text-muted-foreground">Manage your time wisely</p>
      </div>

      {ALL_CATEGORIES.filter(
        (category) => activityCategoriesUnlockState[category]
      ).map((category) => {
        const categoryActivities = categories[category];

        return (
          <div key={category} className="space-y-2">
            <button
              onClick={() => toggleCategory(category)}
              className="flex items-center gap-2 text-lg font-semibold text-purple-300 capitalize hover:text-purple-200 transition-colors"
            >
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  collapsedCategories[category] ? "-rotate-90" : ""
                }`}
              />
              {category}
            </button>
            {!collapsedCategories[category] && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {categoryActivities.map((activity) => {
                  return (
                    <ActivityCard
                      key={activity.key}
                      activity={activity}
                      activities={activities}
                    />
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

function ActivityCard({ activity, activities }) {
  return (
    <Card
      key={activity.key}
      className="bg-card/50 border border-border/40 rounded-md p-1 relative"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <activity.icon className="w-4 h-4 text-purple-400" />
          <span className="text-xs font-semibold">{activity.name}</span>
        </div>
        <div className="flex gap-1">
          <Button variant="outline" size="sm" className="h-5 w-5 p-0">
            <Plus className="w-3 h-3" />
          </Button>
          <Button variant="outline" size="sm" className="h-5 w-5 p-0">
            <Minus className="w-3 h-3" />
          </Button>
        </div>
      </div>

      <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
        <span>Cost: {activity.cost}h</span>
        <span>Reward: {activity.reward}</span>
        <span>
          Allocated: {activities[activity.key as keyof typeof activities]}h
        </span>
      </div>

      {/* Overlay progress */}
      <div className="absolute bottom-0 left-0 h-1 w-full bg-slate-700 rounded-b-md overflow-hidden mt-1">
        <div
          className="h-1 bg-purple-400 transition-all"
          style={{
            width: `${
              // (activities[activity.key as keyof typeof activities] /
              //   maxTimePoints) *
              100
            }%`,
          }}
        />
      </div>
    </Card>
  );
}
