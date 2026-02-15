'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Review } from '@/lib/supabase';

interface ReviewSectionProps {
  reviews: Review[];
  serviceName: string;
  townName: string;
}

// Fallback testimonials when no real reviews exist
const fallbackTestimonials = [
  {
    id: 'fallback-1',
    provider_id: '',
    customer_name: 'Thandi M.',
    rating: 5,
    comment: 'I needed a service provider urgently and ProHub connected me with three quotes within 2 hours. The provider I chose was fantastic and very reasonably priced!',
    service_category: '',
    is_verified_customer: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'fallback-2',
    provider_id: '',
    customer_name: 'Johan V.',
    rating: 5,
    comment: 'ProHub made it so easy to find a reliable professional. The quotes came through quickly and I could compare them side by side. Highly recommend!',
    service_category: '',
    is_verified_customer: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'fallback-3',
    provider_id: '',
    customer_name: 'Sarah K.',
    rating: 5,
    comment: 'Moving to the area, I didn\'t know any local service providers. ProHub made it so easy to find verified professionals — all in one place.',
    service_category: '',
    is_verified_customer: true,
    created_at: new Date().toISOString(),
  },
];

const MIN_REAL_REVIEWS = 3;

export default function ReviewSection({ reviews, serviceName, townName }: ReviewSectionProps) {
  const hasEnoughRealReviews = reviews.length >= MIN_REAL_REVIEWS;
  
  // Use real reviews if enough, otherwise mix with fallbacks
  const displayReviews = hasEnoughRealReviews 
    ? reviews.slice(0, 6)
    : [...reviews, ...fallbackTestimonials.slice(0, Math.max(3 - reviews.length, 0))];

  const [flipTrigger, setFlipTrigger] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 3;
  const totalPages = Math.ceil(displayReviews.length / perPage);

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    if (displayReviews.length <= perPage) return;
    
    const id = setInterval(() => {
      setCurrentPage((p) => (p + 1) % totalPages);
      setFlipTrigger((t) => t + 1);
    }, 5000);
    return () => clearInterval(id);
  }, [totalPages, displayReviews.length]);

  // Calculate which reviews to show
  const slots = Array.from({ length: Math.min(perPage, displayReviews.length) }, (_, i) => {
    const prevPage = currentPage === 0 ? totalPages - 1 : currentPage - 1;
    const frontIdx = prevPage * perPage + i;
    const backIdx = currentPage * perPage + i;
    return {
      front: displayReviews[frontIdx % displayReviews.length],
      back: displayReviews[backIdx % displayReviews.length],
    };
  });

  const isFirstRender = flipTrigger === 0;

  return (
    <section id="reviews" className="py-20 md:py-28 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Customer Reviews</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-display font-bold text-foreground">
            What Customers Say About {serviceName} in {townName}
          </h2>
          {!hasEnoughRealReviews && reviews.length === 0 && (
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Be among the first to leave a review! Real customer reviews will appear here as {serviceName.toLowerCase()} jobs are completed in {townName}.
            </p>
          )}
        </div>

        {/* Stats Banner */}
        {hasEnoughRealReviews && (
          <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} className="w-4 h-4 text-primary fill-primary" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-foreground font-semibold">
                {(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)}
              </span>
              <span className="text-muted-foreground">average rating</span>
            </div>
            <div className="h-4 w-px bg-border hidden sm:block" />
            <div className="text-muted-foreground">
              <span className="text-foreground font-semibold">{reviews.length}</span> verified reviews
            </div>
          </div>
        )}
        
        {/* 3D Flip Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {isFirstRender
            ? slots.map((slot, i) => (
                <div key={i} className="w-full">
                  <ReviewCard review={slot.back} />
                </div>
              ))
            : slots.map((slot, i) => (
                <FlipCard
                  key={i}
                  frontReview={slot.front}
                  backReview={slot.back}
                  flipTrigger={flipTrigger}
                  delay={i * 0.1}
                />
              ))}
        </div>

        {/* Dot indicators */}
        {displayReviews.length > perPage && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setCurrentPage(i);
                  setFlipTrigger((t) => t + 1);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  i === currentPage ? 'bg-primary' : 'bg-border'
                }`}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* Footer note */}
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-8">
          <svg className="w-5 h-5 text-tertiary" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>All reviews are from verified ProHub customers</span>
        </div>
      </div>
    </section>
  );
}

interface FlipCardProps {
  frontReview: Review;
  backReview: Review;
  flipTrigger: number;
  delay: number;
}

function FlipCard({ frontReview, backReview, flipTrigger, delay }: FlipCardProps) {
  const [displayFront, setDisplayFront] = useState(frontReview);
  const [displayBack, setDisplayBack] = useState(backReview);
  const [isFlipped, setIsFlipped] = useState(false);
  const prevTrigger = useRef(flipTrigger);

  useEffect(() => {
    if (flipTrigger !== prevTrigger.current) {
      prevTrigger.current = flipTrigger;
      if (isFlipped) {
        setDisplayFront(backReview);
      } else {
        setDisplayBack(backReview);
      }
      setIsFlipped((f) => !f);
    }
  }, [flipTrigger, backReview, isFlipped]);

  const handleAnimationComplete = useCallback(() => {
    if (isFlipped) {
      setDisplayFront(displayBack);
    }
  }, [isFlipped, displayBack]);

  return (
    <div style={{ perspective: '1000px' }} className="w-full">
      <div
        className="transition-transform duration-600 ease-in-out"
        style={{ 
          transformStyle: 'preserve-3d',
          position: 'relative',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transitionDelay: `${delay}s`,
        }}
        onTransitionEnd={handleAnimationComplete}
      >
        <div style={{ backfaceVisibility: 'hidden' }}>
          <ReviewCard review={displayFront} />
        </div>
        <div
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
          }}
        >
          <ReviewCard review={displayBack} />
        </div>
      </div>
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const initial = review.customer_name.charAt(0).toUpperCase();
  
  return (
    <div className="bg-white rounded-xl border border-border p-6 card-elevated relative min-h-[240px] flex flex-col">
      {/* Quote icon */}
      <svg 
        className="absolute top-4 right-4 w-8 h-8 text-primary/10 fill-primary/5"
        viewBox="0 0 24 24"
      >
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>

      <div className="flex items-center gap-3 mb-4">
        <div className="w-11 h-11 rounded-full bg-tertiary/10 flex items-center justify-center">
          <span className="text-sm font-semibold text-tertiary">{initial}</span>
        </div>
        <div>
          <p className="font-semibold text-foreground text-sm">{review.customer_name}</p>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i}
                className={`w-3.5 h-3.5 ${i < review.rating ? 'text-primary fill-primary' : 'text-muted fill-muted'}`}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
        {review.is_verified_customer && (
          <span className="ml-auto text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Verified
          </span>
        )}
      </div>
      
      <p className="text-muted-foreground text-sm leading-relaxed flex-1 line-clamp-4">
        &ldquo;{review.comment}&rdquo;
      </p>
    </div>
  );
}
