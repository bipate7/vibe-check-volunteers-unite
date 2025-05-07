
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AttendanceTable, { AttendanceRecord } from "@/components/attendance/AttendanceTable";
import CheckInModal from "@/components/attendance/CheckInModal";
import { Event } from "@/components/events/EventCard";
import { Volunteer } from "@/components/volunteers/VolunteerCard";
import { Calendar, Download, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for events
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
    image: "https://source.unsplash.com/random/800x600/?beach,cleanup"
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
    image: "https://source.unsplash.com/random/800x600/?food,charity"
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
  }
];

// Mock data for volunteers
const mockVolunteers: Volunteer[] = [
  {
    id: "1",
    name: "Emily Johnson",
    email: "emily.j@example.com",
    phone: "(555) 123-4567",
    role: "Regular Volunteer",
    skills: ["First Aid", "Cooking", "Organization"],
    joinDate: new Date(2022, 3, 15),
    status: "active",
    eventsAttended: 12,
    totalHours: 48,
    image: "https://source.unsplash.com/random/300x300/?portrait,woman,1"
  },
  {
    id: "2",
    name: "Michael Smith",
    email: "michael.s@example.com",
    phone: "(555) 987-6543",
    role: "Team Lead",
    skills: ["Leadership", "Logistics", "Communication"],
    joinDate: new Date(2021, 6, 22),
    status: "active",
    eventsAttended: 24,
    totalHours: 96,
    image: "https://source.unsplash.com/random/300x300/?portrait,man,1"
  },
  {
    id: "3",
    name: "Sophia Garcia",
    email: "sophia.g@example.com",
    phone: "(555) 567-8901",
    role: "New Volunteer",
    skills: ["Social Media", "Photography"],
    joinDate: new Date(2023, 1, 10),
    status: "pending",
    eventsAttended: 2,
    totalHours: 6,
    image: "https://source.unsplash.com/random/300x300/?portrait,woman,2"
  }
];

// Mock attendance records
const createMockAttendanceRecords = (eventId: string): AttendanceRecord[] => {
  const volunteerStatuses: AttendanceRecord['status'][] = ['present', 'absent', 'pending', 'late'];
  
  return mockVolunteers.map((volunteer, index) => {
    const status = volunteerStatuses[index % volunteerStatuses.length];
    let checkInTime = null;
    let checkOutTime = null;
    let hours = 0;
    
    if (status === 'present') {
      checkInTime = '09:15 AM';
      checkOutTime = '01:30 PM';
      hours = 4;
    } else if (status === 'late') {
      checkInTime = '10:45 AM';
      hours = 2.5;
    }
    
    return {
      id: `${eventId}-${volunteer.id}`,
      volunteerId: volunteer.id,
      eventId: eventId,
      volunteer: volunteer,
      checkInTime,
      checkOutTime,
      status,
      hours,
      notes: status === 'absent' ? 'Called in sick' : undefined
    };
  });
};

const Attendance = () => {
  const [selectedEvent, setSelectedEvent] = useState(mockEvents[0]);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(
    createMockAttendanceRecords(mockEvents[0].id)
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState<Volunteer | null>(null);
  const [modalType, setModalType] = useState<'checkIn' | 'checkOut'>('checkIn');
  
  const { toast } = useToast();

  const handleEventChange = (eventId: string) => {
    const event = mockEvents.find(e => e.id === eventId)!;
    setSelectedEvent(event);
    setAttendanceRecords(createMockAttendanceRecords(eventId));
  };

  const handleMarkAttendance = (recordId: string, action: 'checkIn' | 'checkOut' | 'absent') => {
    const record = attendanceRecords.find(r => r.id === recordId);
    if (!record) return;
    
    if (action === 'absent') {
      setAttendanceRecords(records => 
        records.map(r => 
          r.id === recordId 
            ? { ...r, status: 'absent', checkInTime: null, checkOutTime: null, hours: 0 }
            : r
        )
      );
      
      toast({
        title: "Volunteer marked as absent",
        description: `${record.volunteer.name} has been marked as absent for this event`,
      });
      
    } else {
      setSelectedVolunteer(record.volunteer);
      setModalType(action);
      setModalOpen(true);
    }
  };
  
  const closeModal = () => {
    setModalOpen(false);
    setSelectedVolunteer(null);
  };
  
  const exportAttendance = () => {
    toast({
      title: "Attendance report exported",
      description: "The attendance report has been downloaded successfully",
      className: "bg-green-50 border-green-200",
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Attendance Tracking</h1>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Select Event
          </CardTitle>
          <CardDescription>
            Choose an event to view or mark attendance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select 
            value={selectedEvent.id} 
            onValueChange={handleEventChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an event" />
            </SelectTrigger>
            <SelectContent>
              {mockEvents.map((event) => (
                <SelectItem key={event.id} value={event.id}>
                  {event.title} - {new Date(event.date).toLocaleDateString()} 
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between sm:items-center pb-2">
          <div>
            <CardTitle>{selectedEvent.title}</CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1">
              <Calendar className="h-4 w-4" />
              <span>{new Date(selectedEvent.date).toLocaleDateString()} • {selectedEvent.startTime} - {selectedEvent.endTime}</span>
            </CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2 sm:mt-0 gap-2"
            onClick={exportAttendance}
          >
            <Download size={16} />
            Export Report
          </Button>
        </CardHeader>
        <CardContent>
          <AttendanceTable 
            records={attendanceRecords} 
            onMarkAttendance={handleMarkAttendance} 
          />
        </CardContent>
        <CardFooter>
          <div className="text-sm text-muted-foreground flex items-center gap-1">
            <Check size={16} /> 
            Click on the actions to mark attendance for volunteers
          </div>
        </CardFooter>
      </Card>
      
      {selectedVolunteer && (
        <CheckInModal 
          isOpen={modalOpen} 
          onClose={closeModal} 
          volunteer={selectedVolunteer} 
          event={selectedEvent}
          type={modalType}
        />
      )}
    </div>
  );
};

export default Attendance;
