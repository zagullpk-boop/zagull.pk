'use client';

import { useEffect } from 'react';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application Error:', error);
  }, [error]);

  return (
    <div className="flex flex-col min-h-screen bg-background-primary">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center text-center px-6 pt-32 pb-24">
        <div className="space-y-8 max-w-lg">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto shadow-sm">
            <AlertTriangle className="w-10 h-10 text-red-500" />
          </div>
          
          <div className="space-y-3">
            <h1 className="text-3xl font-serif text-text-primary">Something went wrong</h1>
            <p className="text-text-secondary font-sans leading-relaxed">
              We encountered an unexpected error. Don't worry, your treasures are safe. Please try refreshing or going back home.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              onClick={() => reset()}
              className="px-8 h-12 flex items-center gap-2 shadow-lg shadow-accent-forest/10"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </Button>
            <Button 
              variant="outline"
              asChild
              className="px-8 h-12"
            >
              <a href="/">Go Home</a>
            </Button>
          </div>
          
          <p className="text-[10px] text-text-secondary uppercase tracking-widest opacity-50">
            Error ID: {error.digest || 'unknown'}
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
