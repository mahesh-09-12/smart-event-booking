
"use client"

import React from 'react';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, Filter, X, Zap } from 'lucide-react';

interface EventFiltersProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  category: string;
  setCategory: (val: string) => void;
  priceRange: string;
  setPriceRange: (val: string) => void;
  onClear: () => void;
}

export const EventFilters = ({
  searchQuery,
  setSearchQuery,
  category,
  setCategory,
  priceRange,
  setPriceRange,
  onClear
}: EventFiltersProps) => {
  return (
    <div className="glass-card p-4 rounded-2xl mb-12 border-primary/10 flex flex-col lg:flex-row gap-4">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input 
          placeholder="Search by title or location..." 
          className="pl-10 h-12 bg-secondary/50 border-white/5 rounded-xl focus:ring-primary/30"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 sm:flex gap-4">
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="h-12 w-full sm:w-[160px] bg-secondary/50 border-white/5 rounded-xl">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className="bg-card border-white/10 rounded-xl">
            <SelectItem value="All">All Categories</SelectItem>
            <SelectItem value="Music">Music</SelectItem>
            <SelectItem value="Tech">Tech</SelectItem>
            <SelectItem value="Business">Business</SelectItem>
            <SelectItem value="Art">Art</SelectItem>
          </SelectContent>
        </Select>

        <Select value={priceRange} onValueChange={setPriceRange}>
          <SelectTrigger className="h-12 w-full sm:w-[160px] bg-secondary/50 border-white/5 rounded-xl">
            <SelectValue placeholder="Price" />
          </SelectTrigger>
          <SelectContent className="bg-card border-white/10 rounded-xl">
            <SelectItem value="All">All Prices</SelectItem>
            <SelectItem value="Free">Free Only</SelectItem>
            <SelectItem value="Paid">Paid Only</SelectItem>
            <SelectItem value="Under100">Under $100</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button 
        variant="ghost" 
        onClick={onClear}
        className="h-12 px-6 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/5 gap-2"
      >
        <X className="w-4 h-4" /> Clear Filters
      </Button>
    </div>
  );
};
