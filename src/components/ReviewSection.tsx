'use client';

import { Review } from '@/lib/supabase';

interface ReviewSectionProps {
  reviews: Review[];
  serviceName: string;
  townName: string;
}

export default function ReviewSection({ reviews, serviceName, townName }: ReviewSectionProps) {
  const hasRealReviews = reviews.length > 0;
  
  return (
    <section id="reviews" className="py-20 md:py-28 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Customer Reviews</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-display font-bold text-foreground">
            What Customers Say About {serviceName} in {townName}
          </h2>
          {!hasRealReviews && (
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Be among the first to leave a review! Real customer reviews will appear here as {serviceName.toLowerCase()} jobs are completed in {townName}.
            </p>
          )}
        </div>
        
        {hasRealReviews ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <PlaceholderReviews serviceName={serviceName} townName={townName} />
          </div>
        )}
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="bg-white rounded-xl border border-border p-6 shadow-card hover:shadow-elevated transition-all duration-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-primary font-bold">
            {review.customer_name.charAt(0)}
          </span>
        </div>
        <div>
          <p className="font-semibold text-foreground">{review.customer_name}</p>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i}
                className={`w-4 h-4 ${i < review.rating ? 'text-primary' : 'text-muted'}`}
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
        {review.is_verified_customer && (
          <span className="ml-auto text-xs bg-tertiary/10 text-tertiary px-2 py-1 rounded-full font-medium">
            Verified
          </span>
        )}
      </div>
      <p className="text-muted-foreground text-sm leading-relaxed">
        "{review.comment}"
      </p>
    </div>
  );
}

function PlaceholderReviews({ serviceName, townName }: { serviceName: string; townName: string }) {
  return (
    <div className="bg-white rounded-xl border-2 border-dashed border-border p-8 text-center">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </div>
      <h3 className="font-display font-bold text-foreground text-xl mb-2">
        No Reviews Yet
      </h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        This is a new listing. Reviews from real customers will appear here once {serviceName.toLowerCase()} jobs are completed through ProHub in {townName}.
      </p>
      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <svg className="w-5 h-5 text-tertiary" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span>All reviews are from verified ProHub customers</span>
      </div>
    </div>
  );
}
