
import { useState } from "react";
import StatsCard from "@/components/common/StatsCard";
import EventCard, { Event } from "@/components/events/EventCard";
import VolunteerCard, { Volunteer } from "@/components/volunteers/VolunteerCard";
import { Button } from "@/components/ui/button";
import { Users, Calendar, Check, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { getEventPlaceholder, getVolunteerPlaceholder } from "@/utils/imageUtils";

// Mock data for dashboard
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
    image: getEventPlaceholder("3", "tree,planting")
  }
];

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
    image: getVolunteerPlaceholder("1", "woman")
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
    image: getVolunteerPlaceholder("2", "man")
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
    image: getVolunteerPlaceholder("3", "woman")
  }
];

const Dashboard = () => {
  const [isLoading] = useState(false);

  // Calculate stats for dashboard
  const totalVolunteers = 32;
  const upcomingEvents = 5;
  const volunteersThisMonth = 18;
  const totalHoursThisMonth = 124;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back!</h1>
          <p className="text-muted-foreground">
            Here's what's happening with your volunteer program.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link to="/volunteers/new">
            <Button className="gap-2">
              <Users className="h-4 w-4" />
              Add Volunteer
            </Button>
          </Link>
          <Link to="/events/new">
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              Create Event
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Volunteers"
          value={totalVolunteers}
          icon={<Users className="h-4 w-4" />}
          trend={{ value: 12, isPositive: true }}
          description="vs. last month"
        />
        <StatsCard
          title="Upcoming Events"
          value={upcomingEvents}
          icon={<Calendar className="h-4 w-4" />}
        />
        <StatsCard
          title="Active Volunteers"
          value={volunteersThisMonth}
          icon={<Check className="h-4 w-4" />}
          description="this month"
        />
        <StatsCard
          title="Volunteer Hours"
          value={totalHoursThisMonth}
          icon={<Clock className="h-4 w-4" />}
          trend={{ value: 8, isPositive: true }}
          description="this month"
        />
      </div>

      {/* Ongoing & Upcoming Events */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Current & Upcoming Events</h2>
          <Link to="/events">
            <Button variant="link">View All</Button>
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>

      {/* Recent Volunteers */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Recent Volunteers</h2>
          <Link to="/volunteers">
            <Button variant="link">View All</Button>
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockVolunteers.map((volunteer) => (
            <VolunteerCard key={volunteer.id} volunteer={volunteer} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
