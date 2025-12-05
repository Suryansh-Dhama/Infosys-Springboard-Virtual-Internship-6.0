import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2 } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface Question {
  id: number;
  questionText: string;
  options: string[];
  correctOption: number;
  marks: number;
}

export default function CreateExam() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [examTitle, setExamTitle] = useState('');
  const [duration, setDuration] = useState('60');
  const [questions, setQuestions] = useState<Question[]>([
    { id: 1, questionText: '', options: ['', '', '', ''], correctOption: 0, marks: 1 },
  ]);

  const addQuestion = () => {
    const newQuestion: Question = {
      id: questions.length + 1,
      questionText: '',
      options: ['', '', '', ''],
      correctOption: 0,
      marks: 1,
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (id: number) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const updateQuestion = (id: number, field: keyof Question, value: any) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, [field]: value } : q))
    );
  };

  const updateOption = (questionId: number, optionIndex: number, value: string) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId) {
          const newOptions = [...q.options];
          newOptions[optionIndex] = value;
          return { ...q, options: newOptions };
        }
        return q;
      })
    );
  };

  const handleSubmit = () => {
    if (!examTitle || questions.some((q) => !q.questionText)) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Exam Created",
      description: `"${examTitle}" has been created successfully`,
    });
    navigate('/teacher/exams');
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h2 className="text-3xl font-bold">Create New Exam</h2>
          <p className="text-muted-foreground mt-2">Design a new assessment for your students</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Exam Details</CardTitle>
            <CardDescription>Basic information about the exam</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Exam Title</Label>
              <Input
                id="title"
                placeholder="e.g., Advanced JavaScript Final Exam"
                value={examTitle}
                onChange={(e) => setExamTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                placeholder="60"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {questions.map((question, qIndex) => (
          <Card key={question.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Question {qIndex + 1}</CardTitle>
                {questions.length > 1 && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeQuestion(question.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Question Text</Label>
                <Textarea
                  placeholder="Enter your question here"
                  value={question.questionText}
                  onChange={(e) => updateQuestion(question.id, 'questionText', e.target.value)}
                />
              </div>

              <div className="space-y-3">
                <Label>Options</Label>
                {question.options.map((option, optIndex) => (
                  <div key={optIndex} className="flex gap-2 items-center">
                    <Input
                      placeholder={`Option ${optIndex + 1}`}
                      value={option}
                      onChange={(e) => updateOption(question.id, optIndex, e.target.value)}
                    />
                    <Button
                      variant={question.correctOption === optIndex ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => updateQuestion(question.id, 'correctOption', optIndex)}
                    >
                      {question.correctOption === optIndex ? 'Correct' : 'Mark Correct'}
                    </Button>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <Label>Marks</Label>
                <Input
                  type="number"
                  min="1"
                  value={question.marks}
                  onChange={(e) => updateQuestion(question.id, 'marks', parseInt(e.target.value))}
                  className="w-32"
                />
              </div>
            </CardContent>
          </Card>
        ))}

        <div className="flex gap-2">
          <Button variant="outline" onClick={addQuestion}>
            <Plus className="h-4 w-4 mr-2" />
            Add Question
          </Button>
          <Button onClick={handleSubmit} className="ml-auto">
            Create Exam
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
