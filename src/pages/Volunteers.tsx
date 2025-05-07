
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import VolunteerCard, { Volunteer } from "@/components/volunteers/VolunteerCard";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import { Users, Search, Plus, Filter } from "lucide-react";

// Mock data for volunteers page
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

const Volunteers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [isLoading] = useState(false);

  const filteredVolunteers = mockVolunteers.filter((volunteer) => {
    const matchesSearch = 
      volunteer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      volunteer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      volunteer.role.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = 
      filterStatus === "all" || volunteer.status === filterStatus;
      
    return matchesSearch && matchesStatus;
  });
  
  const sortedVolunteers = [...filteredVolunteers].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "hours") {
      return b.totalHours - a.totalHours;
    } else if (sortBy === "events") {
      return b.eventsAttended - a.eventsAttended;
    } else if (sortBy === "date") {
      return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime();
    }
    return 0;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold">Volunteer Directory</h1>
        <Link to="/volunteers/new">
          <Button className="gap-2">
            <Plus size={18} />
            Add Volunteer
          </Button>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search volunteers..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="hours">Total Hours</SelectItem>
              <SelectItem value="events">Events</SelectItem>
              <SelectItem value="date">Join Date</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {isLoading ? (
        <LoadingSkeleton count={6} type="card" />
      ) : sortedVolunteers.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Users className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No volunteers found</h3>
          <p className="text-muted-foreground mt-1">
            {searchTerm || filterStatus !== "all" 
              ? "Try adjusting your search or filters" 
              : "Add your first volunteer to get started"}
          </p>
          {!searchTerm && filterStatus === "all" && (
            <Link to="/volunteers/new">
              <Button className="mt-4 gap-2">
                <Plus size={16} />
                Add Volunteer
              </Button>
            </Link>
          )}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedVolunteers.map((volunteer) => (
            <VolunteerCard key={volunteer.id} volunteer={volunteer} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Volunteers;
