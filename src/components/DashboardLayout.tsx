import { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { NavLink } from '@/components/NavLink';
import {
  LayoutDashboard,
  FileText,
  Award,
  Trophy,
  Users,
  BookOpen,
  LogOut,
  GraduationCap,
  Settings,
} from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth();

  const getNavItems = () => {
    switch (user?.role) {
      case 'admin':
        return [
          { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
          { icon: Users, label: 'Manage Teachers', path: '/admin/teachers' },
          { icon: Users, label: 'Manage Students', path: '/admin/students' },
          { icon: BookOpen, label: 'Notes', path: '/admin/notes' },
          { icon: Trophy, label: 'Leaderboard', path: '/admin/leaderboard' },
        ];
      case 'teacher':
        return [
          { icon: LayoutDashboard, label: 'Dashboard', path: '/teacher/dashboard' },
          { icon: FileText, label: 'My Exams', path: '/teacher/exams' },
          { icon: FileText, label: 'Create Exam', path: '/teacher/create-exam' },
          { icon: BookOpen, label: 'Notes', path: '/teacher/notes' },
          { icon: Trophy, label: 'Leaderboard', path: '/teacher/leaderboard' },
        ];
      case 'student':
        return [
          { icon: LayoutDashboard, label: 'Dashboard', path: '/student/dashboard' },
          { icon: FileText, label: 'My Assessments', path: '/student/assessments' },
          { icon: Award, label: 'My Certificates', path: '/student/certificates' },
          { icon: BookOpen, label: 'Notes', path: '/student/notes' },
          { icon: Trophy, label: 'Leaderboard', path: '/student/leaderboard' },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold">SkillForge</h1>
              <p className="text-xs text-muted-foreground capitalize">{user?.role} Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-card border-b">
        <div className="container mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors whitespace-nowrap"
                activeClassName="bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
