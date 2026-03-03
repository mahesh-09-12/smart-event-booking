"use client"

import React, { useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { EventCard } from '@/components/EventCard';
import { useEvents } from '@/lib/events-context';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Inbox, Music, Cpu, Briefcase, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const iconMap: Record<string, any> = {
  music: Music,
  tech: Cpu,
  business: Briefcase,
  art: Palette
};

export default function CategoryDetailsPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { events, isLoading } = useEvents();

  const categoryEvents = useMemo(() => {
    return events.filter(e => e.category.toLowerCase() === slug);
  }, [events, slug]);

  const Icon = iconMap[slug as string] || Inbox;
  const categoryName = (slug as string).charAt(0).toUpperCase() + (slug as string).slice(1);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <Button 
              variant="ghost" 
              onClick={() => router.push('/categories')}
              className="mb-6 -ml-2 text-muted-foreground hover:text-foreground gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> All Categories
            </Button>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center text-primary shadow-xl shadow-primary/10">
                <Icon className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-headline font-bold">{categoryName}</h1>
                <p className="text-muted-foreground mt-1">
                  Showing {categoryEvents.length} events in this category
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/events">View All Events</Link>
            </Button>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {categoryEvents.length > 0 ? (
            <motion.div 
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {categoryEvents.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </motion.div>
          ) : !isLoading && (
            <motion.div 
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-32 glass-card rounded-3xl"
            >
              <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6 text-muted-foreground/30">
                <Inbox className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-headline font-bold mb-2">No events here yet</h3>
              <p className="text-muted-foreground mb-8">We don't have any events listed for this category right now. Check back later!</p>
              <Button onClick={() => router.push('/events')} className="rounded-full px-8">
                Browse Other Events
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
