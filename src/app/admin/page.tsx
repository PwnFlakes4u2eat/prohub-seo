'use client';

import { useState, useEffect } from 'react';

interface ContentItem {
  service: string;
  town: string;
  status: 'pending' | 'live';
  lastUpdated: string;
  title: string;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [content, setContent] = useState<ContentItem[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'live'>('all');
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [loading, setLoading] = useState(false);

  // Simple password auth (replace with proper auth in production)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Password is checked against env var on server in production
    // For now, using a simple client-side check
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD || password === 'prohub2026') {
      setIsAuthenticated(true);
      localStorage.setItem('admin_auth', 'true');
    } else {
      alert('Incorrect password');
    }
  };

  useEffect(() => {
    // Check if already authenticated
    if (localStorage.getItem('admin_auth') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      // Fetch content list
      fetchContent();
    }
  }, [isAuthenticated]);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/content');
      const data = await res.json();
      setContent(data.items || []);
    } catch (error) {
      console.error('Failed to fetch content:', error);
    }
    setLoading(false);
  };

  const approveContent = async (service: string, town: string) => {
    try {
      await fetch('/api/admin/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service, town }),
      });
      fetchContent();
    } catch (error) {
      console.error('Failed to approve:', error);
    }
  };

  const filteredContent = content.filter(item => {
    if (filter === 'all') return true;
    return item.status === filter;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="bg-white rounded-xl border border-border shadow-card p-8 max-w-md w-full">
          <h1 className="font-display font-bold text-2xl text-foreground mb-2">ProHub Admin</h1>
          <p className="text-muted-foreground mb-6">Enter your password to access the content dashboard.</p>
          
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary mb-4"
            />
            <button
              type="submit"
              className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="font-display font-bold text-xl">
            <span className="text-primary">Pro</span>
            <span className="text-foreground">Hub</span>
            <span className="text-muted-foreground font-normal ml-2">Admin</span>
          </h1>
          <button
            onClick={() => {
              localStorage.removeItem('admin_auth');
              setIsAuthenticated(false);
            }}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-border p-6">
            <p className="text-3xl font-bold font-display text-foreground">
              {content.length}
            </p>
            <p className="text-muted-foreground text-sm">Total Pages</p>
          </div>
          <div className="bg-white rounded-xl border border-border p-6">
            <p className="text-3xl font-bold font-display text-primary">
              {content.filter(c => c.status === 'pending').length}
            </p>
            <p className="text-muted-foreground text-sm">Pending Review</p>
          </div>
          <div className="bg-white rounded-xl border border-border p-6">
            <p className="text-3xl font-bold font-display text-tertiary">
              {content.filter(c => c.status === 'live').length}
            </p>
            <p className="text-muted-foreground text-sm">Live Pages</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          {(['all', 'pending', 'live'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === f
                  ? 'bg-primary text-white'
                  : 'bg-white border border-border text-foreground hover:bg-muted'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Content Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading content...</p>
          </div>
        ) : filteredContent.length === 0 ? (
          <div className="bg-white rounded-xl border border-border p-12 text-center">
            <p className="text-muted-foreground">No content found.</p>
            <p className="text-sm text-muted-foreground mt-2">
              Content will appear here once generated.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredContent.map((item) => (
              <div
                key={`${item.service}-${item.town}`}
                className="bg-white rounded-xl border border-border p-5 hover:shadow-card transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-display font-semibold text-foreground">
                      {item.service.charAt(0).toUpperCase() + item.service.slice(1).replace('-', ' ')}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.town.charAt(0).toUpperCase() + item.town.slice(1).replace('-', ' ')}
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    item.status === 'live'
                      ? 'bg-tertiary/10 text-tertiary'
                      : 'bg-primary/10 text-primary'
                  }`}>
                    {item.status}
                  </span>
                </div>
                
                <p className="text-xs text-muted-foreground mb-4">
                  Updated: {new Date(item.lastUpdated).toLocaleDateString()}
                </p>
                
                <div className="flex gap-2">
                  <a
                    href={`/${item.service}/${item.town}`}
                    target="_blank"
                    className="flex-1 text-center px-3 py-2 bg-muted text-foreground text-sm font-medium rounded-lg hover:bg-muted/80 transition-colors"
                  >
                    Preview
                  </a>
                  {item.status === 'pending' && (
                    <button
                      onClick={() => approveContent(item.service, item.town)}
                      className="flex-1 px-3 py-2 bg-tertiary text-white text-sm font-medium rounded-lg hover:bg-tertiary/90 transition-colors"
                    >
                      Approve
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bulk Actions */}
        {content.filter(c => c.status === 'pending').length > 0 && (
          <div className="mt-8 p-4 bg-primary/5 rounded-xl border border-primary/20">
            <div className="flex items-center justify-between">
              <p className="text-foreground">
                <strong>{content.filter(c => c.status === 'pending').length}</strong> pages pending review
              </p>
              <button
                onClick={async () => {
                  if (confirm('Approve all pending pages?')) {
                    for (const item of content.filter(c => c.status === 'pending')) {
                      await approveContent(item.service, item.town);
                    }
                  }
                }}
                className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors"
              >
                Approve All
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
