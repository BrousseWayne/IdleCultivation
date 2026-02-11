import { useState } from "react";
import { useCultivatorStore } from "@/app/stores/cultivatorStore";
import { useInventoryStore } from "@/app/stores/inventoryStore";
import { StatusCard } from "./statusCard";
import { ResourcesCard } from "./resourcesCard";
import { LivingConditionsCard } from "./livingConditionsCard";

export function StatsPanel() {
  const [statsCollapsed, setStatsCollapsed] = useState(false);
  const [resourcesCollapsed, setResourcesCollapsed] = useState(false);
  const [livingCollapsed, setLivingCollapsed] = useState(false);

  const age = useCultivatorStore((s) => s.age);
  const lifespan = useCultivatorStore((s) => s.lifespan);
  const playerHp = useCultivatorStore((s) => s.vitality);
  const playerSatiety = useCultivatorStore((s) => s.satiety);
  const playerMortality = useCultivatorStore((s) => s.mortality);

  const playerMoney = useInventoryStore((s) => s.spiritStones);
  const dailyIncome = useInventoryStore((s) => s.dailyIncome);
  const dailyExpenses = useInventoryStore((s) => s.dailyExpenses);

  // console.log(day);
  return (
    <div className="w-64 bg-black border-r border-slate-800/50 p-3 space-y-3 fixed left-0 top-32 h-[calc(100vh-8rem)] overflow-hidden py-6 flex-col leading-7">
      <StatusCard
        collapsed={statsCollapsed}
        onToggle={() => setStatsCollapsed(!statsCollapsed)}
        age={age}
        lifespan={lifespan}
        hp={playerHp}
        satiety={playerSatiety}
        mortality={playerMortality}
      />
      <ResourcesCard
        collapsed={resourcesCollapsed}
        onToggle={() => setResourcesCollapsed(!resourcesCollapsed)}
        money={playerMoney}
        income={dailyIncome}
        expenses={dailyExpenses}
      />
      <LivingConditionsCard
        collapsed={livingCollapsed}
        onToggle={() => setLivingCollapsed(!livingCollapsed)}
      />
    </div>
  );
}
