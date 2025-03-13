
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  description?: string;
  className?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
}

export default function StatCard({
  title,
  value,
  icon,
  description,
  className,
  trend,
  trendValue,
}: StatCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
        {trend && trendValue && (
          <div className="flex items-center mt-1">
            <span
              className={cn(
                "text-xs",
                trend === "up" && "text-green-600",
                trend === "down" && "text-red-600"
              )}
            >
              {trend === "up" && "↑"}
              {trend === "down" && "↓"}
              {trend === "neutral" && "→"} {trendValue}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
