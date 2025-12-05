import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Award, Medal } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';

export default function Leaderboard() {
  const weeklyLeaders = [
    { rank: 1, name: 'Alice Cooper', score: 98, exams: 5, certificates: 4 },
    { rank: 2, name: 'Bob Smith', score: 96, exams: 4, certificates: 3 },
    { rank: 3, name: 'Carol White', score: 95, exams: 6, certificates: 5 },
    { rank: 4, name: 'David Brown', score: 94, exams: 5, certificates: 4 },
    { rank: 5, name: 'Eve Johnson', score: 93, exams: 4, certificates: 3 },
  ];

  const monthlyLeaders = [
    { rank: 1, name: 'Frank Davis', score: 97, exams: 18, certificates: 15 },
    { rank: 2, name: 'Grace Lee', score: 96, exams: 16, certificates: 14 },
    { rank: 3, name: 'Henry Wilson', score: 95, exams: 17, certificates: 14 },
    { rank: 4, name: 'Ivy Martinez', score: 94, exams: 15, certificates: 13 },
    { rank: 5, name: 'Jack Taylor', score: 93, exams: 14, certificates: 12 },
  ];

  const getMedalIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-warning" />;
      case 2:
        return <Medal className="h-6 w-6 text-muted-foreground" />;
      case 3:
        return <Award className="h-6 w-6 text-accent" />;
      default:
        return <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-sm font-semibold">{rank}</div>;
    }
  };

  const LeaderboardTable = ({ data }: { data: typeof weeklyLeaders }) => (
    <div className="space-y-2">
      {data.map((leader) => (
        <Card key={leader.rank} className={leader.rank <= 3 ? 'border-primary/50' : ''}>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                {getMedalIcon(leader.rank)}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">{leader.name}</h4>
                <div className="flex gap-4 mt-1 text-sm text-muted-foreground">
                  <span>{leader.exams} exams</span>
                  <span>{leader.certificates} certificates</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-success">{leader.score}%</div>
                <p className="text-xs text-muted-foreground">Avg. Score</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold">Leaderboard</h2>
          <p className="text-muted-foreground mt-2">Top performers and their achievements</p>
        </div>

        <Tabs defaultValue="weekly" className="space-y-4">
          <TabsList>
            <TabsTrigger value="weekly">This Week</TabsTrigger>
            <TabsTrigger value="monthly">This Month</TabsTrigger>
          </TabsList>

          <TabsContent value="weekly">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Top Performers</CardTitle>
                <CardDescription>Students with highest average scores this week</CardDescription>
              </CardHeader>
              <CardContent>
                <LeaderboardTable data={weeklyLeaders} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monthly">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Top Performers</CardTitle>
                <CardDescription>Students with highest average scores this month</CardDescription>
              </CardHeader>
              <CardContent>
                <LeaderboardTable data={monthlyLeaders} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
