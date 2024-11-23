'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from './api';
import { User } from '@/types';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check if user is logged in on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { user, token } = response.data;

      // Store token and user data
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Set authorization header for future requests
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setUser(user);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    // Clear stored data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Remove authorization header
    delete api.defaults.headers.common['Authorization'];
    
    setUser(null);
    router.push('/');
  };

  // Create a function to check if the current route should be protected
  const isProtectedRoute = (pathname: string) => {
    const protectedRoutes = ['/dashboard'];
    return protectedRoutes.includes(pathname);
  };

  // Add route protection
  useEffect(() => {
    if (!isLoading && !user && typeof window !== 'undefined') {
      const pathname = window.location.pathname;
      if (isProtectedRoute(pathname)) {
        router.push('/login');
      }
    }
  }, [user, isLoading, router]);

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {!isLoading && children}
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