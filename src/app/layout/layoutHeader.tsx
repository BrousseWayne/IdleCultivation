import { useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Clock,
  Download,
  FastForward,
  MapPin,
  Mountain,
  Pause,
  Play,
  Settings,
  Trash2,
  Upload,
} from "lucide-react";
import { useGameStore } from "../stores/gameStore";
import { SaveManager } from "../services";
import { useLerpNumber } from "../utils/useLerpNumber";
import { StatPanel } from "../components/StatPanel";
import { useEtherealShimmer } from "../hooks/useEtherealShimmer";
import { EtherealEffect } from "../components/EtherealEffect";

export function Header() {
  const currentExploreLocation = useGameStore((s) => s.currentExploreLocation);
  const timePoints = useGameStore((s) => s.timePoints);
  const maxTimePoints = useGameStore((s) => s.maxTimePoints);
  const isPlaying = useGameStore((s) => s.isPlaying);
  const gameSpeed = useGameStore((s) => s.gameSpeed);
  const day = useGameStore((s) => s.day);
  const startGameLoop = useGameStore((s) => s.startGameLoop);
  const stopGameLoop = useGameStore((s) => s.stopGameLoop);
  const setGameSpeed = useGameStore((s) => s.setGameSpeed);

  const lerpTimePoints = useLerpNumber(timePoints);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { getEffect } = useEtherealShimmer();

  const togglePlaying = () => {
    if (isPlaying) stopGameLoop();
    else startGameLoop();
  };

  const cycleSpeed = () => {
    setGameSpeed(gameSpeed === 1 ? 2 : gameSpeed === 2 ? 4 : 1);
  };

  const handleExport = () => {
    const json = SaveManager.exportSave();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cultivation-save-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setSettingsOpen(false);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      SaveManager.importSave(ev.target?.result as string);
    };
    reader.readAsText(file);
  };

  const handleWipe = () => {
    if (window.confirm("Wipe all save data? This cannot be undone.")) {
      SaveManager.wipeSave();
    }
  };

  return (
    <header className="sticky top-0 z-50 h-12 bg-black/95 backdrop-blur-sm border-b border-slate-800/30 flex items-center px-4 gap-6">
      <h1 className="text-lg font-bold font-[family-name:var(--font-display)] text-accent-emerald whitespace-nowrap">
        Immortal Cultivation
      </h1>
      <Badge
        variant="secondary"
        className="flex items-center gap-1 bg-slate-900 text-accent-jade border-accent-jade/20 text-[10px] px-1.5 py-0"
      >
        <Mountain className="w-2.5 h-2.5" />
        Mortal
      </Badge>

      <div className="flex-1" />

      <div className="flex items-center gap-1 text-xs text-slate-400">
        <MapPin className="w-3 h-3 text-accent-cinnabar" />
        <span className="text-accent-cinnabar font-semibold">{currentExploreLocation}</span>
      </div>

      <StatPanel />

      <div className="h-4 w-px bg-slate-800" />

      <div className="flex items-center gap-1">
        <Button
          size="sm"
          variant={isPlaying ? "default" : "ghost"}
          onClick={togglePlaying}
          className="w-6 h-6 p-0"
        >
          {isPlaying ? <Pause className="w-3 h-3" /> : <Play className={`w-3 h-3 ${!isPlaying ? "animate-breathe" : ""}`} />}
        </Button>
        <Button
          size="sm"
          variant={gameSpeed > 1 ? "default" : "ghost"}
          onClick={cycleSpeed}
          className="w-6 h-6 p-0"
        >
          <FastForward className="w-3 h-3" />
        </Button>
        {gameSpeed > 1 && <span className="text-[10px] text-muted-foreground font-mono">{gameSpeed}x</span>}
      </div>

      <span className="text-xs text-accent-sky font-mono font-bold">
        Day <EtherealEffect effect={getEffect("day")}>{day}</EtherealEffect>
      </span>

      <div className="h-4 w-px bg-slate-800" />

      <div className="flex items-center gap-3 px-3 py-1.5 bg-slate-900/50 rounded-md border border-slate-800/50">
        <Clock className="w-4 h-4 text-accent-jade" />
        <EtherealEffect effect={getEffect("timePoints")}>
          <span className="text-sm text-accent-jade font-mono font-bold">{lerpTimePoints}/{maxTimePoints}h</span>
        </EtherealEffect>
        <div className="w-32">
          <Progress value={(timePoints / maxTimePoints) * 100} className="h-2 bg-slate-800 [&>div]:bg-accent-jade" />
        </div>
      </div>

      <div className="relative">
        <Button
          variant="ghost"
          size="sm"
          className="w-6 h-6 p-0 text-slate-500 hover:text-slate-300"
          onClick={() => setSettingsOpen(!settingsOpen)}
        >
          <Settings className="w-3.5 h-3.5" />
        </Button>
        {settingsOpen && (
          <div className="absolute right-0 top-full mt-1 w-44 bg-slate-900 border border-slate-700/50 rounded-md shadow-lg py-1 z-50">
            <button className="w-full px-3 py-1.5 text-xs text-left text-slate-300 hover:bg-slate-800 flex items-center gap-2" onClick={handleExport}>
              <Download className="w-3.5 h-3.5" /> Export Save
            </button>
            <button className="w-full px-3 py-1.5 text-xs text-left text-slate-300 hover:bg-slate-800 flex items-center gap-2" onClick={() => { fileInputRef.current?.click(); setSettingsOpen(false); }}>
              <Upload className="w-3.5 h-3.5" /> Import Save
            </button>
            <button className="w-full px-3 py-1.5 text-xs text-left text-accent-cinnabar hover:bg-slate-800 flex items-center gap-2" onClick={handleWipe}>
              <Trash2 className="w-3.5 h-3.5" /> Wipe Save
            </button>
          </div>
        )}
        <input ref={fileInputRef} type="file" accept=".json" className="hidden" onChange={handleImport} />
      </div>
    </header>
  );
}
