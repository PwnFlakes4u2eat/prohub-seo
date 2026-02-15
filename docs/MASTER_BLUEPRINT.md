# ProHub SEO Master Blueprint

> **The plumber blueprint is the gold standard.** All service pages follow the same structure, styling, and content format. This document establishes that standard and provides service-specific variations.

---

## Core Principle

**Every service page is generated using the plumber template as the base.** The only things that change between services are:

1. Service-specific terminology
2. The 6 gallery images
3. FAQ topics and pricing
4. Guide content (services offered, DIY considerations)

The page **structure**, **styling**, **sections**, and **functionality** remain identical.

---

## Base Template Reference

📄 **Full specification:** `docs/PAGE_GENERATION_BLUEPRINT.md`
📄 **Content template:** `docs/templates/plumber-content-template.json`

---

## Page Structure (Fixed for All Services)

Every service/town page has these sections in this order:

1. **Breadcrumbs** — Home > Service > Town
2. **Hero Section** — Full-width image, headline, subtitle, CTAs
3. **Table of Contents** — 8 anchor links
4. **How It Works** — 3-step process cards
5. **Providers Section** — Dynamic from Supabase (or NoProvidersCard)
6. **Stats at a Glance** — 4 metrics (response time, rating, jobs, providers)
7. **Reviews Section** — 3D flip cards with testimonials
8. **Service Gallery** — 6 images with captions and descriptions
9. **DIY vs Professional** — Comparison table
10. **Complete Guide** — 4 subsections of prose
11. **Pricing Guide** — Table from services.json
12. **Why ProHub** — 4 benefit cards
13. **Areas We Cover** — Local suburbs (from towns.json)
14. **FAQ Section** — 5 expandable questions
15. **Blog Section** — Dynamic posts (or fallback)
16. **Related Services** — 6 icon tiles
17. **Nearby Towns** — Location pin tiles
18. **Final CTA** — Dark section with get quotes button

---

## Content JSON Structure (Required for All Services)

```json
{
  "title": "Best {ServicePlural} in {Town} — Get Free Quotes | ProHub",
  "description": "150-160 char meta description with service and town",
  "heroTitle": "Find Trusted {ServicePlural} in {Town}",
  "heroSubtitle": "Get up to 5 free quotes...",
  
  "guideIntro": "2-3 paragraphs about this service in this specific town",
  "guideServiceTypes": "What services are offered locally",
  "guideDiyVsPro": "When to DIY vs call professional",
  "guideWhatToExpect": "The quote process and what happens",
  "guideChoosingProvider": "Tips for selecting the right provider",
  
  "faqs": [
    { "question": "...", "answer": "..." }
  ],
  
  "gallery": [
    {
      "url": "/images/{service}-{type}.png",
      "alt": "SEO alt text with town name",
      "caption": "Short caption",
      "description": "1-2 sentence description"
    }
  ],
  
  "status": "live",
  "lastUpdated": "ISO date"
}
```

---

## Service-Specific Requirements

Each service needs:

| Requirement | Location | Notes |
|-------------|----------|-------|
| Service definition | `data/services.json` | pricing, diyVsPro, relatedServices |
| 6 gallery images | `public/images/` | Generic, reusable across all towns |
| Hero image | `page.tsx` heroImages | Unsplash URL or local image |
| Content per town | `data/content/live/{service}/{town}.json` | Unique prose content |
| Service blueprint | `docs/services/{service}.md` | Image specs, FAQ topics, guidelines |

---

## Gallery Image Standard

Every service needs exactly **6 images** covering its core offerings:

- **Format:** PNG
- **Location:** `public/images/{service}-{type}.png`
- **Style:** Professional, photorealistic, South African context
- **Content:** Generic (no town-specific elements)
- **Usage:** Same images for all 19 towns

Each image needs:
- Filename
- Alt text pattern (with `{town}` placeholder)
- Caption (2-4 words)
- Description (1-2 sentences)

---

## FAQ Standard

Every service needs **5 FAQs** covering:

1. **Pricing** — "How much does a {service} cost in {town}?"
2. **Common issues** — What problems are typical locally
3. **Compliance/certs** — Any legal requirements (if applicable)
4. **Prevention/tips** — Advice for homeowners
5. **Emergency** — Availability for urgent callouts

---

## File Organisation

```
prohub-seo/
├── docs/
│   ├── MASTER_BLUEPRINT.md          ← This file (start here)
│   ├── PAGE_GENERATION_BLUEPRINT.md ← Full technical spec (plumber base)
│   ├── SERVICE_CATALOGUE.md         ← All 26 services with specs
│   ├── templates/
│   │   ├── plumber-content-template.json
│   │   ├── pest-control-content-template.json
│   │   └── {service}-content-template.json
│   └── services/                    ← Per-service details
│       ├── plumber.md               ← Reference/gold standard
│       ├── electrician.md
│       ├── pest-control.md
│       └── ...
├── data/
│   ├── services.json                ← Service definitions
│   ├── towns.json                   ← Town definitions
│   └── content/
│       └── live/
│           ├── plumber/
│           │   ├── george.json
│           │   └── ...
│           ├── electrician/
│           └── ...
└── public/
    └── images/
        ├── plumber-*.png
        ├── electrician-*.png
        └── ...
```

---

## Generation Workflow

### Adding a New Town (existing service)

1. Copy content template for that service
2. Find/replace town name
3. Rewrite `guideIntro` with local context
4. Update gallery `alt` text with town name
5. Adjust FAQ pricing if needed
6. Push to GitHub

### Adding a New Service

1. Add entry to `services.json`
2. Generate 6 gallery images (Nano Banana)
3. Add hero image to `page.tsx`
4. Create service blueprint in `docs/services/{service}.md`
5. Create content template in `docs/templates/`
6. Generate content for all 19 towns
7. Push to GitHub

---

## Quick Links

- [Full Technical Blueprint](./PAGE_GENERATION_BLUEPRINT.md)
- [Service Catalogue](./SERVICE_CATALOGUE.md)
- [Plumber Template](./templates/plumber-content-template.json)

---

*Plumber is the gold standard. When in doubt, check how plumber does it.*
