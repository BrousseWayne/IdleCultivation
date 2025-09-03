import type {
  Achievement,
  Opponent,
  SpiritualResource,
  Stat,
} from "@/types-3/props";
import { CultivationGrounds } from "./cultivationGrounds";
import { CultivatorStats } from "./cultivatorStats";
import { DaoAchievements } from "./daoAchievements";
import { Header } from "./header";
import { SidebarNav } from "./sidebarNav";
import { SpiritualResources } from "./spiritualResources";

export default function IdleGameInterface3() {
  const resources = {
    spiritStones: "1,234,567",
    qi: 89,
    cultivationPoints: 45,
    daoInsights: 12,
  };

  const stats: Stat[] = [
    {
      label: "Cultivation Progress",
      value: "2,847/3,000",
      progress: 94.9,
      color: "text-primary",
    },
    {
      label: "Body Tempering",
      value: "78/100",
      progress: 78,
      color: "text-accent",
    },
    {
      label: "Soul Strength",
      value: "45/80",
      progress: 56.25,
      color: "text-secondary",
    },
  ];

  const spiritualResources: SpiritualResource[] = [
    { label: "Spirit Stones", value: "1,234,567", color: "text-primary" },
    { label: "Immortal Crystals", value: "2,847", color: "text-secondary" },
    { label: "Qi Energy", value: "89/100", color: "text-muted-foreground" },
    { label: "Spirit Herbs", value: "456", color: "text-accent" },
    { label: "Beast Cores", value: "234", color: "text-destructive" },
  ];

  const achievements: Achievement[] = [
    {
      label: "First Breakthrough",
      variant: "outline",
      style: "border-primary/40 text-primary",
    },
    {
      label: "Spirit Stone Hoarder",
      variant: "outline",
      style: "border-secondary/40 text-secondary",
    },
    {
      label: "Realm Ascender",
      variant: "secondary",
      style: "bg-muted text-muted-foreground",
    },
  ];

  const opponent: Opponent = {
    name: "Demonic Wolf",
    realm: "Qi Condensation 8th Layer",
    hp: 650,
    maxHp: 1000,
    hpPercent: 65,
  };

  return (
    <div className="min-h-screen bg-background flex flex-col text-foreground dark">
      <Header
        title="Immortal Cultivation"
        realm="Qi Condensation 9th Layer"
        stage="Foundation Establishment"
        resources={resources}
      />
      <div className="flex-1 flex">
        <aside className="w-64 bg-sidebar backdrop-blur-sm border-r border-sidebar-border p-4 space-y-4">
          <CultivatorStats stats={stats} />
          <SpiritualResources resources={spiritualResources} />
          <DaoAchievements achievements={achievements} />
        </aside>
        <SidebarNav />
        <main className="flex-1">
          <div className="h-full bg-background border-l border-border flex items-center justify-center">
            <CultivationGrounds opponent={opponent} />
          </div>
        </main>
      </div>
    </div>
  );
}
