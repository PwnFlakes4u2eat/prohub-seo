import fs from 'fs';
import path from 'path';
import servicesData from '../../data/services.json';
import townsData from '../../data/towns.json';

export interface Service {
  slug: string;
  name: string;
  namePlural: string;
  category: string;
  icon: string;
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  pricing: { service: string; range: string }[];
  diyVsPro: { task: string; description: string; diy: string; pro: string }[];
  images: {
    hero: string;
    gallery: { src: string; alt: string; caption: string }[];
  };
  relatedServices: string[];
}

export interface Town {
  slug: string;
  name: string;
  region: string;
  regionSlug: string;
  province: string;
  nearbyTowns: string[];
  localAreas: string[];
  description: string;
}

export interface PageContent {
  // Meta
  title: string;
  description: string;
  
  // Hero
  heroTitle: string;
  heroSubtitle: string;
  
  // Guide sections (unique per page)
  guideIntro: string;
  guideServiceTypes: string;
  guideDiyVsPro: string;
  guideWhatToExpect: string;
  guideChoosingProvider: string;
  
  // FAQ (unique answers per page)
  faqs: { question: string; answer: string }[];
  
  // Gallery images (optional, town-specific)
  gallery?: { url: string; alt: string; caption: string; description?: string }[];
  
  // Status
  status: 'pending' | 'live';
  lastUpdated: string;
}

// Get all services
export function getServices(): Service[] {
  return servicesData.services as Service[];
}

// Get a specific service
export function getService(slug: string): Service | undefined {
  return servicesData.services.find((s) => s.slug === slug) as Service | undefined;
}

// Get all towns
export function getTowns(): Town[] {
  return townsData.towns as Town[];
}

// Get a specific town
export function getTown(slug: string): Town | undefined {
  return townsData.towns.find((t) => t.slug === slug) as Town | undefined;
}

// Get towns by region
export function getTownsByRegion(regionSlug: string): Town[] {
  return townsData.towns.filter((t) => t.regionSlug === regionSlug) as Town[];
}

// Get nearby towns for a town
export function getNearbyTowns(townSlug: string): Town[] {
  const town = getTown(townSlug);
  if (!town) return [];
  
  return town.nearbyTowns
    .map((slug) => getTown(slug))
    .filter((t): t is Town => t !== undefined);
}

// Get related services for a service
export function getRelatedServices(serviceSlug: string): Service[] {
  const service = getService(serviceSlug);
  if (!service) return [];
  
  return service.relatedServices
    .map((slug) => getService(slug))
    .filter((s): s is Service => s !== undefined);
}

// Check if content exists for a page
export function contentExists(serviceSlug: string, townSlug: string): boolean {
  const livePath = path.join(process.cwd(), 'data', 'content', 'live', serviceSlug, `${townSlug}.json`);
  return fs.existsSync(livePath);
}

// Get page content (live or pending)
export function getPageContent(serviceSlug: string, townSlug: string): PageContent | null {
  // Try live content first
  const livePath = path.join(process.cwd(), 'data', 'content', 'live', serviceSlug, `${townSlug}.json`);
  if (fs.existsSync(livePath)) {
    const content = JSON.parse(fs.readFileSync(livePath, 'utf-8'));
    return { ...content, status: 'live' };
  }
  
  // Fall back to pending
  const pendingPath = path.join(process.cwd(), 'data', 'content', 'pending', serviceSlug, `${townSlug}.json`);
  if (fs.existsSync(pendingPath)) {
    const content = JSON.parse(fs.readFileSync(pendingPath, 'utf-8'));
    return { ...content, status: 'pending' };
  }
  
  return null;
}

// Generate default content from templates
export function generateDefaultContent(service: Service, town: Town): PageContent {
  const replace = (template: string) => 
    template
      .replace(/{name}/g, service.name)
      .replace(/{namePlural}/g, service.namePlural)
      .replace(/{town}/g, town.name)
      .replace(/{region}/g, town.region)
      .replace(/{province}/g, town.province);

  return {
    title: replace(service.metaTitle),
    description: replace(service.metaDescription),
    heroTitle: replace(service.heroTitle),
    heroSubtitle: replace(service.heroSubtitle),
    
    // Generic placeholders - will be replaced with unique AI content
    guideIntro: `Looking for professional ${service.namePlural.toLowerCase()} in ${town.name}? You're in the right place. ProHub connects you with verified local ${service.namePlural.toLowerCase()} who have been vetted for quality and reliability.`,
    guideServiceTypes: `${town.name} and the ${town.region} area is home to a diverse range of ${service.name.toLowerCase()} professionals offering services from quick repairs to major installations.`,
    guideDiyVsPro: `Not every ${service.name.toLowerCase()} job requires a professional. But knowing when to call an expert can save you time, money, and headaches.`,
    guideWhatToExpect: `When you hire through ProHub, you'll receive quotes from up to 5 verified ${service.namePlural.toLowerCase()} in ${town.name}.`,
    guideChoosingProvider: `Choosing the right ${service.name.toLowerCase()} in ${town.name} doesn't have to be difficult when you know what to look for.`,
    
    faqs: [
      {
        question: `How much does a ${service.name.toLowerCase()} cost in ${town.name}?`,
        answer: `${service.name} costs in ${town.name} vary depending on the job type and complexity. Submit a free request on ProHub to get up to 5 quotes from local ${service.namePlural.toLowerCase()}.`
      },
      {
        question: `How do I find a reliable ${service.name.toLowerCase()} in ${town.name}?`,
        answer: `ProHub matches you with up to 5 verified ${service.namePlural.toLowerCase()} in ${town.name}. All providers undergo ID verification and business checks, with real customer reviews tracked publicly.`
      },
      {
        question: `Are ProHub providers verified?`,
        answer: `Yes. Every provider on ProHub undergoes ID verification, business registration checks, and ongoing monitoring of customer reviews and job completion rates.`
      },
      {
        question: `Is ProHub free to use?`,
        answer: `ProHub is 100% free for customers. You'll never be charged for submitting a request or receiving quotes.`
      },
      {
        question: `How quickly will I get quotes?`,
        answer: `Most customers receive their first quote within 30 minutes. You'll typically have multiple quotes within 2–4 hours.`
      }
    ],
    
    status: 'pending',
    lastUpdated: new Date().toISOString()
  };
}

// Get all valid page paths for static generation
export function getAllPagePaths(): { service: string; town: string }[] {
  const services = getServices();
  const towns = getTowns();
  const paths: { service: string; town: string }[] = [];
  
  for (const service of services) {
    for (const town of towns) {
      paths.push({ service: service.slug, town: town.slug });
    }
  }
  
  return paths;
}
