
import { Event } from "@/components/events/EventCard";

export const filterEvents = (
  events: Event[],
  activeTab: string,
  searchTerm: string
): Event[] => {
  return events.filter((event) => {
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
};

export const sortEvents = (
  events: Event[],
  sortBy: string
): Event[] => {
  return [...events].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    } else if (sortBy === "volunteers") {
      return b.volunteers - a.volunteers;
    }
    return 0;
  });
};
