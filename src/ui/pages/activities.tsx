import { Clock, TrendingUp, ListOrdered, Activity, X, ChevronDown } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useActivityStore } from "@/game/stores/activityStore";
import { useGameStore } from "@/game/stores/gameStore";
import { useMemo, useState } from "react";
import { CURRENCY_COLORS, STAT_COLORS, getCategoryHex, CATEGORY_COLOR_CLASSES } from "@/game/data/sectionColors";
import { EntityRegistry } from "@/game/services";
import { unqueueActivity, scheduledHours } from "@/game/engine/gameLoop";
import { getPlace } from "@/game/data/places";
import { activityData } from "@/game/data/activity";
import { formatNumber, getActivityXpProgress, scaleEffectAmount } from "@/game/utils";
import { StatIcon, CurrencyIcon } from "@/ui/components/StatIcon";
import { ActivityRow, useActivityActions } from "@/ui/components/ActivityRow";
import { PageHeader } from "@/ui/components/PageHeader";
import { text } from "@/game/content/text";
import { ALL_CATEGORIES, type Activity as ActivityT } from "@/game/types/domain";

export function RenderActivitiesPage() {
  const queue = useActivityStore((s) => s.queue);
  const activityXp = useActivityStore((s) => s.activityXp);
  const repeatActivities = useActivityStore((s) => s.repeatActivities);
  const setRepeatActivities = useActivityStore((s) => s.setRepeatActivities);
  const maxTimePoints = useGameStore((s) => s.maxTimePoints);
  const currentPlaceKey = useGameStore((s) => s.currentPlaceKey);
  const { queue: doQueue, unqueue } = useActivityActions();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const place = getPlace(currentPlaceKey);
  // available set = activities here + always-on (self-scoped), grouped by category
  const available = useMemo(() => {
    const placeActivities = (place?.activityKeys ?? [])
      .map((k) => EntityRegistry.get("activity", k))
      .filter((a): a is ActivityT => !!a && a.unlocked);
    const selfActivities = activityData.filter((a) => a.scope === "self" && a.unlocked);
    const all = [...placeActivities, ...selfActivities];
    const byCategory: Record<string, ActivityT[]> = {};
    for (const a of all) (byCategory[a.category] ??= []).push(a);
    return byCategory;
  }, [place]);

  // projected gains across the whole queue
  const projectedGains = useMemo(() => {
    const currencyTotals: Record<string, number> = {};
    const statTotals: Record<string, number> = {};
    for (const block of queue) {
      const activity = EntityRegistry.get("activity", block.key);
      if (!activity) continue;
      const { level } = getActivityXpProgress(activityXp[block.key] || 0);
      for (const effect of activity.effects) {
        if (effect.type === "grant_currency") {
          currencyTotals[effect.currency] = (currencyTotals[effect.currency] || 0) + scaleEffectAmount(effect.amount, level) * block.units;
        } else if (effect.type === "grant_stat") {
          statTotals[effect.stat] = (statTotals[effect.stat] || 0) + scaleEffectAmount(effect.amount, level) * block.units;
        }
      }
    }
    const gains: { label: string; amount: number; colorClass: string; type: "currency" | "stat" }[] = [];
    for (const [c, amount] of Object.entries(currencyTotals))
      gains.push({ label: c, amount, colorClass: CURRENCY_COLORS[c as keyof typeof CURRENCY_COLORS] || "text-gray-400", type: "currency" });
    for (const [s, amount] of Object.entries(statTotals))
      gains.push({ label: s, amount, colorClass: STAT_COLORS[s as keyof typeof STAT_COLORS] || "text-gray-400", type: "stat" });
    return gains;
  }, [queue, activityXp]);

  const freeHours = Math.max(0, maxTimePoints - scheduledHours(queue));
  const freePct = maxTimePoints > 0 ? (freeHours / maxTimePoints) * 100 : 0;

  return (
    <div className="space-y-4">
      <PageHeader icon={Activity} title={text("page.activities.title")} color="text-accent-jade" subtitle={text("page.activities.subtitle")} />

      <div className="flex gap-6 items-start">
        {/* left: activities to do */}
        <div className="flex-[3] min-w-0 space-y-4">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-slate-500 text-xs">{text("page.activities.label.autoRepeat")}</span>
              <Switch checked={repeatActivities} onCheckedChange={setRepeatActivities} className="data-[state=checked]:bg-green-500 scale-75" />
            </div>
          </div>

          {ALL_CATEGORIES.filter((cat) => available[cat]?.length).map((category) => {
            const catColors = CATEGORY_COLOR_CLASSES[category];
            const isCollapsed = collapsed[category];
            return (
              <div key={category} className="space-y-1.5">
                <button
                  onClick={() => setCollapsed((p) => ({ ...p, [category]: !p[category] }))}
                  className={`flex items-center gap-2 text-lg font-semibold ${catColors.text} capitalize hover:opacity-80 transition-colors`}
                >
                  <ChevronDown className={`w-4 h-4 transition-transform ${isCollapsed ? "-rotate-90" : ""}`} />
                  {category}
                </button>
                {!isCollapsed && (
                  <div className="space-y-1">
                    {available[category].map((a) => (
                      <ActivityRow key={a.key} activity={a} onQueue={doQueue} onUnqueue={unqueue} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* right: management panel */}
        <div className="flex-[2] min-w-[260px] max-w-[380px] sticky top-6 space-y-4">
      {/* time budget */}
      <div className="bg-slate-900/40 border border-slate-800/40 rounded-lg p-4 space-y-3">
        <div className="flex items-center gap-2 text-xs text-slate-400 uppercase tracking-widest font-semibold">
          <Clock className="w-3.5 h-3.5" /> {text("page.activities.section.timeBudget")}
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">{text("page.activities.label.free")}</span>
            <span className="text-accent-jade font-mono font-bold">{freeHours}h / {maxTimePoints}h</span>
          </div>
          <div className="h-2 bg-slate-800/60 rounded-full overflow-hidden">
            <div className="h-full bg-accent-jade/80 rounded-full transition-all duration-300" style={{ width: `${freePct}%` }} />
          </div>
        </div>
      </div>

      {/* projected gains */}
      {projectedGains.length > 0 && (
        <div className="bg-slate-900/40 border border-slate-800/40 rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-2 text-xs text-slate-400 uppercase tracking-widest font-semibold">
            <TrendingUp className="w-3.5 h-3.5" /> {text("page.activities.section.projectedGains")}
          </div>
          <div className="space-y-1">
            {projectedGains.map((gain) => (
              <div key={gain.label} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1.5">
                  {gain.type === "currency"
                    ? <CurrencyIcon currency={gain.label as any} className={gain.colorClass} size={14} />
                    : <StatIcon stat={gain.label as any} className={gain.colorClass} size={14} />}
                  <span className="text-slate-500">{gain.label}</span>
                </div>
                <span className={`font-mono font-bold ${gain.colorClass}`}>+{formatNumber(gain.amount)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* queue (ordered blocks) */}
      <div className="bg-slate-900/40 border border-slate-800/40 rounded-lg p-4 space-y-3">
        <div className="flex items-center gap-2 text-xs text-slate-400 uppercase tracking-widest font-semibold">
          <ListOrdered className="w-3.5 h-3.5" /> Queue {queue.length > 0 && <span className="text-accent-jade">({queue.length})</span>}
        </div>
        {queue.length === 0 ? (
          <p className="text-xs text-slate-600 italic">{text("page.activities.queue.empty")}</p>
        ) : (
          <div className="space-y-1">
            {queue.map((block, i) => {
              const a = EntityRegistry.get("activity", block.key);
              if (!a) return null;
              const hex = getCategoryHex(a.category);
              return (
                <div key={`${block.key}-${i}`} className="flex items-center gap-2 text-sm py-1">
                  <span className="text-[10px] text-slate-600 font-mono w-4">{i + 1}</span>
                  <a.icon className="w-4 h-4" style={{ color: hex }} />
                  <span className="text-slate-200">{a.name}</span>
                  <span className="text-xs text-slate-500">×{block.units}</span>
                  <span className="ml-auto text-xs text-slate-600 font-mono">{a.timeCost * block.units}h</span>
                  <button onClick={() => unqueueActivity(block.key)} className="text-slate-600 hover:text-accent-cinnabar" title="remove one">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
        </div>
      </div>
    </div>
  );
}
