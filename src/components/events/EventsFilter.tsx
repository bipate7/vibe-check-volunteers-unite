
import { Calendar } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface EventsFilterProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  children: React.ReactNode;
}

const EventsFilter = ({ activeTab, setActiveTab, children }: EventsFilterProps) => {
  return (
    <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value="all" className="gap-2">
          <Calendar size={16} />
          All Events
        </TabsTrigger>
        <TabsTrigger value="upcoming" className="gap-2">
          <Calendar size={16} />
          Upcoming
        </TabsTrigger>
        <TabsTrigger value="ongoing" className="gap-2">
          <Calendar size={16} />
          Ongoing
        </TabsTrigger>
        <TabsTrigger value="completed" className="gap-2">
          <Calendar size={16} />
          Completed
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="all" className="mt-6">
        {children}
      </TabsContent>
      <TabsContent value="upcoming" className="mt-6">
        {children}
      </TabsContent>
      <TabsContent value="ongoing" className="mt-6">
        {children}
      </TabsContent>
      <TabsContent value="completed" className="mt-6">
        {children}
      </TabsContent>
    </Tabs>
  );
};

export default EventsFilter;
