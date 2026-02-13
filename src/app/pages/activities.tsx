import { ChevronDown, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useActivityStore } from "../stores/activityStore";
import { useGameStore, TIME_SCALES } from "../stores/gameStore";
import { useState, type JSX } from "react";
import { Progress } from "@/components/ui/progress";
import { CURRENCY_COLORS, STAT_COLORS, CATEGORY_COLOR_CLASSES } from "../data/sectionColors";
import { activityData } from "../data/activity";
import type { Categories } from "../types/states";
import {
  ALL_CATEGORIES,
  type Activity,
  type Reward,
} from "../types/domain";
import { EntityRegistry } from "../services";

export const RenderActivitiesPage = () => {
  const [collapsedCategories, setCollapsedCategories] = useState<
    Record<string, boolean>
  >({});

  const allocatedActivities = useActivityStore((s) => s.allocatedActivities);
  const allocateTime = useActivityStore((s) => s.allocateTime);
  const enqueueActivity = useActivityStore((s) => s.enqueueActivity);
  const repeatActivities = useActivityStore((s) => s.repeatActivities);
  const setRepeatActivities = useActivityStore((s) => s.setRepeatActivities);

  const activityCategoriesUnlockState = useGameStore(
    (s) => s.activityCategoryUnlocks
  );
  const timePoints = useGameStore((s) => s.timePoints);
  const timeScale = useGameStore((s) => s.timeScale);
  const setTimeScale = useGameStore((s) => s.setTimeScale);
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
      <div className="mb-2">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] text-accent-jade mb-1 text-glow-jade">
          Daily Activities
        </h2>
        <p className="text-sm text-muted-foreground italic">Manage your time wisely</p>
      </div>

      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-slate-500 text-xs">Scale:</span>
          <select
            value={timeScale}
            onChange={(e) => setTimeScale(e.target.value as "day" | "week" | "month")}
            className="appearance-none bg-slate-900/50 border border-slate-700/30 rounded px-2 py-0.5 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-accent-jade/50"
          >
            {Object.entries(TIME_SCALES).map(([key, scale]) => (
              <option key={key} value={key}>
                {scale.label} ({24 * scale.multiplier}h)
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-500 text-xs">Auto-Repeat:</span>
          <Switch
            checked={repeatActivities}
            onCheckedChange={setRepeatActivities}
            className="data-[state=checked]:bg-green-500 scale-75"
          />
        </div>
      </div>

      {ALL_CATEGORIES.filter(
        (category) => activityCategoriesUnlockState[category]
      ).map((category) => {
        const categoryActivities = categories[category];
        const catColors = CATEGORY_COLOR_CLASSES[category];

        return (
          <div key={category} className="space-y-2">
            <button
              onClick={() => toggleCategory(category)}
              className={`flex items-center gap-2 text-lg font-semibold ${catColors.text} capitalize hover:opacity-80 transition-colors`}
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
  const currentActivity = useActivityStore((s) => s.activityQueue[0]);
  const isRunning = currentActivity?.key === activity.key;
  const colors = CATEGORY_COLOR_CLASSES[activity.category];

  return (
    <div className="relative group">
      <div className={`flex items-center gap-3 px-3 py-2 bg-card/30 rounded-md hover:bg-card/50 transition-all border-l-3 ${isRunning ? colors.border : colors.borderFaded}`}>
        <activity.icon className={`w-4 h-4 ${colors.text} shrink-0`} />
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
          <span className={`text-xs font-mono w-8 text-center font-bold ${colors.text}`}>{allocated}h</span>
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
      <div className="h-0.5 w-full bg-slate-800/50 rounded-b overflow-hidden">
        <Progress
          value={progress}
          striped={progress > 0}
          className={`h-0.5 bg-slate-800/50 ${colors.progress}`}
        />
      </div>
    </div>
  );
}

function formatRewardColor(reward: Reward): JSX.Element {
  if ("currency" in reward)
    return (
      <span className={CURRENCY_COLORS[reward.currency] || "text-gray-400"}>
        {`+${reward.amount} ${reward.currency}`}
      </span>
    );
  if ("stat" in reward)
    return (
      <span className={STAT_COLORS[reward.stat] || "text-gray-400"}>
        {`+${reward.amount} ${reward.stat}`}
      </span>
    );
  return <span></span>;
}
