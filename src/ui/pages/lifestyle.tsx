import { lifestyleOptions } from "@/game/data/lifestyle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Cost } from "@/game/types/domain";
import { PageHeader } from "@/ui/components/PageHeader";
import { Glyph } from "@/ui/components/StatIcon";
import { text } from "@/game/content/text";

function formatCosts(costs: Cost[]): string {
  return costs
    .filter((cost) => cost.amount > 0)
    .map((cost) => `${cost.amount} copper${cost.period ? `/${cost.period}` : ""}`)
    .join(", ") || text("lifestyle.cost.free");
}

export function RenderLifestylePage() {
  if (lifestyleOptions.length === 0) {
    return (
      <div className="space-y-4">
        <PageHeader
          glyph="家"
          title={text("page.lifestyle.title")}
          color="text-accent-lotus"
        />
        <div className="flex flex-col items-center justify-center py-16 text-ink-2">
          <Glyph char="家" size={44} className="mb-3 opacity-30" />
          <p className="text-sm">{text("page.lifestyle.empty")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Glyph char="家" size={22} className="text-accent-lotus" />
        <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] text-accent-lotus">
          {text("page.lifestyle.title")}
        </h2>
      </div>

      <div className="grid gap-6">
        {lifestyleOptions.map((category) => (
          <Card key={category.category} className="bg-panel border-line">
            <CardHeader>
              <CardTitle className="text-lg text-ink">{category.category}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {category.options.map((option) => (
                <div
                  key={option.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    option.unlocked
                      ? "border-line-2 hover:border-accent-lotus/50 bg-panel-2"
                      : "border-line bg-panel opacity-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-accent-lotus">{option.name}</h3>
                      <p className="text-sm text-ink-2 mt-1">{option.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-accent-gold font-semibold text-sm">
                        {formatCosts(option.costs)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
