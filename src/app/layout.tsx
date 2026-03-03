import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { EventsProvider } from "@/lib/events-context";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: 'EchoEvents | Smart Event Booking',
  description: 'Modern event discovery and booking platform.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen overflow-y-scroll">
        <AuthProvider>
          <EventsProvider>
            <div className="min-h-screen w-full">
              <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                {children}
              </div>
            </div>
            <Toaster />
          </EventsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
