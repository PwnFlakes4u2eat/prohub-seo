import { MetadataRoute } from 'next';
import { getServices, getTowns } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://prohub.co.za';
  const services = getServices();
  const towns = getTowns();
  
  const routes: MetadataRoute.Sitemap = [];
  
  // Service index pages
  for (const service of services) {
    routes.push({
      url: `${baseUrl}/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });
    
    // Service + town pages
    for (const town of towns) {
      routes.push({
        url: `${baseUrl}/${service.slug}/${town.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1.0,
      });
    }
  }
  
  // Town index pages
  for (const town of towns) {
    routes.push({
      url: `${baseUrl}/town/${town.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  }
  
  return routes;
}
