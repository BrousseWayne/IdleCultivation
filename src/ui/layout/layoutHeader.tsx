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
import { useGameStore } from "@/game/stores/gameStore";
import { useActivityStore } from "@/game/stores/activityStore";
import { gameLoop, scheduledHours } from "@/game/engine/gameLoop";
import { SaveManager } from "@/game/services";
import { text } from "@/game/content/text";
import { getPlace } from "@/game/data/places";
import { useLerpNumber } from "@/ui/hooks/useLerpNumber";
import { StatPanel } from "@/ui/components/StatPanel";
import { useEtherealShimmer } from "@/ui/hooks/useEtherealShimmer";
import { EtherealEffect } from "@/ui/components/EtherealEffect";

export function Header() {
  const currentPlaceKey = useGameStore((s) => s.currentPlaceKey);
  const currentPlaceName = getPlace(currentPlaceKey)?.name ?? "";
  const maxTimePoints = useGameStore((s) => s.maxTimePoints);
  const isPlaying = useGameStore((s) => s.isPlaying);
  const gameSpeed = useGameStore((s) => s.gameSpeed);
  const day = useGameStore((s) => s.day);
  const queue = useActivityStore((s) => s.queue);

  const timePoints = Math.max(0, maxTimePoints - scheduledHours(queue));
  const lerpTimePoints = useLerpNumber(timePoints);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { getEffect } = useEtherealShimmer();

  const togglePlaying = () => {
    if (isPlaying) gameLoop.stop();
    else gameLoop.start();
  };

  const cycleSpeed = () => {
    gameLoop.setSpeed(gameSpeed === 1 ? 2 : gameSpeed === 2 ? 4 : 1);
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
    if (window.confirm(text("app.confirm.wipeSave"))) {
      SaveManager.wipeSave();
    }
  };

  return (
    <header className="sticky top-0 z-50 h-12 bg-black/95 backdrop-blur-sm border-b border-line flex items-center px-4 gap-6">
      <h1 className="text-lg font-bold font-[family-name:var(--font-display)] text-accent-jade whitespace-nowrap">
        {text("app.title")}
      </h1>
      <Badge
        variant="secondary"
        className="flex items-center gap-1 bg-panel-2 text-accent-jade border-accent-jade/20 text-[10px] px-1.5 py-0"
      >
        <Mountain className="w-2.5 h-2.5" />
        {text("app.rank")}
      </Badge>

      <div className="flex-1" />

      <div className="flex items-center gap-1 text-xs text-ink-2">
        <MapPin className="w-3 h-3 text-accent-cinnabar" />
        <span className="text-accent-cinnabar font-semibold">{currentPlaceName}</span>
      </div>

      <StatPanel />

      <div className="h-4 w-px bg-line-2" />

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
        {text("app.label.day")} <EtherealEffect effect={getEffect("day")}>{day}</EtherealEffect>
      </span>

      <div className="h-4 w-px bg-line-2" />

      <div className="flex items-center gap-3 px-3 py-1.5 bg-panel rounded-md border border-line">
        <Clock className="w-4 h-4 text-accent-jade" />
        <EtherealEffect effect={getEffect("timePoints")}>
          <span className="text-sm text-accent-jade font-mono font-bold">{lerpTimePoints}/{maxTimePoints}h</span>
        </EtherealEffect>
        <div className="w-32">
          <Progress value={(timePoints / maxTimePoints) * 100} className="h-2 bg-panel-2 [&>div]:bg-accent-jade" />
        </div>
      </div>

      <div className="relative">
        <Button
          variant="ghost"
          size="sm"
          className="w-6 h-6 p-0 text-ink-3 hover:text-ink"
          onClick={() => setSettingsOpen(!settingsOpen)}
        >
          <Settings className="w-3.5 h-3.5" />
        </Button>
        {settingsOpen && (
          <div className="absolute right-0 top-full mt-1 w-44 bg-black border border-line rounded-md shadow-lg py-1 z-50">
            <button className="w-full px-3 py-1.5 text-xs text-left text-ink hover:bg-panel-2 flex items-center gap-2" onClick={handleExport}>
              <Download className="w-3.5 h-3.5" /> {text("app.settings.exportSave")}
            </button>
            <button className="w-full px-3 py-1.5 text-xs text-left text-ink hover:bg-panel-2 flex items-center gap-2" onClick={() => { fileInputRef.current?.click(); setSettingsOpen(false); }}>
              <Upload className="w-3.5 h-3.5" /> {text("app.settings.importSave")}
            </button>
            <button className="w-full px-3 py-1.5 text-xs text-left text-accent-cinnabar hover:bg-panel-2 flex items-center gap-2" onClick={handleWipe}>
              <Trash2 className="w-3.5 h-3.5" /> {text("app.settings.wipeSave")}
            </button>
          </div>
        )}
        <input ref={fileInputRef} type="file" accept=".json" className="hidden" onChange={handleImport} />
      </div>
    </header>
  );
}
