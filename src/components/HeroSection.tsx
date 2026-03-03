"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';

export const HeroSection = ({ onSearch }: { onSearch: (val: string) => void }) => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Decorative Elements - relative to section, but aligned via parent container in layout */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-accent/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary mb-8"
        >
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-semibold uppercase tracking-wider">Premium Experience</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-headline text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight"
        >
          Experience the <span className="gradient-text">Future</span> <br className="hidden md:block" /> of Live Events.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto text-muted-foreground text-lg md:text-xl mb-12 leading-relaxed"
        >
          Discover, book, and enjoy the most exclusive concerts, tech conferences, and art expos in one seamless platform.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-xl mx-auto relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative flex items-center bg-card rounded-2xl p-1 shadow-2xl">
            <div className="pl-4">
              <Search className="w-5 h-5 text-muted-foreground" />
            </div>
            <Input 
              className="border-0 focus-visible:ring-0 bg-transparent py-6 text-lg placeholder:text-muted-foreground/50" 
              placeholder="Search for events, cities, or categories..." 
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
