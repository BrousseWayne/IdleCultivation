import type { LucideIcon } from "lucide-react";

interface PageHeaderProps {
  icon: LucideIcon;
  title: string;
  color: string;
  subtitle?: string;
}

export function PageHeader({ icon: Icon, title, color, subtitle }: PageHeaderProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <Icon className={`w-6 h-6 ${color}`} />
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
