import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: {
    default: 'ZAGULL | Elegant Jewellery & Fashion',
    template: '%s | ZAGULL',
  },
  description: 'Discover nature-inspired artificial jewellery and contemporary clothing crafted in Faisalabad, Pakistan. Shop pendants, rings, bracelets and more.',
  keywords: ['artificial jewellery Pakistan', 'fashion Faisalabad', 'jewellery online Pakistan', 'girls clothing Pakistan', 'zagull'],
  authors: [{ name: 'ZAGULL Team' }],
  creator: 'ZAGULL',
  publisher: 'ZAGULL',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_PK',
    url: 'https://zagull.vercel.app',
    siteName: 'ZAGULL',
    title: 'ZAGULL | Elegant Jewellery & Fashion',
    description: 'Nature-inspired artificial jewellery and contemporary clothing from Faisalabad, Pakistan.',
    images: [{
      url: '/images/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'ZAGULL Jewellery & Fashion',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZAGULL | Elegant Jewellery & Fashion',
    description: 'Nature-inspired artificial jewellery and contemporary clothing from Faisalabad, Pakistan.',
    images: ['/images/og-image.jpg'],
  },
  verification: {
    google: 'your-google-verification-code', // Placeholder for user to fill
  },
};

import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${cormorant.variable} antialiased`}>
        <CartProvider>
          <WishlistProvider>
            {children}
            <WhatsAppButton />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
