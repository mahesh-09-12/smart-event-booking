"use client"

import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const categories = ['All', 'Music', 'Tech', 'Business', 'Art'] as const;

type EventFilterProps = {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
};

export const EventFilter = ({ activeCategory, onCategoryChange }: EventFilterProps) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
      {categories.map((category) => (
        <Button
          key={category}
          variant={activeCategory === category ? 'default' : 'secondary'}
          onClick={() => onCategoryChange(category)}
          className={`rounded-full px-6 py-5 transition-all duration-300 ${
            activeCategory === category 
              ? 'shadow-lg shadow-primary/25' 
              : 'hover:bg-secondary/80 bg-secondary/50 border border-white/5'
          }`}
        >
          {category}
        </Button>
      ))}
    </div>
  );
};
