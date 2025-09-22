import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, Coins } from "lucide-react";

interface ResourcesCardProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function ResourcesCard({ collapsed, onToggle }: ResourcesCardProps) {
  return (
    <Card className="border-slate-700/50 bg-black">
      <CardHeader className="pb-1">
        <CardTitle className="text-sm flex items-center justify-between text-slate-200">
          <div className="flex items-center gap-2">
            <Coins className="w-4 h-4 text-yellow-400" />
            Resources
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
            <span className="text-slate-400">Gold:</span>
            <span className="text-yellow-300 font-bold">1,247</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Spirit Stones:</span>
            <span className="text-cyan-300 font-bold">89</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Gems:</span>
            <span className="text-purple-300 font-bold">23</span>
          </div>
          <div className="border-t border-slate-700/50 pt-2 mt-2">
            <div className="flex justify-between">
              <span className="text-slate-400">Daily Income:</span>
              <span className="text-green-300 font-bold">+45g</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Daily Expenses:</span>
              <span className="text-red-300 font-bold">-32g</span>
            </div>
            <div className="flex justify-between font-bold">
              <span className="text-slate-300">Net Income:</span>
              <span className="text-green-400">+13g</span>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
