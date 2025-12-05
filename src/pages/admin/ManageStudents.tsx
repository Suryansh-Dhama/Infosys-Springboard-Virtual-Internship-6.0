import { DashboardLayout } from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAuth } from '@/contexts/AuthContext';
import { AlertCircle, Edit, Eye, Plus, Search, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Student {
  id: string;
  name: string;
  email: string;
  course: string;
  enrollmentDate: string;
  status: 'active' | 'inactive';
}

export default function ManageStudents() {
  const { getRecentRegistrations } = useAuth();
  const [students, setStudents] = useState<Student[]>([
    { id: '1', name: 'Jane Student', email: 'student@skillforge.com', course: 'Computer Science', enrollmentDate: '2023-01-15', status: 'active' },
    { id: '2', name: 'David Wilson', email: 'david@skillforge.com', course: 'Mathematics', enrollmentDate: '2023-02-20', status: 'active' },
    { id: '3', name: 'Lisa Anderson', email: 'lisa@skillforge.com', course: 'Physics', enrollmentDate: '2023-03-10', status: 'active' },
    { id: '4', name: 'Robert Brown', email: 'robert@skillforge.com', course: 'Chemistry', enrollmentDate: '2023-04-05', status: 'inactive' },
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [newRegistrationsCount, setNewRegistrationsCount] = useState(0);

  // Check for new registrations
  useEffect(() => {
    const recentRegistrations = getRecentRegistrations();
    const studentRegistrations = recentRegistrations.filter(reg => reg.role === 'student');
    setNewRegistrationsCount(studentRegistrations.length);
  }, [getRecentRegistrations]);

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteStudent = (id: string) => {
    setStudents(students.filter(student => student.id !== id));
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">Manage Students</h2>
            <p className="text-muted-foreground mt-2">View, add, and manage all students in the system</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add New Student
          </Button>
        </div>

        {/* Notification for new registrations */}
        {newRegistrationsCount > 0 && (
          <Card className="border-primary">
            <CardContent className="flex items-center gap-4 p-4">
              <AlertCircle className="h-6 w-6 text-primary" />
              <div className="flex-1">
                <p className="font-medium">New Student Registrations</p>
                <p className="text-sm text-muted-foreground">
                  {newRegistrationsCount} new student(s) have registered recently. 
                  Review the list below to see all students.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Student Management</CardTitle>
            <CardDescription>
              Manage all students registered in the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
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
                  <TableHead>Course</TableHead>
                  <TableHead>Enrollment Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.course}</TableCell>
                    <TableCell>{student.enrollmentDate}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        student.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
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
                          onClick={() => handleDeleteStudent(student.id)}
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