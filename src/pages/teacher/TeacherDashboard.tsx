import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Users, Award, Plus } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useNavigate } from 'react-router-dom';

export default function TeacherDashboard() {
  const navigate = useNavigate();

  const stats = [
    { label: 'My Exams', value: '12', icon: FileText, color: 'text-primary' },
    { label: 'Active Students', value: '45', icon: Users, color: 'text-secondary' },
    { label: 'Avg. Score', value: '87%', icon: Award, color: 'text-success' },
  ];

  const recentExams = [
    { title: 'Mathematics Final Exam', students: 45, completed: 38, avgScore: 85 },
    { title: 'Physics Quiz', students: 40, completed: 40, avgScore: 92 },
    { title: 'Chemistry Midterm', students: 42, completed: 35, avgScore: 78 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">Teacher Dashboard</h2>
            <p className="text-muted-foreground mt-2">Manage your courses and track student progress</p>
          </div>
          <Button onClick={() => navigate('/teacher/create-exam')}>
            <Plus className="h-4 w-4 mr-2" />
            Create New Exam
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Exams</CardTitle>
            <CardDescription>Overview of your latest examinations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentExams.map((exam, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <h4 className="font-semibold">{exam.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {exam.completed}/{exam.students} students completed
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-success">{exam.avgScore}%</div>
                    <p className="text-xs text-muted-foreground">Avg. Score</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
