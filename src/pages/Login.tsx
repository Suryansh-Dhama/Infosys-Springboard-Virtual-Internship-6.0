import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { GraduationCap, LogIn, Shield, UserCircle, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [selectedRole, setSelectedRole] = useState<UserRole>('student'); // Track selected role
  const { login, signup } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Handle role change
  const handleRoleChange = (value: string) => {
    setSelectedRole(value as UserRole);
    // Clear form fields when role changes
    setEmail('');
    setPassword('');
    setName('');
    setConfirmPassword('');
  };

  const handleLogin = async () => {
    if (!email || !password) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    console.log('Login attempt:', { email, password, selectedRole });
    
    setIsLoading(true);
    try {
      await login(email, password, selectedRole);
      toast({
        title: "Login Successful",
        description: `Welcome back!`,
      });
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Weak Password",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    console.log('Signup attempt:', { name, email, password, selectedRole });
    
    setIsLoading(true);
    try {
      await signup(name, email, password, selectedRole);
      toast({
        title: "Account Created",
        description: `Welcome to SkillForge, ${name}!`,
      });
    } catch (error: any) {
      console.error('Signup error:', error);
      toast({
        title: "Signup Failed",
        description: error.message || "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemo = () => {
    switch (selectedRole) {
      case 'admin':
        setEmail('admin@skillforge.com');
        setPassword('admin123');
        break;
      case 'teacher':
        setEmail('teacher@skillforge.com');
        setPassword('teacher123');
        break;
      case 'student':
        setEmail('student@skillforge.com');
        setPassword('student123');
        break;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <GraduationCap className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            SkillForge
          </h1>
          <p className="text-muted-foreground mt-2">AI-Driven Adaptive Learning & Exam Generator</p>
        </div>

        {/* Sign In / Sign Up Tabs */}
        <Tabs value={authMode} onValueChange={(value) => setAuthMode(value as 'signin' | 'signup')} className="w-full mb-6">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="signin" className="flex items-center gap-2">
              <LogIn className="h-4 w-4" />
              Sign In
            </TabsTrigger>
            <TabsTrigger value="signup" className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Sign Up
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Role Selection Tabs */}
        <Tabs value={selectedRole} onValueChange={handleRoleChange} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="student" className="flex items-center gap-2">
              <UserCircle className="h-4 w-4" />
              Student
            </TabsTrigger>
            <TabsTrigger value="teacher" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Teacher
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Admin
            </TabsTrigger>
          </TabsList>

          <TabsContent value={selectedRole}>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">
                  {authMode === 'signin' ? `${selectedRole} Sign In` : `${selectedRole} Sign Up`}
                </CardTitle>
                <CardDescription>
                  {authMode === 'signin' 
                    ? `Enter your credentials to access your ${selectedRole} dashboard`
                    : `Create a new ${selectedRole} account to get started`
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {authMode === 'signup' && (
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={`${selectedRole}@skillforge.com`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {authMode === 'signup' && (
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                )}
                <div className="flex gap-2">
                  <Button
                    className="flex-1"
                    onClick={() => authMode === 'signin' ? handleLogin() : handleSignup()}
                    disabled={isLoading}
                  >
                    {isLoading 
                      ? (authMode === 'signin' ? 'Signing in...' : 'Creating account...')
                      : (authMode === 'signin' ? 'Sign In' : 'Sign Up')
                    }
                  </Button>
                  {authMode === 'signin' && (
                    <Button
                      variant="outline"
                      onClick={fillDemo}
                      disabled={isLoading}
                    >
                      Use Demo
                    </Button>
                  )}
                </div>
                {authMode === 'signin' && (
                  <div className="text-center text-sm text-muted-foreground">
                    <p>Don't have an account?{' '}
                      <button
                        onClick={() => setAuthMode('signup')}
                        className="text-primary hover:underline font-medium"
                      >
                        Sign up here
                      </button>
                    </p>
                  </div>
                )}
                {authMode === 'signup' && (
                  <div className="text-center text-sm text-muted-foreground">
                    <p>Already have an account?{' '}
                      <button
                        onClick={() => setAuthMode('signin')}
                        className="text-primary hover:underline font-medium"
                      >
                        Sign in here
                      </button>
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {authMode === 'signin' && (
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p className="font-semibold mb-2">Demo Credentials:</p>
            <p>Admin: admin@skillforge.com / admin123</p>
            <p>Teacher: teacher@skillforge.com / teacher123</p>
            <p>Student: student@skillforge.com / student123</p>
            <p className="mt-2">Additional Teachers: sarah@skillforge.com / sarah456, michael@skillforge.com / michael789</p>
            <p>Additional Students: david@skillforge.com / david202, lisa@skillforge.com / lisa303</p>
          </div>
        )}
      </div>
    </div>
  );
}