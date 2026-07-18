import { Glyph } from "@/ui/components/StatIcon";

interface PageHeaderProps {
  title: string;
  color: string;
  glyph?: string;
  subtitle?: string;
}

export function PageHeader({ title, color, glyph, subtitle }: PageHeaderProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2.5">
        {glyph && <Glyph char={glyph} size={22} className={color} />}
        <h2 className={`text-2xl font-bold font-[family-name:var(--font-display)] ${color}`}>
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className="text-sm text-muted-foreground italic">{subtitle}</p>
      )}
    </div>
  );
}
