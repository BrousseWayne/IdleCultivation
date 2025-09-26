import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Briefcase, Heart, User } from "lucide-react";
import { useGameState } from "../contexts/gameStateContext";

const CoreStatsCard = ({ stats }) => (
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
        <span className="font-mono text-primary text-sm">2,847/3,000</span>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-slate-700/30 to-transparent"></div>
      <div className="flex justify-between items-center py-1">
        <span className="text-sm text-slate-400 font-semibold">
          Body Tempering
        </span>
        <span className="font-mono text-accent text-sm">{stats.Strength}</span>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-slate-700/30 to-transparent"></div>
      <ProgressField label="HP" value={100} colorClass="bg-green-500" />
      <ProgressField label="Hunger" value={85} colorClass="bg-orange-500" />
    </CardContent>
  </Card>
);

const SkillsCard = () => (
  <Card className="bg-card border-border/50">
    <CardHeader className="pb-2">
      <CardTitle className="flex items-center gap-2 text-base">
        <Briefcase className="w-4 h-4 text-secondary" />
        Skills & Abilities
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-2 p-3">
      <SkillLine
        label="Crafting Skill"
        value="67/100"
        colorClass="text-primary"
      />
      <SkillLine
        label="Trading Skill"
        value="34/100"
        colorClass="text-accent"
      />
      <SkillLine
        label="Cooking Skill"
        value="45/100"
        colorClass="text-secondary"
      />
      <SkillLine
        label="Musical Skill"
        value="12/100"
        colorClass="text-destructive"
      />
    </CardContent>
  </Card>
);

const SocialCard = () => (
  <Card className="bg-card border-border/50">
    <CardHeader className="pb-2">
      <CardTitle className="flex items-center gap-2 text-base">
        <Heart className="w-4 h-4 text-accent" />
        Social & Mental
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-2 p-3">
      <SkillLine
        label="Relationship Points"
        value="156"
        colorClass="text-primary"
      />
      <SkillLine label="Knowledge" value="89" colorClass="text-accent" />
      <SkillLine
        label="Strategic Thinking"
        value="43"
        colorClass="text-secondary"
      />
      <SkillLine
        label="Artistic Skill"
        value="28"
        colorClass="text-destructive"
      />
    </CardContent>
  </Card>
);

const SkillLine = ({
  label,
  value,
  colorClass,
}: {
  label: string;
  value: string;
  colorClass: string;
}) => (
  <div className="flex justify-between items-center">
    <span className="text-sm text-muted-foreground">{label}</span>
    <span className={`font-mono ${colorClass} text-sm`}>{value}</span>
  </div>
);

const ProgressField = ({
  label,
  value,
  colorClass,
}: {
  label: string;
  value: number;
  colorClass: string;
}) => (
  <div className="py-1">
    <div className="flex justify-between text-sm mb-1">
      <span className="text-slate-400 font-semibold">{label}</span>
    </div>
    <div className="relative group cursor-help">
      <Progress
        value={value}
        className={`h-2 bg-slate-800 [&>div]:${colorClass}`}
      />
      <div className="hidden group-hover:block absolute -top-8 right-0 bg-background/95 backdrop-blur-sm border border-border rounded px-2 py-1 text-xs whitespace-nowrap">
        {value}/{label === "HP" ? "100" : "100"} {label}
      </div>
    </div>
  </div>
);

export const RenderStatsPage = () => {
  const { stats } = useGameState();
  console.log(stats);
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
        <CoreStatsCard stats={stats} />
        <SkillsCard />
        <SocialCard />
      </div>
    </div>
  );
};
