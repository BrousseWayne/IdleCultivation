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

export default function IdleGameInterface() {
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
          <div className="flex items-center gap-2 text-sm">
            <Coins className="w-5 h-5 text-primary" />
            <span className="font-mono text-primary/80">
              1,234,567 Spirit Stones
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Zap className="w-5 h-5 text-secondary" />
            <span className="font-mono text-secondary/80">89/100 Qi</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Flame className="w-5 h-5 text-accent" />
            <span className="font-mono text-accent/80">
              45 Cultivation Points
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Wind className="w-5 h-5 text-destructive" />
            <span className="font-mono text-destructive/80">
              12 Dao Insights
            </span>
          </div>
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
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">
                    Cultivation Progress
                  </span>
                  <span className="font-mono text-primary">2,847/3,000</span>
                </div>
                <Progress value={94.9} className="h-2 bg-muted" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Body Tempering</span>
                  <span className="font-mono text-accent">78/100</span>
                </div>
                <Progress value={78} className="h-2 bg-muted" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Soul Strength</span>
                  <span className="font-mono text-secondary">45/80</span>
                </div>
                <Progress value={56.25} className="h-2 bg-muted" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-card-foreground">
                Spiritual Resources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center py-1">
                <span className="text-sm text-muted-foreground">
                  Spirit Stones
                </span>
                <span className="font-mono text-primary">1,234,567</span>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
              <div className="flex justify-between items-center py-1">
                <span className="text-sm text-muted-foreground">
                  Immortal Crystals
                </span>
                <span className="font-mono text-secondary">2,847</span>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
              <div className="flex justify-between items-center py-1">
                <span className="text-sm text-muted-foreground">Qi Energy</span>
                <span className="font-mono text-muted-foreground">89/100</span>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
              <div className="flex justify-between items-center py-1">
                <span className="text-sm text-muted-foreground">
                  Spirit Herbs
                </span>
                <span className="font-mono text-accent">456</span>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
              <div className="flex justify-between items-center py-1">
                <span className="text-sm text-muted-foreground">
                  Beast Cores
                </span>
                <span className="font-mono text-destructive">234</span>
              </div>
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
                <Badge
                  variant="outline"
                  className="w-full justify-start border-primary/40 text-primary"
                >
                  First Breakthrough
                </Badge>
                <Badge
                  variant="outline"
                  className="w-full justify-start border-secondary/40 text-secondary"
                >
                  Spirit Stone Hoarder
                </Badge>
                <Badge
                  variant="secondary"
                  className="w-full justify-start bg-muted text-muted-foreground"
                >
                  Realm Ascender
                </Badge>
              </div>
            </CardContent>
          </Card>
        </aside>

        <aside className="w-48 bg-sidebar/60 backdrop-blur-sm border-r border-sidebar-border p-4">
          <nav className="space-y-1">
            <Button
              variant="default"
              className="w-full justify-start bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
              size="sm"
            >
              Cultivation
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-muted"
              size="sm"
            >
              Techniques
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-muted"
              size="sm"
            >
              Inventory
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-muted"
              size="sm"
            >
              Alchemy
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-muted"
              size="sm"
            >
              Missions
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-muted"
              size="sm"
            >
              Sect
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-muted"
              size="sm"
            >
              Rankings
            </Button>
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
                    Demonic Wolf
                  </span>
                  <Badge
                    variant="destructive"
                    className="bg-destructive/20 text-destructive border-destructive/40"
                  >
                    Qi Condensation 8th Layer
                  </Badge>
                </div>
                <Progress value={65} className="mt-2 bg-muted" />
                <p className="text-xs text-muted-foreground mt-1">
                  Spiritual Energy: 650/1000
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
