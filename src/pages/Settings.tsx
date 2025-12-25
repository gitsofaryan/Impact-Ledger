import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Bell,
  Shield,
  Key,
  CreditCard,
  Globe,
  Moon,
  Mail,
  Smartphone,
  Building2,
  FileText,
  LogOut,
  ChevronRight,
  Camera,
} from "lucide-react";
import { cn } from "@/lib/utils";

const notificationSettings = [
  { id: "loan_updates", label: "Loan Updates", description: "Get notified about loan status changes", enabled: true },
  { id: "milestone_alerts", label: "Milestone Alerts", description: "Receive alerts when milestones are reached", enabled: true },
  { id: "verification_status", label: "Verification Status", description: "Updates on document verification", enabled: true },
  { id: "marketing", label: "Marketing Emails", description: "Receive news and promotional content", enabled: false },
];

const securitySettings = [
  { id: "2fa", label: "Two-Factor Authentication", description: "Add an extra layer of security", enabled: true },
  { id: "login_alerts", label: "Login Alerts", description: "Get notified of new sign-ins", enabled: true },
  { id: "api_access", label: "API Access", description: "Allow third-party integrations", enabled: false },
];

const Settings = () => {
  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account preferences and security
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar Navigation */}
        <Card className="lg:col-span-1 h-fit">
          <CardContent className="p-4 space-y-1">
            {[
              { icon: User, label: "Profile", active: true },
              { icon: Bell, label: "Notifications" },
              { icon: Shield, label: "Security" },
              { icon: CreditCard, label: "Billing" },
              { icon: Globe, label: "Preferences" },
              { icon: FileText, label: "Documents" },
            ].map((item, index) => (
              <button
                key={item.label}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left",
                  item.active
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                )}
              >
                <item.icon className="w-4 h-4" />
                <span className="font-medium text-sm">{item.label}</span>
                {item.active && <ChevronRight className="w-4 h-4 ml-auto" />}
              </button>
            ))}
            <Separator className="my-2" />
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-destructive hover:bg-destructive/10 transition-colors text-left">
              <LogOut className="w-4 h-4" />
              <span className="font-medium text-sm">Log Out</span>
            </button>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <User className="w-5 h-5 text-emerald" />
                Profile Information
              </CardTitle>
              <CardDescription>
                Update your personal details and public profile
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src="" />
                    <AvatarFallback className="navy-gradient text-primary-foreground text-xl font-semibold">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-emerald text-accent-foreground flex items-center justify-center shadow-lg hover:bg-emerald-soft transition-colors">
                    <Camera className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div>
                  <h3 className="font-semibold">John Doe</h3>
                  <p className="text-sm text-muted-foreground">john.doe@impactledger.com</p>
                  <Badge variant="outline" className="mt-2 bg-emerald/10 text-emerald border-emerald/20">
                    Verified Investor
                  </Badge>
                </div>
              </div>

              <Separator />

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="john.doe@impactledger.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="+1 (555) 123-4567" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="company">Company / Organization</Label>
                  <Input id="company" defaultValue="Green Capital Partners" />
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="emerald-gradient">Save Changes</Button>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Bell className="w-5 h-5 text-emerald" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Choose what updates you want to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {notificationSettings.map((setting, index) => (
                <div
                  key={setting.id}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-lg bg-secondary/30 animate-fade-in"
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="space-y-0.5">
                    <Label htmlFor={setting.id} className="font-medium cursor-pointer">
                      {setting.label}
                    </Label>
                    <p className="text-sm text-muted-foreground">{setting.description}</p>
                  </div>
                  <Switch id={setting.id} defaultChecked={setting.enabled} />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Security */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Manage your account security and access
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {securitySettings.map((setting, index) => (
                <div
                  key={setting.id}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-lg bg-secondary/30 animate-fade-in"
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="space-y-0.5">
                    <Label htmlFor={setting.id} className="font-medium cursor-pointer">
                      {setting.label}
                    </Label>
                    <p className="text-sm text-muted-foreground">{setting.description}</p>
                  </div>
                  <Switch id={setting.id} defaultChecked={setting.enabled} />
                </div>
              ))}

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="font-medium">Change Password</p>
                  <p className="text-sm text-muted-foreground">Last changed 30 days ago</p>
                </div>
                <Button variant="outline">
                  <Key className="w-4 h-4 mr-2" />
                  Update
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
