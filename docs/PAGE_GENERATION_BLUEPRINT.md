# ProHub SEO Page Generation Blueprint

> **Purpose:** This document captures the exact structure, content format, and generation process for service/town pages. Use this to ensure all future pages match existing pages exactly.

---

## Quick Reference

| Item | Location |
|------|----------|
| Service definitions | `data/services.json` |
| Town definitions | `data/towns.json` |
| Content files | `data/content/live/{service}/{town}.json` |
| Page component | `src/app/[service]/[town]/page.tsx` |
| Gallery images | `public/images/` |
| Supabase queries | `src/lib/supabase.ts` |

---

## 1. Content JSON Structure

Every town page can have custom content stored in `data/content/live/{service}/{town}.json`.

### Required Fields

```json
{
  "title": "Best {ServicePlural} in {Town} — Get Free Quotes | ProHub",
  "description": "SEO meta description (150-160 chars)",
  "heroTitle": "Find Trusted {ServicePlural} in {Town}",
  "heroSubtitle": "Get up to 5 free quotes from verified local {service}. Compare prices and reviews before you hire.",
  
  "guideIntro": "2-3 paragraph introduction specific to the town...",
  "guideServiceTypes": "Describes services available in this town...",
  "guideDiyVsPro": "When to DIY vs call a professional...",
  "guideWhatToExpect": "What happens after requesting quotes...",
  "guideChoosingProvider": "Tips for choosing the right provider...",
  
  "faqs": [
    {
      "question": "How much does a {service} cost in {Town}?",
      "answer": "Detailed answer with local pricing..."
    }
  ],
  
  "gallery": [
    {
      "url": "/images/{service}-{image-name}.png",
      "alt": "SEO-optimized alt text describing the image",
      "caption": "Short caption (2-4 words)",
      "description": "1-2 sentence description of the service shown"
    }
  ],
  
  "status": "live",
  "lastUpdated": "2026-02-14T13:25:00.000Z"
}
```

### Example: Plumber in George

