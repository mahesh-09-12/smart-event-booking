"use client"

import React from 'react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-white/5 py-12 mt-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-primary-foreground font-bold shadow-lg">
              E
            </div>
            <span className="font-headline font-bold text-xl tracking-tight">
              Echo<span className="text-primary">Events</span>
            </span>
          </Link>
          <p className="text-muted-foreground max-w-sm">
            Discover and book the most exclusive events around the globe. Our platform connects you with the experiences that matter most.
          </p>
        </div>
        <div>
          <h4 className="font-headline font-bold mb-4 uppercase text-xs tracking-widest text-primary">Company</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Press</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-headline font-bold mb-4 uppercase text-xs tracking-widest text-primary">Legal</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Trust Center</Link></li>
          </ul>
        </div>
      </div>
      <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
        <p>© 2024 EchoEvents Inc. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="#" className="hover:text-primary">Twitter</Link>
          <Link href="#" className="hover:text-primary">LinkedIn</Link>
          <Link href="#" className="hover:text-primary">Instagram</Link>
        </div>
      </div>
    </footer>
  );
};
