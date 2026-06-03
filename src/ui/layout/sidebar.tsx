import { type JSX, useMemo } from "react";
import { Link, useLocation } from "react-router";
import { sidebarData } from "@/game/data/navigation";
import { STAT_COLORS } from "@/game/data/sectionColors";
import { describeStat } from "@/game/data/stats";
import { useCultivatorStore } from "@/game/stores/cultivatorStore";
import { useInventoryStore } from "@/game/stores/inventoryStore";
import { useGameStore } from "@/game/stores/gameStore";
import { useActivityStore } from "@/game/stores/activityStore";
import { useLerpNumber } from "@/ui/hooks/useLerpNumber";
import { formatNumber } from "@/game/utils/formatNumber";
import { getActivityXpProgress, scaleEffectAmount } from "@/game/utils";
import type { Stats } from "@/game/types/domain";
import { StatIcon } from "@/ui/components/StatIcon";
import { EntityRegistry } from "@/game/services";
import { text, navKey } from "@/game/content/text";

function renderMoney(amount: number): JSX.Element {
  return <span className="font-mono text-accent-silver">{formatNumber(Math.floor(amount))}</span>;
}

// A mortal has no precise self-knowledge: resources read as words, not numbers.
// Tones use the reserved state scale: jade (good) -> gold (caution) -> cinnabar (bad).
type Tier = { min: number; word: string; tone: string };

const VITALITY_TIERS: Tier[] = [
  { min: 90, word: "Healthy", tone: "text-accent-jade" },
  { min: 70, word: "Bruised", tone: "text-accent-jade" },
  { min: 45, word: "Wounded", tone: "text-accent-gold" },
  { min: 20, word: "Badly hurt", tone: "text-accent-cinnabar" },
  { min: 0, word: "Near death", tone: "text-accent-cinnabar" },
];

const SATIETY_TIERS: Tier[] = [
  { min: 90, word: "Full", tone: "text-accent-jade" },
  { min: 65, word: "Sated", tone: "text-accent-jade" },
  { min: 40, word: "Peckish", tone: "text-accent-gold" },
  { min: 15, word: "Hungry", tone: "text-accent-cinnabar" },
  { min: 0, word: "Starving", tone: "text-accent-cinnabar" },
];

function pickTier(tiers: Tier[], pct: number): Tier {
  return tiers.find((t) => pct >= t.min) ?? tiers[tiers.length - 1];
}

function StatWord({ label, tier }: { label: string; tier: Tier }) {
  return (
    <div className="flex justify-between">
      <span className="text-ink-2">{label}</span>
      <span className={`font-semibold ${tier.tone}`}>{tier.word}</span>
    </div>
  );
}

function SectionHeader({ label }: { label: string }) {
  return (
    <div className="mb-3 pb-1.5 border-b border-line">
      <div className="flex items-center gap-2">
        <div className="w-1 h-4 bg-ink-3 rounded-full" />
        <span className="text-sm font-bold text-ink uppercase tracking-wider">{label}</span>
      </div>
    </div>
  );
}

export function Sidebar() {
  const location = useLocation();
  const activeTab = location.pathname.slice(1) || "Activities";

  const navigationUnlocks = useGameStore((s) => s.navigationUnlocks);

  const age = useCultivatorStore((s) => s.age);
  const vitality = useCultivatorStore((s) => s.vitality);
  const satiety = useCultivatorStore((s) => s.satiety);
  const stats = useCultivatorStore((s) => s.stats);

  const currency = useInventoryStore((s) => s.currency);
  const queue = useActivityStore((s) => s.queue);
  const activityXp = useActivityStore((s) => s.activityXp);

  const dailyIncome = useMemo(() => {
    let income = 0;
    for (const block of queue) {
      const activity = EntityRegistry.get("activity", block.key);
      if (!activity) continue;
      const { level } = getActivityXpProgress(activityXp[block.key] || 0);
      for (const effect of activity.effects) {
        if (effect.type === "grant_currency") {
          income += scaleEffectAmount(effect.amount, level) * block.units;
        }
      }
    }
    return income;
  }, [queue, activityXp]);

  const dailyExpenses = 0;

  const lerpAge = useLerpNumber(age);
  const lerpMoney = useLerpNumber(currency);
  const net = dailyIncome - dailyExpenses;

  const vitalityTier = pickTier(VITALITY_TIERS, (vitality.current / vitality.max) * 100);
  const satietyTier = pickTier(SATIETY_TIERS, (satiety.current / satiety.max) * 100);

  const statEntries = Object.entries(stats) as [Stats, number][];
  const hasStats = statEntries.some(([_, value]) => value > 0);

  return (
    <aside className="w-60 fixed left-0 top-12 h-[calc(100vh-3rem)] bg-panel-0 overflow-y-auto">
      <nav className="grid grid-cols-5 gap-1 p-2">
        {sidebarData
          .filter((item) => navigationUnlocks[item.name])
          .map((item) => {
            const isActive = activeTab === item.name;
            return (
              <Link
                key={item.name}
                to={item.url}
                title={text(navKey(item.name))}
                className={`relative flex items-center justify-center p-2.5 rounded-md transition-all ${
                  isActive
                    ? "bg-accent-jade/15 text-accent-jade"
                    : "text-ink-3 hover:text-ink-2 hover:bg-panel-2"
                }`}
              >
                <item.icon className={`w-[18px] h-[18px] transition-transform ${isActive ? "scale-110" : ""}`} />
                {isActive && (
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-accent-jade rounded-full" />
                )}
              </Link>
            );
          })}
      </nav>

      <div className="px-4 py-3">
        <SectionHeader label={text("sidebar.section.status")} />
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-ink-2">{text("sidebar.label.age")}</span>
            <span className="text-ink font-mono font-bold">{lerpAge}</span>
          </div>
          <StatWord label={text("stat.hp")} tier={vitalityTier} />
          <StatWord label={text("stat.satiety")} tier={satietyTier} />
        </div>
      </div>

      <div className="px-4 py-3">
        <SectionHeader label={text("sidebar.section.resources")} />
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-ink-2">{text("sidebar.label.money")}</span>
            <span className="font-bold flex gap-1">{renderMoney(lerpMoney)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-ink-2">{text("sidebar.label.income")}</span>
            <span className="text-accent-jade font-mono">+{formatNumber(dailyIncome)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-ink-2">{text("sidebar.label.expenses")}</span>
            <span className="text-accent-cinnabar font-mono">-{formatNumber(dailyExpenses)}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span className="text-ink">{text("sidebar.label.net")}</span>
            <span className={`font-mono ${net >= 0 ? "text-accent-jade" : "text-accent-cinnabar"}`}>
              {net >= 0 ? "+" : ""}{formatNumber(net)}
            </span>
          </div>
        </div>
      </div>

      {hasStats && (
        <div className="px-4 py-3">
          <SectionHeader label={text("sidebar.section.attributes")} />
          <div className="space-y-2 text-sm">
            {statEntries.map(([stat, value]) => (
              <div key={stat} className="flex items-center justify-between">
                <StatIcon stat={stat} className={STAT_COLORS[stat]} size={16} />
                <span className={`font-semibold ${STAT_COLORS[stat]}`}>{describeStat(stat, value)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