```json
{
  "title": "Best Plumbers in George — Get Free Quotes | ProHub",
  "description": "Find verified plumbers in George, Western Cape. Get up to 5 free quotes for burst pipes, geyser repairs, drain unblocking & bathroom renovations. Trusted local pros.",
  "heroTitle": "Find Trusted Plumbers in George",
  "heroSubtitle": "Get up to 5 free quotes from verified local plumbers. Compare prices and reviews before you hire.",
  
  "guideIntro": "George sits at the heart of the Garden Route, where reliable plumbing is essential for everything from holiday homes to busy commercial centres. The region's mix of older properties in Denneoord and Pacaltsdorp alongside newer estates in Heatherlands means plumbing challenges vary widely — from replacing galvanised pipes in 1960s homes to installing water-saving systems in modern builds. Add to that George's water restrictions during dry spells and the occasional winter flooding, and having a trusted local plumber on call becomes a necessity rather than a luxury. ProHub connects George residents with verified plumbing professionals who understand the municipality's bylaws, know where the ageing infrastructure causes problems, and can respond quickly when things go wrong.",

  "guideServiceTypes": "George plumbers handle everything from emergency burst pipe repairs to complete bathroom renovations. Common services include geyser installations and repairs (electric and solar), drain unblocking using high-pressure jetting, leak detection using specialised equipment, toilet and tap repairs, and full repiping for older properties. Many George plumbers also offer water tank and pump installations — increasingly popular given municipal water concerns — as well as grease trap maintenance for restaurants along York Street and the Wilderness commercial strip. For property sales, plumbers provide condition reports that complement the required CoC.",

  "guideDiyVsPro": "Replacing a tap washer or unclogging a drain with a plunger? Go for it. But anything beyond basic maintenance should go to a qualified plumber. Burst pipes, geyser work, and any modifications to your plumbing system require professional expertise — and often municipal approval. In George, DIY plumbing that goes wrong can result in water damage to your property, flooding of neighbouring properties (especially in lower-lying areas like Blanco), and disputes with your insurance company. Geyser work is particularly risky: a poorly installed pressure valve or thermostat can cause explosions. The money you save isn't worth the risk.",

  "guideWhatToExpect": "When you request quotes through ProHub, up to 5 verified George plumbers receive your job details. For emergencies like burst pipes or overflowing geysers, expect calls within minutes — most George plumbers offer 24/7 emergency response. For standard jobs, you'll typically receive multiple quotes within a few hours. Quotes should itemise labour, parts, and any callout fees (some charge extra for Wilderness, Herolds Bay, or farm calls). For larger projects like bathroom renovations, plumbers will usually request a site visit before providing a final quote.",

  "guideChoosingProvider": "Price matters, but so does reliability. Check each plumber's ProHub reviews — look for comments about punctuality, cleanliness, and whether they honoured their quotes. Ask if they're a registered member of PIRB (Plumbing Industry Registration Board) or IOPSA (Institute of Plumbing SA). For geyser work, confirm they provide a CoC and that their work is SABS compliant. Check their response time for emergencies — in George, a burst pipe during a winter cold snap or a blocked drain on a Friday evening needs someone who'll actually answer the phone.",

  "faqs": [
    {
      "question": "How much does a plumber cost in George?",
      "answer": "George plumber rates typically range from R400-R650 per hour. Callout fees average R350-R550, with premium rates for after-hours emergencies. Common job prices: geyser replacement R8,000-R18,000 (including unit), drain unblocking R600-R1,500, tap replacement R350-R800, toilet repair R400-R1,200. Get multiple ProHub quotes to compare."
    },
    {
      "question": "Do George plumbers offer emergency services?",
      "answer": "Yes, most George plumbers offer 24/7 emergency callouts for burst pipes, geyser failures, blocked drains, and flooding. Emergency rates are typically 1.5-2x standard rates. When submitting your ProHub request, mark it as urgent to get faster responses from plumbers available for immediate callouts."
    },
    {
      "question": "How do I find a reliable plumber in George?",
      "answer": "ProHub verifies all listed plumbers with ID and business checks. Read reviews from other George customers, check response times, and confirm they're PIRB or IOPSA registered. Avoid anyone who won't provide a written quote or demands full payment upfront. Multiple quotes let you compare value, not just price."
    },
    {
      "question": "Why is my water pressure low in George?",
      "answer": "Low pressure in George often comes from ageing galvanised pipes (common in older suburbs), municipal supply issues, or blocked supply lines. It can also indicate leaks in your system. A plumber can diagnose the cause — sometimes it's a simple fix like a faulty pressure reducing valve, other times it requires partial repiping. During peak summer, municipal pressure drops affect everyone."
    },
    {
      "question": "Which areas do George plumbers service?",
      "answer": "ProHub plumbers cover all George areas including the CBD, Blanco, Denneoord, Heatherlands, Pacaltsdorp, Thembalethu, Herolds Bay, Wilderness, and Victoria Bay. Many also service nearby towns like Sedgefield, Knysna, and Mossel Bay. Confirm coverage and any travel fees when requesting quotes."
    }
  ],
  
  "gallery": [
    {
      "url": "/images/plumber-burst-pipe-repair.png",
      "alt": "Emergency plumber repairing burst pipe with water leak",
      "caption": "Burst Pipe Repair",
      "description": "24/7 emergency burst pipe repairs. Our plumbers respond fast to stop water damage and fix copper, PVC, or galvanised pipes."
    },
    {
      "url": "/images/plumber-drain-unblocking.png",
      "alt": "Professional drain unblocking with high-pressure jetter",
      "caption": "Blocked Drain Cleaning",
      "description": "Fast drain unblocking for sinks, showers, and sewer lines. We use high-pressure jetters to clear even the toughest blockages."
    },
    {
      "url": "/images/plumber-geyser-installation.png",
      "alt": "Plumber installing electric geyser hot water system",
      "caption": "Geyser Installation & Repair",
      "description": "Expert geyser installations, replacements, and repairs. Electric and solar systems fitted with full compliance certificates."
    },
    {
      "url": "/images/plumber-tap-repair.png",
      "alt": "Plumber fixing leaking tap faucet in kitchen",
      "caption": "Leaking Tap Repairs",
      "description": "Stop dripping taps wasting water and money. Quick repairs for kitchen, bathroom, and garden taps — all brands serviced."
    },
    {
      "url": "/images/plumber-toilet-repair.png",
      "alt": "Plumber repairing toilet cistern and flush mechanism",
      "caption": "Toilet Repairs",
      "description": "Running toilets, weak flushes, and cistern problems fixed fast. We repair and replace all toilet components and fittings."
    },
    {
      "url": "/images/plumber-pressure-testing.png",
      "alt": "Plumber testing water pressure with diagnostic gauge",
      "caption": "Water Pressure Issues",
      "description": "Diagnose and fix low water pressure problems. We test your system, find the cause, and restore proper flow throughout your home."
    }
  ],
  
  "status": "live",
  "lastUpdated": "2026-02-14T13:25:00.000Z"
}
```

---

## 2. Plumber Gallery Images

The 6 standard plumber gallery images (stored in `public/images/`):

