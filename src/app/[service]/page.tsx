import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getService, getServices, getTowns, getTownsByRegion } from '@/lib/content';

interface PageProps {
  params: Promise<{ service: string }>;
}

// Generate static paths for all services
export async function generateStaticParams() {
  const services = getServices();
  return services.map((service) => ({
    service: service.slug,
  }));
}

// Generate metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service: serviceSlug } = await params;
  const service = getService(serviceSlug);
  
  if (!service) {
    return { title: 'Not Found' };
  }
  
  return {
    title: `${service.namePlural} in Garden Route & Klein Karoo | ProHub`,
    description: `Find verified ${service.namePlural.toLowerCase()} across the Garden Route and Klein Karoo. Compare quotes from local ${service.namePlural.toLowerCase()} in George, Knysna, Mossel Bay, and more.`,
    openGraph: {
      title: `${service.namePlural} in Garden Route & Klein Karoo`,
      description: `Find verified ${service.namePlural.toLowerCase()} across the Garden Route and Klein Karoo.`,
      url: `https://prohub.co.za/${serviceSlug}`,
    },
    alternates: {
      canonical: `https://prohub.co.za/${serviceSlug}`,
    },
  };
}

export default async function ServiceIndexPage({ params }: PageProps) {
  const { service: serviceSlug } = await params;
  const service = getService(serviceSlug);
  
  if (!service) {
    notFound();
  }
  
  const gardenRouteTowns = getTownsByRegion('garden-route');
  const kleinKarooTowns = getTownsByRegion('klein-karoo');
  const allServices = getServices();
  
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-foreground via-foreground to-foreground/95 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <nav className="mb-6 text-sm">
            <ol className="flex items-center gap-2 text-white/60">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li>/</li>
              <li className="text-white">{service.namePlural}</li>
            </ol>
          </nav>
          
          <h1 className="text-4xl sm:text-5xl font-display font-bold">
            {service.namePlural} in Garden Route & Klein Karoo
          </h1>
          <p className="mt-4 text-xl text-white/80 max-w-2xl">
            Find verified {service.namePlural.toLowerCase()} across {gardenRouteTowns.length + kleinKarooTowns.length} towns. 
            Get up to 5 free quotes and compare prices.
          </p>
        </div>
      </section>

      {/* Garden Route Towns */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-display font-bold text-foreground mb-2">
            Garden Route
          </h2>
          <p className="text-muted-foreground mb-8">
            Find {service.namePlural.toLowerCase()} along the scenic Garden Route coast
          </p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {gardenRouteTowns.map((town) => (
              <a
                key={town.slug}
                href={`/${serviceSlug}/${town.slug}`}
                className="group bg-white rounded-xl border border-border p-5 hover:shadow-card hover:border-primary/25 transition-all"
              >
                <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                  {service.namePlural} in {town.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {town.description.slice(0, 80)}...
                </p>
                <span className="inline-flex items-center gap-1 text-sm text-primary mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  View {service.namePlural.toLowerCase()}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Klein Karoo Towns */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-display font-bold text-foreground mb-2">
            Klein Karoo
          </h2>
          <p className="text-muted-foreground mb-8">
            Find {service.namePlural.toLowerCase()} in the Klein Karoo interior
          </p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {kleinKarooTowns.map((town) => (
              <a
                key={town.slug}
                href={`/${serviceSlug}/${town.slug}`}
                className="group bg-white rounded-xl border border-border p-5 hover:shadow-card hover:border-primary/25 transition-all"
              >
                <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                  {service.namePlural} in {town.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {town.description.slice(0, 80)}...
                </p>
                <span className="inline-flex items-center gap-1 text-sm text-primary mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  View {service.namePlural.toLowerCase()}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Other Services */}
      <section className="py-16 bg-background border-t border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-display font-bold text-foreground mb-6">
            Other Services
          </h2>
          <div className="flex flex-wrap gap-3">
            {allServices
              .filter(s => s.slug !== serviceSlug)
              .map(s => (
                <a
                  key={s.slug}
                  href={`/${s.slug}`}
                  className="px-4 py-2 bg-muted rounded-lg text-sm text-foreground hover:bg-primary hover:text-white transition-colors"
                >
                  {s.namePlural}
                </a>
              ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-foreground text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-display font-bold">
            Need a {service.name} Now?
          </h2>
          <p className="mt-3 text-white/80 max-w-xl mx-auto">
            Submit one request and get quotes from verified {service.namePlural.toLowerCase()} in your area.
          </p>
          <a
            href={`https://app.prohub.co.za/request?service=${serviceSlug}`}
            className="mt-6 inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-4 rounded-xl hover:bg-primary/90 transition-colors"
          >
            Get Free Quotes
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>
    </>
  );
}

export const revalidate = 86400;
