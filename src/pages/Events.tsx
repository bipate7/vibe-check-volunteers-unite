import { useState } from "react";
import EventsHeader from "@/components/events/EventsHeader";
import EventsSearch from "@/components/events/EventsSearch";
import EventsFilter from "@/components/events/EventsFilter";
import EventsList from "@/components/events/EventsList";
import { getEventPlaceholder } from "@/utils/imageUtils";
import { filterEvents, sortEvents } from "@/utils/eventUtils";
import { Event } from "@/components/events/EventCard";

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

  // Filter events based on active tab and search term
  const filteredEvents = filterEvents(mockEvents, activeTab, searchTerm);
  
  // Sort filtered events
  const sortedEvents = sortEvents(filteredEvents, sortBy);

  return (
    <div className="space-y-6">
      <EventsHeader />
      
      <EventsSearch 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      
      <EventsFilter activeTab={activeTab} setActiveTab={setActiveTab}>
        <EventsList 
          events={sortedEvents}
          isLoading={isLoading}
          searchTerm={searchTerm}
        />
      </EventsFilter>
    </div>
  );
};

export default Events;
