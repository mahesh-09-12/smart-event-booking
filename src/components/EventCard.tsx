"use client"

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Event } from '@/lib/events-context';

interface EventCardProps {
  event: Event;
  index: number;
}

export const EventCard = ({ event, index }: EventCardProps) => {
  const isSoldOut = event.seatsAvailable === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="glass-card rounded-2xl overflow-hidden h-full flex flex-col glow-hover">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-60" />
          <div className="absolute top-4 left-4">
            <Badge className="bg-primary/20 backdrop-blur-md border-primary/30 text-primary font-bold">
              {event.category}
            </Badge>
          </div>
          {isSoldOut && (
            <div className="absolute top-4 right-4">
              <Badge variant="destructive" className="font-bold">SOLD OUT</Badge>
            </div>
          )}
        </div>

        <div className="p-6 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-headline text-xl font-bold line-clamp-1 group-hover:text-primary transition-colors">
              {event.title}
            </h3>
          </div>

          <div className="space-y-3 mb-6 flex-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4 text-primary" />
              <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="w-4 h-4 text-primary" />
              <span>{event.seatsAvailable} seats remaining</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground uppercase tracking-widest">Starting from</span>
              <span className="text-2xl font-bold font-headline">${event.price}</span>
            </div>
            <Button asChild className="rounded-xl group/btn overflow-hidden relative">
              <Link href={`/event/${event.id}`}>
                <span className="relative z-10 flex items-center gap-1">
                  Details <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover/btn:opacity-100 transition-opacity" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
