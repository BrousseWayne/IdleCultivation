// components/layout/Header.tsx
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { HeaderProps, ResourceDisplayProps } from "@/types/props";
import { Coins, Zap, Settings, Flame, Wind, Mountain } from "lucide-react";

export function Header({ title, realm, stage, resources }: HeaderProps) {
  return (
    <header className="h-20 bg-card/95 backdrop-blur-sm border-b border-border flex items-center justify-between px-6">
      <div className="flex items-center gap-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          {title}
        </h1>
        <Badge
          variant="secondary"
          className="flex items-center gap-2 bg-muted text-primary border-primary/40"
        >
          <Mountain className="w-4 h-4" />
          {stage}
        </Badge>
        <Badge variant="outline" className="border-accent/40 text-accent">
          Realm: {realm}
        </Badge>
      </div>
      <div className="flex items-center gap-6">
        <ResourceDisplay
          icon={<Coins className="w-5 h-5 text-primary" />}
          value={`${resources.spiritStones} Spirit Stones`}
          className="text-primary/80"
        />
        <ResourceDisplay
          icon={<Zap className="w-5 h-5 text-secondary" />}
          value={`${resources.qi}/100 Qi`}
          className="text-secondary/80"
        />
        <ResourceDisplay
          icon={<Flame className="w-5 h-5 text-accent" />}
          value={`${resources.cultivationPoints} Cultivation Points`}
          className="text-accent/80"
        />
        <ResourceDisplay
          icon={<Wind className="w-5 h-5 text-destructive" />}
          value={`${resources.daoInsights} Dao Insights`}
          className="text-destructive/80"
        />
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground"
        >
          <Settings className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
}

function ResourceDisplay({ icon, value, className }: ResourceDisplayProps) {
  return (
    <div className="flex items-center gap-2 text-sm">
      {icon}
      <span className={`font-mono ${className}`}>{value}</span>
    </div>
  );
}
