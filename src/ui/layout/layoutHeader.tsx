import { useRef, useState } from "react";
import {
  Download,
  FastForward,
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
import { useEtherealShimmer } from "@/ui/hooks/useEtherealShimmer";
import { EtherealEffect } from "@/ui/components/EtherealEffect";
import { Glyph } from "@/ui/components/StatIcon";
import { MORTAL_GLYPH } from "@/game/data/glyphs";

export function Header() {
  const currentPlaceKey = useGameStore((state) => state.currentPlaceKey);
  const currentPlaceName = getPlace(currentPlaceKey)?.name ?? "";
  const maxTimePoints = useGameStore((state) => state.maxTimePoints);
  const isPlaying = useGameStore((state) => state.isPlaying);
  const gameSpeed = useGameStore((state) => state.gameSpeed);
  const day = useGameStore((state) => state.day);
  const queue = useActivityStore((state) => state.queue);

  const freeHours = Math.max(0, maxTimePoints - scheduledHours(queue));
  const lerpFreeHours = useLerpNumber(freeHours);
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
    <header className="sticky top-0 z-50 h-12 bg-panel-0 border-b border-line flex items-center px-4 gap-4">
      <h1 className="text-[15px] font-bold font-[family-name:var(--font-display)] text-ink tracking-wide whitespace-nowrap">
        {text("app.title")}
      </h1>
      <span className="flex items-center gap-1.5 text-[11px] text-accent-jade border border-accent-jade/30 rounded-md px-2 py-0.5">
        <Glyph char={MORTAL_GLYPH} size={13} />
        {text("app.rank")}
      </span>

      <div className="flex-1" />

      <span className="text-[13px] text-ink-2">{currentPlaceName}</span>

      <div className="h-4 w-px bg-line-2" />

      <span className="text-xs text-ink-2 font-mono">
        {text("app.label.day")}{" "}
        <EtherealEffect effect={getEffect("day")}>
          <b className="text-ink">{day}</b>
        </EtherealEffect>
      </span>

      <div className="h-4 w-px bg-line-2" />

      <EtherealEffect effect={getEffect("timePoints")}>
        <span className="text-xs font-mono font-bold text-accent-jade">
          {lerpFreeHours}h <span className="text-ink-3 font-medium">{text("queue.free")}</span>
        </span>
      </EtherealEffect>

      <div className="h-4 w-px bg-line-2" />

      <div className="flex items-center gap-1">
        <button
          onClick={togglePlaying}
          className={`w-7 h-7 flex items-center justify-center rounded-md border transition-colors ${
            isPlaying
              ? "text-accent-jade border-accent-jade/35 bg-accent-jade/10"
              : "text-ink-3 border-transparent hover:bg-panel-2 hover:text-ink-2"
          }`}
        >
          {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 animate-breathe" />}
        </button>
        <button
          onClick={cycleSpeed}
          className={`w-7 h-7 flex items-center justify-center rounded-md border transition-colors ${
            gameSpeed > 1
              ? "text-accent-jade border-accent-jade/35 bg-accent-jade/10"
              : "text-ink-3 border-transparent hover:bg-panel-2 hover:text-ink-2"
          }`}
        >
          <FastForward className="w-3 h-3" />
        </button>
        {gameSpeed > 1 && <span className="text-[11px] text-ink-2 font-mono">{gameSpeed}x</span>}
      </div>

      <div className="relative">
        <button
          className="w-7 h-7 flex items-center justify-center rounded-md text-ink-3 hover:text-ink hover:bg-panel-2"
          onClick={() => setSettingsOpen(!settingsOpen)}
        >
          <Settings className="w-3.5 h-3.5" />
        </button>
        {settingsOpen && (
          <div className="absolute right-0 top-full mt-1 w-44 bg-popover border border-line rounded-md shadow-lg py-1 z-50">
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
