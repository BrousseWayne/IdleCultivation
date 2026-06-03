import { useCultivatorStore } from "@/game/stores/cultivatorStore";
import { useInventoryStore } from "@/game/stores/inventoryStore";
import { StatIcon, CurrencyIcon } from "@/ui/components/StatIcon";
import { STAT_COLORS } from "@/game/data/sectionColors";
import { describeStat } from "@/game/data/stats";
import { formatNumber } from "@/game/utils";
import type { Stats } from "@/game/types/domain";
import { useEtherealShimmer } from "@/ui/hooks/useEtherealShimmer";
import { EtherealEffect } from "@/ui/components/EtherealEffect";

export function StatPanel() {
  const stats = useCultivatorStore((s) => s.stats);
  const currency = useInventoryStore((s) => s.currency);
  const { getEffect } = useEtherealShimmer();

  const statEntries = (Object.entries(stats) as [Stats, number][]).filter(
    ([_, value]) => value > 0
  );

  const hasResources = currency > 0 || statEntries.length > 0;
  if (!hasResources) return null;

  return (
    <div className="flex items-center gap-3 px-3 py-1.5 bg-slate-900/30 border border-slate-800/40 rounded">
      {currency > 0 && (
        <div className="flex items-center gap-1.5">
          <CurrencyIcon
            className="text-accent-silver"
            size={14}
          />
          <EtherealEffect effect={getEffect("currency")}>
            <span className="text-xs font-mono font-bold text-accent-silver">
              {formatNumber(currency)}
            </span>
          </EtherealEffect>
        </div>
      )}

      {currency > 0 && statEntries.length > 0 && (
        <div className="w-px h-3 bg-slate-700/50" />
      )}

      {statEntries.map(([stat, amount]) => (
        <div key={stat} className="flex items-center gap-1.5">
          <StatIcon
            stat={stat}
            className={STAT_COLORS[stat]}
            size={14}
          />
          <EtherealEffect effect={getEffect(`stat_${stat}` as any)}>
            <span className={`text-xs font-semibold ${STAT_COLORS[stat]}`}>
              {describeStat(stat, amount)}
            </span>
          </EtherealEffect>
        </div>
      ))}
    </div>
  );
}
