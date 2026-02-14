'use client';

interface StatsAtGlanceProps {
  serviceName: string;
  townName: string;
  stats: {
    providerCount: number;
    avgRating: string | null;
    avgResponseTime: string;
    jobsThisMonth: number | null;
  };
}

export default function StatsAtGlance({ serviceName, townName, stats }: StatsAtGlanceProps) {
  const hasRealData = stats.providerCount > 0 || stats.avgRating !== null;
  
  // Fallback values when no real data
  const displayStats = {
    providerCount: stats.providerCount || '–',
    avgRating: stats.avgRating || '–',
    avgResponseTime: stats.avgResponseTime || '< 30 mins',
    jobsThisMonth: stats.jobsThisMonth || '–',
  };
  
  return (
    <section className="py-12 bg-foreground text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-display font-bold">
            {serviceName} in {townName} at a Glance
          </h2>
          {!hasRealData && (
            <p className="text-white/60 text-sm mt-2">
              Stats will update as providers join and complete jobs
            </p>
          )}
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {/* Verified Providers */}
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <p className="text-3xl font-bold font-display">{displayStats.providerCount}</p>
            <p className="text-white/60 text-sm">Verified {serviceName}s</p>
          </div>
          
          {/* Average Rating */}
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <p className="text-3xl font-bold font-display">{displayStats.avgRating}</p>
            <p className="text-white/60 text-sm">Average Rating</p>
          </div>
          
          {/* Response Time */}
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-3xl font-bold font-display">{displayStats.avgResponseTime}</p>
            <p className="text-white/60 text-sm">Avg Response Time</p>
          </div>
          
          {/* Jobs This Month */}
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <p className="text-3xl font-bold font-display">{displayStats.jobsThisMonth}</p>
            <p className="text-white/60 text-sm">Jobs This Month</p>
          </div>
        </div>
      </div>
    </section>
  );
}
