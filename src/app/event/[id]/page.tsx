"use client"

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useEvents } from '@/lib/events-context';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, Ticket, ArrowLeft, Share2, Heart } from 'lucide-react';
import { BookingModal } from '@/components/BookingModal';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';

export default function EventDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { events, isLoading } = useEvents();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const event = events.find(e => e.id === id);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-24 space-y-12">
          <Skeleton className="h-[400px] rounded-3xl w-full mb-12" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-48 w-full" />
            </div>
            <Skeleton className="h-[300px] rounded-3xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <h1 className="text-4xl font-headline font-bold">Event Not Found</h1>
        <Button onClick={() => router.push('/')}>Go Back Home</Button>
      </div>
    );
  }

  const isSoldOut = event.seatsAvailable === 0;

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-24 pb-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground -ml-4" onClick={() => router.push('/')}>
            <ArrowLeft className="w-4 h-4" /> Back to Events
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Media & Info */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl mb-10 group"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div className="space-y-2">
                  <Badge className="bg-primary/20 backdrop-blur-md border-primary/30 text-primary font-bold px-4 py-1">
                    {event.category}
                  </Badge>
                  <h1 className="text-4xl md:text-5xl font-headline font-bold text-white drop-shadow-lg">
                    {event.title}
                  </h1>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-12"
            >
              <section>
                <h2 className="text-2xl font-headline font-bold mb-6 flex items-center gap-2">
                  About This Event
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {event.description}
                </p>
              </section>

              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card p-6 rounded-2xl flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Date & Time</h4>
                    <p className="text-muted-foreground">
                      {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                    <p className="text-sm text-primary">07:00 PM onwards</p>
                  </div>
                </div>
                <div className="glass-card p-6 rounded-2xl flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Location</h4>
                    <p className="text-muted-foreground">{event.location}</p>
                    <Link href="#" className="text-sm text-accent hover:underline">Get Directions</Link>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-headline font-bold mb-6">Organizer Info</h2>
                <div className="flex items-center gap-4 p-6 glass-card rounded-2xl">
                  <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center font-bold text-2xl text-primary">
                    {event.organizer[0]}
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">{event.organizer}</h3>
                    <p className="text-muted-foreground text-sm">Verified Premium Host</p>
                  </div>
                  <Button variant="outline" className="ml-auto rounded-full">Follow</Button>
                </div>
              </section>
            </motion.div>
          </div>

          {/* Right Column: Sticky Sidebar Booking */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:sticky lg:top-24"
            >
              <div className="glass-card rounded-3xl p-8 border-primary/20">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <span className="text-sm text-muted-foreground uppercase tracking-widest block mb-1">Ticket Price</span>
                    <span className="text-4xl font-headline font-bold">${event.price}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="secondary" size="icon" className="rounded-full" onClick={() => setIsLiked(!isLiked)}>
                      <Heart className={`w-5 h-5 ${isLiked ? 'fill-destructive text-destructive' : ''}`} />
                    </Button>
                    <Button variant="secondary" size="icon" className="rounded-full">
                      <Share2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>Availability</span>
                    </div>
                    <span className={isSoldOut ? "text-destructive font-bold" : "text-primary font-bold"}>
                      {isSoldOut ? "Sold Out" : `${event.seatsAvailable} seats left`}
                    </span>
                  </div>

                  <Button 
                    onClick={() => setIsBookingOpen(true)} 
                    className="w-full py-8 rounded-2xl font-bold text-xl gap-3 shadow-xl shadow-primary/20"
                    disabled={isSoldOut}
                  >
                    {isSoldOut ? (
                      "Sold Out"
                    ) : (
                      <>
                        <Ticket className="w-6 h-6" />
                        Reserve Now
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground mt-4 leading-relaxed">
                    *By booking, you agree to EchoEvents' ticketing policies. Tickets are non-refundable within 48 hours of the event.
                  </p>
                </div>
              </div>

              <div className="mt-8 p-6 glass-card rounded-3xl bg-primary/5 border-primary/10">
                <h4 className="font-bold mb-3 flex items-center gap-2">
                  <Badge className="bg-primary/20 text-primary border-none">Pro Tip</Badge>
                </h4>
                <p className="text-sm text-muted-foreground italic">
                  "Book with a group of 5+ to unlock exclusive VIP backstage access for this event!"
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <BookingModal 
        event={event} 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
      />

      <Footer />
    </div>
  );
}
