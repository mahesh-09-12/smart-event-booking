"use client"

import React, { useState, useMemo, useEffect } from 'react';
import { useEvents } from '@/lib/events-context';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { EventCard } from '@/components/EventCard';
import { EventFilters } from '@/components/EventFilters';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchX, CalendarRange } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

export default function EventsPage() {
  const { events, isLoading: contextLoading } = useEvents();
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [priceRange, setPriceRange] = useState('All');
  const [simulatedLoading, setSimulatedLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSimulatedLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const isLoading = contextLoading || simulatedLoading;

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = category === 'All' || event.category === category;
      
      let matchesPrice = true;
      if (priceRange === 'Free') matchesPrice = event.price === 0;
      else if (priceRange === 'Paid') matchesPrice = event.price > 0;
      else if (priceRange === 'Under100') matchesPrice = event.price < 100;

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [events, searchQuery, category, priceRange]);

  const clearFilters = () => {
    setSearchQuery('');
    setCategory('All');
    setPriceRange('All');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
              <CalendarRange className="w-5 h-5" />
            </div>
            <h1 className="text-4xl md:text-5xl font-headline font-bold">Browse Events</h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Discover a curated list of world-class events, from underground jazz clubs to global tech summits.
          </p>
        </motion.div>

        <EventFilters 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          category={category}
          setCategory={setCategory}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          onClear={clearFilters}
        />

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
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-32 glass-card rounded-3xl"
              >
                <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6 text-muted-foreground/30">
                  <SearchX className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-headline font-bold mb-2">No results found</h3>
                <p className="text-muted-foreground mb-8">Try adjusting your search terms or filters to find what you're looking for.</p>
                <Button onClick={clearFilters} variant="outline" className="rounded-full px-8">
                  Reset All Filters
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </main>

      <Footer />
    </div>
  );
}
