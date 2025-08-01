
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Plus, Calendar, Users, UserPlus } from "lucide-react";

type HeaderProps = {
  title: string;
};

const Header = ({ title }: HeaderProps) => {
  const [unreadNotifications, setUnreadNotifications] = useState(2);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // This would be replaced with actual auth state
  const location = useLocation();
  
  const markAsRead = () => {
    setUnreadNotifications(0);
  };
  
  const handleLogout = () => {
    // In a real implementation, this would connect to your authentication service
    console.log("Logging out");
    setIsLoggedIn(false);
    // Navigate to login page or show a toast message
  };

  const getQuickActions = () => {
    const path = location.pathname;
    
    if (path === '/dashboard' || path === '/') {
      return (
        <div className="flex items-center gap-2">
          <Link to="/events">
            <Button variant="secondary" size="sm" className="bg-white/20 text-white hover:bg-white/30">
              <Calendar size={16} className="mr-1" />
              Events
            </Button>
          </Link>
          <Link to="/volunteers">
            <Button variant="secondary" size="sm" className="bg-white/20 text-white hover:bg-white/30">
              <Users size={16} className="mr-1" />
              Volunteers
            </Button>
          </Link>
        </div>
      );
    }
    
    if (path === '/events') {
      return (
        <Link to="/events/new">
          <Button variant="secondary" size="sm" className="bg-white/20 text-white hover:bg-white/30">
            <Plus size={16} className="mr-1" />
            New Event
          </Button>
        </Link>
      );
    }
    
    if (path === '/volunteers' || path.startsWith('/volunteers/')) {
      return (
        <Link to="/volunteers/new">
          <Button variant="secondary" size="sm" className="bg-white/20 text-white hover:bg-white/30">
            <UserPlus size={16} className="mr-1" />
            Add Volunteer
          </Button>
        </Link>
      );
    }
    
    return null;
  };
  
  return (
    <header className="w-full bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 text-white border-b p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">{title}</h1>
        {isLoggedIn && getQuickActions()}
      </div>
      
      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/20">
                  <Bell size={20} />
                  {unreadNotifications > 0 && (
                    <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {unreadNotifications}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-72 p-3" align="end">
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="font-medium">Notifications</h4>
                  {unreadNotifications > 0 && (
                    <Button variant="ghost" size="sm" onClick={markAsRead} className="text-xs">
                      Mark all as read
                    </Button>
                  )}
                </div>
                <div className="space-y-2">
                  <div className={`p-2 rounded-md ${unreadNotifications > 0 ? 'bg-accent' : 'bg-muted'}`}>
                    <p className="text-sm">New volunteer registration: Sarah Johnson</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                  <div className={`p-2 rounded-md ${unreadNotifications > 0 ? 'bg-accent' : 'bg-muted'}`}>
                    <p className="text-sm">Event updated: Beach Cleanup</p>
                    <p className="text-xs text-muted-foreground">Yesterday</p>
                  </div>
                  <div className="p-2 rounded-md bg-muted">
                    <p className="text-sm">Attendance report generated</p>
                    <p className="text-xs text-muted-foreground">3 days ago</p>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 text-white hover:bg-white/20">
                  <Avatar className="h-8 w-8 border-2 border-white">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-purple-800 text-white">NG</AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline">NGO Admin</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-2" align="end">
                <div className="space-y-1">
                  <Button variant="ghost" className="w-full justify-start">Profile</Button>
                  <Button variant="ghost" className="w-full justify-start">Settings</Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-red-500"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button variant="ghost" className="text-white hover:bg-white/20">
                Log in
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-white text-purple-600 hover:bg-purple-100">
                Sign up
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
