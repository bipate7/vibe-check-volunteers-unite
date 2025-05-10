
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Users, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDistanceToNow, format } from 'date-fns';
import { getEventPlaceholder } from "@/utils/imageUtils";

export type Event = {
  id: string;
  title: string;
  description: string;
  location: string;
  date: Date;
  startTime: string;
  endTime: string;
  volunteers: number;
  maxVolunteers: number;
  image?: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
};

type EventCardProps = {
  event: Event;
  onMarkAttendance?: () => void;
};

const EventCard = ({ event, onMarkAttendance }: EventCardProps) => {
  const isUpcoming = event.status === 'upcoming';
  const isOngoing = event.status === 'ongoing';
  
  const getStatusColor = (status: Event['status']) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'ongoing':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getRelativeTime = (date: Date) => {
    if (event.status === 'upcoming') {
      return `Starting ${formatDistanceToNow(date, { addSuffix: true })}`;
    }
    if (event.status === 'completed') {
      return `Ended ${formatDistanceToNow(date, { addSuffix: true })}`;
    }
    return `Started ${formatDistanceToNow(date, { addSuffix: true })}`;
  };

  // Get image with fallback
  const eventImage = event.image || getEventPlaceholder(event.id, event.title);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 overflow-hidden">
        <img
          src={eventImage}
          alt={event.title}
          className="w-full h-full object-cover transition-all hover:scale-105 duration-200"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = getEventPlaceholder(event.id, 'volunteer');
          }}
        />
        <div className="absolute top-2 right-2">
          <Badge className={getStatusColor(event.status)}>
            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
          </Badge>
        </div>
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-1">{event.title}</CardTitle>
        <CardDescription className="flex items-center gap-1">
          <Calendar size={14} />
          <span>{format(event.date, 'EEEE, MMMM d, yyyy')}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm line-clamp-2">{event.description}</p>
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-primary" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-primary" />
            <span>{event.startTime} - {event.endTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users size={16} className="text-primary" />
            <span>
              {event.volunteers}/{event.maxVolunteers} volunteers
            </span>
          </div>
        </div>
        <div className="text-xs text-muted-foreground">
          {getRelativeTime(event.date)}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link to={`/events/${event.id}`}>
          <Button variant="outline">View Details</Button>
        </Link>
        {onMarkAttendance && (isUpcoming || isOngoing) && (
          <Button onClick={onMarkAttendance}>Mark Attendance</Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default EventCard;
