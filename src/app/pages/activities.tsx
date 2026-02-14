import { ChevronDown, Clock, Minus, Plus, TrendingUp, ListOrdered } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useActivityStore } from "../stores/activityStore";
import { useGameStore, TIME_SCALES } from "../stores/gameStore";
import { useState, useMemo, type JSX } from "react";
import { Progress } from "@/components/ui/progress";
import { CURRENCY_COLORS, STAT_COLORS, CATEGORY_COLOR_CLASSES, getCategoryHex } from "../data/sectionColors";
import { activityData } from "../data/activity";
import type { Categories } from "../types/states";
import {
  ALL_CATEGORIES,
  type Activity,
  type ActivityCategory,
} from "../types/domain";
import type { Effect } from "../types/effects";
import { EntityRegistry } from "../services";
import { formatNumber, getActivityXpProgress, scaleEffectAmount } from "../utils";
import { StatIcon, CurrencyIcon } from "../components/StatIcon";

function getFoilGradient(categoryColor: string): string {
  const foilPalettes: Record<string, string[]> = {
    '#5FB4A0': ['#5FB4A0', '#6DC4B0', '#7DD4C0', '#90DCC8', '#A0E8D8', '#90DCC8', '#7DD4C0', '#6DC4B0', '#5FB4A0'],
    '#D4AF6A': ['#D4AF6A', '#DDB87C', '#E8C988', '#EDD59A', '#F5E1B8', '#EDD59A', '#E8C988', '#DDB87C', '#D4AF6A'],
    '#E07856': ['#E07856', '#E68565', '#F09475', '#F5A488', '#FFB8A0', '#F5A488', '#F09475', '#E68565', '#E07856'],
    '#B59ACF': ['#B59ACF', '#C3A6DA', '#D0B8E5', '#DCC8EE', '#E8D8F8', '#DCC8EE', '#D0B8E5', '#C3A6DA', '#B59ACF'],
    '#52B788': ['#52B788', '#61C396', '#70D4A5', '#88DCB6', '#A0F0C8', '#88DCB6', '#70D4A5', '#61C396', '#52B788'],
    '#D88FB8': ['#D88FB8', '#E09EC4', '#E8ACD0', '#EEBEDC', '#F8D0E8', '#EEBEDC', '#E8ACD0', '#E09EC4', '#D88FB8'],
    '#6BA3D4': ['#6BA3D4', '#7AAEDC', '#88BEE8', '#9FCEEE', '#B8DCFF', '#9FCEEE', '#88BEE8', '#7AAEDC', '#6BA3D4'],
  };

  const colors = foilPalettes[categoryColor] || foilPalettes['#5FB4A0'];
  const stops = colors.map((c, i) => `${c} ${(i / (colors.length - 1)) * 100}%`).join(', ');
  return `linear-gradient(90deg, ${stops})`;
}

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
      const activity = EntityRegistry.get<Activity>("activity", activityKey);
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
      const activity = EntityRegistry.get<Activity>("activity", activityKey);
      if (!activity) continue;
      breakdown[activity.category] = (breakdown[activity.category] || 0) + hours;
    }
    return breakdown;
  }, [allocatedActivities]);

  return (
    <div className="flex gap-6 items-start">
      <div className="flex-[3] min-w-0 space-y-4">
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

function QueueItem({ activity, index, isCurrent }: { activity: Activity; index: number; isCurrent: boolean }) {
  const hex = getCategoryHex(activity.category);

  return (
    <div
      className={`flex items-center gap-2 px-2 py-1 rounded text-xs ${
        isCurrent ? "bg-slate-800/60" : "bg-slate-800/20"
      }`}
    >
      <span className="text-slate-600 font-mono w-4 text-right">{index + 1}.</span>
      <activity.icon className="w-3 h-3 shrink-0" style={{ color: hex }} />
      <span className={isCurrent ? "font-semibold text-slate-200" : "text-slate-400"}>
        {activity.name}
      </span>
      <span className="ml-auto text-slate-600 font-mono">{activity.timeCost}h</span>
      {isCurrent && (
        <span className="w-1.5 h-1.5 rounded-full bg-accent-jade animate-pulse" />
      )}
    </div>
  );
}

type ActivityCardProps = {
  activity: Activity;
  activities: Record<string, number>;
  completions: number;
  totalXp: number;
  allocateActivity: (activityKey: string, delta: number) => void;
};

function ActivityCard({
  activity,
  activities,
  completions,
  totalXp,
  allocateActivity,
}: ActivityCardProps) {
  const allocated = activities[activity.key] || 0;
  const progress = activity.timeCost > 0 ? Math.min((allocated / activity.timeCost) * 100, 100) : 0;
  const currentActivity = useActivityStore((s) => s.activityQueue[0]);
  const isRunning = currentActivity?.key === activity.key;
  const colors = CATEGORY_COLOR_CLASSES[activity.category];
  const ticks = useGameStore((s) => s.ticks);
  const startTick = useActivityStore((s) => s.currentActivityStartTick);

  const activityProgress = isRunning && startTick !== null
    ? Math.min((ticks - startTick) / activity.timeCost, 1)
    : 0;
  const xpGain = activity.xpScalingFn();
  const interpolatedXp = totalXp + (xpGain * activityProgress);
  const { level, currentXp, xpForNext } = getActivityXpProgress(interpolatedXp);
  const xpPct = xpForNext > 0 ? (currentXp / xpForNext) * 100 : 0;

  return (
    <div className="relative group">
      <div className={`flex items-center gap-3 px-3 py-2 bg-card/30 rounded-md hover:bg-card/50 transition-all border-l-3 ${isRunning ? colors.border : colors.borderFaded}`}>
        <activity.icon className={`w-4 h-4 ${colors.text} shrink-0`} />
        <div className="flex items-center gap-1.5 w-28 shrink-0">
          <span className="text-xs font-semibold truncate">{activity.name}</span>
          <span className="text-[10px] font-bold text-accent-gold shrink-0">Lv.{level}</span>
        </div>
        <div className="flex-1 flex flex-wrap gap-1 min-w-0">{formatEffects(activity.effects, level)}</div>
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
        {completions > 0 && (
          <span className="text-[10px] text-slate-600 font-mono">x{completions}</span>
        )}
        <span className="text-[10px] text-slate-500">{activity.timeCost}h</span>
      </div>
      <div className="space-y-px">
        <div className="h-0.5 w-full bg-slate-800/50 overflow-hidden">
          <Progress
            value={progress}
            striped={progress > 0}
            className={`h-0.5 bg-slate-800/50 ${colors.progress}`}
          />
        </div>
        <div className="h-[1.2px] w-full bg-slate-800/30 rounded-b overflow-hidden relative">
          <div
            className="h-full transition-all duration-300 absolute left-0 top-0"
            style={{ width: `${xpPct}%` }}
          >
            <div
              className="absolute inset-0 animate-shimmer"
              style={{
                background: getFoilGradient(getCategoryHex(activity.category)),
                backgroundSize: '400% 100%',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function formatEffects(effects: Effect[], level: number): JSX.Element {
  return (
    <>
      {effects.map((effect, i) => {
        if (effect.type === "grant_currency")
          return (
            <div key={i} className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-sm ${CURRENCY_COLORS[effect.currency].replace('text-', 'bg-')}/10 border border-${CURRENCY_COLORS[effect.currency].replace('text-', '')}/20`}>
              <CurrencyIcon currency={effect.currency} className={CURRENCY_COLORS[effect.currency]} size={10} />
              <span className={`text-[10px] font-mono font-bold ${CURRENCY_COLORS[effect.currency]}`}>
                +{formatNumber(scaleEffectAmount(effect.amount, level))}
              </span>
            </div>
          );
        if (effect.type === "grant_stat")
          return (
            <div key={i} className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-sm ${STAT_COLORS[effect.stat].replace('text-', 'bg-')}/10 border border-${STAT_COLORS[effect.stat].replace('text-', '')}/20`}>
              <StatIcon stat={effect.stat} className={STAT_COLORS[effect.stat]} size={10} />
              <span className={`text-[10px] font-mono font-bold ${STAT_COLORS[effect.stat]}`}>
                +{formatNumber(scaleEffectAmount(effect.amount, level))}
              </span>
            </div>
          );
        return null;
      })}
    </>
  );
}
