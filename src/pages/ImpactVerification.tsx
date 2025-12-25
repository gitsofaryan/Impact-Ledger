import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  FileCheck,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const impactMetrics = [
  {
    icon: Leaf,
    label: "CO₂ Reduced",
    value: "1,520",
    unit: "tons",
    trend: "+32.4%",
    color: "text-emerald bg-emerald/10",
  },
  {
    icon: TreePine,
    label: "Trees Equivalent",
    value: "68,400",
    unit: "trees",
    trend: "+28.1%",
    color: "text-green-600 bg-green-600/10",
  },
  {
    icon: Droplets,
    label: "Water Saved",
    value: "2.4M",
    unit: "gallons",
    trend: "+15.7%",
    color: "text-blue-500 bg-blue-500/10",
  },
  {
    icon: Sun,
    label: "Clean Energy",
    value: "8.2",
    unit: "GWh",
    trend: "+41.2%",
    color: "text-amber-500 bg-amber-500/10",
  },
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
  },
  {
    id: 2,
    name: "Green Valley Wind",
    location: "Texas, USA",
    type: "Wind Farm",
    status: "verified",
    impact: "680 tons CO₂/year",
    progress: 100,
  },
  {
    id: 3,
    name: "Coastal Solar Initiative",
    location: "California, USA",
    type: "Solar Array",
    status: "pending",
    impact: "320 tons CO₂/year",
    progress: 65,
  },
  {
    id: 4,
    name: "EcoHarvest Agri",
    location: "Iowa, USA",
    type: "Sustainable Agriculture",
    status: "in_review",
    impact: "120 tons CO₂/year",
    progress: 40,
  },
];

const certificates = [
  { id: 1, name: "Green Bond Certified", issuer: "Climate Bonds Initiative", date: "2024" },
  { id: 2, name: "Carbon Neutral Verified", issuer: "Gold Standard", date: "2024" },
  { id: 3, name: "ESG Excellence", issuer: "MSCI", date: "2024" },
];

const statusConfig = {
  verified: { label: "Verified", icon: CheckCircle2, color: "bg-emerald/10 text-emerald border-emerald/20" },
  pending: { label: "Pending", icon: Clock, color: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
  in_review: { label: "In Review", icon: FileCheck, color: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
};

const ImpactVerification = () => {
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
          <Card
            key={metric.label}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
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
                <p className="text-3xl font-bold">{metric.value}</p>
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
                const status = statusConfig[project.status as keyof typeof statusConfig];
                return (
                  <div
                    key={project.id}
                    className={cn(
                      "p-4 rounded-xl border bg-card hover:bg-secondary/30 transition-all cursor-pointer",
                      "animate-fade-in"
                    )}
                    style={{ animationDelay: `${index * 75}ms` }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{project.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <MapPin className="w-3 h-3" />
                          {project.location}
                          <span className="text-border">•</span>
                          {project.type}
                        </div>
                      </div>
                      <Badge variant="outline" className={cn("flex items-center gap-1", status.color)}>
                        <status.icon className="w-3 h-3" />
                        {status.label}
                      </Badge>
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
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Certificates & SDG */}
        <div className="space-y-6">
          {/* Certificates */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald" />
                Certifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {certificates.map((cert, index) => (
                <div
                  key={cert.id}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg bg-secondary/50 animate-fade-in"
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-10 h-10 rounded-lg emerald-gradient flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{cert.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {cert.issuer} • {cert.date}
                    </p>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-2">
                View All Certificates
              </Button>
            </CardContent>
          </Card>

          {/* SDG Alignment */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">UN SDG Alignment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2">
                {[7, 9, 11, 12, 13, 15].map((sdg) => (
                  <div
                    key={sdg}
                    className="aspect-square rounded-lg bg-gradient-to-br from-emerald/20 to-emerald/5 border border-emerald/20 flex items-center justify-center"
                  >
                    <span className="text-lg font-bold text-emerald">SDG {sdg}</span>
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
    </DashboardLayout>
  );
};

export default ImpactVerification;
