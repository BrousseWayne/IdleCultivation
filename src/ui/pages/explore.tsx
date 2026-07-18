import { useGameStore } from "@/game/stores/gameStore";
import { useActivityVisibility, useUnlockStore } from "@/game/stores/unlockStore";
import { getPlace, places } from "@/game/data/places";
import { EntityRegistry } from "@/game/services";
import { ActivityRow } from "@/ui/components/ActivityRow";
import { useActivityActions } from "@/ui/hooks/useActivityActions";
import { performPlaceAction } from "@/game/engine/gameLoop";
import { Glyph } from "@/ui/components/StatIcon";
import type { Activity, PlaceAction } from "@/game/types/domain";

const ACTION_KIND_COLOR: Record<PlaceAction["kind"], string> = {
  talk: "text-accent-violet",
  shop: "text-accent-gold",
  enter: "text-accent-sky",
};

export function RenderExplorePage() {
  const currentPlaceKey = useGameStore((state) => state.currentPlaceKey);
  const setCurrentPlace = useGameStore((state) => state.setCurrentPlace);
  const pushLog = useGameStore((state) => state.pushLog);
  const isVisible = useActivityVisibility();
  const placesUnlocked = useUnlockStore((state) => state.places);
  const { queue, unqueue } = useActivityActions();

  const place = getPlace(currentPlaceKey);
  if (!place) return null;

  const walkTo = (key: string) => {
    const destination = getPlace(key);
    if (!destination || !placesUnlocked[key]) return;
    setCurrentPlace(key);
    pushLog({ text: `You make your way to ${destination.name}.`, theme: "travel" });
  };

  const placeActivities = place.activityKeys
    .map((activityKey) => EntityRegistry.get("activity", activityKey))
    .filter((activity): activity is Activity => !!activity && isVisible(activity));

  const actions = place.actions ?? [];

  return (
    <div className="max-w-2xl space-y-6">
      {/* city graph */}
      <div className="relative w-full h-44 rounded-lg border border-line bg-gradient-to-br from-[var(--panel-0)] to-[var(--panel-2)] overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
          {places.flatMap((place) =>
            place.connections.map((connectionKey) => {
              const connected = getPlace(connectionKey);
              if (!connected) return null;
              return (
                <line key={`${place.key}-${connectionKey}`} x1={`${place.x}%`} y1={`${place.y}%`} x2={`${connected.x}%`} y2={`${connected.y}%`}
                  stroke="rgb(152 162 154 / 0.2)" strokeWidth="1.5" />
              );
            })
          )}
        </svg>
        {places.map((mapPlace) => {
          const active = mapPlace.key === currentPlaceKey;
          return (
            <button key={mapPlace.key} onClick={() => walkTo(mapPlace.key)} disabled={!placesUnlocked[mapPlace.key]}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 group"
              style={{ left: `${mapPlace.x}%`, top: `${mapPlace.y}%`, zIndex: 1 }}>
              <span className="w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all"
                style={{
                  borderColor: active ? mapPlace.color : placesUnlocked[mapPlace.key] ? `${mapPlace.color}66` : "var(--line-2)",
                  backgroundColor: active ? `${mapPlace.color}22` : "rgba(10,12,11,0.8)",
                  boxShadow: active ? `0 0 14px ${mapPlace.color}66` : "none",
                  transform: active ? "scale(1.12)" : "scale(1)",
                  opacity: placesUnlocked[mapPlace.key] ? 1 : 0.45,
                }}>
                <Glyph char={mapPlace.glyph} size={16} style={{ color: placesUnlocked[mapPlace.key] ? mapPlace.color : "var(--ink-3)" }} />
              </span>
              <span className="text-[10px] whitespace-nowrap" style={{ color: active ? mapPlace.color : "var(--ink-2)" }}>{mapPlace.name}</span>
            </button>
          );
        })}
      </div>

      {/* scene */}
      <header className="border-b border-line-2 pb-2">
        <h1 className="text-2xl font-[family-name:var(--font-display)]" style={{ color: place.color }}>{place.name}</h1>
      </header>
      <p className="text-[15px] leading-relaxed text-ink font-[family-name:var(--font-sans)]">{place.description}</p>

      {actions.length > 0 && (
        <section className="space-y-1.5">
          <div className="text-[11px] text-ink-2 uppercase tracking-widest">Here</div>
          {actions.map((action) => (
            <button key={action.key} onClick={() => performPlaceAction(action)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md border border-line hover:border-line-2 hover:bg-panel-2 transition-colors text-left">
              <Glyph char={action.glyph} size={16} className={`w-[18px] text-center shrink-0 ${ACTION_KIND_COLOR[action.kind]}`} />
              <span className="text-sm text-ink">{action.label}</span>
              <span className="ml-auto text-xs text-ink-2">{action.detail}</span>
            </button>
          ))}
        </section>
      )}

      {placeActivities.length > 0 && (
        <section className="space-y-1.5">
          <div className="text-[11px] text-ink-2 uppercase tracking-widest">What you can do here</div>
          {placeActivities.map((activity, index) => (
            <ActivityRow key={activity.key} activity={activity} index={index} onQueue={queue} onUnqueue={unqueue} />
          ))}
        </section>
      )}
    </div>
  );
}
