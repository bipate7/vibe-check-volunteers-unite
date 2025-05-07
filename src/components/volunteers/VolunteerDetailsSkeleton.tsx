
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const VolunteerDetailsSkeleton = () => {
  return (
    <div className="space-y-8">
      {/* Header with back button and edit */}
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-32" />
      </div>
      
      {/* Volunteer Profile Header */}
      <div className="bg-white rounded-lg shadow-md p-6 border">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          <Skeleton className="h-32 w-32 rounded-full" />
          
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-5 w-20" />
            </div>
            
            <Skeleton className="h-6 w-32 mb-4" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {[1, 2, 3].map((i) => (
                <div className="flex items-center gap-2" key={i}>
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-5 w-32" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-7 w-16" />
              </div>
              <Skeleton className="h-8 w-8 rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Tabs */}
      <Tabs defaultValue="attendance">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="attendance">Attendance History</TabsTrigger>
          <TabsTrigger value="skills">Skills & Expertise</TabsTrigger>
          <TabsTrigger value="activity">Activity & Notes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="attendance" className="space-y-6 pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <Skeleton className="h-6 w-40 mb-6" />
                <Skeleton className="h-[200px] w-full" />
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <Skeleton className="h-6 w-40 mb-6" />
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div className="p-4 rounded-md" key={i}>
                      <Skeleton className="h-4 w-20 mb-2" />
                      <Skeleton className="h-7 w-16" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardContent className="pt-6">
              <Skeleton className="h-6 w-40 mb-6" />
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VolunteerDetailsSkeleton;
