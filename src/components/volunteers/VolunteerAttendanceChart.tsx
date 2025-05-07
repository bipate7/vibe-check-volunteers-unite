
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { AttendanceRecord } from '@/components/attendance/AttendanceTable';

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
      events: groupedByMonth[month].events
    }));
    
  // If no data, return placeholder
  if (attendanceRecords.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-48 bg-accent/20 rounded-lg">
        <p className="text-muted-foreground">No attendance data available</p>
      </div>
    );
  }
  
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Bar yAxisId="left" dataKey="hours" fill="#8884d8" name="Hours" />
        <Bar yAxisId="right" dataKey="events" fill="#82ca9d" name="Events" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default VolunteerAttendanceChart;
