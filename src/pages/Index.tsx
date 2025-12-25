import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { CO2Chart } from "@/components/dashboard/CO2Chart";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { DollarSign, Leaf, FileCheck, Users } from "lucide-react";

const Index = () => {
  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back. Here's your green finance overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Capital Deployed"
          value="$42.8M"
          subtitle="Across 28 green projects"
          icon={<DollarSign className="w-6 h-6" />}
          trend={{ value: "12.5%", positive: true }}
          variant="navy"
          className="animate-fade-in"
        />
        <StatCard
          title="CO₂ Reduction"
          value="1,520 tons"
          subtitle="Cumulative this year"
          icon={<Leaf className="w-6 h-6" />}
          trend={{ value: "32.4%", positive: true }}
          variant="emerald"
          className="animate-fade-in"
          style={{ animationDelay: "100ms" }}
        />
        <StatCard
          title="Verified Proofs"
          value="156"
          subtitle="Documents verified"
          icon={<FileCheck className="w-6 h-6" />}
          trend={{ value: "8.2%", positive: true }}
          className="animate-fade-in"
          style={{ animationDelay: "200ms" }}
        />
        <StatCard
          title="Active Borrowers"
          value="42"
          subtitle="Across 12 countries"
          icon={<Users className="w-6 h-6" />}
          trend={{ value: "3.1%", positive: true }}
          className="animate-fade-in"
          style={{ animationDelay: "300ms" }}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CO2Chart />
        </div>
        <div className="lg:col-span-1">
          <ActivityFeed />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
