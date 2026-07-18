import { TrendingUp, ListOrdered, X, ChevronDown } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useActivityStore } from "@/game/stores/activityStore";
import { useGameStore } from "@/game/stores/gameStore";
import { useActivityVisibility } from "@/game/stores/unlockStore";
import { useMemo, useState } from "react";
import { STAT_COLORS, getCategoryHex, CATEGORY_COLOR_CLASSES } from "@/game/data/sectionColors";
import { EntityRegistry } from "@/game/services";
import { unqueueActivity } from "@/game/engine/gameLoop";
import { getPlace } from "@/game/data/places";
import { activityData } from "@/game/data/activity";
import { formatNumber, projectQueueGains } from "@/game/utils";
import { StatIcon, CurrencyIcon, Glyph } from "@/ui/components/StatIcon";
import { CATEGORY_GLYPHS } from "@/game/data/glyphs";
import { ActivityRow } from "@/ui/components/ActivityRow";
import { useActivityActions } from "@/ui/hooks/useActivityActions";
import { PageHeader } from "@/ui/components/PageHeader";
import { text } from "@/game/content/text";
import { ALL_CATEGORIES, type Activity as ActivityT, type Stats } from "@/game/types/domain";

export function RenderActivitiesPage() {
  const queue = useActivityStore((state) => state.queue);
  const activityXp = useActivityStore((state) => state.activityXp);
  const repeatActivities = useActivityStore((state) => state.repeatActivities);
  const setRepeatActivities = useActivityStore((state) => state.setRepeatActivities);
  const isVisible = useActivityVisibility();
  const currentPlaceKey = useGameStore((state) => state.currentPlaceKey);
  const { queue: doQueue, unqueue } = useActivityActions();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const place = getPlace(currentPlaceKey);
  // available set = activities here + always-on (self-scoped), grouped by category
  const available = useMemo(() => {
    const placeActivities = (place?.activityKeys ?? [])
      .map((activityKey) => EntityRegistry.get("activity", activityKey))
      .filter((activity): activity is ActivityT => !!activity && isVisible(activity));
    const selfActivities = activityData.filter((activity) => activity.scope === "self" && isVisible(activity));
    const all = [...placeActivities, ...selfActivities];
    const byCategory: Record<string, ActivityT[]> = {};
    for (const activity of all) (byCategory[activity.category] ??= []).push(activity);
    return byCategory;
  }, [place, isVisible]);

  // projected gains across the whole queue — disclosure rules applied at the source
  const projected = useMemo(() => projectQueueGains(queue, activityXp), [queue, activityXp]);
  const statGains = useMemo(
    () =>
      (Object.entries(projected.stats) as [Stats, number][]).map(([stat, amount]) => ({
        stat,
        amount,
        colorClass: STAT_COLORS[stat] || "text-ink",
      })),
    [projected]
  );
  const hasProjection = projected.coin > 0 || projected.coinUndisclosed || statGains.length > 0;

  const queuedUnitCount = queue.reduce((sum, block) => sum + block.units, 0);

  return (
    <div className="space-y-4">
      <PageHeader glyph="業" title={text("page.activities.title")} color="text-accent-jade" subtitle={text("page.activities.subtitle")} />

      <div className="flex gap-6 items-start">
        {/* left: activities to do */}
        <div className="flex-[3] min-w-0 space-y-4">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-ink-2 text-xs">{text("page.activities.label.autoRepeat")}</span>
              <Switch checked={repeatActivities} onCheckedChange={setRepeatActivities} className="data-[state=checked]:bg-accent-jade scale-75" />
            </div>
          </div>

          {ALL_CATEGORIES.filter((category) => available[category]?.length).map((category) => {
            const categoryColors = CATEGORY_COLOR_CLASSES[category];
            const isCollapsed = collapsed[category];
            return (
              <div key={category} className="space-y-1.5">
                <button
                  onClick={() => setCollapsed((previous) => ({ ...previous, [category]: !previous[category] }))}
                  className={`flex items-center gap-2 text-lg font-semibold ${categoryColors.text} capitalize hover:opacity-80 transition-colors`}
                >
                  <ChevronDown className={`w-4 h-4 transition-transform ${isCollapsed ? "-rotate-90" : ""}`} />
                  <Glyph char={CATEGORY_GLYPHS[category]} size={17} />
                  {category}
                </button>
                {!isCollapsed && (
                  <div className="space-y-1">
                    {available[category].map((activity, index) => (
                      <ActivityRow key={activity.key} activity={activity} index={index} onQueue={doQueue} onUnqueue={unqueue} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* right: management panel */}
        <div className="flex-[2] min-w-[260px] max-w-[380px] sticky top-6 space-y-4">
      {/* projected gains */}
      {hasProjection && (
        <div className="bg-panel border border-line rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-2 text-xs text-ink-2 uppercase tracking-widest font-semibold">
            <TrendingUp className="w-3.5 h-3.5" /> {text("page.activities.section.projectedGains")}
          </div>
          <div className="space-y-1">
            {(projected.coin > 0 || projected.coinUndisclosed) && (
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1.5">
                  <CurrencyIcon className="text-accent-silver" size={14} />
                  <span className="text-ink-2">Copper</span>
                </div>
                <span className="font-mono font-bold text-accent-silver">
                  {projected.coin > 0 && `+${formatNumber(projected.coin)}`}
                  {projected.coinUndisclosed && <span className="text-ink-3">{projected.coin > 0 ? " +?" : "+?"}</span>}
                </span>
              </div>
            )}
            {statGains.map((gain) => (
              <div key={gain.stat} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1.5">
                  <StatIcon stat={gain.stat} className={gain.colorClass} size={14} />
                  <span className="text-ink-2">{gain.stat}</span>
                </div>
                <span className={`font-mono font-bold ${gain.colorClass}`}>+{formatNumber(gain.amount)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* queue (ordered blocks) */}
      <div className="bg-panel border border-line rounded-lg p-4 space-y-3">
        <div className="flex items-center gap-2 text-xs text-ink-2 uppercase tracking-widest font-semibold">
          <ListOrdered className="w-3.5 h-3.5" /> Queue {queuedUnitCount > 0 && <span className="text-accent-jade">({queuedUnitCount})</span>}
        </div>
        {queue.length === 0 ? (
          <p className="text-xs text-ink-2 italic">{text("page.activities.queue.empty")}</p>
        ) : (
          <div className="space-y-1">
            {queue.map((block, index) => {
              const activity = EntityRegistry.get("activity", block.key);
              if (!activity) return null;
              const hex = getCategoryHex(activity.category);
              return (
                <div key={`${block.key}-${index}`} className="flex items-center gap-2 text-sm py-1">
                  <span className="text-[11px] text-ink-3 font-mono w-4">{index + 1}</span>
                  <Glyph char={CATEGORY_GLYPHS[activity.category]} size={15} className="w-4 text-center" style={{ color: hex }} />
                  <span className="text-ink">{activity.name}</span>
                  <span className="text-xs text-ink-2">×{block.units}</span>
                  <span className="ml-auto text-xs text-ink-2 font-mono">{activity.timeCost * block.units}h</span>
                  <button onClick={() => unqueueActivity(block.key)} className="text-ink-3 hover:text-accent-cinnabar" title="remove one">
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
