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
    description: 'Discover nature-inspired artificial jewellery and contemporary clothing crafted in Faisalabad, Pakistan. Shop pendants, rings, gift baskets and more with nationwide COD.',
    keywords: ['artificial jewellery Pakistan', 'jewellery Faisalabad', 'girl clothing Pakistan', 'customized gift baskets Pakistan', 'zagull pk'],
    authors: [{ name: 'ZAGULL Team' }],
    creator: 'ZAGULL',
    publisher: 'ZAGULL',
    metadataBase: new URL('https://zagull-pk.vercel.app'),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'en_PK',
      url: 'https://zagull-pk.vercel.app',
      siteName: 'ZAGULL',
      title: 'ZAGULL | Boutique Fashion & Jewellery from Faisalabad',
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
      google: 'your-google-verification-code', // Placeholder
    },
    icons: {
      icon: '/favicon.png',
      apple: '/favicon.png',
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
