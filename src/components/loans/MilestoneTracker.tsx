import { Check, Circle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Milestone {
  id: string;
  label: string;
  status: "completed" | "current" | "upcoming";
  date?: string;
}

interface MilestoneTrackerProps {
  milestones: Milestone[];
}

export function MilestoneTracker({ milestones }: MilestoneTrackerProps) {
  return (
    <div className="relative">
      {/* Progress Line */}
      <div className="absolute top-5 left-0 right-0 h-1 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full emerald-gradient transition-all duration-700"
          style={{
            width: `${
              (milestones.filter((m) => m.status === "completed").length /
                (milestones.length - 1)) *
              100
            }%`,
          }}
        />
      </div>

      {/* Milestones */}
      <div className="relative flex justify-between">
        {milestones.map((milestone, index) => (
          <div
            key={milestone.id}
            className="flex flex-col items-center"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            {/* Node */}
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all duration-300",
                milestone.status === "completed" &&
                  "emerald-gradient shadow-lg glow-emerald",
                milestone.status === "current" &&
                  "bg-card border-2 border-emerald animate-pulse-glow",
                milestone.status === "upcoming" && "bg-secondary border-2 border-border"
              )}
            >
              {milestone.status === "completed" && (
                <Check className="w-5 h-5 text-accent-foreground" />
              )}
              {milestone.status === "current" && (
                <Loader2 className="w-5 h-5 text-emerald animate-spin" />
              )}
              {milestone.status === "upcoming" && (
                <Circle className="w-3 h-3 text-muted-foreground" />
              )}
            </div>

            {/* Label */}
            <div className="mt-4 text-center">
              <p
                className={cn(
                  "font-medium text-sm",
                  milestone.status === "completed" && "text-emerald",
                  milestone.status === "current" && "text-foreground",
                  milestone.status === "upcoming" && "text-muted-foreground"
                )}
              >
                {milestone.label}
              </p>
              {milestone.date && (
                <p className="text-xs text-muted-foreground mt-1">{milestone.date}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
