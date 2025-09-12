import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Briefcase, Heart, User } from "lucide-react";

export const RenderStatsPage = () => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent mb-2">
          Cultivator Statistics
        </h2>
        <p className="text-muted-foreground">
          Comprehensive overview of your cultivation progress and abilities
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
        <Card className="bg-card border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <User className="w-4 h-4 text-purple-400" />
              Core Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 p-3">
            <div className="flex justify-between items-center py-1">
              <span className="text-sm text-slate-400 font-semibold">
                Cultivation Progress
              </span>
              <span className="font-mono text-primary text-sm">
                2,847/3,000
              </span>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-slate-700/30 to-transparent"></div>
            <div className="flex justify-between items-center py-1">
              <span className="text-sm text-slate-400 font-semibold">
                Body Tempering
              </span>
              <span className="font-mono text-accent text-sm">78/100</span>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-slate-700/30 to-transparent"></div>
            <div className="py-1">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-400 font-semibold">HP</span>
              </div>
              <div className="relative group cursor-help">
                <Progress
                  value={100}
                  className="h-2 bg-slate-800 [&>div]:bg-green-500"
                />
                <div className="hidden group-hover:block absolute -top-8 right-0 bg-background/95 backdrop-blur-sm border border-border rounded px-2 py-1 text-xs whitespace-nowrap">
                  100/100 HP
                </div>
              </div>
            </div>
            <div className="py-1">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-400 font-semibold">Hunger</span>
              </div>
              <div className="relative group cursor-help">
                <Progress
                  value={85}
                  className="h-2 bg-slate-800 [&>div]:bg-orange-500"
                />
                <div className="hidden group-hover:block absolute -top-8 right-0 bg-background/95 backdrop-blur-sm border border-border rounded px-2 py-1 text-xs whitespace-nowrap">
                  85/100 Hunger
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Briefcase className="w-4 h-4 text-secondary" />
              Skills & Abilities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 p-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Crafting Skill
              </span>
              <span className="font-mono text-primary text-sm">67/100</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Trading Skill
              </span>
              <span className="font-mono text-accent text-sm">34/100</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Cooking Skill
              </span>
              <span className="font-mono text-secondary text-sm">45/100</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Musical Skill
              </span>
              <span className="font-mono text-destructive text-sm">12/100</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Heart className="w-4 h-4 text-accent" />
              Social & Mental
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 p-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Relationship Points
              </span>
              <span className="font-mono text-primary text-sm">156</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Knowledge</span>
              <span className="font-mono text-accent text-sm">89</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Strategic Thinking
              </span>
              <span className="font-mono text-secondary text-sm">43</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Artistic Skill
              </span>
              <span className="font-mono text-destructive text-sm">28</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
