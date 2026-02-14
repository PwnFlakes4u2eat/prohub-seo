import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTown, getTowns, getServices, getNearbyTowns } from '@/lib/content';

interface PageProps {
  params: Promise<{ town: string }>;
}

// Generate static paths for all towns
export async function generateStaticParams() {
  const towns = getTowns();
  return towns.map((town) => ({
    town: town.slug,
  }));
}

// Generate metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { town: townSlug } = await params;
  const town = getTown(townSlug);
  
  if (!town) {
    return { title: 'Not Found' };
  }
  
  return {
    title: `Local Services in ${town.name}, ${town.region} | ProHub`,
    description: `Find verified local service providers in ${town.name}. Plumbers, electricians, pest control, and more. Get free quotes from trusted professionals.`,
    openGraph: {
      title: `Local Services in ${town.name}`,
      description: `Find verified local service providers in ${town.name}, ${town.region}.`,
      url: `https://prohub.co.za/town/${townSlug}`,
    },
    alternates: {
      canonical: `https://prohub.co.za/town/${townSlug}`,
    },
  };
}

export default async function TownIndexPage({ params }: PageProps) {
  const { town: townSlug } = await params;
  const town = getTown(townSlug);
  
  if (!town) {
    notFound();
  }
  
  const services = getServices();
  const nearbyTowns = getNearbyTowns(townSlug);
  
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-foreground via-foreground to-foreground/95 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <nav className="mb-6 text-sm">
            <ol className="flex items-center gap-2 text-white/60">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li>/</li>
              <li className="text-white">{town.name}</li>
            </ol>
          </nav>
          
          <h1 className="text-4xl sm:text-5xl font-display font-bold">
            Local Services in {town.name}
          </h1>
          <p className="mt-4 text-xl text-white/80 max-w-2xl">
            {town.description}
          </p>
          <p className="mt-2 text-white/60">
            {town.region}, {town.province}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-display font-bold text-foreground mb-2">
            All Services in {town.name}
          </h2>
          <p className="text-muted-foreground mb-8">
            Find verified professionals for any home service need
          </p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => (
              <a
                key={service.slug}
                href={`/${service.slug}/${townSlug}`}
                className="group bg-white rounded-xl border border-border p-6 hover:shadow-card hover:border-primary/25 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-display font-semibold text-foreground text-lg group-hover:text-primary transition-colors">
                  {service.namePlural}
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Find verified {service.namePlural.toLowerCase()} in {town.name}
                </p>
                <span className="inline-flex items-center gap-1 text-sm text-primary mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
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

      {/* Local Areas */}
      {town.localAreas.length > 0 && (
        <section className="py-12 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-xl font-display font-bold text-foreground mb-4">
              Areas We Cover in {town.name}
            </h2>
            <div className="flex flex-wrap gap-2">
              {town.localAreas.map((area) => (
                <span
                  key={area}
                  className="px-3 py-1.5 bg-white border border-border rounded-full text-sm text-foreground"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Nearby Towns */}
      {nearbyTowns.length > 0 && (
        <section className="py-12 bg-background border-t border-border">
          <div className="container mx-auto px-4">
            <h2 className="text-xl font-display font-bold text-foreground mb-4">
              Nearby Towns
            </h2>
            <div className="flex flex-wrap gap-3">
              {nearbyTowns.map((nearby) => (
                <a
                  key={nearby.slug}
                  href={`/town/${nearby.slug}`}
                  className="px-4 py-2 bg-white border border-border rounded-lg text-sm text-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  {nearby.name}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-foreground text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-display font-bold">
            Need Help in {town.name}?
          </h2>
          <p className="mt-3 text-white/80 max-w-xl mx-auto">
            Tell us what you need and we'll match you with verified local professionals.
          </p>
          <a
            href={`https://app.prohub.co.za/request?location=${townSlug}`}
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
