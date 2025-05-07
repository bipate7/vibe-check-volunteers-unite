
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
        "w-full justify-start gap-2 my-1 transition-all duration-200",
        isActive 
          ? "bg-gradient-to-r from-purple-600 to-indigo-700 text-white hover:from-purple-700 hover:to-indigo-800" 
          : "hover:bg-gradient-to-r hover:from-purple-100 hover:to-indigo-100 hover:text-accent-foreground"
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
        "h-screen bg-gradient-to-b from-slate-50 to-slate-100 border-r border-sidebar-border flex flex-col transition-all duration-300 shadow-lg",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 flex items-center justify-between border-b border-sidebar-border bg-white">
        {!collapsed && (
          <div className="font-bold text-xl">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">Volunteer</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-cyan-500">Track</span>
          </div>
        )}
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="ml-auto text-gray-700 hover:bg-purple-100">
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
      
      <div className="p-4 border-t border-sidebar-border bg-white">
        {!collapsed && (
          <div className="text-sm text-muted-foreground">
            <span className="font-medium text-purple-500">VolunteerTrack</span> v1.0
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
