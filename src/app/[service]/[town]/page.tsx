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

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-foreground via-foreground to-foreground/95 text-white py-20 md:py-28">
        <div className="absolute inset-0 bg-[url('/images/hero-pattern.svg')] opacity-5" />
        <div className="container mx-auto px-4 relative">
          {/* Breadcrumbs */}
          <nav className="mb-6 text-sm">
            <ol className="flex items-center gap-2 text-white/60">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li>/</li>
              <li><a href={`/${serviceSlug}`} className="hover:text-white">{service.namePlural}</a></li>
              <li>/</li>
              <li className="text-white">{town.name}</li>
            </ol>
          </nav>
          
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight">
              {content.heroTitle}
            </h1>
            <p className="mt-6 text-xl text-white/80 leading-relaxed">
              {content.heroSubtitle}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a 
                href={requestUrl}
                className="inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold px-8 py-4 rounded-xl hover:bg-primary/90 transition-colors text-lg"
              >
                Get Free Quotes
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a 
                href="#providers"
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/20 transition-colors text-lg"
              >
                View {service.namePlural}
              </a>
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

      {/* Table of Contents */}
      <section className="py-8 bg-muted/50 border-b border-border">
        <div className="container mx-auto px-4">
          <nav className="flex flex-wrap justify-center gap-4 text-sm">
            <a href="#providers" className="text-muted-foreground hover:text-primary transition-colors">Providers</a>
            <span className="text-border">•</span>
            <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">Pricing</a>
            <span className="text-border">•</span>
            <a href="#guide" className="text-muted-foreground hover:text-primary transition-colors">Guide</a>
            <span className="text-border">•</span>
            <a href="#reviews" className="text-muted-foreground hover:text-primary transition-colors">Reviews</a>
            <span className="text-border">•</span>
            <a href="#faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</a>
            <span className="text-border">•</span>
            <a href="#blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</a>
          </nav>
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
