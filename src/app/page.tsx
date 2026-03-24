import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustBar } from "@/components/sections/TrustBar";
import { FeaturedCategories } from "@/components/sections/FeaturedCategories";
import { NewArrivals } from "@/components/sections/NewArrivals";
import { Testimonials } from "@/components/sections/Testimonials";
import { InstagramFeed } from "@/components/sections/InstagramFeed";
import { Newsletter } from "@/components/sections/Newsletter";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <TrustBar />
        <FeaturedCategories />
        <NewArrivals />
        <Testimonials />
        <InstagramFeed />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
