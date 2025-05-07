
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const VolunteerHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h1 className="text-3xl font-bold">Volunteer Directory</h1>
      <Link to="/volunteers/new">
        <Button className="gap-2">
          <Plus size={18} />
          Add Volunteer
        </Button>
      </Link>
    </div>
  );
};

export default VolunteerHeader;
