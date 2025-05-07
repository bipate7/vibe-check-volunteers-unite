
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  User, Calendar, Clock, Award, MapPin, Mail, Phone, Edit, ArrowLeft 
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Volunteer } from '@/components/volunteers/VolunteerCard';
import { AttendanceRecord } from '@/components/attendance/AttendanceTable';
import VolunteerAttendanceChart from '@/components/volunteers/VolunteerAttendanceChart';
import VolunteerDetailsSkeleton from '@/components/volunteers/VolunteerDetailsSkeleton';

// Mock data for volunteer details
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
  },
  {
    id: "4",
    name: "David Wilson",
    email: "david.w@example.com",
    phone: "(555) 234-5678",
    role: "Regular Volunteer",
    skills: ["Driving", "Heavy Lifting", "Maintenance"],
    joinDate: new Date(2022, 8, 5),
    status: "active",
    eventsAttended: 8,
    totalHours: 32,
    image: "https://source.unsplash.com/random/300x300/?portrait,man,2"
  },
  {
    id: "5",
    name: "Jessica Brown",
    email: "jessica.b@example.com",
    phone: "(555) 345-6789",
    role: "Team Lead",
    skills: ["Teaching", "Event Planning", "Public Speaking"],
    joinDate: new Date(2021, 2, 18),
    status: "active",
    eventsAttended: 18,
    totalHours: 76,
    image: "https://source.unsplash.com/random/300x300/?portrait,woman,3"
  },
  {
    id: "6",
    name: "Ryan Davis",
    email: "ryan.d@example.com",
    phone: "(555) 456-7890",
    role: "Regular Volunteer",
    skills: ["Technology", "Web Design", "Social Media"],
    joinDate: new Date(2022, 5, 30),
    status: "inactive",
    eventsAttended: 5,
    totalHours: 15,
    image: "https://source.unsplash.com/random/300x300/?portrait,man,3"
  },
  {
    id: "7",
    name: "Lisa Martinez",
    email: "lisa.m@example.com",
    phone: "(555) 567-8901",
    role: "Regular Volunteer",
    skills: ["Translation", "Customer Service", "Administration"],
    joinDate: new Date(2023, 0, 12),
    status: "active",
    eventsAttended: 6,
    totalHours: 24,
    image: "https://source.unsplash.com/random/300x300/?portrait,woman,4"
  },
  {
    id: "8",
    name: "Kevin Taylor",
    email: "kevin.t@example.com",
    phone: "(555) 678-9012",
    role: "New Volunteer",
    skills: ["Graphic Design", "Video Production"],
    joinDate: new Date(2023, 4, 20),
    status: "pending",
    eventsAttended: 1,
    totalHours: 3,
    image: "https://source.unsplash.com/random/300x300/?portrait,man,4"
  }
];

// Mock attendance records
const generateAttendanceRecords = (volunteerId: string): AttendanceRecord[] => {
  const records: AttendanceRecord[] = [];
  
  // Find the volunteer
  const volunteer = mockVolunteers.find(v => v.id === volunteerId);
  
  if (!volunteer) return [];
  
  // Generate some mock attendance records
  const eventNames = [
    "Food Drive", 
    "Community Cleanup", 
    "Fundraising Gala", 
    "Youth Mentoring", 
    "Shelter Support",
    "Charity Walk",
    "Educational Workshop",
    "Holiday Gift Drive"
  ];
  
  for (let i = 0; i < volunteer.eventsAttended; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (i * 7)); // One event per week in the past
    
    const checkInTime = `${date.toLocaleDateString()} 09:00 AM`;
    const checkOutTime = `${date.toLocaleDateString()} ${12 + Math.floor(Math.random() * 4)}:00 PM`;
    const hours = Math.floor(Math.random() * 5) + 3; // 3-8 hours
    
    records.push({
      id: `record-${volunteerId}-${i}`,
      volunteerId,
      eventId: `event-${i}`,
      volunteer: volunteer,
      checkInTime,
      checkOutTime,
      status: Math.random() > 0.9 ? 'late' : 'present', // 10% chance of being late
      hours,
      notes: Math.random() > 0.7 ? "Helped with setup and cleanup" : undefined
    });
  }
  
  return records.sort((a, b) => {
    return new Date(b.checkInTime!).getTime() - new Date(a.checkInTime!).getTime();
  });
};

const VolunteerDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [volunteer, setVolunteer] = useState<Volunteer | null>(null);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call delay
    const fetchData = async () => {
      setIsLoading(true);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Find volunteer by ID
      const foundVolunteer = mockVolunteers.find(v => v.id === id);
      
      if (foundVolunteer) {
        setVolunteer(foundVolunteer);
        setAttendanceRecords(generateAttendanceRecords(foundVolunteer.id));
      }
      
      setIsLoading(false);
    };
    
    fetchData();
  }, [id]);
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };
  
  const getStatusClass = (status: Volunteer['status']) => {
    switch (status) {
      case 'active':
        return 'status-active';
      case 'inactive':
        return 'status-inactive';
      case 'pending':
        return 'status-pending';
      default:
        return '';
    }
  };
  
  if (isLoading) {
    return <VolunteerDetailsSkeleton />;
  }
  
  if (!volunteer) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <h2 className="text-2xl font-bold mb-4">Volunteer Not Found</h2>
        <p className="text-muted-foreground mb-6">
          We couldn't find the volunteer you're looking for.
        </p>
        <Link to="/volunteers">
          <Button>
            <ArrowLeft size={18} className="mr-2" />
            Back to Volunteers
          </Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      {/* Header with back button and edit */}
      <div className="flex justify-between items-center">
        <Link to="/volunteers">
          <Button variant="outline">
            <ArrowLeft size={18} className="mr-2" />
            Back to Volunteers
          </Button>
        </Link>
        <Link to={`/volunteers/edit/${volunteer.id}`}>
          <Button variant="outline">
            <Edit size={18} className="mr-2" />
            Edit Profile
          </Button>
        </Link>
      </div>
      
      {/* Volunteer Profile Header */}
      <div className="bg-white rounded-lg shadow-md p-6 border">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          <Avatar className="h-32 w-32">
            <AvatarImage src={volunteer.image} />
            <AvatarFallback className="text-3xl">{getInitials(volunteer.name)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold">{volunteer.name}</h1>
              <span className={getStatusClass(volunteer.status)}>
                {volunteer.status.charAt(0).toUpperCase() + volunteer.status.slice(1)}
              </span>
            </div>
            
            <p className="text-lg text-muted-foreground mb-4">{volunteer.role}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="flex items-center gap-2">
                <Mail size={18} className="text-muted-foreground" />
                <span>{volunteer.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={18} className="text-muted-foreground" />
                <span>{volunteer.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-muted-foreground" />
                <span>Joined {volunteer.joinDate.toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="card-gradient-purple hover-lift">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Events Attended</p>
              <h3 className="text-3xl font-bold mt-1">{volunteer.eventsAttended}</h3>
            </div>
            <Calendar className="h-8 w-8 text-purple-500" />
          </CardContent>
        </Card>
        
        <Card className="card-gradient-blue hover-lift">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Hours</p>
              <h3 className="text-3xl font-bold mt-1">{volunteer.totalHours}</h3>
            </div>
            <Clock className="h-8 w-8 text-blue-500" />
          </CardContent>
        </Card>
        
        <Card className="card-gradient-teal hover-lift">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Volunteer Since</p>
              <h3 className="text-xl font-bold mt-1">
                {new Date(volunteer.joinDate).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'short'
                })}
              </h3>
            </div>
            <User className="h-8 w-8 text-teal-500" />
          </CardContent>
        </Card>
      </div>
      
      {/* Tabs for different sections */}
      <Tabs defaultValue="attendance">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="attendance">Attendance History</TabsTrigger>
          <TabsTrigger value="skills">Skills & Expertise</TabsTrigger>
          <TabsTrigger value="activity">Activity & Notes</TabsTrigger>
        </TabsList>
        
        {/* Attendance Tab */}
        <TabsContent value="attendance" className="space-y-6 pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="w-full">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-4">Attendance Overview</h3>
                <VolunteerAttendanceChart attendanceRecords={attendanceRecords} />
              </CardContent>
            </Card>
            
            <Card className="w-full">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-4">Attendance Summary</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-accent/40 p-4 rounded-md text-center">
                    <p className="text-muted-foreground text-sm">Events This Month</p>
                    <p className="text-3xl font-bold">{attendanceRecords.filter(r => {
                      const date = new Date(r.checkInTime || "");
                      const now = new Date();
                      return date.getMonth() === now.getMonth() && 
                             date.getFullYear() === now.getFullYear();
                    }).length}</p>
                  </div>
                  <div className="bg-accent/40 p-4 rounded-md text-center">
                    <p className="text-muted-foreground text-sm">Hours This Month</p>
                    <p className="text-3xl font-bold">{attendanceRecords.filter(r => {
                      const date = new Date(r.checkInTime || "");
                      const now = new Date();
                      return date.getMonth() === now.getMonth() && 
                             date.getFullYear() === now.getFullYear();
                    }).reduce((acc, record) => acc + record.hours, 0)}</p>
                  </div>
                  <div className="bg-accent/40 p-4 rounded-md text-center">
                    <p className="text-muted-foreground text-sm">Attendance Rate</p>
                    <p className="text-3xl font-bold">
                      {Math.round((attendanceRecords.filter(r => r.status === 'present').length / 
                                 attendanceRecords.length) * 100)}%
                    </p>
                  </div>
                  <div className="bg-accent/40 p-4 rounded-md text-center">
                    <p className="text-muted-foreground text-sm">Avg Hours/Event</p>
                    <p className="text-3xl font-bold">
                      {(attendanceRecords.reduce((acc, record) => acc + record.hours, 0) / 
                        attendanceRecords.length).toFixed(1)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardContent className="pt-6 overflow-auto">
              <h3 className="font-semibold text-lg mb-4">Attendance Records</h3>
              {attendanceRecords.length === 0 ? (
                <p className="text-center text-muted-foreground py-6">
                  No attendance records found
                </p>
              ) : (
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Event</TableHead>
                        <TableHead>Check In</TableHead>
                        <TableHead>Check Out</TableHead>
                        <TableHead>Hours</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {attendanceRecords.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell>
                            {new Date(record.checkInTime || "").toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            Food Drive #{parseInt(record.eventId.split('-')[1]) + 1}
                          </TableCell>
                          <TableCell>{record.checkInTime?.split(' ')[1] || "-"}</TableCell>
                          <TableCell>{record.checkOutTime?.split(' ')[1] || "-"}</TableCell>
                          <TableCell>{record.hours} hrs</TableCell>
                          <TableCell>
                            <span className={
                              record.status === 'present' 
                                ? 'status-active' 
                                : record.status === 'late'
                                  ? 'bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium'
                                  : 'status-inactive'
                            }>
                              {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Skills Tab */}
        <TabsContent value="skills" className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-4">Skills & Expertise</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-md font-medium mb-2">Current Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {volunteer.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="px-3 py-1 text-sm">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-md font-medium mb-2">Special Certifications</h4>
                    {volunteer.role === 'Team Lead' ? (
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="px-3 py-1 text-sm bg-accent/50">
                          <Award className="mr-1 h-3 w-3" /> Team Leadership
                        </Badge>
                        <Badge variant="outline" className="px-3 py-1 text-sm bg-accent/50">
                          <Award className="mr-1 h-3 w-3" /> Event Organization
                        </Badge>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No special certifications recorded
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-4">Expertise Areas</h3>
                <div className="space-y-4">
                  {volunteer.skills.map((skill, index) => (
                    <div key={index} className="bg-accent/30 p-4 rounded-lg">
                      <h4 className="font-medium">{skill}</h4>
                      <div className="relative w-full h-2 mt-2 bg-accent/30 rounded-full overflow-hidden">
                        <div 
                          className="absolute top-0 left-0 h-full bg-primary"
                          style={{ width: `${Math.min(100, 50 + (index * 10))}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span className="text-muted-foreground">Beginner</span>
                        <span className="text-muted-foreground">Expert</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Activity Tab */}
        <TabsContent value="activity" className="pt-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold text-lg mb-4">Activity & Notes</h3>
              <div className="space-y-6">
                {attendanceRecords.slice(0, 5).map((record) => (
                  <div key={record.id} className="border-b pb-4 last:border-b-0">
                    <div className="flex justify-between mb-1">
                      <h4 className="font-medium">
                        Food Drive #{parseInt(record.eventId.split('-')[1]) + 1}
                      </h4>
                      <span className="text-sm text-muted-foreground">
                        {new Date(record.checkInTime || "").toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {record.notes || "No notes recorded for this event."}
                    </p>
                  </div>
                ))}
                
                {attendanceRecords.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-8">
                    <Calendar className="h-12 w-12 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">No activity records found</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VolunteerDetails;
