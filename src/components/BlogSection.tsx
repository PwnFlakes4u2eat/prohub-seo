'use client';

import { BlogPost } from '@/lib/supabase';

interface BlogSectionProps {
  posts: BlogPost[];
  serviceName: string;
  townName: string;
}

// Placeholder blog post data
const placeholderPosts = [
  {
    id: 'placeholder-1',
    title: '5 Warning Signs You Need a Professional',
    excerpt: 'Learn to spot the early warning signs that indicate it\'s time to call in an expert before a small problem becomes a costly repair.',
    image: '/images/blog-placeholder-1.jpg',
  },
  {
    id: 'placeholder-2',
    title: 'How to Choose the Right Provider for Your Home',
    excerpt: 'Not all service providers are created equal. Here\'s what to look for when hiring someone to work on your property.',
    image: '/images/blog-placeholder-2.jpg',
  },
  {
    id: 'placeholder-3',
    title: 'Cost Guide: What to Expect in 2026',
    excerpt: 'Understanding typical costs helps you budget effectively and spot quotes that are too good (or too expensive) to be true.',
    image: '/images/blog-placeholder-3.jpg',
  },
];

export default function BlogSection({ posts, serviceName, townName }: BlogSectionProps) {
  const hasRealPosts = posts.length > 0;
  const displayPosts = hasRealPosts ? posts : placeholderPosts;
  
  return (
    <section id="blog" className="py-20 md:py-28 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Latest Articles</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-display font-bold text-foreground">
            {serviceName} Tips & Guides
          </h2>
          {!hasRealPosts && (
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Expert articles about {serviceName.toLowerCase()} services in {townName} coming soon. 
              Check back for helpful guides and local tips.
            </p>
          )}
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {displayPosts.map((post, index) => (
            <BlogCard 
              key={post.id} 
              post={post as BlogPost}
              isPlaceholder={!hasRealPosts}
              serviceName={serviceName}
              index={index}
            />
          ))}
        </div>
        
        {!hasRealPosts && (
          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              📝 Real articles will replace these placeholders as content is published
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

interface BlogCardProps {
  post: BlogPost | typeof placeholderPosts[0];
  isPlaceholder?: boolean;
  serviceName: string;
  index: number;
}

function BlogCard({ post, isPlaceholder, serviceName, index }: BlogCardProps) {
  // Generic placeholder images based on service type
  const placeholderImages = [
    'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop&q=80',
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop&q=80',
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop&q=80',
  ];
  
  const imageUrl = isPlaceholder 
    ? placeholderImages[index % placeholderImages.length]
    : (post as BlogPost).image_url;
  
  const title = isPlaceholder
    ? post.title.replace('a Professional', `a ${serviceName}`).replace('Provider', serviceName)
    : post.title;
    
  const excerpt = isPlaceholder
    ? post.excerpt.replace('an expert', `a ${serviceName.toLowerCase()}`).replace('service providers', `${serviceName.toLowerCase()}s`)
    : (post as BlogPost).excerpt;
  
  return (
    <div className={`
      bg-white rounded-xl border overflow-hidden shadow-card hover:shadow-elevated 
      transition-all duration-200 hover:-translate-y-1
      ${isPlaceholder ? 'border-dashed border-2 border-border opacity-75' : 'border-border'}
    `}>
      <div className="aspect-[16/10] overflow-hidden bg-muted relative">
        <img 
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {isPlaceholder && (
          <div className="absolute inset-0 bg-foreground/50 flex items-center justify-center">
            <span className="bg-white/90 text-foreground text-xs font-semibold px-3 py-1 rounded-full">
              Coming Soon
            </span>
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-display font-bold text-foreground mb-2 line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {excerpt}
        </p>
        {!isPlaceholder && (
          <a 
            href={`/blog/${(post as BlogPost).slug}`}
            className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-primary hover:underline"
          >
            Read more
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}
