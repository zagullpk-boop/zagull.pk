import { ShieldCheck, Truck, RotateCcw, Award } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Authentic Designs",
    description: "Exclusively crafted in Faisalabad",
  },
  {
    icon: ShieldCheck,
    title: "Quality Guaranteed",
    description: "Premium materials for longevity",
  },
  {
    icon: Truck,
    title: "Free Delivery",
    description: "On all orders over 3000 PKR",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "7-day hassle-free return policy",
  },
];

export function TrustBar() {
  return (
    <section className="bg-background-secondary py-16 border-b border-border-light px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
        {features.map((feature, index) => (
          <div 
            key={index}
            className="flex flex-col items-center text-center space-y-4 group transition-all"
          >
            <div className="w-14 h-14 rounded-full bg-background-primary flex items-center justify-center text-accent-forest group-hover:bg-accent-forest group-hover:text-white transition-all duration-300">
              <feature.icon className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-lg text-text-primary">
                {feature.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
