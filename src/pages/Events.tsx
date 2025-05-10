import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import EventCard, { Event } from "@/components/events/EventCard";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import { Calendar, Search, Plus, Filter } from "lucide-react";
import { getEventPlaceholder } from "@/utils/imageUtils";

// Mock data for events page
const mockEvents: Event[] = [
  {
    id: "1",
    title: "Beach Clean-Up",
    description: "Help clean up the local beach and protect our environment. We'll provide all necessary equipment.",
    location: "Sunny Beach, CA",
    date: new Date(Date.now() + 86400000 * 2), // 2 days from now
    startTime: "9:00 AM",
    endTime: "1:00 PM",
    volunteers: 12,
    maxVolunteers: 20,
    status: "upcoming",
    image: getEventPlaceholder("1", "beach,cleanup")
  },
  {
    id: "2",
    title: "Food Bank Distribution",
    description: "Distribute food packages to families in need at the local community center.",
    location: "Community Center, CA",
    date: new Date(Date.now() + 86400000 * 5), // 5 days from now
    startTime: "2:00 PM",
    endTime: "6:00 PM",
    volunteers: 8,
    maxVolunteers: 15,
    status: "upcoming",
    image: getEventPlaceholder("2", "food,charity")
  },
  {
    id: "3",
    title: "Tree Planting Initiative",
    description: "Join us in planting trees across the city to improve air quality and beautify our neighborhoods.",
    location: "City Park, CA",
    date: new Date(), // Today
    startTime: "10:00 AM",
    endTime: "3:00 PM",
    volunteers: 15,
    maxVolunteers: 25,
    status: "ongoing",
    image: "https://source.unsplash.com/random/800x600/?tree,planting"
  },
  {
    id: "4",
    title: "Homeless Shelter Support",
    description: "Help prepare and serve meals at the local homeless shelter.",
    location: "Downtown Shelter, CA",
    date: new Date(Date.now() - 86400000 * 10), // 10 days ago
    startTime: "5:00 PM",
    endTime: "9:00 PM",
    volunteers: 10,
    maxVolunteers: 10,
    status: "completed",
    image: "https://source.unsplash.com/random/800x600/?shelter,help"
  },
  {
    id: "5",
    title: "Senior Center Visit",
    description: "Spend time with seniors at the local care center, engaging in games and activities.",
    location: "Sunshine Care Center, CA",
    date: new Date(Date.now() - 86400000 * 5), // 5 days ago
    startTime: "1:00 PM",
    endTime: "4:00 PM",
    volunteers: 6,
    maxVolunteers: 12,
    status: "completed",
    image: "https://source.unsplash.com/random/800x600/?senior,elderly"
  },
  {
    id: "6",
    title: "Animal Shelter Assistance",
    description: "Help walk dogs, clean cages, and socialize cats at the local animal shelter.",
    location: "Paws & Claws Shelter, CA",
    date: new Date(Date.now() + 86400000 * 7), // 7 days from now
    startTime: "9:00 AM",
    endTime: "12:00 PM",
    volunteers: 5,
    maxVolunteers: 10,
    status: "upcoming",
    image: "https://source.unsplash.com/random/800x600/?animal,shelter"
  },
  {
    id: "7",
    title: "Youth Mentorship Program",
    description: "Mentor underprivileged youth through activities, homework help, and positive role modeling.",
    location: "Community Youth Center, CA",
    date: new Date(Date.now() - 86400000 * 15), // 15 days ago
    startTime: "3:00 PM",
    endTime: "6:00 PM",
    volunteers: 12,
    maxVolunteers: 15,
    status: "completed",
    image: "https://source.unsplash.com/random/800x600/?youth,mentor"
  },
  {
    id: "8",
    title: "Community Garden Project",
    description: "Help plant and maintain the community garden which provides fresh vegetables to local food banks.",
    location: "Green Acres Park, CA",
    date: new Date(Date.now() + 86400000 * 10), // 10 days from now
    startTime: "8:00 AM",
    endTime: "12:00 PM",
    volunteers: 8,
    maxVolunteers: 20,
    status: "upcoming",
    image: "https://source.unsplash.com/random/800x600/?garden,community"
  }
];

const Events = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [isLoading] = useState(false);

  const filteredEvents = mockEvents.filter((event) => {
    const matchesTab = 
      (activeTab === "upcoming" && event.status === "upcoming") ||
      (activeTab === "ongoing" && event.status === "ongoing") ||
      (activeTab === "completed" && event.status === "completed") ||
      (activeTab === "all");
      
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.location.toLowerCase().includes(searchTerm.toLowerCase());
                          
    return matchesTab && matchesSearch;
  });
  
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    } else if (sortBy === "volunteers") {
      return b.volunteers - a.volunteers;
    }
    return 0;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold">Events Management</h1>
        <Link to="/events/new">
          <Button className="gap-2">
            <Plus size={18} />
            Create New Event
          </Button>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search events..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 items-center">
          <Filter size={20} className="text-muted-foreground" />
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="volunteers">Volunteers</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all" className="gap-2">
            <Calendar size={16} />
            All Events
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="gap-2">
            <Calendar size={16} />
            Upcoming
          </TabsTrigger>
          <TabsTrigger value="ongoing" className="gap-2">
            <Calendar size={16} />
            Ongoing
          </TabsTrigger>
          <TabsTrigger value="completed" className="gap-2">
            <Calendar size={16} />
            Completed
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          {renderEventsList()}
        </TabsContent>
        <TabsContent value="upcoming" className="mt-6">
          {renderEventsList()}
        </TabsContent>
        <TabsContent value="ongoing" className="mt-6">
          {renderEventsList()}
        </TabsContent>
        <TabsContent value="completed" className="mt-6">
          {renderEventsList()}
        </TabsContent>
      </Tabs>
    </div>
  );
  
  function renderEventsList() {
    if (isLoading) {
      return <LoadingSkeleton count={3} type="card" />;
    }
    
    if (sortedEvents.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Calendar className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No events found</h3>
          <p className="text-muted-foreground mt-1">
            {searchTerm ? "Try adjusting your search terms" : "Create your first event to get started"}
          </p>
          {!searchTerm && (
            <Link to="/events/new">
              <Button className="mt-4 gap-2">
                <Plus size={16} />
                Create New Event
              </Button>
            </Link>
          )}
        </div>
      );
    }
    
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    );
  }
};

export default Events;
