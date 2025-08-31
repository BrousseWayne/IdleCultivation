// components/main/CultivationGrounds.tsx
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Flame, Mountain } from "lucide-react";
import type { Opponent } from "@/types/props";

export function CultivationGrounds({ opponent }: { opponent: Opponent }) {
  return (
    <div className="text-center space-y-4 p-6">
      <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto border border-primary/40">
        <div className="w-24 h-24 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full flex items-center justify-center">
          <Mountain className="w-12 h-12 text-primary" />
        </div>
      </div>
      <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        Cultivation Grounds
      </h2>
      <p className="text-muted-foreground max-w-md">
        Your path to immortality continues here. Meditate to gather Qi and break
        through to higher realms automatically.
      </p>
      <div className="flex gap-2 justify-center">
        <Button
          size="lg"
          className="flex items-center gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
        >
          <Flame className="w-4 h-4" />
          Auto Cultivate
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="border-border text-muted-foreground hover:bg-muted bg-transparent"
        >
          Manual Training
        </Button>
      </div>
      <div className="mt-6 p-4 bg-card rounded-lg border border-border">
        <p className="text-sm text-muted-foreground mb-2">Current Opponent</p>
        <div className="flex items-center justify-between">
          <span className="font-semibold text-card-foreground">
            {opponent.name}
          </span>
          <Badge
            variant="destructive"
            className="bg-destructive/20 text-neutral-400 border-destructive/40"
          >
            {opponent.realm}
          </Badge>
        </div>
        <Progress value={opponent.hpPercent} className="mt-2 bg-muted" />
        <p className="text-xs text-muted-foreground mt-1">
          Spiritual Energy: {opponent.hp}/{opponent.maxHp}
        </p>
      </div>
    </div>
  );
}
