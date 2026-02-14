import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { 
  getService, 
  getTown, 
  getPageContent, 
  generateDefaultContent,
  getAllPagePaths,
  getNearbyTowns,
  getRelatedServices
} from '@/lib/content';
import { getProviders, getReviews, getBlogPosts, getStats } from '@/lib/supabase';
import ProviderCard, { NoProvidersCard } from '@/components/ProviderCard';
import ReviewSection from '@/components/ReviewSection';
import BlogSection from '@/components/BlogSection';

interface PageProps {
  params: Promise<{
    service: string;
    town: string;
  }>;
}

export async function generateStaticParams() {
  const paths = getAllPagePaths();
  return paths.map(({ service, town }) => ({
    service,
    town,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service: serviceSlug, town: townSlug } = await params;
  
  const service = getService(serviceSlug);
  const town = getTown(townSlug);
  
  if (!service || !town) {
    return { title: 'Not Found' };
  }
  
  const content = getPageContent(serviceSlug, townSlug) || generateDefaultContent(service, town);
  
  return {
    title: content.title,
    description: content.description,
    openGraph: {
      title: content.title,
      description: content.description,
      url: `https://prohub.co.za/${serviceSlug}/${townSlug}`,
      siteName: 'ProHub',
      locale: 'en_ZA',
      type: 'website',
    },
    alternates: {
      canonical: `https://prohub.co.za/${serviceSlug}/${townSlug}`,
    },
  };
}

export default async function ServiceTownPage({ params }: PageProps) {
  const { service: serviceSlug, town: townSlug } = await params;
  
  const service = getService(serviceSlug);
  const town = getTown(townSlug);
  
  if (!service || !town) {
    notFound();
  }
  
  const [providers, reviews, blogPosts, stats] = await Promise.all([
    getProviders(serviceSlug, townSlug),
    getReviews(serviceSlug, townSlug),
    getBlogPosts(serviceSlug, townSlug),
    getStats(serviceSlug, townSlug),
  ]);
  
  const content = getPageContent(serviceSlug, townSlug) || generateDefaultContent(service, town);
  const nearbyTowns = getNearbyTowns(townSlug);
  const relatedServices = getRelatedServices(serviceSlug);
  
  const appUrl = 'https://app.prohub.co.za';
  const requestUrl = `${appUrl}/request?service=${serviceSlug}&location=${townSlug}`;
  
  // Hero images per service
  const heroImages: Record<string, string> = {
    'plumber': 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1600&h=900&fit=crop&q=80',
    'electrician': 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1600&h=900&fit=crop&q=80',
    'pest-control': 'https://images.unsplash.com/photo-1632935190508-1e96ba5e8f78?w=1600&h=900&fit=crop&q=80',
    'cleaning-service': 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1600&h=900&fit=crop&q=80',
    'garden-service': 'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=1600&h=900&fit=crop&q=80',
    'handyman': 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=1600&h=900&fit=crop&q=80',
    'painter': 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=1600&h=900&fit=crop&q=80',
    'roofing': 'https://images.unsplash.com/photo-1632759145355-5fbd69dc5750?w=1600&h=900&fit=crop&q=80',
    'solar-installer': 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600&h=900&fit=crop&q=80',
    'security': 'https://images.unsplash.com/photo-1558002038-1055907df827?w=1600&h=900&fit=crop&q=80',
    'aircon': 'https://images.unsplash.com/photo-1631545806609-76ce8c775e40?w=1600&h=900&fit=crop&q=80',
    'geyser-service': 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1600&h=900&fit=crop&q=80',
    'pool-service': 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1600&h=900&fit=crop&q=80',
    'locksmith': 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1600&h=900&fit=crop&q=80',
    'building-renovation': 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&h=900&fit=crop&q=80',
    'tiling': 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1600&h=900&fit=crop&q=80',
    'waterproofing': 'https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=1600&h=900&fit=crop&q=80',
    'damp-proofing': 'https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=1600&h=900&fit=crop&q=80',
    'paving': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1600&h=900&fit=crop&q=80',
    'gate-motor-repair': 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1600&h=900&fit=crop&q=80',
    'garage-door': 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1600&h=900&fit=crop&q=80',
    'moving-service': 'https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=1600&h=900&fit=crop&q=80',
    'appliance-repair': 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1600&h=900&fit=crop&q=80',
    'furniture-repair': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&h=900&fit=crop&q=80',
    'ceilings-partitions': 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&h=900&fit=crop&q=80',
    'electric-fencing': 'https://images.unsplash.com/photo-1558002038-1055907df827?w=1600&h=900&fit=crop&q=80',
  };
  const heroImage = heroImages[serviceSlug] || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1600&h=900&fit=crop&q=80';

  // Gallery images per service type (working Unsplash URLs)
  const serviceGalleryImages: Record<string, Array<{src: string, alt: string, caption: string, description: string}>> = {
    'plumber': [
      { src: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&h=400&fit=crop&q=80', alt: `Plumber repairing pipes in ${town.name}`, caption: 'Emergency Pipe Repairs', description: `Burst pipes and leaks don't wait. Our ${town.name} plumbers respond within 30–60 minutes for emergencies.` },
      { src: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=400&fit=crop&q=80', alt: `Geyser installation in ${town.name}`, caption: 'Solar & Electric Geysers', description: `With ${town.name}'s excellent sunshine, solar geysers can cut your electricity bill by up to 40%.` },
      { src: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=400&fit=crop&q=80', alt: `Verified plumber in ${town.name}`, caption: 'Verified & Trusted', description: 'Every plumber on ProHub is ID-verified with real customer reviews you can trust.' },
    ],
    'electrician': [
      { src: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&h=400&fit=crop&q=80', alt: `Electrician working in ${town.name}`, caption: 'Professional Electrical Work', description: 'From fault-finding to full rewiring, our verified electricians handle it all.' },
      { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop&q=80', alt: `DB board installation in ${town.name}`, caption: 'DB Board & Compliance', description: 'Safe, compliant installations with Certificates of Compliance included.' },
      { src: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop&q=80', alt: `Solar installation in ${town.name}`, caption: 'Solar Installations', description: 'Beat load shedding with professional solar panel and inverter installations.' },
    ],
  };
  
  const defaultGallery = [
    { src: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop&q=80', alt: `Professional ${service.name.toLowerCase()} work in ${town.name}`, caption: 'Quality Workmanship', description: `Professional ${service.name.toLowerCase()} services from verified providers in ${town.name}.` },
    { src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop&q=80', alt: `${service.name} service in ${town.name}`, caption: 'Professional Service', description: `Trusted ${service.name.toLowerCase()} experts serving the ${town.region} area.` },
    { src: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop&q=80', alt: `Verified ${service.name.toLowerCase()} in ${town.name}`, caption: 'Verified Professionals', description: 'Every provider is ID-verified with tracked reviews and job completion rates.' },
  ];
  
  const galleryImages = serviceGalleryImages[serviceSlug] || defaultGallery;

  return (
    <>
      {/* Schema.org markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": service.name,
            "areaServed": {
              "@type": "City",
              "name": town.name,
              "containedInPlace": { "@type": "State", "name": town.province }
            },
            "provider": { "@type": "Organization", "name": "ProHub", "url": "https://prohub.co.za" }
          })
        }}
      />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://prohub.co.za" },
              { "@type": "ListItem", "position": 2, "name": service.namePlural, "item": `https://prohub.co.za/${serviceSlug}` },
              { "@type": "ListItem", "position": 3, "name": town.name, "item": `https://prohub.co.za/${serviceSlug}/${townSlug}` }
            ]
          })
        }}
      />

      {/* Breadcrumbs */}
      <div className="pt-20 bg-muted/50">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex text-sm text-muted-foreground" aria-label="Breadcrumb">
            <a href="https://app.prohub.co.za" className="hover:text-primary transition-colors">Home</a>
            <svg className="w-4 h-4 mx-2 text-border" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
            <a href={`/${serviceSlug}`} className="hover:text-primary transition-colors">{service.namePlural}</a>
            <svg className="w-4 h-4 mx-2 text-border" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
            <span className="text-foreground font-medium">{town.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt={`Professional ${service.name.toLowerCase()} at work`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'hsla(200, 25%, 12%, 0.65)' }} />
        </div>

        <div className="container mx-auto px-4 relative z-10 pt-20 pb-16">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm border" style={{ background: 'hsla(38, 95%, 50%, 0.2)', color: 'hsl(38, 95%, 50%)', borderColor: 'hsla(38, 95%, 50%, 0.3)' }}>
              🇿🇦 Verified {service.namePlural.toLowerCase()} available in {town.name}
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight mb-6">
              Find the Best<br />
              <span className="text-primary">{service.namePlural} in {town.name}</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-white/80 leading-relaxed max-w-2xl">
              {content.heroSubtitle}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a 
                href={requestUrl}
                className="inline-flex items-center justify-center h-14 rounded-xl px-10 text-base font-semibold font-display bg-primary text-white hover:bg-primary/90 shadow-elevated transition-all duration-200 text-center"
              >
                Get Free Quotes
              </a>
              <a 
                href="#providers"
                className="inline-flex items-center justify-center h-14 rounded-xl px-10 text-base font-semibold font-display border-2 border-white bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 transition-all duration-200 text-center"
              >
                View Top {service.namePlural}
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-8">
              <div className="flex items-center gap-2 text-white/70">
                <svg className="w-[18px] h-[18px] text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path strokeLinecap="round" d="m21 21-4.35-4.35"/></svg>
                <span className="text-sm font-medium">3–5 Quotes per request</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <svg className="w-[18px] h-[18px] text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                <span className="text-sm font-medium">Verified providers</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <svg className="w-[18px] h-[18px] text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                <span className="text-sm font-medium">Instant WhatsApp alerts</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-10 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-card rounded-xl border border-border p-6 shadow-card">
              <h2 className="font-display font-bold text-foreground text-lg mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>
                On This Page
              </h2>
              <nav className="grid sm:grid-cols-2 gap-2">
                <a href="#how-it-works" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors py-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>How ProHub Works
                </a>
                <a href="#providers" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors py-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>Top {service.namePlural} in {town.name}
                </a>
                <a href="#services" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors py-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>{service.name} Services
                </a>
                <a href="#reviews" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors py-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>Customer Reviews
                </a>
                <a href="#compare" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors py-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>DIY vs Professional
                </a>
                <a href="#guide" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors py-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>Complete Guide
                </a>
                <a href="#pricing" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors py-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>Pricing Guide
                </a>
                <a href="#faq" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors py-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>FAQ
                </a>
              </nav>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 md:py-28 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Simple Process</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-display font-bold text-foreground">How ProHub Works</h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">Three simple steps to finding the right {service.name.toLowerCase()} in {town.name}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>
              </div>
              <div className="text-sm font-semibold text-primary mb-2">Step 1</div>
              <h3 className="text-xl font-display font-semibold text-foreground mb-3">Tell Us What You Need</h3>
              <p className="text-muted-foreground leading-relaxed">Describe your job, add photos, and set your budget. Takes under 2 minutes.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
              </div>
              <div className="text-sm font-semibold text-primary mb-2">Step 2</div>
              <h3 className="text-xl font-display font-semibold text-foreground mb-3">Get Matched Instantly</h3>
              <p className="text-muted-foreground leading-relaxed">We match you with up to 5 verified {service.namePlural.toLowerCase()} in {town.name}. They&apos;re notified via WhatsApp immediately.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
              </div>
              <div className="text-sm font-semibold text-primary mb-2">Step 3</div>
              <h3 className="text-xl font-display font-semibold text-foreground mb-3">Compare &amp; Hire</h3>
              <p className="text-muted-foreground leading-relaxed">Review quotes, check ratings, and choose the {service.name.toLowerCase()} that&apos;s right for you. Simple.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Providers Section */}
      <section id="providers" className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Top Rated</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-display font-bold text-foreground">
              {service.namePlural} in {town.name}
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Verified professionals ready to help with your project
            </p>
          </div>
          
          {providers.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
              {providers.map((provider, index) => (
                <ProviderCard 
                  key={provider.id} 
                  provider={provider}
                  featured={index === 0}
                />
              ))}
            </div>
          ) : (
            <div className="max-w-xl mx-auto">
              <NoProvidersCard serviceName={service.namePlural} townName={town.name} />
            </div>
          )}
          
          <div className="text-center mt-12">
            <a 
              href={requestUrl}
              className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-4 rounded-xl hover:bg-primary/90 transition-colors"
            >
              Get Quotes from All {service.namePlural}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Dynamic Stats */}
      <section className="py-12 bg-foreground text-white">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-2xl p-8 md:p-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 mb-8">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-primary/30"></div>
                <h2 className="text-xl md:text-2xl font-display font-bold text-white text-center px-4">{service.name} in {town.name} at a Glance</h2>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-primary/30"></div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 text-center hover:bg-white/10 transition">
                  <div className="text-3xl md:text-4xl font-bold text-primary">{stats.avgResponseTime || '< 30 mins'}</div>
                  <p className="text-sm text-white/40 mt-2">Avg. Response Time</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 text-center hover:bg-white/10 transition">
                  <div className="text-3xl md:text-4xl font-bold text-primary">{stats.avgRating ? `${stats.avgRating}/5` : '–'}</div>
                  <p className="text-sm text-white/40 mt-2">Avg. Provider Rating</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 text-center hover:bg-white/10 transition">
                  <div className="text-3xl md:text-4xl font-bold text-primary">{stats.jobsThisMonth || '–'}</div>
                  <p className="text-sm text-white/40 mt-2">Jobs This Month</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 text-center hover:bg-white/10 transition">
                  <div className="text-3xl md:text-4xl font-bold text-primary">{stats.providerCount || '–'}</div>
                  <p className="text-sm text-white/40 mt-2">Verified {service.namePlural}</p>
                </div>
              </div>
              <p className="text-xs text-white/30 text-center mt-6">Stats update automatically based on real platform activity</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <ReviewSection 
        reviews={reviews} 
        serviceName={service.name} 
        townName={town.name} 
      />

      {/* Service Image Gallery */}
      <section id="services" className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Quality Work</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-display font-bold text-foreground">{service.name} Services in {town.name}</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">See the quality of work from our verified local {service.namePlural.toLowerCase()} in the {town.region}</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {galleryImages.map((img, index) => (
              <div key={index} className="bg-card rounded-xl overflow-hidden shadow-card border border-border">
                <figure className="group relative overflow-hidden">
                  <img 
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </figure>
                <div className="p-5">
                  <h3 className="font-display font-bold text-foreground text-lg mb-2">{img.caption}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{img.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIY vs Professional */}
      <section id="compare" className="py-20 md:py-28 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">Make the Right Choice</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-display font-bold text-foreground">DIY vs Professional {service.name}</h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">Not sure whether to tackle it yourself or call a pro? This guide helps you decide.</p>
            </div>
            
            <div className="bg-card rounded-xl border border-border overflow-hidden shadow-card">
              <div className="grid grid-cols-3 bg-foreground text-white">
                <div className="px-4 py-4 font-semibold font-display text-sm">Task</div>
                <div className="px-4 py-4 font-semibold font-display text-sm text-center border-l border-white/20">DIY?</div>
                <div className="px-4 py-4 font-semibold font-display text-sm text-center border-l border-white/20">Call Pro?</div>
              </div>
              {service.diyVsPro.map((row, index) => (
                <div key={row.task} className={`grid grid-cols-3 border-b border-border last:border-0 ${index % 2 === 1 ? 'bg-muted/30' : ''}`}>
                  <div className="px-4 py-4">
                    <p className="font-medium text-foreground">{row.task}</p>
                    <p className="text-xs text-muted-foreground mt-1">{row.description}</p>
                  </div>
                  <div className={`px-4 py-4 flex items-center justify-center border-l border-border ${row.diy === 'yes' ? 'bg-success/10' : ''}`}>
                    {row.diy === 'yes' ? (
                      <span className="inline-flex items-center gap-1 text-success text-sm font-semibold">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                        Yes
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-red-500 text-sm font-semibold">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/></svg>
                        No
                      </span>
                    )}
                  </div>
                  <div className={`px-4 py-4 flex items-center justify-center border-l border-border ${row.pro === 'urgent' || row.pro === 'required' ? 'bg-primary/10' : ''}`}>
                    {row.pro === 'urgent' ? (
                      <span className="inline-flex items-center gap-1 text-primary text-sm font-semibold">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                        Urgent
                      </span>
                    ) : row.pro === 'required' ? (
                      <span className="inline-flex items-center gap-1 text-primary text-sm font-semibold">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                        Required
                      </span>
                    ) : (
                      <span className="text-muted-foreground text-sm">{row.pro === 'if-persistent' ? 'If persistent' : 'Optional'}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <p className="text-center text-sm text-muted-foreground mt-6">
              <strong className="text-foreground">Pro tip:</strong> When in doubt, get a professional quote — it&apos;s free on ProHub and takes under 2 minutes.
            </p>
          </div>
        </div>
      </section>

      {/* Guide Section */}
      <section id="guide" className="py-20 md:py-28 bg-background">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-12">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Local Expert Guide</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-display font-bold text-foreground">
              Your Complete Guide to {service.name} Services in {town.name}
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Everything you need to know before hiring a {service.name.toLowerCase()} in the {town.region}
            </p>
          </div>

          <div className="space-y-10">
            <div>
              <h3 className="text-xl font-display font-bold text-foreground mb-3">Types of {service.name} Services Available in {town.name}</h3>
              <p className="text-muted-foreground leading-relaxed">{content.guideServiceTypes}</p>
            </div>
            
            <div>
              <h3 className="text-xl font-display font-bold text-foreground mb-3">When to Call a {service.name} vs DIY</h3>
              <p className="text-muted-foreground leading-relaxed">{content.guideDiyVsPro}</p>
            </div>
            
            <div>
              <h3 className="text-xl font-display font-bold text-foreground mb-3">What to Expect During a {service.name} Job</h3>
              <p className="text-muted-foreground leading-relaxed">{content.guideWhatToExpect}</p>
            </div>
            
            <div>
              <h3 className="text-xl font-display font-bold text-foreground mb-3">How to Choose the Right {service.name} in {town.name}</h3>
              <p className="text-muted-foreground leading-relaxed">{content.guideChoosingProvider}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 md:py-28 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">Pricing Guide</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-display font-bold text-foreground">
                How Much Does a {service.name} Cost in {town.name}?
              </h2>
              <p className="mt-4 text-muted-foreground">
                Average pricing for common {service.name.toLowerCase()} jobs in the {town.name} area (2026)
              </p>
            </div>
            
            <div className="bg-white rounded-xl border border-border overflow-hidden shadow-card">
              <div className="grid grid-cols-2 bg-foreground text-white px-6 py-4">
                <span className="font-semibold text-sm font-display">Service</span>
                <span className="font-semibold text-sm text-right font-display">Price Range</span>
              </div>
              {service.pricing.map((item, index) => (
                <div 
                  key={item.service}
                  className={`grid grid-cols-2 px-6 py-4 border-b border-border last:border-0 ${
                    index % 2 === 1 ? 'bg-muted/30' : ''
                  }`}
                >
                  <span className="text-muted-foreground">{item.service}</span>
                  <span className="text-right font-semibold text-foreground">{item.range}</span>
                </div>
              ))}
            </div>
            
            <p className="mt-4 text-sm text-muted-foreground text-center">
              Prices are estimates based on local market data. Get exact quotes for your specific job.
            </p>
          </div>
        </div>
      </section>

      {/* Why ProHub */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-display font-bold text-foreground">Why ProHub?</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">Join thousands of South Africans who trust ProHub to connect them with verified local service providers</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card rounded-xl p-6 border border-border border-l-4 border-l-primary shadow-card hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
              </div>
              <h3 className="font-display font-bold text-foreground mb-2">Verified Providers</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Every provider is ID-verified with tracked reviews and job completion rates.</p>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border border-l-4 border-l-primary shadow-card hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              </div>
              <h3 className="font-display font-bold text-foreground mb-2">Instant WhatsApp Alerts</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Providers are notified immediately. Get your first quote in under 30 minutes.</p>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border border-l-4 border-l-primary shadow-card hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/></svg>
              </div>
              <h3 className="font-display font-bold text-foreground mb-2">Compare &amp; Save</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Receive up to 5 quotes side by side. Choose the best price and fit for your job.</p>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border border-l-4 border-l-primary shadow-card hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
              <h3 className="font-display font-bold text-foreground mb-2">100% Free for You</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Customers never pay. Submitting requests and receiving quotes is completely free.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      {town.localAreas && town.localAreas.length > 0 && (
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">Service Areas</span>
              <h2 className="mt-3 text-2xl sm:text-3xl font-display font-bold text-foreground">Areas We Cover in {town.name}</h2>
              <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">ProHub connects you with verified {service.namePlural.toLowerCase()} across all {town.name} suburbs</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {town.localAreas.map((area: string) => (
                <div key={area} className="flex items-center gap-2 bg-card rounded-lg px-4 py-3 border border-border shadow-sm">
                  <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  <span className="text-sm font-medium text-foreground truncate">{area}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section id="faq" className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">FAQ</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-display font-bold text-foreground">
                Common Questions About {service.namePlural} in {town.name}
              </h2>
            </div>
            
            <div className="space-y-4">
              {content.faqs.map((faq, index) => (
                <details 
                  key={index}
                  className="group bg-white rounded-xl border border-border shadow-card overflow-hidden"
                >
                  <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer list-none">
                    <h3 className="font-display font-semibold text-foreground">{faq.question}</h3>
                    <svg 
                      className="w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform group-open:rotate-180" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-4">
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": content.faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
            }))
          })
        }}
      />

      {/* Blog Section */}
      <BlogSection 
        posts={blogPosts} 
        serviceName={service.name} 
        townName={town.name} 
      />

      {/* Related Services - Tile Grid with Icons */}
      {relatedServices.length > 0 && (
        <section id="other-services" className="py-16 bg-background border-t border-border">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-display font-bold text-foreground">Other Home Services in {town.name}</h2>
              <p className="mt-2 text-muted-foreground">Find trusted local service providers for your home</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {relatedServices.map(related => (
                <a
                  key={related.slug}
                  href={`/${related.slug}/${townSlug}`}
                  className="group flex flex-col items-center gap-3 p-5 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-card transition-all duration-200"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <svg className="w-[22px] h-[22px] text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"/>
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-foreground text-center">{related.namePlural}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Nearby Towns - Tile Grid with Location Pins */}
      {nearbyTowns.length > 0 && (
        <section className="py-16 bg-muted/50 border-t border-border">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">{town.region}</span>
              <h2 className="mt-3 text-2xl sm:text-3xl font-display font-bold text-foreground">Find {service.namePlural} in Nearby Towns</h2>
              <p className="mt-2 text-muted-foreground">ProHub connects you with verified {service.namePlural.toLowerCase()} across the region</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {nearbyTowns.map(nearby => (
                <a
                  key={nearby.slug}
                  href={`/${serviceSlug}/${nearby.slug}`}
                  className="group flex items-center gap-2 bg-card rounded-lg px-4 py-3 border border-border hover:border-primary/30 hover:shadow-card transition-all duration-200"
                >
                  <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition truncate">{nearby.name}</span>
                </a>
              ))}
            </div>
            <div className="text-center mt-8">
              <a href={`/${serviceSlug}`} className="text-primary hover:text-primary/80 font-semibold transition-colors">View all {service.namePlural.toLowerCase()} locations →</a>
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section id="get-quotes" className="py-20 md:py-28 bg-foreground text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-display font-bold">
            Ready to Find a {service.name} in {town.name}?
          </h2>
          <p className="mt-4 text-white/80 max-w-2xl mx-auto text-lg">
            Get up to 5 free quotes from verified local {service.namePlural.toLowerCase()}. 
            Compare prices, read reviews, and hire with confidence.
          </p>
          <a 
            href={requestUrl}
            className="mt-8 inline-flex items-center gap-2 bg-primary text-white font-semibold px-10 py-5 rounded-xl hover:bg-primary/90 transition-colors text-lg"
          >
            Get Free Quotes Now
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <p className="mt-4 text-white/60 text-sm">
            ✓ Free to use &nbsp;•&nbsp; ✓ No obligations &nbsp;•&nbsp; ✓ Takes 2 minutes
          </p>
        </div>
      </section>
    </>
  );
}

export const revalidate = 86400;
