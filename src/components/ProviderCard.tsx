'use client';

import { Provider } from '@/lib/supabase';

interface ProviderCardProps {
  provider: Provider;
}

// Generate gradient based on business name for fallback avatar/cover
function getGradient(name: string) {
  const gradients = [
    "from-blue-600 to-blue-700",
    "from-purple-600 to-indigo-700",
    "from-emerald-500 to-emerald-600",
    "from-orange-500 to-amber-600",
    "from-rose-500 to-pink-600",
    "from-cyan-500 to-teal-600",
  ];
  const index = name.charCodeAt(0) % gradients.length;
  return gradients[index];
}

// Render star rating
function StarRating({ rating }: { rating: number | null }) {
  const r = rating || 0;
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`w-3.5 h-3.5 ${i <= Math.round(r) ? "text-primary fill-primary" : "text-muted-foreground/30"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ProviderCard({ provider }: ProviderCardProps) {
  const isFeatured = provider.isFeatured;
  const gradient = getGradient(provider.business_name);
  const initials = provider.business_name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  
  return (
    <a
      href={`https://app.prohub.co.za/provider/${provider.id}`}
      className={`
        group block bg-card rounded-xl overflow-hidden relative
        transition-all duration-300 hover:-translate-y-1
        ${isFeatured 
          ? "border-2 border-primary shadow-elevated hover:shadow-[0_12px_40px_-8px_hsl(200_25%_12%_/_0.12)] lg:-mt-4 lg:mb-4" 
          : "border border-border shadow-card hover:shadow-elevated hover:border-primary/25"
        }
      `}
    >
      {/* Featured Banner */}
      {isFeatured && (
        <div className="absolute top-0 left-0 right-0 bg-primary text-white text-xs font-bold text-center py-2 z-10 uppercase tracking-wider">
          ⭐ Featured Provider
        </div>
      )}

      {/* Cover Image */}
      <div className={`relative overflow-hidden ${isFeatured ? "h-52 mt-8" : "h-40"}`}>
        {provider.cover_image_url ? (
          <img
            src={provider.cover_image_url}
            alt={`${provider.business_name} cover`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${gradient} opacity-20`} />
        )}
        
        {/* Verified Badge on Cover */}
        {provider.is_verified && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-xs font-semibold text-tertiary">Verified</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="px-5 pb-5">
        {/* Avatar overlapping cover */}
        <div className={`flex items-center gap-3 ${isFeatured ? "-mt-8" : "-mt-7"} mb-3 relative z-10`}>
          <div className={`${isFeatured ? "w-16 h-16" : "w-14 h-14"} rounded-xl bg-card shadow-card border-2 ${isFeatured ? "border-primary/30" : "border-card"} flex items-center justify-center overflow-hidden flex-shrink-0 relative z-20`}>
            {provider.avatar_url ? (
              <img
                src={provider.avatar_url}
                alt={provider.business_name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                <span className={`text-white font-bold ${isFeatured ? "text-xl" : "text-lg"}`}>
                  {initials}
                </span>
              </div>
            )}
          </div>
          <h3 className={`font-bold text-foreground group-hover:text-primary transition-colors ${isFeatured ? "text-lg pt-8" : "pt-7"} line-clamp-1`}>
            {provider.business_name}
          </h3>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-1.5">
          <StarRating rating={provider.avg_rating} />
          <span className="text-sm text-muted-foreground">
            {provider.avg_rating?.toFixed(1) || "0.0"} ({provider.total_reviews || 0} reviews)
          </span>
        </div>

        {/* Tags: Response time, Experience, Categories */}
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1 text-xs border border-border text-muted-foreground px-2.5 py-1 rounded-full font-medium">
            <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            ~30 min response
          </span>
          {provider.years_experience && (
            <span className="inline-flex items-center gap-1 text-xs border border-border text-muted-foreground px-2.5 py-1 rounded-full font-medium">
              <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              {provider.years_experience} yrs exp.
            </span>
          )}
          {provider.categories.slice(0, 2).map((cat) => (
            <span key={cat} className="text-xs border border-border text-muted-foreground px-2.5 py-1 rounded-full font-medium capitalize">
              {cat}
            </span>
          ))}
        </div>

        {/* Description */}
        {provider.bio && (
          <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
            {provider.bio}
          </p>
        )}

        {/* Region */}
        {provider.regions.length > 0 && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-3">
            <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate">
              {provider.regions.slice(0, 2).join(", ")}
              {provider.regions.length > 2 && ` +${provider.regions.length - 2} more`}
            </span>
          </div>
        )}

        {/* View Profile Button */}
        <div className={`mt-4 w-full inline-flex items-center justify-center text-sm font-semibold px-4 py-2.5 rounded-xl transition-all duration-200 ${
          isFeatured
            ? "bg-primary text-white hover:bg-primary/90 shadow-card"
            : "text-primary hover:text-white hover:bg-primary border border-primary/30 hover:border-primary"
        }`}>
          View Profile
        </div>
      </div>
    </a>
  );
}

// Placeholder card when no providers available
export function NoProvidersCard({ serviceName, townName }: { serviceName: string; townName: string }) {
  return (
    <div className="bg-white rounded-xl border border-border p-8 text-center shadow-card">
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </div>
      <h3 className="font-bold text-foreground text-lg mb-2">
        We&apos;re Growing in {townName}!
      </h3>
      <p className="text-muted-foreground mb-6">
        We&apos;re actively onboarding verified {serviceName.toLowerCase()} providers in this area. 
        Submit your request now and we&apos;ll match you as soon as providers are available.
      </p>
      <a 
        href={`https://app.prohub.co.za/request?location=${townName.toLowerCase()}`}
        className="inline-block bg-primary text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
      >
        Submit Request Anyway
      </a>
    </div>
  );
}
