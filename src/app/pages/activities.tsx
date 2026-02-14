import { ChevronDown, Clock, TrendingUp, ListOrdered, Activity } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useActivityStore } from "../stores/activityStore";
import { useGameStore, TIME_SCALES } from "../stores/gameStore";
import { useState, useMemo } from "react";
import { CURRENCY_COLORS, STAT_COLORS, CATEGORY_COLOR_CLASSES, getCategoryHex } from "../data/sectionColors";
import { activityData } from "../data/activity";
import type { Categories } from "../types/states";
import {
  ALL_CATEGORIES,
  type Activity as ActivityType,
  type ActivityCategory,
} from "../types/domain";
import { EntityRegistry } from "../services";
import { formatNumber, getActivityXpProgress, scaleEffectAmount } from "../utils";
import { StatIcon, CurrencyIcon } from "../components/StatIcon";
import { ActivityCard, QueueItem } from "../components/activities";
import { PageHeader } from "../components/PageHeader";

export function RenderActivitiesPage() {
  const [collapsedCategories, setCollapsedCategories] = useState<
    Record<string, boolean>
  >({});

  const allocatedActivities = useActivityStore((s) => s.allocatedActivities);
  const completionCounts = useActivityStore((s) => s.completionCounts);
  const activityXp = useActivityStore((s) => s.activityXp);
  const allocateTime = useActivityStore((s) => s.allocateTime);
  const enqueueActivity = useActivityStore((s) => s.enqueueActivity);
  const repeatActivities = useActivityStore((s) => s.repeatActivities);
  const setRepeatActivities = useActivityStore((s) => s.setRepeatActivities);
  const activityQueue = useActivityStore((s) => s.activityQueue);

  const activityCategoriesUnlockState = useGameStore(
    (s) => s.activityCategoryUnlocks
  );
  const timePoints = useGameStore((s) => s.timePoints);
  const maxTimePoints = useGameStore((s) => s.maxTimePoints);
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

  const toggleCategory = (categoryName: string) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }));
  };

  const categories = useMemo(() => {
    const result: Categories = {} as Categories;
    for (const category of ALL_CATEGORIES) {
      result[category] = [];
    }
    for (const activity of activityData) {
      if (activity.unlocked) {
        result[activity.category].push(activity);
      }
    }
    return result;
  }, []);

  const projectedGains = useMemo(() => {
    const gains: { label: string; amount: number; colorClass: string; type: "currency" | "stat" }[] = [];
    const currencyTotals: Record<string, number> = {};
    const statTotals: Record<string, number> = {};

    for (const [activityKey, allocatedHours] of Object.entries(allocatedActivities)) {
      if (allocatedHours <= 0) continue;
      const activity = EntityRegistry.get<ActivityType>("activity", activityKey);
      if (!activity) continue;
      const completions = Math.floor(allocatedHours / activity.timeCost);
      if (completions <= 0) continue;
      const { level } = getActivityXpProgress(activityXp[activityKey] || 0);

      for (const effect of activity.effects) {
        if (effect.type === "grant_currency") {
          const scaled = scaleEffectAmount(effect.amount, level);
          currencyTotals[effect.currency] = (currencyTotals[effect.currency] || 0) + scaled * completions;
        } else if (effect.type === "grant_stat") {
          const scaled = scaleEffectAmount(effect.amount, level);
          statTotals[effect.stat] = (statTotals[effect.stat] || 0) + scaled * completions;
        }
      }
    }

    for (const [currency, amount] of Object.entries(currencyTotals)) {
      gains.push({ label: currency, amount, colorClass: CURRENCY_COLORS[currency as keyof typeof CURRENCY_COLORS] || "text-gray-400", type: "currency" });
    }
    for (const [stat, amount] of Object.entries(statTotals)) {
      gains.push({ label: stat, amount, colorClass: STAT_COLORS[stat as keyof typeof STAT_COLORS] || "text-gray-400", type: "stat" });
    }

    return gains;
  }, [allocatedActivities, activityXp]);

  const allocatedHours = maxTimePoints - timePoints;
  const timePct = maxTimePoints > 0 ? (allocatedHours / maxTimePoints) * 100 : 0;

  const categoryBreakdown = useMemo(() => {
    const breakdown: Record<string, number> = {};
    for (const [activityKey, hours] of Object.entries(allocatedActivities)) {
      if (hours <= 0) continue;
      const activity = EntityRegistry.get<ActivityType>("activity", activityKey);
      if (!activity) continue;
      breakdown[activity.category] = (breakdown[activity.category] || 0) + hours;
    }
    return breakdown;
  }, [allocatedActivities]);

  return (
    <div className="flex gap-6 items-start">
      <div className="flex-[3] min-w-0 space-y-4">
        <PageHeader
          icon={Activity}
          title="Daily Activities"
          color="text-accent-jade"
          subtitle="Manage your time wisely"
        />

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
            <div key={category} className="space-y-1.5">
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
                  {categoryActivities.map((activity) => (
                    <ActivityCard
                      key={activity.key}
                      activity={activity}
                      activities={allocatedActivities}
                      completions={completionCounts[activity.key] || 0}
                      totalXp={activityXp[activity.key] || 0}
                      allocateActivity={allocateActivity}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex-[2] min-w-[260px] max-w-[380px] sticky top-6 space-y-4">
        <div className="bg-slate-900/40 border border-slate-800/40 rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-2 text-xs text-slate-400 uppercase tracking-widest font-semibold">
            <Clock className="w-3.5 h-3.5" />
            Time Budget
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Free</span>
              <span className="text-accent-jade font-mono font-bold">{timePoints}h / {maxTimePoints}h</span>
            </div>
            <div className="h-2 bg-slate-800/60 rounded-full overflow-hidden">
              <div
                className="h-full bg-accent-jade/80 rounded-full transition-all duration-300"
                style={{ width: `${100 - timePct}%` }}
              />
            </div>
          </div>

          {Object.keys(categoryBreakdown).length > 0 && (
            <div className="space-y-1 pt-1">
              {Object.entries(categoryBreakdown).map(([cat, hours]) => {
                const hex = getCategoryHex(cat as ActivityCategory);
                return (
                  <div key={cat} className="flex justify-between text-xs">
                    <span className="capitalize" style={{ color: hex }}>{cat}</span>
                    <span className="font-mono text-slate-400">{hours}h</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {projectedGains.length > 0 && (
          <div className="bg-slate-900/40 border border-slate-800/40 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-2 text-xs text-slate-400 uppercase tracking-widest font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              Projected Gains
            </div>
            <div className="space-y-1">
              {projectedGains.map((gain) => (
                <div key={gain.label} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1.5">
                    {gain.type === "currency" ? (
                      <CurrencyIcon currency={gain.label as any} className={gain.colorClass} size={14} />
                    ) : (
                      <StatIcon stat={gain.label as any} className={gain.colorClass} size={14} />
                    )}
                    <span className="text-slate-500">{gain.label}</span>
                  </div>
                  <span className={`font-mono font-bold ${gain.colorClass}`}>+{formatNumber(gain.amount)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-slate-900/40 border border-slate-800/40 rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-2 text-xs text-slate-400 uppercase tracking-widest font-semibold">
            <ListOrdered className="w-3.5 h-3.5" />
            Queue {activityQueue.length > 0 && <span className="text-accent-jade">({activityQueue.length})</span>}
          </div>

          {activityQueue.length === 0 ? (
            <p className="text-xs text-slate-600 italic">No activities scheduled</p>
          ) : (
            <div className="space-y-1">
              {(() => {
                const HEAD = 6;
                const TAIL = 2;
                const total = activityQueue.length;
                const shouldTruncate = total > HEAD + TAIL;
                const head = shouldTruncate ? activityQueue.slice(0, HEAD) : activityQueue;
                const tail = shouldTruncate ? activityQueue.slice(-TAIL) : [];
                const hidden = total - HEAD - TAIL;

                return (
                  <>
                    {head.map((activity, index) => (
                      <QueueItem key={activity.queueId || `${activity.key}-${index}`} activity={activity} index={index} isCurrent={index === 0} />
                    ))}
                    {shouldTruncate && (
                      <div className="text-center text-[10px] text-slate-600 font-mono py-0.5">
                        ... +{hidden} more ...
                      </div>
                    )}
                    {tail.map((activity, i) => {
                      const index = total - TAIL + i;
                      return (
                        <QueueItem key={activity.queueId || `${activity.key}-${index}`} activity={activity} index={index} isCurrent={false} />
                      );
                    })}
                  </>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
