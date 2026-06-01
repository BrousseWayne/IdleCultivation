import { Plus } from "lucide-react";
import { useGameStore } from "@/game/stores/gameStore";
import { useActivityStore } from "@/game/stores/activityStore";
import { getPlace, places } from "@/game/data/places";
import { queueActivity } from "@/game/engine/gameLoop";
import { EntityRegistry } from "@/game/services";
import { getActivityXpProgress } from "@/game/utils";
import type { Activity } from "@/game/types/domain";

export function RenderExplorePage() {
  const currentPlaceKey = useGameStore((s) => s.currentPlaceKey);
  const setCurrentPlace = useGameStore((s) => s.setCurrentPlace);
  const pushLog = useGameStore((s) => s.pushLog);
  const day = useGameStore((s) => s.day);
  const ticks = useGameStore((s) => s.ticks);
  const allocatedActivities = useActivityStore((s) => s.allocatedActivities);
  const activityXp = useActivityStore((s) => s.activityXp);

  const place = getPlace(currentPlaceKey);
  if (!place) return null;

  const hour = ticks % 24;
  const timeOfDay =
    hour < 5 ? "night" : hour < 8 ? "dawn" : hour < 17 ? "day" : hour < 20 ? "dusk" : "night";

  const walkTo = (key: string) => {
    const dest = getPlace(key);
    if (!dest || !dest.unlocked) return;
    setCurrentPlace(key);
    pushLog({ text: `You make your way to ${dest.name}.`, theme: "travel" });
  };

  const queue = (key: string) => {
    const a = EntityRegistry.get("activity", key);
    if (a && queueActivity(key)) {
      pushLog({ text: `You set out to ${a.name.toLowerCase()}.`, theme: "ambient" });
    }
  };

  const placeActivities = place.activityKeys
    .map((k) => EntityRegistry.get("activity", k))
    .filter((a): a is Activity => !!a && a.unlocked);

  return (
    <div className="max-w-2xl space-y-6">
      {/* city graph */}
      <div className="relative w-full h-44 rounded-lg border border-slate-800/40 bg-gradient-to-br from-slate-950 to-slate-900/20 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
          {places.flatMap((p) =>
            p.connections.map((c) => {
              const q = getPlace(c);
              if (!q) return null;
              return (
                <line key={`${p.key}-${c}`} x1={`${p.x}%`} y1={`${p.y}%`} x2={`${q.x}%`} y2={`${q.y}%`}
                  stroke="rgb(148 163 184 / 0.18)" strokeWidth="1.5" />
              );
            })
          )}
        </svg>
        {places.map((p) => {
          const active = p.key === currentPlaceKey;
          const Icon = p.icon;
          return (
            <button key={p.key} onClick={() => walkTo(p.key)} disabled={!p.unlocked}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 group"
              style={{ left: `${p.x}%`, top: `${p.y}%`, zIndex: 1 }}>
              <span className="w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all"
                style={{
                  borderColor: active ? p.color : p.unlocked ? `${p.color}66` : "#1e293b",
                  backgroundColor: active ? `${p.color}22` : "rgba(2,6,23,0.8)",
                  boxShadow: active ? `0 0 14px ${p.color}66` : "none",
                  transform: active ? "scale(1.12)" : "scale(1)",
                  opacity: p.unlocked ? 1 : 0.45,
                }}>
                <Icon className="w-4 h-4" style={{ color: p.unlocked ? p.color : "#475569" }} />
              </span>
              <span className="text-[10px] whitespace-nowrap" style={{ color: active ? p.color : "#94a3b8" }}>{p.name}</span>
            </button>
          );
        })}
      </div>

      {/* scene */}
      <header className="flex items-baseline justify-between border-b border-slate-800/60 pb-2">
        <h1 className="text-2xl font-[family-name:var(--font-display)]" style={{ color: place.color }}>{place.name}</h1>
        <span className="text-xs text-slate-500 font-mono">day {day} · {timeOfDay}</span>
      </header>
      <p className="text-[15px] leading-relaxed text-slate-300 font-[family-name:var(--font-sans)]">{place.description}</p>

      <section className="space-y-1.5">
        <div className="text-[11px] text-slate-600 uppercase tracking-widest">What you can do</div>
        {placeActivities.map((a) => {
          const allocated = allocatedActivities[a.key] || 0;
          const { level } = getActivityXpProgress(activityXp[a.key] || 0);
          return (
            <button key={a.key} onClick={() => queue(a.key)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md border border-slate-800/50 hover:border-accent-cinnabar/40 hover:bg-slate-900/40 transition-colors text-left">
              <a.icon className="w-4 h-4 text-accent-jade" />
              <span className="text-sm text-slate-200">{a.name}</span>
              <span className="text-[10px] text-slate-600">Lv.{level}</span>
              <span className="ml-auto flex items-center gap-2 text-xs text-slate-500">
                {a.timeCost}h{allocated > 0 && <span className="text-accent-jade">· {allocated}h queued</span>}
                <Plus className="w-3.5 h-3.5 text-slate-600" />
              </span>
            </button>
          );
        })}
      </section>

    </div>
  );
}
