import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ShieldCheck,
  Leaf,
  TreePine,
  Droplets,
  Wind,
  Sun,
  Award,
  MapPin,
  TrendingUp,
  Clock,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Zap,
  BarChart3,
  Circle
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Main Verification Page ---
const impactMetrics = [
  { icon: Leaf, label: "CO₂ Reduced", value: "1,520", unit: "tons", trend: "+32.4%", color: "text-emerald bg-emerald/10" },
  { icon: TreePine, label: "Trees Equivalent", value: "68,400", unit: "trees", trend: "+28.1%", color: "text-green-600 bg-green-600/10" },
  { icon: Droplets, label: "Water Saved", value: "2.4M", unit: "gallons", trend: "+15.7%", color: "text-blue-500 bg-blue-500/10" },
  { icon: Sun, label: "Clean Energy", value: "8.2", unit: "GWh", trend: "+41.2%", color: "text-amber-500 bg-amber-500/10" },
];

const projects = [
  {
    id: 1,
    name: "Project Sunrise",
    location: "Nevada, USA",
    type: "Solar Farm",
    status: "verified",
    impact: "450 tons CO₂/year",
    progress: 100,
    verificationSteps: [
      { label: "Site Inspection", status: "completed", date: "Oct 12" },
      { label: "Hardware Validation", status: "completed", date: "Oct 14" },
      { label: "Output Analysis", status: "completed", date: "Oct 20" }
    ],
    detailedImpact: [
      { label: "Energy Gen", value: "2.4 GWh" },
      { label: "Homes Powered", value: "850" }
    ]
  },
  {
    id: 2,
    name: "Green Valley Wind",
    location: "Texas, USA",
    type: "Wind Farm",
    status: "verified",
    impact: "680 tons CO₂/year",
    progress: 100,
    verificationSteps: [
      { label: "Turbine Installation", status: "completed", date: "Sep 05" },
      { label: "Grid Connection", status: "completed", date: "Sep 22" },
      { label: "Maintenance Log", status: "completed", date: "Oct 01" }
    ],
    detailedImpact: [
      { label: "Energy Gen", value: "4.1 GWh" },
      { label: "Homes Powered", value: "1,200" }
    ]
  },
  {
    id: 3,
    name: "Coastal Solar Initiative",
    location: "California, USA",
    type: "Solar Array",
    status: "pending",
    impact: "320 tons CO₂/year",
    progress: 65,
    verificationSteps: [
      { label: "Document Upload", status: "completed", date: "Dec 01" },
      { label: "AI Analysis", status: "completed", date: "Dec 05" },
      { label: "On-Chain Proof", status: "pending", date: "Waiting..." }
    ],
    detailedImpact: [
      { label: "Proj. Energy", value: "1.2 GWh" },
      { label: "Proj. Homes", value: "400" }
    ]
  },
];

const statusConfig = {
  verified: { label: "Verified", icon: CheckCircle2, color: "bg-emerald/10 text-emerald border-emerald/20" },
  pending: { label: "Pending", icon: Clock, color: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
};

const ImpactVerification = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };
  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Impact Verification</h1>
        <p className="text-muted-foreground mt-1">
          Track and verify the environmental impact of your green investments
        </p>
      </div>

      {/* Impact Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {impactMetrics.map((metric, index) => (
          <Card key={metric.label} className="animate-fade-in hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-transparent hover:border-l-emerald" style={{ animationDelay: `${index * 100}ms` }}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", metric.color)}>
                  <metric.icon className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1 text-emerald text-sm font-medium">
                  <TrendingUp className="w-3 h-3" />
                  {metric.trend}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-3xl font-bold stat-number">{metric.value}</p>
                <p className="text-sm text-muted-foreground">{metric.unit} • {metric.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Projects List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald" />
                Verified Projects
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {projects.map((project, index) => {
                const status = statusConfig[project.status as keyof typeof statusConfig] || statusConfig.pending;
                return (
                  <div
                    key={project.id}
                    className="rounded-xl border bg-card overflow-hidden transition-all duration-300 hover:shadow-md"
                  >
                    <div
                      className="p-4 cursor-pointer hover:bg-secondary/30 transition-colors"
                      onClick={() => toggleExpand(project.id)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-foreground">{project.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                            <MapPin className="w-3 h-3" />
                            {project.location}
                            <span className="text-border">•</span>
                            {project.type}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className={cn("flex items-center gap-1", status.color)}>
                            <status.icon className="w-3 h-3" />
                            {status.label}
                          </Badge>
                          {expandedId === project.id ? (
                            <ChevronUp className="w-4 h-4 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-muted-foreground" />
                          )}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Verification Progress</span>
                          <span className="font-medium">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                        <div className="flex items-center gap-1 text-sm text-emerald">
                          <Leaf className="w-3 h-3" />
                          {project.impact}
                        </div>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {expandedId === project.id && (
                      <div className="px-4 pb-4 pt-0 border-t bg-secondary/10 animate-fade-in">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                          {/* Verification Pipeline */}
                          <div className="space-y-3">
                            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                              <ShieldCheck className="w-3 h-3" />
                              Verification Chain
                            </h4>
                            <div className="space-y-3 pl-2 border-l-2 border-border/50 ml-1">
                              {project.verificationSteps.map((step, i) => (
                                <div key={i} className="flex items-center justify-between text-sm relative">
                                  <div className={cn("absolute -left-[13px] w-2.5 h-2.5 rounded-full border-2 border-card", step.status === "completed" ? "bg-emerald" : "bg-muted-foreground/30")} />
                                  <span className={cn(step.status === "completed" ? "text-foreground" : "text-muted-foreground")}>
                                    {step.label}
                                  </span>
                                  <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">{step.date}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Impact Deep Dive */}
                          <div className="space-y-3">
                            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                              <BarChart3 className="w-3 h-3" />
                              Detailed Impact
                            </h4>
                            <div className="grid grid-cols-2 gap-3">
                              {project.detailedImpact.map((stat, i) => (
                                <div key={i} className="bg-card p-3 rounded-lg border shadow-sm">
                                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                                  <p className="text-lg font-semibold text-foreground mt-0.5">{stat.value}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Live Feed & SDG */}
        <div className="space-y-6">
          {/* SDG Alignment */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">UN SDG Alignment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2">
                {[7, 9, 11, 12, 13, 15].map((sdg) => (
                  <div key={sdg} className="aspect-square rounded-lg bg-emerald/5 border border-emerald/10 flex flex-col items-center justify-center hover:bg-emerald/10 transition-colors cursor-help group text-center p-1">
                    <div className="w-6 h-6 rounded-full bg-emerald/20 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                      <Award className="w-3 h-3 text-emerald" />
                    </div>
                    <span className="text-xs font-bold text-emerald">SDG {sdg}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4 text-center">
                Your investments align with 6 UN Sustainable Development Goals
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout >
  );
};

export default ImpactVerification;
