
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import { Event } from "../events/EventCard";
import { Volunteer } from "../volunteers/VolunteerCard";

type CheckInModalProps = {
  isOpen: boolean;
  onClose: () => void;
  event: Event;
  volunteer: Volunteer;
  type: 'checkIn' | 'checkOut';
};

const CheckInModal = ({ isOpen, onClose, event, volunteer, type }: CheckInModalProps) => {
  const [notes, setNotes] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const { toast } = useToast();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  const handleSubmit = () => {
    setIsChecking(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: type === 'checkIn' ? "Checked in successfully" : "Checked out successfully",
        description: `${volunteer.name} has been marked ${type === 'checkIn' ? 'present' : 'completed'} for ${event.title}`,
        className: "bg-green-50 border-green-200",
      });
      setIsChecking(false);
      setNotes('');
      onClose();
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {type === 'checkIn' ? 'Volunteer Check-In' : 'Volunteer Check-Out'}
          </DialogTitle>
          <DialogDescription>
            {type === 'checkIn' 
              ? 'Mark volunteer attendance for this event'
              : 'Record completion of volunteer service'
            }
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14">
              <AvatarImage src={volunteer.image} />
              <AvatarFallback>{getInitials(volunteer.name)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{volunteer.name}</h3>
              <p className="text-sm text-muted-foreground">{volunteer.role}</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium">Event</h4>
            <p className="text-sm">{event.title}</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
              <span>{new Date(event.date).toLocaleDateString()}</span>
              <span>•</span>
              <span>{event.startTime} - {event.endTime}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="check-time">
              {type === 'checkIn' ? 'Check-In Time' : 'Check-Out Time'}
            </Label>
            <Input
              id="check-time"
              type="text"
              value={new Date().toLocaleTimeString()}
              readOnly
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add any relevant notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button 
            onClick={handleSubmit} 
            disabled={isChecking}
            className="gap-2"
          >
            {isChecking ? "Processing..." : (
              <>
                <Check className="h-4 w-4" />
                {type === 'checkIn' ? 'Confirm Check-In' : 'Confirm Check-Out'}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CheckInModal;
