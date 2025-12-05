import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export type UserRole = 'admin' | 'teacher' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  password: string; // Added password field
}

interface RegistrationEvent {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  timestamp: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  getRecentRegistrations: () => RegistrationEvent[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration with different passwords
const mockUsers: User[] = [
  { id: '1', name: 'Admin User', email: 'admin@skillforge.com', role: 'admin', password: 'admin123' },
  { id: '2', name: 'John Teacher', email: 'teacher@skillforge.com', role: 'teacher', password: 'teacher123' },
  { id: '3', name: 'Jane Student', email: 'student@skillforge.com', role: 'student', password: 'student123' },
  { id: '4', name: 'Sarah Johnson', email: 'sarah@skillforge.com', role: 'teacher', password: 'sarah456' },
  { id: '5', name: 'Michael Chen', email: 'michael@skillforge.com', role: 'teacher', password: 'michael789' },
  { id: '6', name: 'Emily Rodriguez', email: 'emily@skillforge.com', role: 'teacher', password: 'emily101' },
  { id: '7', name: 'David Wilson', email: 'david@skillforge.com', role: 'student', password: 'david202' },
  { id: '8', name: 'Lisa Anderson', email: 'lisa@skillforge.com', role: 'student', password: 'lisa303' },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('skillforge_user');
    console.log('Checking for stored user:', storedUser);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      console.log('Set user from localStorage:', JSON.parse(storedUser));
    }
    
    // Initialize registration events storage if it doesn't exist
    if (!localStorage.getItem('skillforge_registrations')) {
      localStorage.setItem('skillforge_registrations', JSON.stringify([]));
    }
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    // Mock authentication - in real app, this would call an API
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
    
    // Check if user exists in localStorage (for signup users)
    const storedUsers = localStorage.getItem('skillforge_users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    
    console.log('Login attempt:', { email, password, role });
    console.log('Stored users:', users);
    console.log('Mock users:', mockUsers);
    
    // Check if user exists in registered users
    let foundUser = users.find((u: User) => u.email === email && u.password === password && u.role === role);
    
    console.log('Found user in localStorage:', foundUser);
    
    // If not found in localStorage, check mock users
    if (!foundUser) {
      foundUser = mockUsers.find(u => u.email === email && u.password === password && u.role === role);
      console.log('Found user in mock users:', foundUser);
    }
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('skillforge_user', JSON.stringify(foundUser));
      console.log('Login successful, setting user:', foundUser);
    } else {
      console.log('Login failed, invalid credentials');
      throw new Error('Invalid credentials');
    }
    
    // Navigate based on role
    switch (role) {
      case 'admin':
        navigate('/admin/dashboard');
        break;
      case 'teacher':
        navigate('/teacher/dashboard');
        break;
      case 'student':
        navigate('/student/dashboard');
        break;
    }
  };

  const signup = async (name: string, email: string, password: string, role: UserRole) => {
    // Mock signup - in real app, this would call an API
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
    
    console.log('Signup attempt:', { name, email, password, role });
    
    // Get existing users from localStorage
    const storedUsers = localStorage.getItem('skillforge_users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    
    console.log('Existing users:', users);
    
    // Check if user already exists
    if (users.find((u: User) => u.email === email)) {
      console.log('User already exists with email:', email);
      throw new Error('User with this email already exists');
    }
    
    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      role,
      password, // Store password (in real app, password should be hashed)
    };
    
    console.log('Creating new user:', newUser);
    
    // Add new user to users array
    users.push(newUser);
    localStorage.setItem('skillforge_users', JSON.stringify(users));
    
    // Record the registration event for admin notifications
    const registrationEvents = localStorage.getItem('skillforge_registrations');
    const events = registrationEvents ? JSON.parse(registrationEvents) : [];
    
    const newRegistration: RegistrationEvent = {
      id: Date.now().toString(),
      name,
      email,
      role,
      timestamp: new Date().toISOString(),
    };
    
    events.push(newRegistration);
    localStorage.setItem('skillforge_registrations', JSON.stringify(events));
    
    // Set as current user
    setUser(newUser);
    localStorage.setItem('skillforge_user', JSON.stringify(newUser));
    
    console.log('Signup successful, setting user:', newUser);
    
    // Navigate based on role
    switch (role) {
      case 'admin':
        navigate('/admin/dashboard');
        break;
      case 'teacher':
        navigate('/teacher/dashboard');
        break;
      case 'student':
        navigate('/student/dashboard');
        break;
    }
  };

  const logout = () => {
    console.log('Logging out user');
    setUser(null);
    localStorage.removeItem('skillforge_user');
    navigate('/login');
  };

  const getRecentRegistrations = (): RegistrationEvent[] => {
    const registrationEvents = localStorage.getItem('skillforge_registrations');
    const events = registrationEvents ? JSON.parse(registrationEvents) : [];
    
    // Return last 5 registrations
    return events.slice(-5).reverse();
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user, getRecentRegistrations }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}