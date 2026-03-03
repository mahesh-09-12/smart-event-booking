"use client"

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Mail, Lock, User } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const { login } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleAuth = async (e: React.FormEvent, type: 'login' | 'signup') => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate auth delay
    await new Promise(r => setTimeout(r, 1000));
    setIsLoading(false);
    
    // Use entered name for signup, or email prefix as fallback for login
    const nameToUse = type === 'signup' ? formData.name : (formData.email.split('@')[0] || 'Member');
    
    login(nameToUse);
    toast({ 
      title: type === 'login' ? "Welcome back!" : "Account created!", 
      description: `You are now logged in as ${nameToUse}.` 
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="
          w-[95%]
          sm:w-full
          sm:max-w-md
          p-0
          bg-zinc-900
          border border-zinc-800
          rounded-2xl
          max-h-[90vh]
          overflow-y-auto
        "
      >
        <div className="p-4 sm:p-6 space-y-4">
          <DialogHeader className="mb-6 space-y-2">
            <DialogTitle className="text-2xl font-headline font-bold text-center">Join EchoEvents</DialogTitle>
            <DialogDescription className="text-center text-sm text-muted-foreground">
              Sign in to manage your bookings and discover personalized events.
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-zinc-950/50 p-1 mb-6 rounded-xl h-12">
              <TabsTrigger 
                value="login" 
                className="rounded-lg h-10 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Login
              </TabsTrigger>
              <TabsTrigger 
                value="signup" 
                className="rounded-lg h-10 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={(e) => handleAuth(e, 'login')} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-login" className="text-sm font-semibold">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/60" />
                    <Input 
                      id="email-login" 
                      type="email" 
                      placeholder="name@example.com" 
                      className="pl-11 h-12 w-full text-base rounded-xl bg-zinc-950 border-white/10 focus:ring-2 focus:ring-primary/20 transition-all" 
                      required 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-login" className="text-sm font-semibold">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/60" />
                    <Input 
                      id="password-login" 
                      type="password" 
                      placeholder="••••••••" 
                      className="pl-11 h-12 w-full text-base rounded-xl bg-zinc-950 border-white/10 focus:ring-2 focus:ring-primary/20 transition-all" 
                      required 
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full h-12 rounded-2xl text-lg font-bold mt-4 shadow-lg shadow-primary/20" disabled={isLoading}>
                  {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Sign In"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={(e) => handleAuth(e, 'signup')} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name-signup" className="text-sm font-semibold">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/60" />
                    <Input 
                      id="name-signup" 
                      placeholder="Alex Chen" 
                      className="pl-11 h-12 w-full text-base rounded-xl bg-zinc-950 border-white/10 focus:ring-2 focus:ring-primary/20 transition-all" 
                      required 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-signup" className="text-sm font-semibold">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/60" />
                    <Input 
                      id="email-signup" 
                      type="email" 
                      placeholder="name@example.com" 
                      className="pl-11 h-12 w-full text-base rounded-xl bg-zinc-950 border-white/10 focus:ring-2 focus:ring-primary/20 transition-all" 
                      required 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-signup" className="text-sm font-semibold">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/60" />
                    <Input 
                      id="password-signup" 
                      type="password" 
                      placeholder="••••••••" 
                      className="pl-11 h-12 w-full text-base rounded-xl bg-zinc-950 border-white/10 focus:ring-2 focus:ring-primary/20 transition-all" 
                      required 
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full h-12 rounded-2xl text-lg font-bold mt-4 shadow-lg shadow-primary/20" disabled={isLoading}>
                  {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-8 text-center text-xs text-muted-foreground">
            By continuing, you agree to our <span className="underline cursor-pointer hover:text-primary transition-colors">Terms of Service</span>.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
