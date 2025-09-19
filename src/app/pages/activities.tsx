import { ChevronDown, Minus, Plus, type LucideIcon } from "lucide-react";
import { activityData } from "../data/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  "mesCOuilles",
] as const;

// 2. Derive type automatically from array
type ActivityCategory = (typeof ALL_CATEGORIES)[number];

type Categories = Record<ActivityCategory, Activity[]>;

export type ActivityUnlockState = Record<ActivityCategory, boolean>;

const INITIALLY_UNLOCKED: ActivityCategory[] = ["work", "training"];

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
  const diff = [CardTry0, CardTry1, CardTry2, CardTry3];
  const [choice, setChoice] = useState(0);

  const circleChoices = () => {
    if (choice === 3) {
      setChoice(0);
    } else {
      setChoice((prev) => prev + 1);
    }
  };

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent mb-2">
          Daily Activities
        </h2>
        <p className="text-muted-foreground">
          Manage your time and cultivation path wisely
        </p>
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
            <button
              className="bg-accent-foreground text-amber-950"
              onClick={circleChoices}
            >
              CLICK TO CHANGE THE LAYOUT
            </button>

            {!collapsedCategories[category] && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {categoryActivities.map((activity) => {
                  const CardComponent = diff[choice];
                  return (
                    <CardComponent
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

function CardTry0({ activity, activities }) {
  return (
    <Card key={activity.key} className="bg-card border-border/100 ">
      <CardHeader className="pb-1">
        <CardTitle className="flex items-center gap- text-sm">
          <activity.icon className="w-4 h-4 text-purple-400" />
          {activity.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1 p-2">
        <div className="flex justify-between items-center">
          <span className="text-xs text-slate-400 font-semibold">Cost</span>
          <span className="font-mono text-purple-400 text-xs">
            {activity.cost}h
          </span>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-slate-600/50 to-transparent" />
        <div className="flex justify-between items-center">
          <span className="text-xs text-slate-400 font-semibold">Reward</span>
          <span className="font-mono text-violet-400 text-xs">
            {activity.reward}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-slate-400 font-semibold">
            Allocated
          </span>
          <span className="font-mono text-orange-400 text-xs">
            {activities[activity.key as keyof typeof activities]}h
          </span>
        </div>
        <div className="flex justify-between items-center gap-1 pt-1">
          <Button
            variant="outline"
            size="sm"
            // onClick={() => updateActivity(activity.key, -1)}
            className="h-6 w-6 p-0"
          >
            <Minus className="w-3 h-3" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            // onClick={() => updateActivity(activity.key, 1)}
            className="h-6 w-6 p-0"
          >
            <Plus className="w-3 h-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function CardTry1({ activity, activities }) {
  return (
    <Card
      key={activity.key}
      className="bg-card/70 border-border/50 rounded-md shadow-sm"
    >
      <CardHeader className="pb-1">
        <CardTitle className="flex items-center gap-1 text-sm">
          <activity.icon className="w-4 h-4 text-purple-400" />
          {activity.name}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-1.5 space-y-1">
        {/* Cost / Reward / Allocated */}
        <div className="flex justify-between text-xs text-slate-400 font-semibold">
          <span>Cost</span>
          <span className="text-purple-400 font-mono">{activity.cost}h</span>
        </div>
        <div className="flex justify-between text-xs text-slate-400 font-semibold">
          <span>Reward</span>
          <span className="text-violet-400 font-mono">{activity.reward}</span>
        </div>
        <div className="flex justify-between text-xs text-slate-400 font-semibold">
          <span>Allocated</span>
          <span className="text-orange-400 font-mono">
            {activities[activity.key as keyof typeof activities]}h
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-2 bg-purple-400 rounded-full transition-all"
            style={{
              width: `${
                // (activities[activity.key as keyof typeof activities] /
                //   maxTimePoints) *
                100
              }%`,
            }}
          />
        </div>

        {/* Controls */}
        <div className="flex gap-1 mt-1">
          <Button variant="outline" size="sm" className="h-5 w-5 p-0">
            <Minus className="w-3 h-3" />
          </Button>
          <Button variant="outline" size="sm" className="h-5 w-5 p-0">
            <Plus className="w-3 h-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function CardTry2({ activity, activities }) {
  return (
    <Card
      key={activity.key}
      className="bg-card/60 border-border/50 rounded-md flex flex-col md:flex-row items-center gap-2 p-2"
    >
      <div className="flex items-center gap-1">
        <activity.icon className="w-5 h-5 text-purple-400" />
        <span className="text-sm font-semibold">{activity.name}</span>
      </div>

      <div className="flex-1 flex flex-col gap-0.5 w-full">
        <div className="flex justify-between text-xs text-slate-400">
          <span>Cost</span>
          <span className="text-purple-400 font-mono">{activity.cost}h</span>
        </div>
        <div className="flex justify-between text-xs text-slate-400">
          <span>Reward</span>
          <span className="text-violet-400 font-mono">{activity.reward}</span>
        </div>
        <div className="flex justify-between text-xs text-slate-400">
          <span>Allocated</span>
          <span className="text-orange-400 font-mono">
            {activities[activity.key as keyof typeof activities]}h
          </span>
        </div>
        <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden mt-1">
          <div
            className="h-2 bg-purple-400 rounded-full transition-all"
            style={{
              width: `${
                // (activities[activity.key as keyof typeof activities] /
                //   maxTimePoints) *
                100
              }%`,
            }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <Button variant="outline" size="sm" className="h-5 w-5 p-0">
          <Plus className="w-3 h-3" />
        </Button>
        <Button variant="outline" size="sm" className="h-5 w-5 p-0">
          <Minus className="w-3 h-3" />
        </Button>
      </div>
    </Card>
  );
}

function CardTry3({ activity, activities }) {
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
