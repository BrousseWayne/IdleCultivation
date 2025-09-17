import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, Coins, Home, User } from "lucide-react";
import { useState } from "react";

export function StatsPanel() {
  const [statsCollapsed, setStatsCollapsed] = useState(false);
  const [resourcesCollapsed, setResourcesCollapsed] = useState(false);
  const [livingCollapsed, setLivingCollapsed] = useState(false);

  return (
    <div className="w-64 bg-black border-r border-slate-800/50 p-3 space-y-3 fixed left-0 top-32 h-[calc(100vh-8rem)] overflow-hidden py-6 flex-col leading-7">
      <Card className="border-slate-700/50 bg-black py-3.5">
        <CardHeader className="pb-1">
          <CardTitle className="text-sm flex items-center justify-between text-slate-200">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-purple-400" />
              Cultivator Status
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setStatsCollapsed(!statsCollapsed)}
              className="w-6 h-6 p-0"
            >
              <ChevronDown
                className={`w-3 h-3 transition-transform ${
                  statsCollapsed ? "rotate-180" : ""
                }`}
              />
            </Button>
          </CardTitle>
        </CardHeader>
        {!statsCollapsed && (
          <CardContent className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Age/Lifespan:</span>
              <span className="text-purple-300 font-bold">23/150</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Mood:</span>
              <span className="text-violet-300 font-bold">Content</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-400">HP:</span>
                <span className="text-green-300 font-bold">100/100</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5">
                <div
                  className="bg-green-500 h-1.5 rounded-full"
                  style={{ width: "100%" }}
                ></div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-400">Hunger:</span>
                <span className="text-orange-300 font-bold">75/100</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5">
                <div
                  className="bg-orange-500 h-1.5 rounded-full"
                  style={{ width: "75%" }}
                ></div>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

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
              onClick={() => setResourcesCollapsed(!resourcesCollapsed)}
              className="w-6 h-6 p-0"
            >
              <ChevronDown
                className={`w-3 h-3 transition-transform ${
                  resourcesCollapsed ? "rotate-180" : ""
                }`}
              />
            </Button>
          </CardTitle>
        </CardHeader>
        {!resourcesCollapsed && (
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

      <Card className="border-slate-700/50 bg-black leading-7 flex-col px-0 py-3.5">
        <CardHeader className="pb-1">
          <CardTitle className="text-sm flex items-center justify-between text-slate-200">
            <div className="flex items-center gap-2">
              <Home className="w-4 h-4 text-green-400" />
              Living Conditions
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLivingCollapsed(!livingCollapsed)}
              className="w-6 h-6 p-0"
            >
              <ChevronDown
                className={`w-3 h-3 transition-transform ${
                  livingCollapsed ? "rotate-180" : ""
                }`}
              />
            </Button>
          </CardTitle>
        </CardHeader>
        {!livingCollapsed && (
          <CardContent className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Housing:</span>
              <span className="text-green-300 font-bold">Small Cottage</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Meal Quality:</span>
              <span className="text-yellow-300 font-bold">Average</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-400">Lifestyle:</span>
                <span className="text-blue-300 font-bold">Modest (65%)</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5">
                <div
                  className="bg-blue-500 h-1.5 rounded-full"
                  style={{ width: "65%" }}
                ></div>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">XP Multiplier:</span>
              <span className="text-purple-300 font-bold">1.2x</span>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
