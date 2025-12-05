import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, FileText, CheckCircle, XCircle } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useNavigate } from 'react-router-dom';

export default function StudentAssessments() {
  const navigate = useNavigate();

  const assessments = [
    {
      id: 1,
      title: 'Advanced JavaScript',
      status: 'available',
      duration: 60,
      questions: 25,
      passingScore: 90,
      attempts: 0,
    },
    {
      id: 2,
      title: 'React Fundamentals',
      status: 'completed',
      duration: 45,
      questions: 20,
      passingScore: 90,
      attempts: 1,
      score: 95,
    },
    {
      id: 3,
      title: 'TypeScript Basics',
      status: 'available',
      duration: 30,
      questions: 15,
      passingScore: 90,
      attempts: 0,
    },
    {
      id: 4,
      title: 'Node.js Essentials',
      status: 'completed',
      duration: 50,
      questions: 22,
      passingScore: 90,
      attempts: 1,
      score: 88,
    },
  ];

  const getStatusColor = (status: string) => {
    return status === 'completed' ? 'secondary' : 'default';
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold">My Assessments</h2>
          <p className="text-muted-foreground mt-2">View and attempt your assigned exams</p>
        </div>

        <div className="grid gap-4">
          {assessments.map((assessment) => (
            <Card key={assessment.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <CardTitle>{assessment.title}</CardTitle>
                      <Badge variant={getStatusColor(assessment.status)}>
                        {assessment.status === 'completed' ? 'Completed' : 'Available'}
                      </Badge>
                    </div>
                    <CardDescription className="mt-2">
                      {assessment.questions} questions • {assessment.duration} minutes • Passing score: {assessment.passingScore}%
                    </CardDescription>
                  </div>
                  {assessment.status === 'completed' && assessment.score && (
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${assessment.score >= assessment.passingScore ? 'text-success' : 'text-destructive'}`}>
                        {assessment.score}%
                      </div>
                      {assessment.score >= assessment.passingScore ? (
                        <div className="flex items-center gap-1 text-success text-sm">
                          <CheckCircle className="h-4 w-4" />
                          Passed
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-destructive text-sm">
                          <XCircle className="h-4 w-4" />
                          Failed
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {assessment.duration} min
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      {assessment.questions} questions
                    </div>
                    <div>Attempts: {assessment.attempts}</div>
                  </div>
                  <div className="flex gap-2">
                    {assessment.status === 'available' && (
                      <Button onClick={() => navigate(`/student/exam/${assessment.id}`)}>
                        Start Exam
                      </Button>
                    )}
                    {assessment.status === 'completed' && (
                      <>
                        <Button variant="outline">View Results</Button>
                        {assessment.score && assessment.score >= assessment.passingScore && (
                          <Button onClick={() => navigate('/student/certificates')} className="bg-success hover:bg-success/90">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            View Certificate
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
