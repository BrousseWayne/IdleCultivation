import { type JSX, useMemo } from "react";
import { Link, useLocation } from "react-router";
import { User, Coins, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { sidebarData } from "../data/navigation";
import { SECTION_COLORS, CURRENCY_COLORS, STAT_COLORS } from "../data/sectionColors";
import { useCultivatorStore } from "../stores/cultivatorStore";
import { useInventoryStore } from "../stores/inventoryStore";
import { useGameStore } from "../stores/gameStore";
import { useActivityStore } from "../stores/activityStore";
import { useLerpNumber } from "../utils/useLerpNumber";
import { formatNumber } from "../utils/formatNumber";
import { getActivityXpProgress, scaleEffectAmount } from "../utils";
import type { Currency, Stats, Activity } from "../types/domain";
import { StatIcon } from "../components/StatIcon";
import { EntityRegistry } from "../services";

function renderMoney(amount: number): JSX.Element[] | JSX.Element {
  const currencyArray: Currency[] = ["Bronze", "Silver", "Gold", "Platinum"];
  const parts: JSX.Element[] = [];
  let remaining = Math.floor(amount);

  for (let i = 0; i < currencyArray.length && remaining > 0; i++) {
    const value = remaining % 100;
    if (value > 0) {
      parts.unshift(
        <span key={currencyArray[i]} className={`font-mono ${CURRENCY_COLORS[currencyArray[i]]}`}>
          {formatNumber(value)}{currencyArray[i][0]}
        </span>
      );
    }
    remaining = Math.floor(remaining / 100);
  }

  if (parts.length === 0) {
    return <span className={`font-mono ${CURRENCY_COLORS.Bronze}`}>0B</span>;
  }
  return parts;
}

function StatBar({ label, value, max, color, danger }: {
  label: string; value: number; max: number; color: "green" | "orange" | "red"; danger?: boolean;
}) {
  const lerpValue = useLerpNumber(value);
  const pct = (value / max) * 100;
  const lowVitality = color === "green" && pct < 30;
  const styles = {
    green: {
      text: lowVitality ? "text-green-300 text-glow-danger" : "text-green-300",
      bar: "[&>div]:bg-green-500"
    },
    orange: { text: "text-orange-300", bar: "[&>div]:bg-orange-500" },
    red: {
      text: danger ? "text-accent-cinnabar text-glow-danger" : "text-red-400",
      bar: danger ? "[&>div]:bg-accent-cinnabar" : "[&>div]:bg-red-500",
    },
  };
  const s = styles[color];

  return (
    <div className="space-y-0.5">
      <div className="flex justify-between">
        <span className="text-slate-500">{label}</span>
        <span className={`${s.text} font-mono font-bold`}>{lerpValue}/{max}</span>
      </div>
      <Progress value={pct} striped={danger} className={`h-1 bg-slate-800/50 ${s.bar} ${danger ? "animate-pulse-danger" : ""}`} />
    </div>
  );
}

export function Sidebar() {
  const location = useLocation();
  const activeTab = location.pathname.slice(1) || "Activities";

  const navigationUnlocks = useGameStore((s) => s.navigationUnlocks);

  const age = useCultivatorStore((s) => s.age);
  const lifespan = useCultivatorStore((s) => s.lifespan);
  const vitality = useCultivatorStore((s) => s.vitality);
  const satiety = useCultivatorStore((s) => s.satiety);
  const mortality = useCultivatorStore((s) => s.mortality);
  const stats = useCultivatorStore((s) => s.stats);

  const spiritStones = useInventoryStore((s) => s.spiritStones);
  const allocatedActivities = useActivityStore((s) => s.allocatedActivities);
  const activityXp = useActivityStore((s) => s.activityXp);

  const dailyIncome = useMemo(() => {
    let income = 0;
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
          income += scaled * completions;
        }
      }
    }
    return income;
  }, [allocatedActivities, activityXp]);

  const dailyExpenses = 0;

  const lerpAge = useLerpNumber(age);
  const lerpMoney = useLerpNumber(spiritStones);
  const net = dailyIncome - dailyExpenses;

  const statEntries = Object.entries(stats) as [Stats, number][];
  const hasStats = statEntries.some(([_, value]) => value > 0);

  return (
    <aside className="w-60 fixed left-0 top-12 h-[calc(100vh-3rem)] bg-slate-950/50 overflow-y-auto">
      <nav className="flex items-center px-1 py-2">
        {sidebarData
          .filter((item) => navigationUnlocks[item.name])
          .map((item) => {
            const isActive = activeTab === item.name;
            const color = SECTION_COLORS[item.name];
            return (
              <Link
                key={item.name}
                to={item.url}
                title={item.name}
                className={`relative flex-1 flex items-center justify-center py-2 rounded transition-colors ${
                  isActive
                    ? `text-${color}`
                    : `text-slate-600 hover:text-${color}/60`
                }`}
              >
                <item.icon className="w-6 h-6" />
                {isActive && (
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-${color} rounded-full`} />
                )}
              </Link>
            );
          })}
      </nav>

      <div className="border-t border-slate-800/30 mx-4" />

      <div className="px-4 py-4">
        <div className="flex items-center gap-1.5 text-[10px] text-slate-400 uppercase tracking-widest mb-3 font-semibold">
          <User className="w-3.5 h-3.5" />
          Status
        </div>
        <div className="space-y-2.5 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500">Age</span>
            <span className="text-accent-jade font-mono font-bold">{lerpAge}/{lifespan}</span>
          </div>
          <StatBar label="HP" value={vitality.current} max={vitality.max} color="green" />
          <StatBar label="Satiety" value={satiety.current} max={satiety.max} color="orange" />
          <StatBar label="Mortality" value={mortality.current} max={mortality.max} color="red" danger={mortality.current / mortality.max > 0.7} />
        </div>
      </div>

      <div className="border-t border-slate-800/30 mx-4" />

      <div className="px-4 py-4">
        <div className="flex items-center gap-1.5 text-[10px] text-slate-400 uppercase tracking-widest mb-3 font-semibold">
          <Coins className="w-3.5 h-3.5" />
          Resources
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500">Money</span>
            <span className="font-bold flex gap-1">{renderMoney(lerpMoney)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Income</span>
            <span className="text-accent-emerald font-mono">+{formatNumber(dailyIncome)}g</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Expenses</span>
            <span className="text-accent-cinnabar font-mono">-{formatNumber(dailyExpenses)}g</span>
          </div>
          <div className="flex justify-between font-bold">
            <span className="text-slate-400">Net</span>
            <span className={`font-mono ${net >= 0 ? "text-accent-emerald" : "text-accent-cinnabar"}`}>
              {net >= 0 ? "+" : ""}{formatNumber(net)}g
            </span>
          </div>
        </div>
      </div>

      {hasStats && (
        <>
          <div className="border-t border-slate-800/30 mx-4" />

          <div className="px-4 py-4">
            <div className="flex items-center gap-1.5 text-[10px] text-slate-400 uppercase tracking-widest mb-3 font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              Attributes
            </div>
            <div className="space-y-2 text-sm">
              {statEntries.map(([stat, value]) => (
                <div key={stat} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <StatIcon stat={stat} className={STAT_COLORS[stat]} size={16} />
                    <span className="text-slate-500">{stat}</span>
                  </div>
                  <span className={`font-mono font-bold ${STAT_COLORS[stat]}`}>
                    {formatNumber(value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

    </aside>
  );
}
