"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Event = {
  id: string;
  title: string;
  category: 'Music' | 'Tech' | 'Business' | 'Art';
  date: string;
  location: string;
  price: number;
  seatsAvailable: number;
  description: string;
  image: string;
  organizer: string;
};

const initialEvents: Event[] = [
  {
    id: '1',
    title: 'Future Tech Summit 2024',
    category: 'Tech',
    date: '2024-11-15',
    location: 'San Francisco, CA',
    price: 299,
    seatsAvailable: 45,
    description: 'Join world leaders in technology as we discuss the future of AI, robotics, and quantum computing. A three-day immersive experience with keynote speakers from top Silicon Valley firms.',
    image: 'https://picsum.photos/seed/tech1/800/600',
    organizer: 'Nexus Innovations'
  },
  {
    id: '2',
    title: 'Neon Nights Concert',
    category: 'Music',
    date: '2024-09-22',
    location: 'Austin, TX',
    price: 85,
    seatsAvailable: 120,
    description: 'An electric evening featuring the best of synth-wave and indie pop. Experience stunning visuals and world-class acoustics under the neon lights of the Zenith Arena.',
    image: 'https://picsum.photos/seed/music1/800/600',
    organizer: 'Pulse Productions'
  },
  {
    id: '3',
    title: 'Global Business Forum',
    category: 'Business',
    date: '2024-10-05',
    location: 'New York, NY',
    price: 550,
    seatsAvailable: 15,
    description: 'Strategize with the brightest minds in global commerce. This forum focuses on sustainable growth, emerging markets, and digital transformation in the corporate world.',
    image: 'https://picsum.photos/seed/biz1/800/600',
    organizer: 'Summit Partners'
  },
  {
    id: '4',
    title: 'Abstract Minds Expo',
    category: 'Art',
    date: '2024-12-01',
    location: 'Chicago, IL',
    price: 45,
    seatsAvailable: 200,
    description: 'A curated collection of modern abstract art from emerging artists worldwide. Includes interactive installations and live digital painting demonstrations.',
    image: 'https://picsum.photos/seed/art1/800/600',
    organizer: 'Canvas Collective'
  },
  {
    id: '5',
    title: 'AI & Ethics Workshop',
    category: 'Tech',
    date: '2024-08-18',
    location: 'Seattle, WA',
    price: 0,
    seatsAvailable: 0,
    description: 'Deep dive into the ethical implications of artificial intelligence. A hands-on workshop designed for developers, policymakers, and ethicists.',
    image: 'https://picsum.photos/seed/tech2/800/600',
    organizer: 'Ethical Tech Lab'
  },
  {
    id: '6',
    title: 'Jazz Under the Stars',
    category: 'Music',
    date: '2024-09-30',
    location: 'New Orleans, LA',
    price: 65,
    seatsAvailable: 50,
    description: 'An intimate evening of classic jazz in the heart of the French Quarter. Featuring local legends and refreshing craft cocktails.',
    image: 'https://picsum.photos/seed/music2/800/600',
    organizer: 'Harbor Sounds'
  },
  {
    id: '7',
    title: 'Startup Launchpad',
    category: 'Business',
    date: '2024-11-02',
    location: 'Boston, MA',
    price: 120,
    seatsAvailable: 80,
    description: 'The ultimate pitch event for early-stage startups. Connect with VCs, angel investors, and potential partners in a high-stakes environment.',
    image: 'https://picsum.photos/seed/biz2/800/600',
    organizer: 'Venture Hub'
  }
];

type EventsContextType = {
  events: Event[];
  isLoading: boolean;
  bookEvent: (id: string, quantity: number) => Promise<boolean>;
};

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export function EventsProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const bookEvent = async (id: string, quantity: number): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const event = events.find(e => e.id === id);
    if (!event || event.seatsAvailable < quantity) return false;

    setEvents(prev => prev.map(e => 
      e.id === id ? { ...e, seatsAvailable: e.seatsAvailable - quantity } : e
    ));
    return true;
  };

  return (
    <EventsContext.Provider value={{ events, isLoading, bookEvent }}>
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventsContext);
  if (!context) throw new Error('useEvents must be used within an EventsProvider');
  return context;
}
