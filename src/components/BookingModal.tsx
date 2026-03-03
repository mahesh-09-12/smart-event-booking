"use client"

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Event, useEvents } from '@/lib/events-context';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2, Minus, Plus, CreditCard } from 'lucide-react';

interface BookingModalProps {
  event: Event;
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal = ({ event, isOpen, onClose }: BookingModalProps) => {
  const { bookEvent } = useEvents();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });

  const totalPrice = quantity * event.price;

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast({ title: "Validation Error", description: "Please fill in all fields.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    const success = await bookEvent(event.id, quantity);
    setIsSubmitting(false);

    if (success) {
      setIsSuccess(true);
      toast({ title: "Booking Confirmed!", description: `Successfully booked ${quantity} ticket(s) for ${event.title}.` });
    } else {
      toast({ title: "Booking Failed", description: "Not enough seats available.", variant: "destructive" });
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    setQuantity(1);
    setFormData({ name: '', email: '' });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden bg-card border-white/5 rounded-3xl">
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="booking-form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-8"
            >
              <DialogHeader className="mb-6">
                <DialogTitle className="text-2xl font-headline font-bold">Secure Your Spot</DialogTitle>
                <DialogDescription className="text-muted-foreground mt-2">
                  Complete the form below to book tickets for <span className="text-primary font-semibold">{event.title}</span>.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleBooking} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      placeholder="Alex Chen" 
                      className="rounded-xl bg-secondary border-white/10" 
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="alex@example.com" 
                      className="rounded-xl bg-secondary border-white/10" 
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="p-4 bg-secondary/50 rounded-2xl border border-white/5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium">Ticket Quantity</span>
                    <div className="flex items-center gap-4">
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon" 
                        className="w-8 h-8 rounded-full bg-white/5" 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="font-bold text-lg min-w-[20px] text-center">{quantity}</span>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon" 
                        className="w-8 h-8 rounded-full bg-white/5" 
                        onClick={() => setQuantity(Math.min(event.seatsAvailable, quantity + 1))}
                        disabled={quantity >= event.seatsAvailable}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="font-bold text-lg">Total</span>
                    <span className="text-2xl font-headline font-bold text-primary">${totalPrice}</span>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full py-6 rounded-2xl font-bold text-lg gap-2" 
                  disabled={isSubmitting || event.seatsAvailable === 0}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      Confirm Booking
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-12 text-center"
            >
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-3xl font-headline font-bold mb-4">You're All Set!</h2>
              <p className="text-muted-foreground mb-8 text-lg">
                Your tickets have been reserved. We've sent a confirmation email to <strong>{formData.email}</strong>.
              </p>
              <Button onClick={handleClose} className="w-full py-6 rounded-2xl text-lg">
                Awesome, thanks!
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};
