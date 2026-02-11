import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Activity,
  Clock,
  MapPin,
  Mountain,
  Settings,
} from "lucide-react";
import { useGameStore } from "../stores/gameStore";
import { useActivityStore } from "../stores/activityStore";
import { EntityRegistry } from "../services";

export function Header() {
  const currentExploreLocation = useGameStore((s) => s.currentExploreLocation);
  const timePoints = useGameStore((s) => s.timePoints);
  const maxTimePoints = useGameStore((s) => s.maxTimePoints);
  const activityQueue = useActivityStore((s) => s.activityQueue);

  const currentTask = activityQueue.length > 0
    ? EntityRegistry.get("activity", activityQueue[0].key)?.name ?? "Unknown"
    : "Idle";

  return (
    <header className="sticky top-0 z-50 h-20 bg-black/95 backdrop-blur-sm border-b border-slate-800/50 flex flex-col px-4">
      <div className="flex items-center justify-between py-2">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-bold font-[family-name:var(--font-display)] bg-gradient-to-r from-accent-jade to-accent-emerald bg-clip-text text-transparent">
            Immortal Cultivation
          </h1>
          <div className="flex items-center gap-2">
            <Badge
              variant="secondary"
              className="flex items-center gap-1 bg-slate-900 text-accent-jade border-accent-jade/30 text-xs"
            >
              <Mountain className="w-3 h-3" />
              Human: Mortal
            </Badge>
            <Badge
              variant="outline"
              className="border-accent-jade/30 text-accent-jade text-xs"
            >
              Blank Canvas
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-sm">
            <MapPin className="w-4 h-4 text-accent-cinnabar" />
            <span className="text-slate-300 font-semibold">Location:</span>
            <span className="text-accent-cinnabar font-bold">{currentExploreLocation}</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Activity className="w-4 h-4 text-accent-jade" />
            <span className="text-slate-300 font-semibold">Current Task:</span>
            <span className="text-accent-jade font-bold">{currentTask}</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Clock className="w-4 h-4 text-accent-sky" />
            <span className="text-slate-300 font-semibold">Free Time:</span>
            <span className="text-accent-sky font-bold font-mono">{timePoints}/{maxTimePoints}h</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
            onClick={() => {}}
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
