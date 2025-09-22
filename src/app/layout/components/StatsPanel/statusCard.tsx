import type {
  initialPlayerHp,
  initialPlayerMortality,
  initialPlayerSatiety,
} from "@/app/data/data copy";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronDown, User } from "lucide-react";

interface StatusCardProps {
  collapsed: boolean;
  onToggle: () => void;
  age: number;
  lifespan: number;
  hp: typeof initialPlayerHp;
  satiety: typeof initialPlayerSatiety;
  mortality: typeof initialPlayerMortality;
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
  return (
    <Card className="border-slate-700/50 bg-black py-3.5">
      <CardHeader className="pb-1">
        <CardTitle className="text-sm flex items-center justify-between text-slate-200">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-purple-400" />
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
            <span className="text-purple-300 font-bold">
              {age}/{lifespan}
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-400">HP:</span>
              <span className="text-green-300 font-bold">
                {hp.current}/{hp.max}
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
              <span className="text-orange-300 font-bold">
                {satiety.current}/{satiety.max}
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
              <span className="text-red-500 font-bold">
                {mortality.current}/{mortality.max}
              </span>
            </div>
            <Progress
              value={(mortality.current / mortality.max) * 100}
              className="h-1.5 bg-slate-800 [&>div]:bg-red-500"
            />
          </div>
        </CardContent>
      )}
    </Card>
  );
}
