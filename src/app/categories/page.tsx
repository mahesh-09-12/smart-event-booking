"use client"

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CategoryCard } from '@/components/CategoryCard';
import { useEvents } from '@/lib/events-context';
import { motion } from 'framer-motion';
import { Music, Cpu, Briefcase, Palette, LayoutGrid } from 'lucide-react';

const categoryData = [
  { name: 'Music', slug: 'music', icon: Music, gradient: 'from-pink-500 to-rose-600' },
  { name: 'Tech', slug: 'tech', icon: Cpu, gradient: 'from-blue-500 to-cyan-600' },
  { name: 'Business', slug: 'business', icon: Briefcase, gradient: 'from-indigo-500 to-purple-600' },
  { name: 'Art', slug: 'art', icon: Palette, gradient: 'from-orange-500 to-amber-600' },
];

export default function CategoriesPage() {
  const { events } = useEvents();

  const categoriesWithCounts = categoryData.map(cat => ({
    ...cat,
    count: events.filter(e => e.category.toLowerCase() === cat.slug).length
  }));

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6">
            <LayoutGrid className="w-4 h-4" />
            <span className="text-sm font-semibold uppercase tracking-wider">Curated Selections</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-headline font-bold mb-6">Explore by Category</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Whether you're looking for the pulse of the city or the next tech breakthrough, we've got you covered.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categoriesWithCounts.map((category, index) => (
            <CategoryCard 
              key={category.slug}
              {...category}
              index={index}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
