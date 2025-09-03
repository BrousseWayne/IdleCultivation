// types/props.ts

// Header.tsx
export interface HeaderProps {
  title: string;
  realm: string;
  stage: string;
  resources: {
    spiritStones: string;
    qi: number;
    cultivationPoints: number;
    daoInsights: number;
  };
}

export interface ResourceDisplayProps {
  icon: React.ReactNode;
  value: string;
  className?: string;
}

// SidebarNav.tsx
export interface NavItem {
  label: string;
  variant:
    | "outline"
    | "default"
    | "secondary"
    | "destructive"
    | "link"
    | "ghost"
    | null
    | undefined;
}

export interface SidebarNavProps {
  items?: NavItem[]; // optional override
}

// CultivatorStats.tsx
export interface Stat {
  label: string;
  value: string;
  progress: number; // 0-100
  color: string; // tailwind text class
}

export interface CultivatorStatsProps {
  stats: Stat[];
}

// SpiritualResources.tsx
export interface SpiritualResource {
  label: string;
  value: string;
  color: string; // tailwind text class
}

export interface SpiritualResourcesProps {
  resources: SpiritualResource[];
}

// DaoAchievements.tsx
export interface Achievement {
  label: string;
  variant:
    | "default"
    | "secondary"
    | "outline"
    | "destructive"
    | undefined
    | null;
  style?: string;
}

export interface DaoAchievementsProps {
  achievements: Achievement[];
}

// CultivationGrounds.tsx
export interface Opponent {
  name: string;
  realm: string;
  hp: number;
  maxHp: number;
  hpPercent: number; // 0-100
}

export interface CultivationGroundsProps {
  opponent: Opponent;
}
