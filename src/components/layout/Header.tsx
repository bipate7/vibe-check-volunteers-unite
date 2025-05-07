
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell } from "lucide-react";

type HeaderProps = {
  title: string;
};

const Header = ({ title }: HeaderProps) => {
  const [unreadNotifications, setUnreadNotifications] = useState(2);
  
  const markAsRead = () => {
    setUnreadNotifications(0);
  };
  
  return (
    <header className="w-full bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 text-white border-b p-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold">{title}</h1>
      
      <div className="flex items-center gap-4">
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
              <Button variant="ghost" className="w-full justify-start text-red-500">Logout</Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
};

export default Header;
