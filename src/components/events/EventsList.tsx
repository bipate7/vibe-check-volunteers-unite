
import { Link } from "react-router-dom";
import EventCard, { Event } from "@/components/events/EventCard";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import EventsEmptyState from "./EventsEmptyState";

interface EventsListProps {
  events: Event[];
  isLoading: boolean;
  searchTerm: string;
}

const EventsList = ({ events, isLoading, searchTerm }: EventsListProps) => {
  if (isLoading) {
    return <LoadingSkeleton count={3} type="card" />;
  }
  
  if (events.length === 0) {
    return <EventsEmptyState searchTerm={searchTerm} />;
  }
  
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventsList;
