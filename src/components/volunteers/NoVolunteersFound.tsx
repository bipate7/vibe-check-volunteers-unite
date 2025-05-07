
import { Link } from 'react-router-dom';
import { Users, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

type NoVolunteersFoundProps = {
  searchTerm: string;
  filterStatus: string;
};

const NoVolunteersFound = ({ searchTerm, filterStatus }: NoVolunteersFoundProps) => {
  return (
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
  );
};

export default NoVolunteersFound;
