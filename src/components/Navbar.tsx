"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { LoginModal } from './LoginModal';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const pathname = usePathname();

  const navLinks = [
    { name: 'Browse Events', href: '/events' },
    { name: 'Categories', href: '/categories' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-primary-foreground font-bold shadow-lg shadow-primary/20 transition-transform group-hover:scale-110">
              E
            </div>
            <span className="font-headline font-bold text-xl tracking-tight">
              Echo<span className="text-primary">Events</span>
            </span>
          </Link>
        </div>

        <div className="hidden md:block">
          <div className="ml-10 flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                className={cn(
                  "transition-colors font-medium",
                  pathname === link.href ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
            
            {isAuthenticated ? (
              <div className="flex items-center gap-4 ml-4">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-full border border-white/5">
                  <User className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{user}</span>
                </div>
                <Button variant="ghost" size="icon" onClick={logout}>
                  <LogOut className="w-5 h-5 text-muted-foreground" />
                </Button>
              </div>
            ) : (
              <Button variant="default" className="rounded-full px-6" onClick={() => setIsLoginModalOpen(true)}>
                Sign In
              </Button>
            )}
          </div>
        </div>

        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-background border-b border-white/5 px-4"
          >
            <div className="pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block px-3 py-2 text-base font-medium rounded-md",
                    pathname === link.href ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 pb-2 border-t border-white/5">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 px-3 py-2 text-muted-foreground">
                      <User className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">{user}</span>
                    </div>
                    <Button variant="outline" className="w-full justify-start gap-2" onClick={logout}>
                      <LogOut className="w-4 h-4" /> Sign Out
                    </Button>
                  </div>
                ) : (
                  <Button className="w-full" onClick={() => setIsLoginModalOpen(true)}>Sign In</Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </nav>
  );
};
