import { Compass } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

export function RenderExplorePage() {
  return (
    <div className="space-y-4">
      <PageHeader
        icon={Compass}
        title="Explore"
        color="text-accent-cinnabar"
      />
      <div className="flex flex-col items-center justify-center py-16 text-slate-500">
        <Compass className="w-12 h-12 mb-3 opacity-30" />
        <p className="text-sm">No locations discovered yet.</p>
      </div>
    </div>
  );
}