| Filename | Service Shown | Alt Text Pattern |
|----------|---------------|------------------|
| `plumber-burst-pipe-repair.png` | Emergency pipe repairs | Emergency plumber repairing burst pipe with water leak |
| `plumber-drain-unblocking.png` | Drain cleaning | Professional drain unblocking with high-pressure jetter |
| `plumber-geyser-installation.png` | Geyser work | Plumber installing electric geyser hot water system |
| `plumber-tap-repair.png` | Tap repairs | Plumber fixing leaking tap faucet in kitchen |
| `plumber-toilet-repair.png` | Toilet repairs | Plumber repairing toilet cistern and flush mechanism |
| `plumber-pressure-testing.png` | Diagnostics | Plumber testing water pressure with diagnostic gauge |

### Image Generation Guidelines

When generating new service images:

1. **6 images per service** — covering the most common service types
2. **Generic, reusable** — no town-specific elements in the images
3. **Professional quality** — photorealistic, well-lit, showing actual work
4. **South African context** — equipment, clothing, settings appropriate for SA
5. **PNG format** — stored in `public/images/`
6. **Naming convention:** `{service}-{specific-service}.png`

---

## 3. Fallback Gallery (Unsplash)

If no custom gallery exists in content JSON, the page uses these Unsplash URLs:

```typescript
const serviceGalleryImages: Record<string, Array<{src: string, alt: string, caption: string, description: string}>> = {
  'plumber': [
    { 
      src: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&h=400&fit=crop&q=80', 
      alt: `Plumber repairing pipes in ${town.name}`, 
      caption: 'Emergency Pipe Repairs', 
      description: `Burst pipes and leaks don't wait. Our ${town.name} plumbers respond within 30–60 minutes for emergencies.` 
    },
    { 
      src: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=400&fit=crop&q=80', 
      alt: `Geyser installation in ${town.name}`, 
      caption: 'Solar & Electric Geysers', 
      description: `With ${town.name}'s excellent sunshine, solar geysers can cut your electricity bill by up to 40%.` 
    },
    { 
      src: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=400&fit=crop&q=80', 
      alt: `Verified plumber in ${town.name}`, 
      caption: 'Verified & Trusted', 
      description: 'Every plumber on ProHub is ID-verified with real customer reviews you can trust.' 
    },
  ],
  // ... other services
};
```

---

## 4. Hero Images (per service)

```typescript
const heroImages: Record<string, string> = {
  'plumber': 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1600&h=900&fit=crop&q=80',
  'electrician': 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1600&h=900&fit=crop&q=80',
  'pest-control': '/images/pest-control-insect.png',
  // ... etc
};
```

---

## 5. Service Definition (services.json)

Each service needs an entry in `data/services.json`:

```json
{
  "slug": "plumber",
  "name": "Plumber",
  "namePlural": "Plumbers",
  "category": "Home Services",
  "icon": "wrench",
  "metaTitle": "Best {namePlural} in {town} — Get Free Quotes | ProHub",
  "metaDescription": "Find verified {namePlural} in {town}. Get up to 5 free quotes, compare prices, and hire with confidence. Fast, free, trusted.",
  "heroTitle": "Find Trusted {namePlural} in {town}",
  "heroSubtitle": "Get up to 5 free quotes from verified local {namePlural}. Compare prices and reviews before you hire.",
  "pricing": [
    { "service": "Burst pipe repair", "range": "R350 – R1,200" },
    { "service": "Blocked drain", "range": "R400 – R1,500" },
    { "service": "Geyser installation", "range": "R8,000 – R15,000" },
    { "service": "Leak detection & repair", "range": "R500 – R2,000" },
    { "service": "Bathroom renovation", "range": "R15,000 – R60,000" },
    { "service": "Emergency callout", "range": "R500 – R1,500" }
  ],
  "diyVsPro": [
    { "task": "Replacing tap washers", "description": "Stop dripping taps", "diy": "yes", "pro": "optional" },
    { "task": "Unclogging slow drains", "description": "Plunger or drain cleaner", "diy": "yes", "pro": "if-persistent" },
    { "task": "Burst pipes", "description": "Water gushing, damage risk", "diy": "no", "pro": "urgent" },
    { "task": "Geyser installation", "description": "Electric or solar systems", "diy": "no", "pro": "required" },
    { "task": "Blocked sewer line", "description": "Main drainage issues", "diy": "no", "pro": "required" },
    { "task": "Bathroom renovation", "description": "Full refit with new fixtures", "diy": "no", "pro": "required" }
  ],
  "relatedServices": ["electrician", "handyman", "geyser-service", "waterproofing", "pool-service", "building-renovation"]
}
```

---

## 6. Town Definition (towns.json)

Each town needs an entry in `data/towns.json`:

```json
{
  "slug": "george",
  "name": "George",
  "province": "Western Cape",
  "region": "Garden Route",
  "nearbyTowns": ["wilderness", "sedgefield", "knysna", "mossel-bay", "oudtshoorn"],
  "localAreas": ["Blanco", "Denneoord", "Heatherlands", "Pacaltsdorp", "Thembalethu", "Herolds Bay", "Victoria Bay"]
}
```

---

## 7. Page Generation Process

### Adding a New Town (to existing service)

1. **Add to towns.json** — Create the town entry with all fields
2. **Create content JSON** — `data/content/live/{service}/{town-slug}.json`
3. **Write unique content:**
   - `guideIntro` — Town-specific introduction mentioning local areas, challenges, context
   - `guideServiceTypes` — Services relevant to this town
   - `guideDiyVsPro` — Local considerations for DIY vs professional
   - `guideWhatToExpect` — What happens after requesting quotes
   - `guideChoosingProvider` — Tips specific to this area
   - `faqs` — 5 questions with town-specific answers and pricing
4. **Use existing gallery** — Point to the same service images (generic)
5. **Deploy** — Push to GitHub, Vercel auto-builds

### Adding a New Service

1. **Add to services.json** — Full service definition
2. **Generate gallery images** — 6 images for the service
3. **Add hero image** — Update `heroImages` in page.tsx
4. **Add gallery fallback** — Update `serviceGalleryImages` in page.tsx
5. **Create content for each town** — 19 content JSON files
6. **Add to Supabase** — Category entry with matching slug
7. **Deploy**

### Content Writing Guidelines

**guideIntro should include:**
- Town's geographic/regional context
- Types of properties in the area (old vs new estates, commercial areas)
- Local challenges specific to this service
- Why professional help matters here

**FAQs should include:**
- Pricing question with local rates
- Emergency services availability
- How to find reliable providers
- Common local problems
- Service coverage areas

**Pricing in FAQs:**
- Use town-specific rates where possible
- Include callout fees, hourly rates, and common job prices
- Mention factors that affect pricing (distance, emergency rates)

---

## 8. Data Flow

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  services.json  │     │   towns.json    │     │  content/*.json │
│  (26 services)  │     │   (19 towns)    │     │ (town-specific) │
└────────┬────────┘     └────────┬────────┘     └────────┬────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │   [service]/[town]      │
                    │      page.tsx           │
                    └────────────┬────────────┘
                                 │
              ┌──────────────────┼──────────────────┐
              │                  │                  │
     ┌────────▼────────┐ ┌───────▼───────┐ ┌───────▼───────┐
     │   Supabase      │ │  Gallery      │ │  Static       │
     │   (providers,   │ │  Images       │ │  Content      │
     │   reviews,      │ │  (6 per       │ │  (FAQ, Guide, │
     │   stats)        │ │  service)     │ │  pricing)     │
     └─────────────────┘ └───────────────┘ └───────────────┘
```

