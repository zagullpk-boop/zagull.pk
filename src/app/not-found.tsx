import Link from 'next/link';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-background-primary">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center text-center px-6 pt-32 pb-24">
        <div className="space-y-6 max-w-lg">
          <p className="text-8xl md:text-9xl font-serif text-accent-forest/10 select-none">404</p>
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-serif text-text-primary">Page Not Found</h1>
            <p className="text-text-secondary font-sans leading-relaxed">
              The treasures you're looking for aren't here. Let's get you back to something beautiful.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link 
              href="/" 
              className="bg-accent-forest text-white px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-accent-forest/90 transition-all shadow-lg shadow-accent-forest/10"
            >
              Go Home
            </Link>
            <Link 
              href="/shop" 
              className="bg-white text-text-primary border border-border-light px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-background-primary transition-all shadow-sm"
            >
              Browse Shop
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
