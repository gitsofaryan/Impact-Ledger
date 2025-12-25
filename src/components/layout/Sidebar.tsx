import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  ShieldCheck,
  Wallet,
  Settings,
  Leaf,
  ChevronLeft,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/" },
  { label: "My Loans", icon: FileText, href: "/loans" },
  { label: "Impact Verification", icon: ShieldCheck, href: "/verification" },
  { label: "Wallet", icon: Wallet, href: "/wallet" },
  { label: "Settings", icon: Settings, href: "/settings" },
];

export function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-sidebar z-50 flex items-center px-4 border-b border-sidebar-border">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2 ml-4">
          <div className="w-8 h-8 rounded-lg emerald-gradient flex items-center justify-center">
            <Leaf className="w-5 h-5 text-accent-foreground" />
          </div>
          <span className="font-bold text-lg text-primary-foreground">Impact Ledger</span>
        </div>
      </div>

      {/* Mobile Overlay */}
      {!collapsed && (
        <div
          className="lg:hidden fixed inset-0 bg-navy-deep/80 z-40"
          onClick={() => setCollapsed(true)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-screen bg-sidebar z-50 transition-all duration-300 flex flex-col",
          "lg:translate-x-0",
          collapsed ? "-translate-x-full lg:w-20" : "translate-x-0 w-64 lg:w-64"
        )}
      >
        {/* Logo */}
        <div className="h-16 lg:h-20 flex items-center px-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl emerald-gradient flex items-center justify-center shadow-lg glow-emerald">
              <Leaf className="w-6 h-6 text-accent-foreground" />
            </div>
            <div className={cn("transition-opacity", collapsed ? "lg:hidden" : "")}>
              <h1 className="font-bold text-lg text-primary-foreground">Impact Ledger</h1>
              <p className="text-xs text-sidebar-foreground/60">Green Finance Platform</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href || 
              (item.href !== "/" && location.pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setCollapsed(true)}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon
                  className={cn(
                    "w-5 h-5 transition-colors",
                    isActive ? "text-sidebar-primary" : "group-hover:text-sidebar-primary"
                  )}
                />
                <span
                  className={cn(
                    "font-medium transition-opacity",
                    collapsed ? "lg:hidden" : ""
                  )}
                >
                  {item.label}
                </span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-sidebar-primary" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Collapse Button (Desktop) */}
        <div className="hidden lg:flex p-4 border-t border-sidebar-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="w-full text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <ChevronLeft
              className={cn(
                "w-4 h-4 transition-transform",
                collapsed && "rotate-180"
              )}
            />
            <span className={cn("ml-2", collapsed && "hidden")}>Collapse</span>
          </Button>
        </div>
      </aside>
    </>
  );
}
