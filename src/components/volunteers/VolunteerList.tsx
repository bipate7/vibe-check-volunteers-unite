
import VolunteerCard, { Volunteer } from "@/components/volunteers/VolunteerCard";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import NoVolunteersFound from "@/components/volunteers/NoVolunteersFound";

type VolunteerListProps = {
  volunteers: Volunteer[];
  isLoading: boolean;
  searchTerm: string;
  filterStatus: string;
};

const VolunteerList = ({ 
  volunteers, 
  isLoading, 
  searchTerm, 
  filterStatus 
}: VolunteerListProps) => {
  if (isLoading) {
    return <LoadingSkeleton count={6} type="card" />;
  }

  if (volunteers.length === 0) {
    return <NoVolunteersFound searchTerm={searchTerm} filterStatus={filterStatus} />;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {volunteers.map((volunteer) => (
        <VolunteerCard key={volunteer.id} volunteer={volunteer} />
      ))}
    </div>
  );
};

export default VolunteerList;
