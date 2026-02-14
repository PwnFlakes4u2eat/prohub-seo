import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ProHub - Find Verified Local Service Providers | South Africa",
    template: "%s | ProHub",
  },
  description: "Connect with verified local service providers across South Africa. Get up to 5 free quotes, compare prices, and hire with confidence.",
  metadataBase: new URL("https://prohub.co.za"),
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: "https://prohub.co.za",
    siteName: "ProHub",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${inter.variable}`}>
      <body className="font-body bg-background text-foreground antialiased">
        {/* Header - Matches ProHub App Navbar */}
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-border" style={{ background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
          <div className="container mx-auto flex items-center justify-between h-16 px-4">
            <a href="https://app.prohub.co.za" className="flex items-center gap-2">
              <img src="/logo.png" alt="ProHub" className="w-8 h-8 rounded-lg object-cover" />
              <span className="font-display font-bold text-xl">
                <span className="text-primary">Pro</span>
                <span className="text-foreground">Hub</span>
              </span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="https://app.prohub.co.za" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Home
              </a>
              <a href="https://app.prohub.co.za/directory" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Find Providers
              </a>
              <a href="https://app.prohub.co.za/request" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Get Quotes
              </a>
              <a href="https://app.prohub.co.za/providers" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                For Providers
              </a>
              <a href="https://app.prohub.co.za/pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </a>
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <a 
                href="https://app.prohub.co.za/auth"
                className="inline-flex items-center justify-center h-9 rounded-lg px-4 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
              >
                Provider Login
              </a>
              <a 
                href="https://app.prohub.co.za/request"
                className="inline-flex items-center justify-center h-9 rounded-lg px-4 text-sm font-medium font-display bg-primary text-white hover:bg-primary/90 shadow-sm transition-all duration-200"
              >
                Get Free Quotes
              </a>
            </div>

            {/* Mobile toggle - simplified for static site */}
            <a 
              href="https://app.prohub.co.za/request"
              className="md:hidden inline-flex items-center justify-center h-9 rounded-lg px-4 text-sm font-medium font-display bg-primary text-white hover:bg-primary/90 shadow-sm transition-all duration-200"
            >
              Get Quotes
            </a>
          </div>
        </header>

        {/* Main Content */}
        <main>{children}</main>

        {/* Footer */}
        <footer className="bg-foreground text-white py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              {/* Brand */}
              <div className="md:col-span-1">
                <a href="/" className="flex items-center gap-2 mb-4">
                  <span className="font-display font-bold text-xl">
                    <span className="text-primary">Pro</span>
                    <span className="text-white">Hub</span>
                  </span>
                </a>
                <p className="text-white/60 text-sm leading-relaxed">
                  Connecting South Africans with verified local service providers since 2026.
                </p>
              </div>
              
              {/* Services */}
              <div>
                <h4 className="font-display font-semibold mb-4">Popular Services</h4>
                <ul className="space-y-2 text-sm text-white/60">
                  <li><a href="/plumber" className="hover:text-white transition-colors">Plumbers</a></li>
                  <li><a href="/electrician" className="hover:text-white transition-colors">Electricians</a></li>
                  <li><a href="/pest-control" className="hover:text-white transition-colors">Pest Control</a></li>
                  <li><a href="/painter" className="hover:text-white transition-colors">Painters</a></li>
                  <li><a href="/locksmith" className="hover:text-white transition-colors">Locksmiths</a></li>
                </ul>
              </div>
              
              {/* Regions */}
              <div>
                <h4 className="font-display font-semibold mb-4">Garden Route</h4>
                <ul className="space-y-2 text-sm text-white/60">
                  <li><a href="/town/george" className="hover:text-white transition-colors">George</a></li>
                  <li><a href="/town/knysna" className="hover:text-white transition-colors">Knysna</a></li>
                  <li><a href="/town/mossel-bay" className="hover:text-white transition-colors">Mossel Bay</a></li>
                  <li><a href="/town/plettenberg-bay" className="hover:text-white transition-colors">Plettenberg Bay</a></li>
                  <li><a href="/town/oudtshoorn" className="hover:text-white transition-colors">Oudtshoorn</a></li>
                </ul>
              </div>
              
              {/* Company */}
              <div>
                <h4 className="font-display font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-sm text-white/60">
                  <li><a href="https://app.prohub.co.za/about" className="hover:text-white transition-colors">About Us</a></li>
                  <li><a href="https://app.prohub.co.za/auth?mode=provider" className="hover:text-white transition-colors">Become a Provider</a></li>
                  <li><a href="https://app.prohub.co.za/contact" className="hover:text-white transition-colors">Contact</a></li>
                  <li><a href="https://app.prohub.co.za/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="https://app.prohub.co.za/terms" className="hover:text-white transition-colors">Terms of Service</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-white/40 text-sm">
                © {new Date().getFullYear()} ProHub. All rights reserved.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="text-white/40 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="text-white/40 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
