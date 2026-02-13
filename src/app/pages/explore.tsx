import { Compass } from "lucide-react";

export function RenderExplorePage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Compass className="w-6 h-6 text-accent-cinnabar" />
        <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] text-accent-cinnabar">
          Explore
        </h2>
      </div>
      <div className="flex flex-col items-center justify-center py-16 text-slate-500">
        <Compass className="w-12 h-12 mb-3 opacity-30" />
        <p className="text-sm">No locations discovered yet.</p>
      </div>
    </div>
  );
}
