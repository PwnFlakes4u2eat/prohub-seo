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
import StatsAtGlance from '@/components/StatsAtGlance';
import BlogSection from '@/components/BlogSection';

interface PageProps {
  params: Promise<{
    service: string;
    town: string;
  }>;
}

// Generate static paths for all service/town combinations
export async function generateStaticParams() {
  const paths = getAllPagePaths();
  return paths.map(({ service, town }) => ({
    service,
    town,
  }));
}

// Generate metadata for SEO
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
  
  // Get dynamic data
  const [providers, reviews, blogPosts, stats] = await Promise.all([
    getProviders(serviceSlug, townSlug),
    getReviews(serviceSlug, townSlug),
    getBlogPosts(serviceSlug, townSlug),
    getStats(serviceSlug, townSlug),
  ]);
  
  // Get content (custom or default)
  const content = getPageContent(serviceSlug, townSlug) || generateDefaultContent(service, town);
  
  // Get related links
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
              "containedInPlace": {
                "@type": "State",
                "name": town.province
              }
            },
            "provider": {
              "@type": "Organization",
              "name": "ProHub",
              "url": "https://prohub.co.za"
            }
          })
        }}
      />
      
      {/* Breadcrumb Schema */}
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
            <a href="/" className="hover:text-primary transition-colors">Home</a>
            <svg className="w-4 h-4 mx-2 text-border" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
            <a href={`/${serviceSlug}`} className="hover:text-primary transition-colors">{service.namePlural}</a>
            <svg className="w-4 h-4 mx-2 text-border" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
            <span className="text-foreground font-medium">{town.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Background image */}
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

      {/* Stats At Glance */}
      <StatsAtGlance 
        serviceName={service.name} 
        townName={town.name} 
        stats={stats} 
      />

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
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
                  How ProHub Works
                </a>
                <a href="#providers" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors py-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
                  Top {service.namePlural} in {town.name}
                </a>
                <a href="#pricing" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors py-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
                  Pricing Guide
                </a>
                <a href="#reviews" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors py-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
                  Customer Reviews
                </a>
                <a href="#guide" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors py-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
                  Complete Guide
                </a>
                <a href="#faq" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors py-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
                  FAQ
                </a>
                <a href="#other-services" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors py-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
                  Other Services
                </a>
                <a href="#get-quotes" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors py-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
                  Get Free Quotes
                </a>
              </nav>
            </div>
          </div>
        </div>
      </section>

      {/* Providers Section */}
      <section id="providers" className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Local Experts</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-display font-bold text-foreground">
              {service.namePlural} in {town.name}
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Verified and reviewed {service.namePlural.toLowerCase()} ready to help with your project
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

          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground leading-relaxed">{content.guideIntro}</p>
            
            <h3 className="text-xl font-display font-bold text-foreground mt-10 mb-4">
              Types of {service.name} Services Available in {town.name}
            </h3>
            <p className="text-muted-foreground leading-relaxed">{content.guideServiceTypes}</p>
            
            <h3 className="text-xl font-display font-bold text-foreground mt-10 mb-4">
              When to Call a {service.name} vs DIY
            </h3>
            <p className="text-muted-foreground leading-relaxed">{content.guideDiyVsPro}</p>
            
            {/* DIY vs Pro Table */}
            <div className="my-8 bg-white rounded-xl border border-border overflow-hidden shadow-card">
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
            
            <h3 className="text-xl font-display font-bold text-foreground mt-10 mb-4">
              What to Expect During a {service.name} Job
            </h3>
            <p className="text-muted-foreground leading-relaxed">{content.guideWhatToExpect}</p>
            
            <h3 className="text-xl font-display font-bold text-foreground mt-10 mb-4">
              How to Choose the Right {service.name} in {town.name}
            </h3>
            <p className="text-muted-foreground leading-relaxed">{content.guideChoosingProvider}</p>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <ReviewSection 
        reviews={reviews} 
        serviceName={service.name} 
        townName={town.name} 
      />

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
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
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

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="py-16 bg-background border-t border-border">
          <div className="container mx-auto px-4">
            <h2 className="text-xl font-display font-bold text-foreground mb-6">
              Related Services in {town.name}
            </h2>
            <div className="flex flex-wrap gap-3">
              {relatedServices.map(related => (
                <a
                  key={related.slug}
                  href={`/${related.slug}/${townSlug}`}
                  className="px-4 py-2 bg-muted rounded-lg text-sm text-foreground hover:bg-primary hover:text-white transition-colors"
                >
                  {related.namePlural}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Nearby Towns */}
      {nearbyTowns.length > 0 && (
        <section className="py-16 bg-muted/50 border-t border-border">
          <div className="container mx-auto px-4">
            <h2 className="text-xl font-display font-bold text-foreground mb-6">
              {service.namePlural} in Nearby Towns
            </h2>
            <div className="flex flex-wrap gap-3">
              {nearbyTowns.map(nearby => (
                <a
                  key={nearby.slug}
                  href={`/${serviceSlug}/${nearby.slug}`}
                  className="px-4 py-2 bg-white border border-border rounded-lg text-sm text-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  {service.namePlural} in {nearby.name}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-20 md:py-28 bg-foreground text-white">
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

// Enable ISR - rebuild pages every 24 hours
export const revalidate = 86400;
