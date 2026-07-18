import { Badge } from "@/components/ui/badge";
import { storyEntries } from "@/game/data/story";
import { storyEntryColors } from "@/game/data/constant";
import { PageHeader } from "@/ui/components/PageHeader";
import { Glyph } from "@/ui/components/StatIcon";
import { text } from "@/game/content/text";

export const RenderStoryPage = () => {
  return (
    <div className="space-y-4">
      <PageHeader
        glyph="書"
        title={text("page.story.title")}
        color="text-accent-violet"
        subtitle={text("page.story.subtitle")}
      />

      {storyEntries.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-ink-2">
          <Glyph char="書" size={44} className="mb-3 opacity-30" />
          <p className="text-sm">{text("page.story.empty")}</p>
        </div>
      )}

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
              <p className="text-sm leading-relaxed text-ink">
                {entry.entry}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
