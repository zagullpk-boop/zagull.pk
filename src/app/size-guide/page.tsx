"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const clothesSizes = [
  { label: "XS", chest: "32\"", waist: "24\"", length: "38\"" },
  { label: "S",  chest: "34\"", waist: "26\"", length: "40\"" },
  { label: "M",  chest: "36\"", waist: "28\"", length: "42\"" },
  { label: "L",  chest: "38\"", waist: "30\"", length: "44\"" },
  { label: "XL", chest: "40\"", waist: "32\"", length: "46\"" },
];

const jewelrySizes = [
  { type: "Rings", standard: "6, 7, 8 (US)", notes: "Adjustable options available" },
  { type: "Bracelets", standard: "7\" - 8\"", notes: "Most include 1\" extender" },
  { type: "Anklets", standard: "9\" - 10\"", notes: "Delicate and adjustable" },
];

export default function SizeGuidePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background-primary">
      <Navbar />
      <main className="flex-grow pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-serif text-text-primary">Size Guide</h1>
            <p className="text-text-secondary max-w-xl mx-auto font-sans">
              Finding your perfect fit is essential. Use our measurement charts below to guide your choice.
            </p>
          </div>

          <div className="space-y-16">
            <section className="space-y-6">
              <h2 className="text-3xl font-serif text-text-primary border-b border-border-light pb-2">Clothing Sizes</h2>
              <div className="overflow-x-auto bg-white rounded-3xl border border-border-light shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-accent-forest text-white">
                      <th className="py-4 px-6 font-serif">Size</th>
                      <th className="py-4 px-6 font-serif">Chest (inches)</th>
                      <th className="py-4 px-6 font-serif">Waist (inches)</th>
                      <th className="py-4 px-6 font-serif">Length (inches)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clothesSizes.map((s, i) => (
                      <tr key={i} className="border-t border-border-light hover:bg-background-primary/50 transition-colors tracking-wide">
                        <td className="py-4 px-6 font-bold text-accent-forest">{s.label}</td>
                        <td className="py-4 px-6 text-text-secondary">{s.chest}</td>
                        <td className="py-4 px-6 text-text-secondary">{s.waist}</td>
                        <td className="py-4 px-6 text-text-secondary">{s.length}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl font-serif text-text-primary border-b border-border-light pb-2">Jewelry Guidelines</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {jewelrySizes.map((item, i) => (
                  <div key={i} className="bg-white p-6 rounded-3xl border border-border-light shadow-sm text-center space-y-3">
                    <h3 className="text-xl font-serif text-text-primary">{item.type}</h3>
                    <p className="text-accent-forest font-bold text-lg">{item.standard}</p>
                    <p className="text-xs text-text-secondary italic">{item.notes}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
