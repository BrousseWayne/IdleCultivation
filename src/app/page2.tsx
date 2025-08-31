import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Coins,
  Zap,
  Settings,
  User,
  Star,
  Flame,
  Mountain,
  Wind,
} from "lucide-react";

type Resource = {
  name: string;
  value: string | number;
  icon?: React.ReactNode;
  color?: string;
};

type ProgressStat = {
  label: string;
  current: number;
  max: number;
  color?: string;
};

type Achievement = {
  label: string;
  variant: "outline" | "secondary";
  className: string;
};

type Opponent = {
  name: string;
  realm: string;
  progress: number;
  energy: string;
};

const headerStats: Resource[] = [
  {
    name: "Spirit Stones",
    value: "1,234,567",
    icon: <Coins className="w-5 h-5 text-primary" />,
    color: "text-primary/80",
  },
  {
    name: "Qi",
    value: "89/100",
    icon: <Zap className="w-5 h-5 text-secondary" />,
    color: "text-secondary/80",
  },
  {
    name: "Cultivation Points",
    value: "45",
    icon: <Flame className="w-5 h-5 text-accent" />,
    color: "text-accent/80",
  },
  {
    name: "Dao Insights",
    value: "12",
    icon: <Wind className="w-5 h-5 text-destructive" />,
    color: "text-destructive/80",
  },
];

const cultivatorStats: ProgressStat[] = [
  {
    label: "Cultivation Progress",
    current: 2847,
    max: 3000,
    color: "text-primary",
  },
  { label: "Body Tempering", current: 78, max: 100, color: "text-accent" },
  { label: "Soul Strength", current: 45, max: 80, color: "text-secondary" },
];

const resources: Resource[] = [
  { name: "Spirit Stones", value: "1,234,567", color: "text-primary" },
  { name: "Immortal Crystals", value: "2,847", color: "text-secondary" },
  { name: "Qi Energy", value: "89/100", color: "text-muted-foreground" },
  { name: "Spirit Herbs", value: "456", color: "text-accent" },
  { name: "Beast Cores", value: "234", color: "text-destructive" },
];

const achievements: Achievement[] = [
  {
    label: "First Breakthrough",
    variant: "outline",
    className: "border-primary/40 text-primary",
  },
  {
    label: "Spirit Stone Hoarder",
    variant: "outline",
    className: "border-secondary/40 text-secondary",
  },
  {
    label: "Realm Ascender",
    variant: "secondary",
    className: "bg-muted text-muted-foreground",
  },
];

const navItems: string[] = [
  "Cultivation",
  "Techniques",
  "Inventory",
  "Alchemy",
  "Missions",
  "Sect",
  "Rankings",
];

const opponent: Opponent = {
  name: "Demonic Wolf",
  realm: "Qi Condensation 8th Layer",
  progress: 65,
  energy: "650/1000",
};

export default function IdleGameInterface2() {
  return (
    <div className="min-h-screen bg-background flex flex-col text-foreground dark">
      <header className="h-20 bg-card/95 backdrop-blur-sm border-b border-border flex items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Immortal Cultivation
          </h1>
          <Badge
            variant="secondary"
            className="flex items-center gap-2 bg-muted text-primary border-primary/40"
          >
            <Mountain className="w-4 h-4" />
            Foundation Establishment
          </Badge>
          <Badge variant="outline" className="border-accent/40 text-accent">
            Realm: Qi Condensation 9th Layer
          </Badge>
        </div>
        <div className="flex items-center gap-6">
          {headerStats.map((stat) => (
            <div key={stat.name} className="flex items-center gap-2 text-sm">
              {stat.icon}
              <span className={`font-mono ${stat.color}`}>{stat.value}</span>
            </div>
          ))}
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
          >
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <div className="flex-1 flex">
        <aside className="w-64 bg-sidebar backdrop-blur-sm border-r border-sidebar-border p-4 space-y-4">
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2 text-card-foreground">
                <User className="w-4 h-4 text-primary" />
                Cultivator Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {cultivatorStats.map((stat) => (
                <div key={stat.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">{stat.label}</span>
                    <span className={`font-mono ${stat.color}`}>
                      {stat.current}/{stat.max}
                    </span>
                  </div>
                  <Progress
                    value={(stat.current / stat.max) * 100}
                    className="h-2 bg-muted"
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-card-foreground">
                Spiritual Resources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {resources.map((res, i) => (
                <div key={res.name}>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-sm text-muted-foreground">
                      {res.name}
                    </span>
                    <span className={`font-mono ${res.color}`}>
                      {res.value}
                    </span>
                  </div>
                  {i < resources.length - 1 && (
                    <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2 text-card-foreground">
                <Star className="w-4 h-4 text-primary" />
                Dao Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {achievements.map((a) => (
                  <Badge
                    key={a.label}
                    variant={a.variant}
                    className={`w-full justify-start ${a.className}`}
                  >
                    {a.label}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </aside>

        <aside className="w-48 bg-sidebar/60 backdrop-blur-sm border-r border-sidebar-border p-4">
          <nav className="space-y-1">
            {navItems.map((item, idx) => (
              <Button
                key={item}
                variant={idx === 0 ? "default" : "ghost"}
                className={`w-full justify-start ${
                  idx === 0
                    ? "bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                size="sm"
              >
                {item}
              </Button>
            ))}
          </nav>
        </aside>

        <main className="flex-1">
          <div className="h-full bg-background border-l border-border flex items-center justify-center">
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
                Your path to immortality continues here. Meditate to gather Qi
                and break through to higher realms automatically.
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
                <p className="text-sm text-muted-foreground mb-2">
                  Current Opponent
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-card-foreground">
                    {opponent.name}
                  </span>
                  <Badge
                    variant="destructive"
                    className="bg-destructive/20 text-destructive border-destructive/40"
                  >
                    {opponent.realm}
                  </Badge>
                </div>
                <Progress value={opponent.progress} className="mt-2 bg-muted" />
                <p className="text-xs text-muted-foreground mt-1">
                  Spiritual Energy: {opponent.energy}
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
