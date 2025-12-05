import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Award, BookOpen, TrendingUp } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useNavigate } from 'react-router-dom';

export default function StudentDashboard() {
  const navigate = useNavigate();

  const stats = [
    { label: 'Completed Exams', value: '8', icon: FileText, color: 'text-primary' },
    { label: 'Certificates Earned', value: '5', icon: Award, color: 'text-success' },
    { label: 'Average Score', value: '91%', icon: TrendingUp, color: 'text-accent' },
  ];

  const upcomingExams = [
    { title: 'Advanced JavaScript', date: '2025-12-05', duration: '60 min' },
    { title: 'React Fundamentals', date: '2025-12-08', duration: '45 min' },
    { title: 'TypeScript Basics', date: '2025-12-10', duration: '30 min' },
  ];

  const recentCourses = [
    { title: 'Web Development', progress: 85, nextTopic: 'Advanced Hooks' },
    { title: 'Data Structures', progress: 60, nextTopic: 'Binary Trees' },
    { title: 'Algorithms', progress: 45, nextTopic: 'Dynamic Programming' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold">Student Dashboard</h2>
          <p className="text-muted-foreground mt-2">Track your learning progress and achievements</p>
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

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>My Courses</CardTitle>
              <CardDescription>Continue your learning journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCourses.map((course, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{course.title}</h4>
                        <p className="text-xs text-muted-foreground">Next: {course.nextTopic}</p>
                      </div>
                      <span className="text-sm font-medium">{course.progress}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Exams</CardTitle>
              <CardDescription>Scheduled assessments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingExams.map((exam, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <h4 className="font-semibold">{exam.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {new Date(exam.date).toLocaleDateString()} • {exam.duration}
                      </p>
                    </div>
                    <Button size="sm" onClick={() => navigate('/student/assessments')}>
                      Start
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
