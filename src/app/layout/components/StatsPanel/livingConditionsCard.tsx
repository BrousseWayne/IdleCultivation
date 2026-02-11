import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, Home } from "lucide-react";

interface LivingConditionsCardProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function LivingConditionsCard({
  collapsed,
  onToggle,
}: LivingConditionsCardProps) {
  return (
    <Card className="border-slate-700/50 bg-black leading-7 flex-col px-0 py-3.5">
      <CardHeader className="pb-1">
        <CardTitle className="text-sm flex items-center justify-between text-slate-200">
          <div className="flex items-center gap-2">
            <Home className="w-4 h-4 text-accent-jade" />
            Living Conditions
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
            <span className="text-slate-400">Housing:</span>
            <span className="text-accent-emerald font-bold">Small Cottage</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Meal Quality:</span>
            <span className="text-accent-gold font-bold">Average</span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-400">Lifestyle:</span>
              <span className="text-accent-sky font-bold">Modest (65%)</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5">
              <div
                className="bg-accent-sky h-1.5 rounded-full"
                style={{ width: "65%" }}
              ></div>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">XP Multiplier:</span>
            <span className="text-accent-jade font-bold">1.2x</span>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
