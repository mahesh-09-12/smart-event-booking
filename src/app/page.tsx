"use client"

import React, { useState, useMemo } from 'react';
import { useEvents } from '@/lib/events-context';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { EventFilter } from '@/components/EventFilter';
import { EventCard } from '@/components/EventCard';
import { Footer } from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchX } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function HomePage() {
  const { events, isLoading } = useEvents();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || event.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [events, searchQuery, activeCategory]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection onSearch={setSearchQuery} />

        <div className="py-12">
          <EventFilter activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-[4/3] rounded-2xl w-full" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-10 w-full rounded-xl" />
                </div>
              ))}
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredEvents.length > 0 ? (
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  layout
                >
                  {filteredEvents.map((event, index) => (
                    <EventCard key={event.id} event={event} index={index} />
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-32"
                >
                  <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6 text-muted-foreground/30">
                    <SearchX className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-headline font-bold mb-2">No events found</h3>
                  <p className="text-muted-foreground">We couldn't find any events matching your criteria. Try adjusting your filters.</p>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
