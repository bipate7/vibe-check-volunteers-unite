import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Users, MapPin, Clock, Edit, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { getEventPlaceholder, getVolunteerPlaceholder } from '@/utils/imageUtils';
import { toast } from 'sonner';

// Mock event data - in real app this would come from API
const mockEvent = {
  id: '1',
  title: 'Beach Cleanup Drive',
  description: 'Join us for a community beach cleanup to help preserve our marine environment. We\'ll provide all necessary tools and refreshments.',
  location: 'Santa Monica Beach, CA',
  date: new Date('2024-02-15'),
  startTime: '09:00',
  endTime: '15:00',
  volunteers: 23,
  maxVolunteers: 50,
  status: 'upcoming' as const,
  organizer: 'Environmental Action Group',
  requirements: ['Comfortable walking shoes', 'Sun protection', 'Water bottle'],
  registeredVolunteers: [
    { id: '1', name: 'John Smith', avatar: '', role: 'Team Lead' },
    { id: '2', name: 'Sarah Johnson', avatar: '', role: 'Volunteer' },
    { id: '3', name: 'Mike Chen', avatar: '', role: 'Volunteer' },
    { id: '4', name: 'Emily Davis', avatar: '', role: 'First Aid' },
  ]
};

const EventDetails = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [event] = useState(mockEvent);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => setIsLoading(false), 500);
  }, [id]);

  const handleJoinEvent = () => {
    toast.success('Successfully joined the event!');
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      upcoming: 'default',
      ongoing: 'secondary',
      completed: 'outline',
      cancelled: 'destructive',
    };
    return <Badge variant={variants[status as keyof typeof variants] as any}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/events">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Events
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{event.title}</h1>
          <p className="text-muted-foreground">Event Details & Registration</p>
        </div>
        <Button>
          <Edit className="h-4 w-4 mr-2" />
          Edit Event
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Event Information</CardTitle>
                {getStatusBadge(event.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                <img 
                  src={getEventPlaceholder(event.id)} 
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <p className="text-muted-foreground">{event.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{format(event.date, 'EEEE, MMMM d, yyyy')}</p>
                    <p className="text-sm text-muted-foreground">Event Date</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{event.startTime} - {event.endTime}</p>
                    <p className="text-sm text-muted-foreground">Duration</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{event.location}</p>
                    <p className="text-sm text-muted-foreground">Location</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{event.volunteers}/{event.maxVolunteers} volunteers</p>
                    <p className="text-sm text-muted-foreground">Registration</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Requirements</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  {event.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" onClick={handleJoinEvent}>
                Join This Event
              </Button>
              <Button variant="outline" className="w-full">
                Share Event
              </Button>
              <Button variant="outline" className="w-full">
                Download Details
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Registered Volunteers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {event.registeredVolunteers.map((volunteer) => (
                  <div key={volunteer.id} className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={getVolunteerPlaceholder(volunteer.id)} />
                      <AvatarFallback>{volunteer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{volunteer.name}</p>
                      <p className="text-xs text-muted-foreground">{volunteer.role}</p>
                    </div>
                  </div>
                ))}
                <Button variant="ghost" className="w-full text-sm">
                  View All Volunteers ({event.volunteers})
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Event Organizer</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">{event.organizer}</p>
              <p className="text-sm text-muted-foreground">Contact organizer for questions</p>
              <Button variant="outline" size="sm" className="mt-3">
                Send Message
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;