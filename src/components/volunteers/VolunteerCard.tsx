
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getInitials } from "@/utils/imageUtils";

export type Volunteer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  skills: string[];
  joinDate: Date;
  image?: string;
  status: 'active' | 'inactive' | 'pending';
  eventsAttended: number;
  totalHours: number;
};

type VolunteerCardProps = {
  volunteer: Volunteer;
  compact?: boolean;
};

const VolunteerCard = ({ volunteer, compact = false }: VolunteerCardProps) => {
  const getStatusClass = (status: Volunteer['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium';
      case 'inactive':
        return 'bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium';
      default:
        return '';
    }
  };
  
  if (compact) {
    return (
      <div className="flex items-center justify-between p-3 border rounded-md hover:bg-accent/20 transition-colors">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={volunteer.image} />
            <AvatarFallback>{getInitials(volunteer.name)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{volunteer.name}</h3>
            <p className="text-xs text-muted-foreground">{volunteer.role}</p>
          </div>
        </div>
        <div className={getStatusClass(volunteer.status)}>
          {volunteer.status}
        </div>
      </div>
    );
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-14 w-14">
          <AvatarImage src={volunteer.image} />
          <AvatarFallback className="text-lg bg-primary/10">{getInitials(volunteer.name)}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="flex items-center gap-2">
            {volunteer.name}
            <span className={getStatusClass(volunteer.status)}>
              {volunteer.status}
            </span>
          </CardTitle>
          <p className="text-sm text-muted-foreground">{volunteer.role}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <p className="text-sm"><span className="font-medium">Email:</span> {volunteer.email}</p>
          <p className="text-sm"><span className="font-medium">Phone:</span> {volunteer.phone}</p>
        </div>
        
        <div>
          <p className="text-sm font-medium mb-1">Skills:</p>
          <div className="flex flex-wrap gap-1">
            {volunteer.skills.map((skill) => (
              <Badge key={skill} variant="outline" className="bg-accent/50">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 pt-2">
          <div className="bg-muted p-2 rounded-md text-center">
            <p className="text-2xl font-bold">{volunteer.eventsAttended}</p>
            <p className="text-xs text-muted-foreground">Events Attended</p>
          </div>
          <div className="bg-muted p-2 rounded-md text-center">
            <p className="text-2xl font-bold">{volunteer.totalHours}</p>
            <p className="text-xs text-muted-foreground">Total Hours</p>
          </div>
        </div>
        
        <div className="pt-2 flex justify-center">
          <Link to={`/volunteers/${volunteer.id}`}>
            <Button>View Profile</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default VolunteerCard;
