
import { Calendar, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface EventsEmptyStateProps {
  searchTerm: string;
}

const EventsEmptyState = ({ searchTerm }: EventsEmptyStateProps) => {
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
};

export default EventsEmptyState;
