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
  // Convert townSlug to town name (e.g., "george" -> "George", "mossel-bay" -> "Mossel Bay")
  const townName = townSlug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // First get the category ID for this service
  const { data: categoryData } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', serviceSlug)
    .single();

  if (!categoryData) {
    console.error('Category not found:', serviceSlug);
    return [];
  }

  // Get the region ID for this town
  const { data: regionData } = await supabase
    .from('regions')
    .select('id')
    .eq('name', townName)
    .single();

  if (!regionData) {
    console.error('Region not found:', townName);
    return [];
  }

  // Get providers that match both the category AND region
  const { data: providerCategories } = await supabase
    .from('provider_categories')
    .select('provider_id')
    .eq('category_id', categoryData.id);

  const { data: providerRegions } = await supabase
    .from('provider_regions')
    .select('provider_id')
    .eq('region_id', regionData.id);

  if (!providerCategories || !providerRegions) {
    return [];
  }

  // Find providers that appear in both lists
  const categoryProviderIds = new Set(providerCategories.map(pc => pc.provider_id));
  const matchingProviderIds = providerRegions
    .filter(pr => categoryProviderIds.has(pr.provider_id))
    .map(pr => pr.provider_id);

  if (matchingProviderIds.length === 0) {
    return [];
  }

  // Fetch the actual provider data
  const { data, error } = await supabase
    .from('providers')
    .select(`
      id,
      business_name,
      avatar_url,
      cover_image_url,
      description,
      years_experience,
      status,
      created_at
    `)
    .in('id', matchingProviderIds)
    .eq('status', 'verified')
    .limit(3);

  if (error) {
    console.error('Error fetching providers:', error);
    return [];
  }

  // Map to expected interface
  return (data || []).map(p => ({
    id: p.id,
    business_name: p.business_name,
    avatar_url: p.avatar_url,
    cover_image_url: p.cover_image_url,
    bio: p.description,
    years_experience: p.years_experience,
    is_verified: p.status === 'verified',
    subscription_tier: null,
    featured_until: null,
    created_at: p.created_at,
  }));
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
  // Convert townSlug to town name
  const townName = townSlug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Get category and region IDs
  const { data: categoryData } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', serviceSlug)
    .single();

  const { data: regionData } = await supabase
    .from('regions')
    .select('id')
    .eq('name', townName)
    .single();

  let providerCount = 0;

  if (categoryData && regionData) {
    // Get matching providers
    const { data: providerCategories } = await supabase
      .from('provider_categories')
      .select('provider_id')
      .eq('category_id', categoryData.id);

    const { data: providerRegions } = await supabase
      .from('provider_regions')
      .select('provider_id')
      .eq('region_id', regionData.id);

    if (providerCategories && providerRegions) {
      const categoryProviderIds = new Set(providerCategories.map(pc => pc.provider_id));
      const matchingIds = providerRegions.filter(pr => categoryProviderIds.has(pr.provider_id));
      
      // Count verified providers
      if (matchingIds.length > 0) {
        const { count } = await supabase
          .from('providers')
          .select('*', { count: 'exact', head: true })
          .in('id', matchingIds.map(m => m.provider_id))
          .eq('status', 'verified');
        providerCount = count || 0;
      }
    }
  }

  // Get average rating from providers table
  const { data: ratingData } = await supabase
    .from('providers')
    .select('avg_rating')
    .eq('status', 'verified')
    .gt('avg_rating', 0);

  const avgRating = ratingData && ratingData.length > 0
    ? ratingData.reduce((sum, r) => sum + Number(r.avg_rating), 0) / ratingData.length
    : null;

  return {
    providerCount: providerCount || 0,
    avgRating: avgRating ? avgRating.toFixed(1) : null,
    avgResponseTime: '< 30 mins',
    jobsThisMonth: null,
  };
}
