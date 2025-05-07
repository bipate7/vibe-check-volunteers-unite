
import { useState, useMemo } from 'react';
import { Check, X } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Volunteer } from '../volunteers/VolunteerCard';

export type AttendanceRecord = {
  id: string;
  volunteerId: string;
  eventId: string;
  volunteer: Volunteer;
  checkInTime: string | null;
  checkOutTime: string | null;
  status: 'present' | 'absent' | 'late' | 'pending';
  hours: number;
  notes?: string;
};

type AttendanceTableProps = {
  records: AttendanceRecord[];
  onMarkAttendance: (recordId: string, action: 'checkIn' | 'checkOut' | 'absent') => void;
};

const AttendanceTable = ({ records, onMarkAttendance }: AttendanceTableProps) => {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string[]>([]);

  const filteredRecords = useMemo(() => {
    return records.filter(record => {
      const matchesSearch = record.volunteer.name.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = filterStatus.length === 0 || filterStatus.includes(record.status);
      return matchesSearch && matchesStatus;
    });
  }, [records, search, filterStatus]);

  const statusOptions = [
    { value: 'present', label: 'Present' },
    { value: 'absent', label: 'Absent' },
    { value: 'late', label: 'Late' },
    { value: 'pending', label: 'Pending' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <Input
          placeholder="Search volunteers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Filter by Status
              {filterStatus.length > 0 && ` (${filterStatus.length})`}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {statusOptions.map((option) => (
              <DropdownMenuCheckboxItem
                key={option.value}
                checked={filterStatus.includes(option.value)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setFilterStatus([...filterStatus, option.value]);
                  } else {
                    setFilterStatus(filterStatus.filter(item => item !== option.value));
                  }
                }}
              >
                {option.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Volunteer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Check In</TableHead>
              <TableHead>Check Out</TableHead>
              <TableHead>Hours</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRecords.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  No attendance records found
                </TableCell>
              </TableRow>
            ) : (
              filteredRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>
                    <div className="font-medium">{record.volunteer.name}</div>
                    <div className="text-xs text-muted-foreground">{record.volunteer.role}</div>
                  </TableCell>
                  <TableCell>
                    <span className={getStatusClass(record.status)}>
                      {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>{record.checkInTime || "-"}</TableCell>
                  <TableCell>{record.checkOutTime || "-"}</TableCell>
                  <TableCell>{record.hours > 0 ? `${record.hours} hrs` : "-"}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {!record.checkInTime && record.status !== 'absent' && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex items-center gap-1"
                          onClick={() => onMarkAttendance(record.id, 'checkIn')}
                        >
                          <Check size={16} />
                          <span className="hidden sm:inline">Check In</span>
                        </Button>
                      )}
                      {record.checkInTime && !record.checkOutTime && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex items-center gap-1"
                          onClick={() => onMarkAttendance(record.id, 'checkOut')}
                        >
                          <Check size={16} />
                          <span className="hidden sm:inline">Check Out</span>
                        </Button>
                      )}
                      {record.status !== 'absent' && record.status !== 'present' && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex items-center gap-1 text-destructive"
                          onClick={() => onMarkAttendance(record.id, 'absent')}
                        >
                          <X size={16} />
                          <span className="hidden sm:inline">Mark Absent</span>
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const getStatusClass = (status: AttendanceRecord['status']) => {
  switch (status) {
    case 'present':
      return 'status-active';
    case 'absent':
      return 'status-inactive';
    case 'late':
      return 'bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium';
    case 'pending':
      return 'status-pending';
    default:
      return '';
  }
};

export default AttendanceTable;
