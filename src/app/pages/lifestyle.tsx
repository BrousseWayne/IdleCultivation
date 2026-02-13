import { Home } from "lucide-react";
import { lifestyleOptions } from "../data/lifestyle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Cost } from "../types/domain";

function formatCosts(costs: Cost[]): string {
  return costs
    .filter((c) => c.amount > 0)
    .map((c) => `${c.amount} ${c.currency}${c.period ? `/${c.period}` : ""}`)
    .join(", ") || "Free";
}

export function RenderLifestylePage() {
  if (lifestyleOptions.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Home className="w-6 h-6 text-accent-lotus" />
          <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] text-accent-lotus">
            Lifestyle Management
          </h2>
        </div>
        <div className="flex flex-col items-center justify-center py-16 text-slate-500">
          <Home className="w-12 h-12 mb-3 opacity-30" />
          <p className="text-sm">No lifestyle options available yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Home className="w-6 h-6 text-accent-lotus" />
        <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] text-accent-lotus">
          Lifestyle Management
        </h2>
      </div>

      <div className="grid gap-6">
        {lifestyleOptions.map((category) => (
          <Card key={category.category} className="bg-black border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-lg text-slate-200">{category.category}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {category.options.map((option) => (
                <div
                  key={option.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    option.unlocked
                      ? "border-slate-600 hover:border-accent-lotus/50 bg-slate-900/30"
                      : "border-slate-700/30 bg-slate-900/10 opacity-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-accent-lotus">{option.name}</h3>
                      <p className="text-sm text-slate-400 mt-1">{option.description}</p>
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
