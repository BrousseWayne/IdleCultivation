import { Badge } from "@/components/ui/badge";
import { storyEntries } from "../data/story";
import { storyEntryColors } from "../data/constant";

export const RenderStoryPage = () => {
  return (
    <div className="space-y-4">
      <div className="mb-4">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] text-accent-violet mb-2">
          Your Story
        </h2>
        <p className="text-muted-foreground">Your journey so far</p>
      </div>

      <div className="space-y-2">
        {storyEntries.map((entry, index) => (
          <div
            key={index}
            className={`border-l-2 ${storyEntryColors[entry.type]} pl-3 py-1.5`}
          >
            <div className="flex items-start gap-2">
              <Badge
                variant="outline"
                className={`text-xs shrink-0 font-[family-name:var(--font-display)] ${storyEntryColors[entry.type]}`}
              >
                {entry.time}
              </Badge>
              <p className="text-sm leading-relaxed text-slate-300">
                {entry.entry}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
