'use client';

import { Provider } from '@/lib/supabase';

interface ProviderCardProps {
  provider: Provider;
  featured?: boolean;
}

export default function ProviderCard({ provider, featured }: ProviderCardProps) {
  const isFeatured = featured || (provider.featured_until && new Date(provider.featured_until) > new Date());
  
  return (
    <div 
      className={`
        bg-white rounded-xl border border-border overflow-hidden
        transition-all duration-200 hover:-translate-y-1
        ${isFeatured ? 'ring-2 ring-primary shadow-elevated -mt-4 mb-4' : 'shadow-card hover:shadow-elevated'}
      `}
    >
      {isFeatured && (
        <div className="bg-primary text-white text-xs font-semibold px-3 py-1 text-center">
          ⭐ Featured Provider
        </div>
      )}
      
      <div className="p-5">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="w-14 h-14 rounded-full bg-muted flex-shrink-0 overflow-hidden">
            {provider.avatar_url ? (
              <img 
                src={provider.avatar_url} 
                alt={provider.business_name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xl font-bold">
                {provider.business_name.charAt(0)}
              </div>
            )}
          </div>
          
          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-display font-bold text-foreground truncate">
                {provider.business_name}
              </h3>
              {provider.is_verified && (
                <svg className="w-5 h-5 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            
            <div className="flex items-center gap-3 mt-1 text-sm">
              {provider.rating && (
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-semibold text-foreground">{provider.rating}</span>
                  {provider.review_count && (
                    <span className="text-muted-foreground">({provider.review_count})</span>
                  )}
                </span>
              )}
              
              {provider.years_experience && (
                <span className="text-muted-foreground">
                  {provider.years_experience}+ years
                </span>
              )}
            </div>
            
            {provider.bio && (
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                {provider.bio}
              </p>
            )}
          </div>
        </div>
        
        <a 
          href={`https://app.prohub.co.za/provider/${provider.id}`}
          className="mt-4 block w-full text-center bg-primary text-white font-semibold py-2.5 rounded-lg hover:bg-primary/90 transition-colors"
        >
          View Profile
        </a>
      </div>
    </div>
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
      <h3 className="font-display font-bold text-foreground text-lg mb-2">
        We're Growing in {townName}!
      </h3>
      <p className="text-muted-foreground mb-6">
        We're actively onboarding verified {serviceName.toLowerCase()} providers in this area. 
        Submit your request now and we'll match you as soon as providers are available.
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
