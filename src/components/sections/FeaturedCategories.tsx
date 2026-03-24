import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

const categories = [
  {
    title: "Jewellery",
    description: "Elegant pendants, rings, and more.",
    image: "/images/jewellery_cat.png",
    href: "/shop?category=Jewellery",
  },
  {
    title: "Clothing",
    description: "Contemporary fashion for daily grace.",
    image: "/images/clothing_cat.png",
    href: "/shop?category=Clothing",
  },
  {
    title: "Gift Baskets",
    description: "Thoughtfully curated hampers for every occasion.",
    image: "/images/gift_baskets_cat.png",
    href: "/shop?category=Gift+Baskets",
  },
];

export function FeaturedCategories() {
  return (
    <section className="py-24 px-6 md:px-12 bg-background-primary">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="space-y-4">
            <h2 className="text-sm tracking-[0.2em] text-accent-forest font-medium uppercase">
              Curated Collections
            </h2>
            <h3 className="text-4xl md:text-5xl font-serif text-text-primary">
              Shop by Category
            </h3>
          </div>
          <Link 
            href="/shop" 
            className="group flex items-center space-x-2 text-text-primary hover:text-accent-forest transition-all"
          >
            <span className="text-sm font-medium">Explore All Collections</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link 
              key={category.title}
              href={category.href}
              className="group relative h-[500px] overflow-hidden rounded-2xl flex items-end p-8 md:p-12 shadow-sm"
            >
              {/* Image Background */}
              <div className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-105">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80" />
              </div>

              {/* Content */}
              <div className="relative z-10 space-y-3">
                <h4 className="text-3xl font-serif text-white">
                  {category.title}
                </h4>
                <p className="text-white/80 font-sans text-sm max-w-xs transition-opacity duration-300">
                  {category.description}
                </p>
                <div className="pt-4 overflow-hidden">
                  <span className="inline-flex items-center space-x-2 text-white text-sm font-medium border-b border-white/40 pb-1 group-hover:border-white transition-all">
                    <span>Discover More</span>
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
