import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Activity,
  Clock,
  MapPin,
  Mountain,
  Settings,
  Smile,
} from "lucide-react";
import {
  currentLocation,
  currentTask,
  freeTime,
  moodBonus,
} from "../data/data";

export function Header() {
  return (
    <header className="sticky top-0 z-50 h-20 bg-black/95 backdrop-blur-sm border-b border-slate-800/50 flex flex-col px-4">
      <div className="flex items-center justify-between py-2">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
            Immortal Cultivation
          </h1>
          <div className="flex items-center gap-2">
            <Badge
              variant="secondary"
              className="flex items-center gap-1 bg-slate-900 text-purple-300 border-purple-500/30 text-xs"
            >
              <Mountain className="w-3 h-3" />
              Human: Mortal
            </Badge>
            <Badge
              variant="outline"
              className="border-violet-500/30 text-violet-400 text-xs"
            >
              Blank Canvas
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-sm">
            <MapPin className="w-4 h-4 text-purple-400" />
            <span className="text-purple-200 font-semibold">Location:</span>
            <span className="text-violet-300 font-bold">{currentLocation}</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Activity className="w-4 h-4 text-purple-400" />
            <span className="text-purple-200 font-semibold">Current Task:</span>
            <span className="text-violet-300 font-bold">{currentTask}</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Clock className="w-4 h-4 text-purple-400" />
            <span className="text-purple-200 font-semibold">Free Time:</span>
            <span className="text-violet-300 font-bold">{freeTime}h</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Smile className="w-4 h-4 text-violet-400" />
            <span className="text-violet-200 font-semibold">Mood Bonus:</span>
            <span className="text-purple-300 font-bold">+{moodBonus}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
