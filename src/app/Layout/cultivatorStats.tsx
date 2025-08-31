// components/sidebar/CultivatorStats.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Stat } from "@/types/props";
import { User } from "lucide-react";

export function CultivatorStats({ stats }: { stats: Stat[] }) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-2 text-card-foreground">
          <User className="w-4 h-4 text-primary" />
          Cultivator Stats
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {stats.map((stat) => (
          <div key={stat.label}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">{stat.label}</span>
              <span className={`font-mono ${stat.color}`}>{stat.value}</span>
            </div>
            <Progress value={stat.progress} className="h-2 bg-muted" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
