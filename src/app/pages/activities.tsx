import { ChevronDown, Minus, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useActivityStore } from "../stores/activityStore";
import { useGameStore } from "../stores/gameStore";
import { useState, type JSX } from "react";
import { Progress } from "@/components/ui/progress";
import {
  currencyColors,
  statColors,
} from "../layout/components/StatsPanel/resourcesCard";
import { activityData, INITIALLY_UNLOCKED } from "../data/activity";
import type { ActivityUnlockState, Categories } from "../types/states";
import {
  ALL_CATEGORIES,
  type Activity,
  type Reward,
} from "../types/domain";
import { EntityRegistry } from "../services";

const PlannedActivitiesRecap = ({
  activities,
}: {
  activities: Record<string, number>;
}) => {
  const planned = Object.entries(activities).filter(([_, hours]) => hours > 0);

  if (planned.length === 0)
    return <p className="text-sm text-slate-500">No activities planned yet.</p>;

  return (
    <Card className="bg-card/50 border border-border/50 p-3 mb-4">
      <h3 className="text-sm font-semibold text-purple-300 mb-2">
        Planned Activities
      </h3>
      <div className="space-y-1 text-xs">
        {planned.map(([key, hours]) => {
          const activity = EntityRegistry.get("activity", key)!;
          const progress = Math.min((hours / activity.timeCost) * 100, 100);
          return (
            <div key={key} className="flex justify-between items-center">
              <span className="flex items-center gap-1">
                <activity.icon className="w-3 h-3 text-purple-400" />
                {activity.name}
              </span>
              <span className="text-slate-400">{hours}h</span>
              <div className="w-24 h-2 bg-slate-700 rounded overflow-hidden">
                <Progress
                  value={progress}
                  className="h-2 bg-slate-800 [&>div]:bg-purple-500"
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export const initialActivityCategoriesUnlockState: ActivityUnlockState =
  (() => {
    const state = {} as ActivityUnlockState;
    for (const category of ALL_CATEGORIES) {
      state[category] = INITIALLY_UNLOCKED.includes(category);
    }
    return state;
  })();

export const RenderActivitiesPage = () => {
  const [collapsedCategories, setCollapsedCategories] = useState<
    Record<string, boolean>
  >({});

  const allocatedActivities = useActivityStore((s) => s.allocatedActivities);
  const allocateTime = useActivityStore((s) => s.allocateTime);
  const enqueueActivity = useActivityStore((s) => s.enqueueActivity);

  const activityCategoriesUnlockState = useGameStore(
    (s) => s.activityCategoryUnlocks
  );
  const timePoints = useGameStore((s) => s.timePoints);
  const gameAllocateTime = useGameStore((s) => s.allocateTime);

  const allocateActivity = (activityKey: string, delta: number) => {
    const activity = EntityRegistry.get("activity", activityKey)!;
    const realTimeCost = delta * activity.timeCost;
    if (timePoints - realTimeCost >= 0) {
      allocateTime(activityKey, realTimeCost);
      gameAllocateTime(realTimeCost);
      enqueueActivity(activity);
    }
  };

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
      <PlannedActivitiesRecap activities={allocatedActivities} />
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
                      activities={allocatedActivities}
                      allocateActivity={allocateActivity}
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

type ActivityCardProps = {
  activity: Activity;
  activities: Record<string, number>;
  allocateActivity: (activityKey: string, delta: number) => void;
};

function ActivityCard({
  activity,
  activities,
  allocateActivity,
}: ActivityCardProps) {
  // console.log(activities, "test");
  return (
    <Card
      key={activity.key}
      className="bg-card/50 border border-border/50 rounded-md p-1 relative"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <activity.icon className="w-4 h-4 text-purple-400" />
          <span className="text-xs font-semibold">{activity.name}</span>
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-5 w-5 p-0"
            onClick={() => allocateActivity(activity.key, 1)}
          >
            <Plus className="w-3 h-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-5 w-5 p-0"
            onClick={() => allocateActivity(activity.key, -1)}
          >
            <Minus className="w-3 h-3" />
          </Button>
        </div>
      </div>

      <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
        <span>Cost: {activity.timeCost}h</span>
        <span>Reward: {formatRewardColor(activity.reward)}</span>
        <span>Allocated: {activities[activity.key] || 0}h</span>
      </div>

      <div className="absolute bottom-0 left-0 h-1 w-full bg-slate-700 rounded-b-md overflow-hidden mt-1">
        <Progress
          value={0}
          className="h-1.5 bg-slate-800 [&>div]:bg-purple-500"
        />
      </div>
    </Card>
  );
}

function formatRewardColor(reward: Reward): JSX.Element {
  if ("currency" in reward)
    return (
      <span className={currencyColors[reward.currency] || "text-gray-400"}>
        {`+${reward.amount} ${reward.currency}`}
      </span>
    );
  if ("stat" in reward)
    return (
      <span className={statColors[reward.stat] || "text-gray-400"}>
        {`+${reward.amount} ${reward.stat}`}
      </span>
    );
  return <span></span>;
}
