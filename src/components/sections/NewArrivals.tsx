import { ProductCard } from "@/components/ui/ProductCard";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const newProducts = [
  {
    id: "1",
    name: "Emerald Nature Pendant",
    price: 4500,
    image: "/images/pendant.png",
    category: "Jewellery",
    isNew: true,
  },
  {
    id: "2",
    name: "Golden Leaf Earrings",
    price: 3200,
    image: "/images/earrings.png",
    category: "Jewellery",
    isNew: true,
  },
  {
    id: "3",
    name: "Crystal Dew Bracelet",
    price: 2800,
    image: "/images/jewellery_cat.png", // Reusing for variety
    category: "Jewellery",
    isNew: true,
  },
  {
    id: "4",
    name: "Forest Silk Scarf",
    price: 1500,
    image: "/images/clothing_cat.png", // Reusing for variety
    category: "Clothing",
    isNew: true,
  },
];

export function NewArrivals() {
  return (
    <section className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-sm tracking-[0.2em] text-accent-forest font-medium uppercase">
            Fresh From the Studio
          </h2>
          <h3 className="text-4xl md:text-5xl font-serif text-text-primary">
            New Arrivals
          </h3>
          <p className="text-text-secondary max-w-xl mx-auto font-sans">
            Explore our latest nature-inspired creations, designed to add a touch of timeless elegance to your everyday look.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {newProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link href="/shop?filter=new">
            <Button variant="outline" size="lg" className="px-12">
              View All New Arrivals
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
