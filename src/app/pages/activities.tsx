import { ChevronDown, Minus, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useActivityStore } from "../stores/activityStore";
import { useGameStore } from "../stores/gameStore";
import { useState, useEffect, useCallback, type JSX } from "react";
import { EventBus } from "../services";
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
import { CATEGORY_COLORS } from "../data/sectionColors";

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
      <h3 className="text-sm font-semibold text-accent-jade mb-2">
        Planned Activities
      </h3>
      <div className="space-y-1 text-xs">
        {planned.map(([key, hours]) => {
          const activity = EntityRegistry.get("activity", key)!;
          const progress = Math.min((hours / activity.timeCost) * 100, 100);
          return (
            <div key={key} className="flex justify-between items-center">
              <span className="flex items-center gap-1">
                <activity.icon className="w-3 h-3 text-accent-jade" />
                {activity.name}
              </span>
              <span className="text-slate-400">{hours}h</span>
              <div className="w-24 h-2 bg-slate-700 rounded overflow-hidden">
                <Progress
                  value={progress}
                  className="h-2 bg-slate-800 [&>div]:bg-accent-jade"
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
  const [floatingRewards, setFloatingRewards] = useState<
    { id: number; text: string; color: string }[]
  >([]);

  const handleReward = useCallback((event: any) => {
    const { reward } = event.payload;
    let text: string;
    let color: string;
    if ("currency" in reward) {
      text = `+${reward.amount} ${reward.currency}`;
      color = currencyColors[reward.currency as keyof typeof currencyColors] || "text-gray-400";
    } else if ("stat" in reward) {
      text = `+${reward.amount} ${reward.stat}`;
      color = statColors[reward.stat as keyof typeof statColors] || "text-gray-400";
    } else return;

    const id = Date.now();
    setFloatingRewards((prev) => [...prev, { id, text, color }]);
    setTimeout(() => setFloatingRewards((prev) => prev.filter((r) => r.id !== id)), 1000);
  }, []);

  useEffect(() => {
    EventBus.on("activity:reward-earned", handleReward);
    return () => EventBus.off("activity:reward-earned", handleReward);
  }, [handleReward]);

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
    <div className="space-y-4 relative">
      <div className="mb-4">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] text-accent-jade mb-2">
          Daily Activities
        </h2>
        <p className="text-muted-foreground">Manage your time wisely</p>
      </div>
      <div className="fixed top-28 right-8 z-50 pointer-events-none space-y-1">
        {floatingRewards.map((r) => (
          <div key={r.id} className={`animate-float-up text-sm font-bold ${r.color}`}>
            {r.text}
          </div>
        ))}
      </div>
      <PlannedActivitiesRecap activities={allocatedActivities} />
      {ALL_CATEGORIES.filter(
        (category) => activityCategoriesUnlockState[category]
      ).map((category) => {
        const categoryActivities = categories[category];
        const catColor = CATEGORY_COLORS[category];

        return (
          <div key={category} className="space-y-2">
            <button
              onClick={() => toggleCategory(category)}
              className={`flex items-center gap-2 text-lg font-semibold text-${catColor} capitalize hover:opacity-80 transition-colors`}
            >
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  collapsedCategories[category] ? "-rotate-90" : ""
                }`}
              />
              {category}
            </button>
            {!collapsedCategories[category] && (
              <div className="space-y-1">
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
  const allocated = activities[activity.key] || 0;
  const progress = activity.timeCost > 0 ? Math.min((allocated / activity.timeCost) * 100, 100) : 0;

  return (
    <div className="relative">
      <div className="flex items-center gap-3 px-2 py-1.5 bg-card/30 border border-border/30 rounded-md hover:bg-card/50 transition-colors">
        <activity.icon className="w-4 h-4 text-accent-jade shrink-0" />
        <span className="text-xs font-semibold w-28 truncate">{activity.name}</span>
        <span className="text-[10px] text-slate-400 w-16">{formatRewardColor(activity.reward)}</span>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-5 w-5 p-0"
            onClick={() => allocateActivity(activity.key, -1)}
          >
            <Minus className="w-3 h-3" />
          </Button>
          <span className="text-xs font-mono w-8 text-center font-bold text-accent-jade">{allocated}h</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-5 w-5 p-0"
            onClick={() => allocateActivity(activity.key, 1)}
          >
            <Plus className="w-3 h-3" />
          </Button>
        </div>
        <span className="text-[10px] text-slate-500 ml-auto">{activity.timeCost}h/cycle</span>
      </div>
      <div className="h-0.5 w-full bg-slate-800 rounded-b overflow-hidden">
        <Progress
          value={progress}
          striped={progress > 0}
          className="h-0.5 bg-slate-800 [&>div]:bg-accent-jade"
        />
      </div>
    </div>
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
