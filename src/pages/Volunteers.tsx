
import { useState } from 'react';
import VolunteerHeader from '@/components/volunteers/VolunteerHeader';
import VolunteerFilter from '@/components/volunteers/VolunteerFilter';
import VolunteerList from '@/components/volunteers/VolunteerList';
import { Volunteer } from "@/components/volunteers/VolunteerCard";
import { getVolunteerPlaceholder } from '@/utils/imageUtils';

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
    image: getVolunteerPlaceholder("4", "man")
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
    image: getVolunteerPlaceholder("5", "woman")
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
    image: getVolunteerPlaceholder("6", "man")
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
    image: getVolunteerPlaceholder("7", "woman")
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
    image: getVolunteerPlaceholder("8", "man")
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
      <VolunteerHeader />
      
      <VolunteerFilter 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      
      <VolunteerList 
        volunteers={sortedVolunteers} 
        isLoading={isLoading} 
        searchTerm={searchTerm}
        filterStatus={filterStatus}
      />
    </div>
  );
};

export default Volunteers;
