
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Users, 
  LayoutDashboard, 
  X,
  Check,
  Menu
} from "lucide-react";
import { cn } from "@/lib/utils";

type NavItemProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  isCollapsed: boolean;
};

const NavItem = ({ to, icon, label, isActive, isCollapsed }: NavItemProps) => (
  <Link to={to}>
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start gap-2 my-1",
        isActive 
          ? "bg-accent text-accent-foreground" 
          : "hover:bg-accent hover:text-accent-foreground"
      )}
    >
      {icon}
      {!isCollapsed && <span>{label}</span>}
    </Button>
  </Link>
);

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  
  const navItems = [
    { to: "/", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
    { to: "/events", icon: <Calendar size={20} />, label: "Events" },
    { to: "/volunteers", icon: <Users size={20} />, label: "Volunteers" },
    { to: "/attendance", icon: <Check size={20} />, label: "Attendance" }
  ];

  return (
    <div 
      className={cn(
        "h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
        {!collapsed && (
          <div className="font-bold text-xl text-ngo-purple">
            <span>Volunteer</span>
            <span className="text-ngo-teal">Track</span>
          </div>
        )}
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="ml-auto">
          {collapsed ? <Menu size={20} /> : <X size={20} />}
        </Button>
      </div>
      
      <div className="flex-grow p-2 overflow-y-auto">
        {navItems.map((item) => (
          <NavItem 
            key={item.to}
            to={item.to} 
            icon={item.icon} 
            label={item.label}
            isActive={location.pathname === item.to}
            isCollapsed={collapsed}
          />
        ))}
      </div>
      
      <div className="p-4 border-t border-sidebar-border">
        {!collapsed && (
          <div className="text-sm text-muted-foreground">
            VolunteerTrack v1.0
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
