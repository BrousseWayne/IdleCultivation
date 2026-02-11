import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronDown, User } from "lucide-react";
import { useLerpNumber } from "@/app/utils/useLerpNumber";

interface StatusCardProps {
  collapsed: boolean;
  onToggle: () => void;
  age: number;
  lifespan: number;
  hp: { max: number; current: number };
  satiety: { max: number; current: number };
  mortality: { max: number; current: number };
}

export function StatusCard({
  collapsed,
  onToggle,
  age,
  lifespan,
  hp,
  satiety,
  mortality,
}: StatusCardProps) {
  const lerpAge = useLerpNumber(age);
  const lerpHp = useLerpNumber(hp.current);
  const lerpSatiety = useLerpNumber(satiety.current);
  const lerpMortality = useLerpNumber(mortality.current);

  const mortalityPct = mortality.current / mortality.max;
  const mortalityHigh = mortalityPct > 0.7;

  return (
    <Card className="border-slate-700/50 bg-black py-3.5">
      <CardHeader className="pb-1">
        <CardTitle className="text-sm flex items-center justify-between text-slate-200">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-accent-emerald" />
            Status
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="w-6 h-6 p-0"
          >
            <ChevronDown
              className={`w-3 h-3 transition-transform ${
                collapsed ? "rotate-180" : ""
              }`}
            />
          </Button>
        </CardTitle>
      </CardHeader>
      {!collapsed && (
        <CardContent className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-400">Age/Lifespan:</span>
            <span className="text-accent-jade font-bold font-mono">
              {lerpAge}/{lifespan}
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-400">HP:</span>
              <span className="text-green-300 font-bold font-mono">
                {lerpHp}/{hp.max}
              </span>
            </div>
            <Progress
              value={(hp.current / hp.max) * 100}
              className="h-1.5 bg-slate-800 [&>div]:bg-green-500"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-400">Satiety:</span>
              <span className="text-orange-300 font-bold font-mono">
                {lerpSatiety}/{satiety.max}
              </span>
            </div>
            <Progress
              value={(satiety.current / satiety.max) * 100}
              className="h-1.5 bg-slate-800 [&>div]:bg-orange-500"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-400">Mortality:</span>
              <span className={`font-bold font-mono ${mortalityHigh ? "text-accent-cinnabar" : "text-red-500"}`}>
                {lerpMortality}/{mortality.max}
              </span>
            </div>
            <Progress
              value={mortalityPct * 100}
              striped={mortalityHigh}
              className={`h-1.5 bg-slate-800 ${mortalityHigh ? "[&>div]:bg-accent-cinnabar" : "[&>div]:bg-red-500"}`}
            />
          </div>
        </CardContent>
      )}
    </Card>
  );
}
