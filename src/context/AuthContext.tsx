"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

type AuthContextType = {
  user: string | null;
  login: (name: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    // Load user from localStorage on mount
    const savedUser = localStorage.getItem('echo_user');
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const login = (name: string) => {
    setUser(name);
    localStorage.setItem('echo_user', name);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('echo_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
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
