
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  Area,
  ComposedChart,
  Line
} from 'recharts';
import { AttendanceRecord } from '@/components/attendance/AttendanceTable';
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

type Props = {
  attendanceRecords: AttendanceRecord[];
};

const VolunteerAttendanceChart = ({ attendanceRecords }: Props) => {
  // Group the attendance records by month
  const groupedByMonth: Record<string, { hours: number, events: number }> = {};
  
  // Process the last 6 months
  const today = new Date();
  for (let i = 0; i < 6; i++) {
    const monthDate = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const monthKey = monthDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    groupedByMonth[monthKey] = { hours: 0, events: 0 };
  }
  
  // Fill in the data from attendance records
  attendanceRecords.forEach(record => {
    if (!record.checkInTime) return;
    
    const recordDate = new Date(record.checkInTime);
    const monthKey = recordDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    
    if (groupedByMonth[monthKey]) {
      groupedByMonth[monthKey].hours += record.hours;
      groupedByMonth[monthKey].events += 1;
    }
  });
  
  // Convert to array for Recharts
  const chartData = Object.keys(groupedByMonth)
    .sort((a, b) => {
      const dateA = new Date(a);
      const dateB = new Date(b);
      return dateA.getTime() - dateB.getTime();
    })
    .map(month => ({
      month,
      hours: groupedByMonth[month].hours,
      events: groupedByMonth[month].events,
      efficiency: groupedByMonth[month].hours > 0 && groupedByMonth[month].events > 0 
        ? +(groupedByMonth[month].hours / groupedByMonth[month].events).toFixed(1)
        : 0
    }));
    
  // If no data, return placeholder
  if (attendanceRecords.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-48 bg-accent/20 rounded-lg">
        <p className="text-muted-foreground">No attendance data available</p>
      </div>
    );
  }
  
  // Chart configuration
  const chartConfig = {
    hours: {
      label: "Volunteer Hours",
      theme: {
        light: "#8884d8",
        dark: "#9F7AEA"
      }
    },
    events: {
      label: "Events Attended",
      theme: {
        light: "#82ca9d",
        dark: "#4FD1C5"
      }
    },
    efficiency: {
      label: "Avg Hours per Event",
      theme: {
        light: "#ffc658",
        dark: "#FEC6A1"
      }
    }
  };
  
  return (
    <ChartContainer config={chartConfig} className="aspect-auto h-[250px]">
      <ComposedChart
        data={chartData}
        margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.4} />
        <XAxis 
          dataKey="month" 
          tick={{ fontSize: 12 }}
          tickMargin={10}
        />
        <YAxis 
          yAxisId="left" 
          orientation="left" 
          tick={{ fontSize: 12 }}
          tickMargin={10}
          width={30}
        />
        <YAxis 
          yAxisId="right" 
          orientation="right" 
          tick={{ fontSize: 12 }}
          tickMargin={10}
          width={30}
        />
        <Tooltip 
          content={<ChartTooltipContent />} 
          wrapperStyle={{ outline: "none" }}
          cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
        />
        <Legend wrapperStyle={{ paddingTop: '10px' }} />
        <Bar 
          yAxisId="left" 
          dataKey="hours" 
          fill="var(--color-hours)" 
          name="Hours"
          radius={[4, 4, 0, 0]}
          barSize={24}
        />
        <Bar 
          yAxisId="right" 
          dataKey="events" 
          fill="var(--color-events)" 
          name="Events"
          radius={[4, 4, 0, 0]}
          barSize={24}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="efficiency"
          stroke="var(--color-efficiency)"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
          name="Avg Hours/Event"
        />
      </ComposedChart>
    </ChartContainer>
  );
};

export default VolunteerAttendanceChart;
