import { useGameStore } from "@/game/stores/gameStore";
import { getPlace, places } from "@/game/data/places";
import { EntityRegistry } from "@/game/services";
import { ActivityRow, useActivityActions } from "@/ui/components/ActivityRow";
import type { Activity, PlaceAction } from "@/game/types/domain";

const ACTION_KIND_COLOR: Record<PlaceAction["kind"], string> = {
  talk: "text-accent-violet",
  shop: "text-accent-gold",
  enter: "text-accent-sky",
};

export function RenderExplorePage() {
  const currentPlaceKey = useGameStore((s) => s.currentPlaceKey);
  const setCurrentPlace = useGameStore((s) => s.setCurrentPlace);
  const pushLog = useGameStore((s) => s.pushLog);
  const day = useGameStore((s) => s.day);
  const ticks = useGameStore((s) => s.ticks);
  const { queue, unqueue } = useActivityActions();

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

  // contextual non-activity actions are free; until the event/shop systems exist
  // they only narrate. This is the plug point for events/dialogue.
  const doAction = (action: PlaceAction) => {
    pushLog({ text: `You ${action.label.toLowerCase()}.`, theme: action.kind === "talk" ? "dialogue" : "ambient" });
  };

  const placeActivities = place.activityKeys
    .map((k) => EntityRegistry.get("activity", k))
    .filter((a): a is Activity => !!a && a.unlocked);

  const actions = place.actions ?? [];

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

      {actions.length > 0 && (
        <section className="space-y-1.5">
          <div className="text-[11px] text-slate-600 uppercase tracking-widest">Here</div>
          {actions.map((action) => (
            <button key={action.key} onClick={() => doAction(action)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md border border-slate-800/50 hover:border-accent-cinnabar/40 hover:bg-slate-900/40 transition-colors text-left">
              <action.icon className={`w-4 h-4 shrink-0 ${ACTION_KIND_COLOR[action.kind]}`} />
              <span className="text-sm text-slate-200">{action.label}</span>
              <span className="ml-auto text-xs text-slate-600">{action.detail}</span>
            </button>
          ))}
        </section>
      )}

      {placeActivities.length > 0 && (
        <section className="space-y-1.5">
          <div className="text-[11px] text-slate-600 uppercase tracking-widest">What you can do here</div>
          {placeActivities.map((a, i) => (
            <ActivityRow key={a.key} activity={a} index={i} onQueue={queue} onUnqueue={unqueue} />
          ))}
        </section>
      )}
    </div>
  );
}
