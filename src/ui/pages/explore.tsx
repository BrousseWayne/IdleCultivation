import { Compass } from "lucide-react";
import { PageHeader } from "@/ui/components/PageHeader";
import { text } from "@/game/content/text";
import { useGameStore } from "@/game/stores/gameStore";
import { getPlace } from "@/game/data/places";

export function RenderExplorePage() {
  const currentPlaceKey = useGameStore((s) => s.currentPlaceKey);
  const place = getPlace(currentPlaceKey);

  return (
    <div className="space-y-4">
      <PageHeader
        icon={Compass}
        title={place?.name ?? text("page.explore.title")}
        color="text-accent-cinnabar"
      />
      <p className="text-sm text-slate-400 italic leading-relaxed">
        {place?.description ?? text("page.explore.empty")}
      </p>
    </div>
  );
}
