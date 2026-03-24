import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

const DOMAIN = 'https://zagull-pk.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes
  const staticRoutes = [
    '',
    '/shop',
    '/about',
    '/contact',
    '/faqs',
    '/shipping',
    '/order-tracking',
  ].map((route) => ({
    url: `${DOMAIN}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic products
  try {
    const { data: products } = await supabase
      .from('products')
      .select('id, updated_at');
    
    const productRoutes = (products || []).map((product) => ({
      url: `${DOMAIN}/products/${product.id}`,
      lastModified: new Date(product.updated_at || new Date()),
      changeFrequency: 'daily' as const,
      priority: 0.6,
    }));

    return [...staticRoutes, ...productRoutes];
  } catch (error) {
    console.error('Sitemap generation error:', error);
    return staticRoutes;
  }
}