---

## 9. Current Plumber Pages Status

All 19 towns have custom content:

| Town | Content File | Status |
|------|-------------|--------|
| Albertinia | `plumber/albertinia.json` | ✅ Live |
| Barrydale | `plumber/barrydale.json` | ✅ Live |
| Calitzdorp | `plumber/calitzdorp.json` | ✅ Live |
| De Rust | `plumber/de-rust.json` | ✅ Live |
| George | `plumber/george.json` | ✅ Live |
| Great Brak River | `plumber/great-brak-river.json` | ✅ Live |
| Hartenbos | `plumber/hartenbos.json` | ✅ Live |
| Knysna | `plumber/knysna.json` | ✅ Live |
| Ladismith | `plumber/ladismith.json` | ✅ Live |
| Mossel Bay | `plumber/mossel-bay.json` | ✅ Live |
| Nature's Valley | `plumber/natures-valley.json` | ✅ Live |
| Oudtshoorn | `plumber/oudtshoorn.json` | ✅ Live |
| Plettenberg Bay | `plumber/plettenberg-bay.json` | ✅ Live |
| Prince Albert | `plumber/prince-albert.json` | ✅ Live |
| Riversdale | `plumber/riversdale.json` | ✅ Live |
| Sedgefield | `plumber/sedgefield.json` | ✅ Live |
| Stillbaai | `plumber/stillbaai.json` | ✅ Live |
| Uniondale | `plumber/uniondale.json` | ✅ Live |
| Wilderness | `plumber/wilderness.json` | ✅ Live |

---

## 10. Checklist for New Pages

- [ ] Town exists in `towns.json`
- [ ] Service exists in `services.json`
- [ ] Content JSON created in `data/content/live/{service}/{town}.json`
- [ ] All required fields populated
- [ ] `guideIntro` is town-specific (not generic)
- [ ] FAQs include local pricing
- [ ] Gallery points to correct service images
- [ ] Status set to `"live"`
- [ ] Pushed to GitHub
- [ ] Verified on production

---

*Last updated: 2026-02-15*
