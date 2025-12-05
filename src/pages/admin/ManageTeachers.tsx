import { DashboardLayout } from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAuth } from '@/contexts/AuthContext';
import { AlertCircle, Edit, Eye, Plus, Search, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Teacher {
  id: string;
  name: string;
  email: string;
  subject: string;
  joinedDate: string;
  status: 'active' | 'inactive';
}

export default function ManageTeachers() {
  const { getRecentRegistrations } = useAuth();
  const [teachers, setTeachers] = useState<Teacher[]>([
    { id: '1', name: 'John Teacher', email: 'teacher@skillforge.com', subject: 'Mathematics', joinedDate: '2023-01-15', status: 'active' },
    { id: '2', name: 'Sarah Johnson', email: 'sarah@skillforge.com', subject: 'Physics', joinedDate: '2023-02-20', status: 'active' },
    { id: '3', name: 'Michael Chen', email: 'michael@skillforge.com', subject: 'Chemistry', joinedDate: '2023-03-10', status: 'active' },
    { id: '4', name: 'Emily Rodriguez', email: 'emily@skillforge.com', subject: 'Biology', joinedDate: '2023-04-05', status: 'inactive' },
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [newRegistrationsCount, setNewRegistrationsCount] = useState(0);

  // Check for new registrations
  useEffect(() => {
    const recentRegistrations = getRecentRegistrations();
    const teacherRegistrations = recentRegistrations.filter(reg => reg.role === 'teacher');
    setNewRegistrationsCount(teacherRegistrations.length);
  }, [getRecentRegistrations]);

  const filteredTeachers = teachers.filter(teacher => 
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteTeacher = (id: string) => {
    setTeachers(teachers.filter(teacher => teacher.id !== id));
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">Manage Teachers</h2>
            <p className="text-muted-foreground mt-2">View, add, and manage all teachers in the system</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add New Teacher
          </Button>
        </div>

        {/* Notification for new registrations */}
        {newRegistrationsCount > 0 && (
          <Card className="border-primary">
            <CardContent className="flex items-center gap-4 p-4">
              <AlertCircle className="h-6 w-6 text-primary" />
              <div className="flex-1">
                <p className="font-medium">New Teacher Registrations</p>
                <p className="text-sm text-muted-foreground">
                  {newRegistrationsCount} new teacher(s) have registered recently. 
                  Review the list below to see all teachers.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Teacher Management</CardTitle>
            <CardDescription>
              Manage all teachers registered in the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search teachers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Joined Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTeachers.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell className="font-medium">{teacher.name}</TableCell>
                    <TableCell>{teacher.email}</TableCell>
                    <TableCell>{teacher.subject}</TableCell>
                    <TableCell>{teacher.joinedDate}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        teacher.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {teacher.status.charAt(0).toUpperCase() + teacher.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteTeacher(teacher.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}