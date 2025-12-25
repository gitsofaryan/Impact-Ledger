import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUp, CheckCircle2, AlertCircle, Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface Activity {
  id: string;
  type: "upload" | "approval" | "alert" | "pending";
  title: string;
  description: string;
  time: string;
  loanId?: string;
}

const activities: Activity[] = [
  {
    id: "1",
    type: "upload",
    title: "Solar Panel Invoice Uploaded",
    description: "Invoice #INV-2024-0892 for Project Sunrise",
    time: "2 minutes ago",
    loanId: "LN-2024-0042",
  },
  {
    id: "2",
    type: "approval",
    title: "Milestone 1 Approved",
    description: "Phase 1 funding released for Green Valley Wind Farm",
    time: "1 hour ago",
    loanId: "LN-2024-0041",
  },
  {
    id: "3",
    type: "pending",
    title: "Verification Pending",
    description: "Site inspection photos awaiting AI review",
    time: "3 hours ago",
    loanId: "LN-2024-0040",
  },
  {
    id: "4",
    type: "approval",
    title: "New Loan Approved",
    description: "Coastal Solar Initiative - $2.5M approved",
    time: "Yesterday",
    loanId: "LN-2024-0039",
  },
];

const iconMap = {
  upload: FileUp,
  approval: CheckCircle2,
  alert: AlertCircle,
  pending: Clock,
};

const colorMap = {
  upload: "text-blue-500 bg-blue-500/10",
  approval: "text-emerald bg-emerald/10",
  alert: "text-destructive bg-destructive/10",
  pending: "text-amber-500 bg-amber-500/10",
};

export function ActivityFeed() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
          <Link
            to="/activity"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            View all
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = iconMap[activity.type];
          return (
            <div
              key={activity.id}
              className={cn(
                "flex gap-4 p-3 rounded-lg transition-all duration-200 hover:bg-secondary/50 cursor-pointer",
                "animate-fade-in"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                  colorMap[activity.type]
                )}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-medium text-sm truncate">{activity.title}</p>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {activity.time}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground truncate mt-0.5">
                  {activity.description}
                </p>
                {activity.loanId && (
                  <Link
                    to={`/loans/${activity.loanId}`}
                    className="inline-flex items-center gap-1 text-xs text-emerald hover:text-emerald-soft transition-colors mt-2"
                  >
                    View Loan
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
