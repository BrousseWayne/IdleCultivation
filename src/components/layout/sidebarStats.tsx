"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, User, Coins, Home } from "lucide-react";
import { useState } from "react";

export const SidebarStats = () => {
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
              <span className="text-yellow-300 font-bold">1247</span>
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
          </CardContent>
        )}
      </Card>
    </div>
  );
};
