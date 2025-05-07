
import { ReactNode } from "react";
import { useLocation } from 'react-router-dom';
import Sidebar from "./Sidebar";
import Header from "./Header";

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();
  
  // Map routes to page titles
  const pageTitles: Record<string, string> = {
    "/": "Dashboard",
    "/events": "Events Management",
    "/volunteers": "Volunteer Directory",
    "/attendance": "Attendance Tracking",
    "/events/new": "Create New Event",
    "/events/edit": "Edit Event",
    "/volunteers/new": "Register New Volunteer",
    "/volunteers/edit": "Edit Volunteer Profile",
  };
  
  // Get current page title
  const getPageTitle = () => {
    const path = location.pathname;
    
    // Check if path starts with a known prefix
    for (const route in pageTitles) {
      if (path === route || (path.startsWith(route + "/") && route !== "/")) {
        return pageTitles[route];
      }
    }
    
    return "VolunteerTrack";
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={getPageTitle()} />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
