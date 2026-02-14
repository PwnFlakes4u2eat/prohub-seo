import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export interface Provider {
  id: string;
  business_name: string;
  avatar_url: string | null;
  cover_image_url: string | null;
  bio: string | null;
  years_experience: number | null;
  is_verified: boolean;
  subscription_tier: string | null;
  featured_until: string | null;
  created_at: string;
  // Computed from reviews
  rating?: number;
  review_count?: number;
  response_time?: string;
}

export interface Review {
  id: string;
  provider_id: string;
  customer_name: string;
  rating: number;
  comment: string;
  service_category: string;
  is_verified_customer: boolean;
  created_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string;
  category: string;
  location: string | null;
  published_at: string;
}

// Fetch providers for a service and town
export async function getProviders(serviceSlug: string, townSlug: string): Promise<Provider[]> {
  const { data, error } = await supabase
    .from('providers')
    .select(`
      id,
      business_name,
      avatar_url,
      cover_image_url,
      bio,
      years_experience,
      is_verified,
      subscription_tier,
      featured_until,
      created_at
    `)
    .eq('is_verified', true)
    .contains('service_categories', [serviceSlug])
    .contains('service_areas', [townSlug])
    .order('featured_until', { ascending: false, nullsFirst: false })
    .limit(10);

  if (error) {
    console.error('Error fetching providers:', error);
    return [];
  }

  return data || [];
}

// Fetch reviews for a service and town
export async function getReviews(serviceSlug: string, townSlug: string): Promise<Review[]> {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('service_category', serviceSlug)
    .order('created_at', { ascending: false })
    .limit(6);

  if (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }

  return data || [];
}

// Fetch blog posts for a service
export async function getBlogPosts(serviceSlug: string, townSlug?: string): Promise<BlogPost[]> {
  let query = supabase
    .from('blog_posts')
    .select('*')
    .eq('category', serviceSlug)
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .limit(3);

  if (townSlug) {
    query = query.or(`location.eq.${townSlug},location.is.null`);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }

  return data || [];
}

// Get aggregate stats for a service and town
export async function getStats(serviceSlug: string, townSlug: string) {
  // Get provider count
  const { count: providerCount } = await supabase
    .from('providers')
    .select('*', { count: 'exact', head: true })
    .eq('is_verified', true)
    .contains('service_categories', [serviceSlug])
    .contains('service_areas', [townSlug]);

  // Get average rating
  const { data: ratingData } = await supabase
    .from('reviews')
    .select('rating')
    .eq('service_category', serviceSlug);

  const avgRating = ratingData && ratingData.length > 0
    ? ratingData.reduce((sum, r) => sum + r.rating, 0) / ratingData.length
    : null;

  return {
    providerCount: providerCount || 0,
    avgRating: avgRating ? avgRating.toFixed(1) : null,
    avgResponseTime: '< 30 mins', // Default - could calculate from data
    jobsThisMonth: null, // Could track this
  };
}
