// components/sidebar/SpiritualResources.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SpiritualResourcesProps } from "@/types/props";

export function SpiritualResources({ resources }: SpiritualResourcesProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-card-foreground">
          Spiritual Resources
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {resources.map((res, idx) => (
          <div key={res.label}>
            <div className="flex justify-between items-center py-1">
              <span className="text-sm text-muted-foreground">{res.label}</span>
              <span className={`font-mono ${res.color}`}>{res.value}</span>
            </div>
            {idx < resources.length - 1 && (
              <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
