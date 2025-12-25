import { ReactNode, CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon?: ReactNode;
  trend?: {
    value: string;
    positive: boolean;
  };
  variant?: "default" | "emerald" | "navy";
  className?: string;
  style?: CSSProperties;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  variant = "default",
  className,
  style,
}: StatCardProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-xl",
        variant === "emerald" && "border-emerald/20 bg-gradient-to-br from-card to-emerald/5",
        variant === "navy" && "navy-gradient text-primary-foreground border-none",
        className
      )}
      style={style}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className={cn(
              "text-sm font-medium",
              variant === "navy" ? "text-primary-foreground/70" : "text-muted-foreground"
            )}>
              {title}
            </p>
            <p className={cn(
              "stat-number",
              variant === "navy" ? "text-primary-foreground" : "text-foreground"
            )}>
              {value}
            </p>
            {subtitle && (
              <p className={cn(
                "text-sm",
                variant === "navy" ? "text-primary-foreground/60" : "text-muted-foreground"
              )}>
                {subtitle}
              </p>
            )}
            {trend && (
              <div className={cn(
                "inline-flex items-center gap-1 text-sm font-medium mt-2 px-2 py-0.5 rounded-full",
                trend.positive
                  ? "text-emerald bg-emerald/10"
                  : "text-destructive bg-destructive/10"
              )}>
                <span>{trend.positive ? "↑" : "↓"}</span>
                <span>{trend.value}</span>
              </div>
            )}
          </div>
          {icon && (
            <div className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center",
              variant === "navy"
                ? "bg-primary-foreground/10"
                : variant === "emerald"
                ? "emerald-gradient text-accent-foreground"
                : "bg-secondary text-muted-foreground"
            )}>
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
