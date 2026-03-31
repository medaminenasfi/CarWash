'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'super_admin';
  avatar?: string;
}

interface AuthContextType {
  user: AdminUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock authentication
      if (email && password.length >= 6) {
        setUser({
          id: 'admin-001',
          email,
          name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
          role: 'super_admin',
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        });
      } else {
        throw new Error('Invalid credentials');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
