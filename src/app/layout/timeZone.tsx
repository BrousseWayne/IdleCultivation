import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Calendar,
  ChevronDown,
  Clock,
  FastForward,
  Pause,
  Play,
} from "lucide-react";
import { useGameState } from "../contexts/gameStateContext";
import { Switch } from "@/components/ui/switch";

const renderDate = (day) => {
  //TODO: divide in years etc

  return `${day} day`;
};

export function RenderTimeZone() {
  const {
    timePoints,
    maxTimePoints,
    isPlaying,
    setIsPlaying,
    timeScale,
    gameSpeed,
    setTimeScale,
    setActivities,
    setTimePoints,
    timeScales,
    setGameSpeed,
    time,
    repeatActivities,
    setRepeatActivities,
  } = useGameState();

  const handleTimeScaleChange = (newScale: string) => {
    setTimeScale(newScale);
    const newMaxPoints =
      24 * timeScales[newScale as keyof typeof timeScales].multiplier;
    setTimePoints(newMaxPoints);
    setActivities({
      sectDuties: 0,
      alchemyWork: 0,
      martialArts: 0,
      qiCultivation: 0,
      beastHunting: 0,
      herbGathering: 0,
      meditation: 0,
      socializing: 0,
      reading: 0,
      crafting: 0,
      cooking: 0,
      shopping: 0,
      resting: 0,
      studying: 0,
      painting: 0,
      music: 0,
      gaming: 0,
      exploring: 0,
      fishing: 0,
      exercise: 0,
    });
  };
  return (
    <div className="sticky top-20 z-40 bg-black/90 backdrop-blur-sm border-b border-slate-800/50 px-4 py-2">
      <div className="flex items-center justify-center gap-4">
        <div className="flex items-center gap-3 bg-purple-500/10 px-3 py-2 rounded-lg border border-purple-500/30">
          <Clock className="w-4 h-4 text-purple-400" />
          <span className="font-semibold text-sm">Available Time Points:</span>
          <span className="text-xl font-bold text-purple-400 font-mono">
            {timePoints}/{maxTimePoints}
          </span>
          <div className="w-32 relative">
            <Progress
              value={(timePoints / maxTimePoints) * 100}
              className="h-2"
            />
            <div
              className="absolute top-0 right-0 h-2 bg-slate-500/60 rounded-r group cursor-help border border-slate-400/40"
              style={{ width: `${(8 / maxTimePoints) * 100}%` }}
              title="Sleep: 7h, Eating: 1h"
            >
              <div className="hidden group-hover:block absolute -top-8 right-0 bg-background/95 backdrop-blur-sm border border-border rounded px-2 py-1 text-xs whitespace-nowrap">
                Sleep: 7h, Eating: 1h
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-900/50 px-2 py-1 rounded-lg border border-slate-700/50">
          <Calendar className="w-4 h-4 text-violet-400" />
          <span className="text-violet-300 font-bold text-sm">
            {renderDate(time)}
          </span>
        </div>

        <div className="flex items-center gap-2 bg-slate-900/50 px-2 py-1 rounded-lg border border-slate-700/50">
          <Button
            size="sm"
            variant={isPlaying ? "default" : "outline"}
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-7 h-7 p-0"
          >
            {isPlaying ? (
              <Pause className="w-3 h-3" />
            ) : (
              <Play className="w-3 h-3" />
            )}
          </Button>
          <Button
            size="sm"
            variant={gameSpeed > 1 ? "default" : "outline"}
            onClick={() =>
              setGameSpeed(gameSpeed === 1 ? 2 : gameSpeed === 2 ? 4 : 1)
            }
            className="w-7 h-7 p-0"
          >
            <FastForward className="w-3 h-3" />
          </Button>
          {gameSpeed > 1 && (
            <span className="text-xs text-muted-foreground">{gameSpeed}x</span>
          )}
        </div>

        <div className="flex items-center gap-2 bg-slate-900/50 px-2 py-1 rounded-lg border border-slate-700/50">
          <span className="text-sm font-medium">Planning Scale:</span>
          <div className="relative">
            <select
              value={timeScale}
              onChange={(e) => handleTimeScaleChange(e.target.value)}
              className="appearance-none bg-black border border-slate-700/50 rounded px-2 py-1 text-sm font-medium pr-6 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            >
              {Object.entries(timeScales).map(([key, scale]) => (
                <option key={key} value={key}>
                  {scale.label} ({24 * scale.multiplier}h)
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-1 top-1/2 transform -translate-y-1/2 w-3 h-3 text-muted-foreground pointer-events-none" />
          </div>
        </div>
        <div className="flex items-center gap-2 bg-slate-900/50 px-3 py-1 rounded-lg border border-slate-700/50">
          <span className="text-sm font-medium">Auto-Repeat:</span>
          <Switch
            checked={repeatActivities}
            onCheckedChange={setRepeatActivities}
            className=" data-[state=checked]:bg-green-500"
            title={
              repeatActivities ? "Repeating current plan" : "Not repeating plan"
            }
          ></Switch>
        </div>
      </div>
    </div>
  );
}
