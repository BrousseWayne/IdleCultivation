// components/sidebar/DaoAchievements.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import type { DaoAchievementsProps } from "@/types/props";

export function DaoAchievements({ achievements }: DaoAchievementsProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-2 text-card-foreground">
          <Star className="w-4 h-4 text-primary" />
          Dao Achievements
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {achievements.map((ach) => (
            <Badge
              key={ach.label}
              variant={ach.variant}
              className={`w-full justify-start ${ach.style}`}
            >
              {ach.label}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
