
"use client"

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface CategoryCardProps {
  name: string;
  slug: string;
  count: number;
  icon: LucideIcon;
  gradient: string;
  index: number;
}

export const CategoryCard = ({ name, slug, count, icon: Icon, gradient, index }: CategoryCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link href={`/categories/${slug}`}>
        <div className={`relative group h-64 rounded-3xl overflow-hidden p-8 flex flex-col justify-between border border-white/5 glow-hover`}>
          {/* Background Gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
          <div className="absolute inset-0 bg-background/40 backdrop-blur-sm group-hover:bg-transparent transition-colors duration-500" />
          
          <div className="relative z-10 flex justify-between items-start">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md group-hover:scale-110 group-hover:bg-primary/20 transition-all">
              <Icon className="w-7 h-7 text-white" />
            </div>
            <Badge className="bg-primary/20 text-primary border-none px-3 py-1 font-bold">
              {count} Events
            </Badge>
          </div>

          <div className="relative z-10">
            <h3 className="text-3xl font-headline font-bold text-white mb-2 group-hover:translate-x-2 transition-transform">
              {name}
            </h3>
            <p className="text-muted-foreground text-sm group-hover:text-white/80 transition-colors">
              Explore {name.toLowerCase()} events, workshops and more.
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
