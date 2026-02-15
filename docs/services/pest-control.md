# Pest Control Page Generation Blueprint

> **Purpose:** This document captures the exact structure and content format for pest control pages. Use this to ensure all future pest control pages match the George reference page exactly.

---

## Quick Reference

| Item | Location |
|------|----------|
| Service definition | `data/services.json` (slug: `pest-control`) |
| Reference content | `data/content/live/pest-control/george.json` |
| Template copy | `docs/templates/pest-control-content-template.json` |
| Gallery images | `public/images/pest-control-*.png` |
| Hero image | `/images/pest-control-insect.png` |

---

## 1. The 6 Pest Control Gallery Images

These images cover the core pest control services and are **reused across all towns**:

| Filename | Service | Alt Text | Caption |
|----------|---------|----------|---------|
| `pest-control-rodent.png` | Rodent control | Professional rodent control service setting bait stations in {town} property | Rodent Control |
| `pest-control-insect.png` | Insect treatment | Pest control technician treating home for cockroaches and insects in {town} | Insect Control |
| `pest-control-woodborer.png` | Wood borer certs | Wood borer inspection for compliance certificate in {town} home | Wood Borer Certificates |
| `pest-control-termite.png` | Termite treatment | Termite treatment and soil poisoning around {town} property foundation | Termite Control |
| `pest-control-proofing.png` | Bird/rodent proofing | Bird spikes and rodent proofing installation on {town} building | Bird & Rodent Proofing |
| `pest-control-bee-wasp.png` | Bee/wasp removal | Safe bee and wasp nest removal from {town} residential property | Bee & Wasp Removal |

---

## 2. Content JSON Structure

### Full Example: George (Reference Page)

```json
{
  "title": "Pest Control in George — Get Free Quotes | ProHub",
  "description": "Professional pest control services in George, Western Cape. Get up to 5 free quotes for rodents, insects, termites, wood borer certificates & bird proofing. Verified local experts.",
  "heroTitle": "Professional Pest Control in George",
  "heroSubtitle": "Get up to 5 free quotes from verified pest control experts. Protect your home or business from unwanted pests.",
  
  "guideIntro": "George's unique location at the foot of the Outeniqua Mountains, combined with its mild, humid climate, creates ideal conditions for a wide range of pests. From the older suburbs of Denneoord and Pacaltsdorp where ageing structures attract rodents and wood borers, to the coastal dampness near Herolds Bay that brings cockroaches indoors, pest problems in George require local expertise. The town's mix of residential estates, commercial centres along York Street, and surrounding farmland means pest controllers here deal with everything from restaurant infestations to compliance certificates for property sales. ProHub connects George residents and businesses with verified pest control professionals who understand the region's seasonal pest patterns and can respond quickly to both emergency callouts and scheduled treatments.",

  "guideServiceTypes": "George pest control companies offer comprehensive services tailored to the Garden Route's pest challenges. Common treatments include rodent control using tamper-proof bait stations, traps, and exclusion methods for rats and mice; insect control covering cockroaches, ants, fleas, bedbugs, and general household pests; wood borer inspections and fumigation with compliance certificates required for property transfers; termite inspections and soil treatments for pre-construction and existing buildings; bird and rodent proofing including spike installations, mesh barriers, and entry point sealing; and bee and wasp nest removal with honeybee relocation options where possible. Many George pest controllers also provide HACCP-compliant programmes for restaurants and food businesses.",

  "guideDiyVsPro": "Hardware store sprays might knock down a few visible insects, but they won't solve an infestation. Pests like German cockroaches breed rapidly in hidden areas — behind fridges, inside wall cavities, under sinks — where surface sprays don't reach. DIY rodent control often fails because rats are neophobic (fear new objects) and will avoid poorly placed traps for weeks. Wood borer and termite treatments require specialised detection equipment and registered pesticides that aren't available to consumers. For bee or wasp nests, attempting removal without proper protection risks serious stings and, for those with allergies, life-threatening reactions. Professional pest controllers use commercial-grade products, know exactly where pests hide, and provide certificates and guarantees on their work.",

  "guideWhatToExpect": "When you submit a pest control request through ProHub, up to 5 verified George pest controllers receive your details. Most respond within hours — faster for urgent infestations. Expect questions about the type of pest, severity of the problem, and property size. For wood borer certificates and termite inspections, companies will need to conduct a physical inspection before providing final pricing. Quotes should include the treatment method, products used, safety information (especially important if you have children or pets), any certificates provided, and follow-up visits included. For ongoing pest management, many George companies offer monthly or quarterly service contracts at reduced rates.",

  "guideChoosingProvider": "Look beyond price when selecting a pest controller. Check that they're registered with the Department of Agriculture and hold valid pesticide applicator certifications. Read ProHub reviews for comments about effectiveness — did the pests actually stay gone? — and professionalism. Ask about their guarantee policy: reputable companies offer free follow-up treatments if pests return within a specified period. For wood borer certificates, ensure they're qualified to issue certificates recognised by conveyancing attorneys. Companies that take time to explain the treatment process and provide aftercare instructions typically deliver better results than those offering suspiciously cheap quotes.",

  "faqs": [
    {
      "question": "How much does pest control cost in George?",
      "answer": "George pest control prices vary by treatment type and property size. General insect spray for a 3-bedroom home typically costs R800-R1,500. Rodent control programmes run R600-R1,200 initially plus R300-R500 for follow-ups. Wood borer certificates cost R1,500-R3,500 including treatment if required. Termite treatments range from R5,000-R25,000 depending on severity. Get multiple ProHub quotes to compare — prices vary significantly between companies."
    },
    {
      "question": "What pests are common in George?",
      "answer": "George's humid Garden Route climate supports diverse pest populations. Most common are German and American cockroaches (especially near the coast), rats and mice (prevalent in older suburbs and near restaurants), and wood borers in roof timbers and furniture. Seasonal pests include wasps from spring through autumn and increased rodent activity in winter. Pigeons are a growing problem in commercial areas, requiring bird proofing solutions."
    },
    {
      "question": "Do I need a wood borer certificate when selling my house in George?",
      "answer": "Yes, most conveyancing attorneys in George require a wood borer and beetle-free certificate before property transfer. A qualified pest inspector examines roof timbers, wooden floors, door frames, and furniture for signs of active infestation or previous damage. If treatment is needed, the property is fumigated and a clearance certificate issued. Budget R1,500-R3,500 depending on property size and whether treatment is required."
    },
    {
      "question": "How do I keep rodents out of my George property?",
      "answer": "Prevention is key for rodent control. Seal gaps around pipes, under doors, and in walls — mice can squeeze through 6mm gaps. Store food in sealed containers, keep bins closed, and remove pet food at night. Trim vegetation away from buildings and clear clutter that provides hiding spots. For active infestations, professional baiting programmes are more effective than DIY traps. Our George pest controllers can also install proofing measures to prevent re-entry."
    },
    {
      "question": "Do George pest controllers offer emergency callouts?",
      "answer": "Yes, many George pest control companies offer same-day or emergency services for urgent situations like wasp nest discoveries, snake sightings, or severe infestations. Weekend and after-hours callouts typically carry a premium of R200-R500. When submitting your ProHub request, mark it as urgent and describe the situation clearly to get faster responses from available providers."
    }
  ],
  
  "gallery": [
    {
      "url": "/images/pest-control-rodent.png",
      "alt": "Professional rodent control service setting bait stations in George property",
      "caption": "Rodent Control",
      "description": "Effective rat and mouse control using tamper-proof bait stations, traps, and exclusion methods. We eliminate infestations and prevent rodents returning to your property."
    },
    {
      "url": "/images/pest-control-insect.png",
      "alt": "Pest control technician treating home for cockroaches and insects in George",
      "caption": "Insect Control",
      "description": "Comprehensive treatment for cockroaches, ants, fleas, bedbugs, and household insects. Professional-grade products that reach where DIY sprays can't."
    },
    {
      "url": "/images/pest-control-woodborer.png",
      "alt": "Wood borer inspection for compliance certificate in George home",
      "caption": "Wood Borer Certificates",
      "description": "Professional wood borer inspections and fumigation with compliance certificates for property sales. Required by conveyancing attorneys for property transfer."
    },
    {
      "url": "/images/pest-control-termite.png",
      "alt": "Termite treatment and soil poisoning around George property foundation",
      "caption": "Termite Control",
      "description": "Protect your property from costly termite damage. We provide inspections, soil treatments, and ongoing monitoring to keep termites away."
    },
    {
      "url": "/images/pest-control-proofing.png",
      "alt": "Bird spikes and rodent proofing installation on George building",
      "caption": "Bird & Rodent Proofing",
      "description": "Stop pests getting in with professional proofing. We install bird spikes, mesh barriers, and seal entry points to prevent infestations."
    },
    {
      "url": "/images/pest-control-bee-wasp.png",
      "alt": "Safe bee and wasp nest removal from George residential property",
      "caption": "Bee & Wasp Removal",
      "description": "Safe removal of bee hives and wasp nests by trained professionals. We offer honeybee relocation where possible and eliminate aggressive wasp colonies."
    }
  ],
  
  "status": "live",
  "lastUpdated": "2026-02-15T08:10:00.000Z"
}
```

---

## 3. Service Definition (from services.json)

```json
{
  "slug": "pest-control",
  "name": "Pest Control",
  "namePlural": "Pest Control Services",
  "category": "Home Services",
  "icon": "bug",
  "metaTitle": "Best {namePlural} in {town} — Get Free Quotes | ProHub",
  "metaDescription": "Find verified {namePlural} in {town}. Get up to 5 free quotes, compare prices, and hire with confidence. Fast, free, trusted.",
  "heroTitle": "Find Trusted {namePlural} in {town}",
  "heroSubtitle": "Get up to 5 free quotes from verified local pest control experts. Compare prices and reviews before you hire.",
  "pricing": [
    { "service": "General pest spray", "range": "R450 – R900" },
    { "service": "Cockroach treatment", "range": "R400 – R800" },
    { "service": "Rodent control", "range": "R600 – R1,500" },
    { "service": "Termite inspection", "range": "R500 – R1,200" },
    { "service": "Termite treatment", "range": "R3,000 – R15,000" },
    { "service": "Fumigation", "range": "R2,500 – R8,000" }
  ],
  "diyVsPro": [
    { "task": "Ant traps", "description": "Small ant problems", "diy": "yes", "pro": "optional" },
    { "task": "Bug spray", "description": "Occasional flying insects", "diy": "yes", "pro": "if-persistent" },
    { "task": "Cockroach infestation", "description": "Recurring problem", "diy": "no", "pro": "required" },
    { "task": "Rodent infestation", "description": "Rats or mice", "diy": "no", "pro": "required" },
    { "task": "Termites", "description": "Wood damage visible", "diy": "no", "pro": "urgent" },
    { "task": "Bed bugs", "description": "Bites appearing", "diy": "no", "pro": "required" }
  ],
  "relatedServices": ["cleaning-service", "garden-service", "handyman", "waterproofing", "roofing", "building-renovation"]
}
```

---

## 4. Hero Image

The pest control hero image is set in `page.tsx`:

```typescript
'pest-control': '/images/pest-control-insect.png',
```

This uses the insect control image as the hero background.

---

## 5. Content Writing Guidelines for Pest Control

### guideIntro Should Include:
- Town's climate and how it affects pest populations
- Types of properties (old vs new, residential vs commercial)
- Specific suburbs/areas mentioned
- Local pest challenges unique to this town
- Connection to ProHub and verified providers

### guideServiceTypes Should Cover:
1. **Rodent control** — bait stations, traps, exclusion
2. **Insect control** — cockroaches, ants, fleas, bedbugs
3. **Wood borer** — inspections, fumigation, certificates
4. **Termites** — inspections, soil treatments, pre-construction
5. **Bird & rodent proofing** — spikes, mesh, sealing
6. **Bee & wasp removal** — safe removal, relocation options
7. **Commercial services** — HACCP compliance for restaurants

### guideDiyVsPro Key Points:
- Surface sprays don't reach hidden breeding areas
- Rats are neophobic — avoid poorly placed traps
- Wood borer/termite treatments need registered pesticides
- Bee/wasp removal dangerous without protection
- Professionals provide certificates and guarantees

### guideWhatToExpect:
- Up to 5 quotes from verified providers
- Response time (hours, faster for urgent)
- Questions they'll ask (pest type, severity, property size)
- Wood borer certs need physical inspection
- What quotes should include
- Service contract options

### guideChoosingProvider:
- Department of Agriculture registration
- Pesticide applicator certifications
- ProHub reviews (effectiveness, professionalism)
- Guarantee policies
- Wood borer certificate qualifications
- Red flags (suspiciously cheap quotes)

### FAQ Topics (5 questions):
1. **Pricing** — Local rates for each service type
2. **Common pests** — Town-specific pest populations
3. **Wood borer certificates** — Legal requirements for property sales
4. **Prevention tips** — Rodent/pest prevention advice
5. **Emergency services** — Same-day/after-hours availability

---

## 6. Town-Specific Customisation

When creating content for a new town, customise:

| Field | What to Change |
|-------|----------------|
| `title` | Replace town name |
| `description` | Replace town name, mention province |
| `heroTitle` | Replace town name |
| `guideIntro` | Rewrite entirely with local context |
| `guideServiceTypes` | Adapt to local industry (tourism, farming, etc.) |
| `guideWhatToExpect` | Mention nearby areas for travel fees |
| `guideChoosingProvider` | Keep mostly the same |
| `faqs[0].answer` | Update pricing if significantly different |
| `faqs[1].answer` | Adapt for local climate/pest populations |
| `faqs[2].answer` | Keep mostly the same (legal requirement) |
| `faqs[3].answer` | Keep mostly the same (general advice) |
| `faqs[4].answer` | Keep mostly the same |
| `gallery[*].alt` | Replace town name in alt text |

### Gallery: Always Use the Same 6 Images

The gallery section should be **identical** for all towns except for the `alt` text which includes the town name:

```json
"gallery": [
  {
    "url": "/images/pest-control-rodent.png",
    "alt": "Professional rodent control service setting bait stations in {TOWN} property",
    "caption": "Rodent Control",
    "description": "Effective rat and mouse control using tamper-proof bait stations, traps, and exclusion methods. We eliminate infestations and prevent rodents returning to your property."
  },
  // ... same pattern for all 6 images
]
```

---

## 7. Generation Checklist for New Pest Control Pages

- [ ] Town exists in `data/towns.json`
- [ ] Create `data/content/live/pest-control/{town-slug}.json`
- [ ] Copy from template: `docs/templates/pest-control-content-template.json`
- [ ] Find/replace town name throughout
- [ ] Rewrite `guideIntro` with town-specific context:
  - [ ] Local climate/geography
  - [ ] Property types and suburbs
  - [ ] Local industries (restaurants, farms, holiday homes)
  - [ ] Specific pest challenges
- [ ] Update FAQ pricing if significantly different from George
- [ ] Update FAQ pest populations for local climate
- [ ] Update all `alt` text in gallery with town name
- [ ] Set `status` to `"live"`
- [ ] Set `lastUpdated` to current date
- [ ] Push to GitHub
- [ ] Verify on production: `https://prohub.co.za/pest-control/{town-slug}`

---

## 8. Current Status

| Town | Content Status |
|------|----------------|
| George | ✅ Live (reference page) |
| Albertinia | ❌ Pending |
| Barrydale | ❌ Pending |
| Calitzdorp | ❌ Pending |
| De Rust | ❌ Pending |
| Great Brak River | ❌ Pending |
| Hartenbos | ❌ Pending |
| Knysna | ❌ Pending |
| Ladismith | ❌ Pending |
| Mossel Bay | ❌ Pending |
| Nature's Valley | ❌ Pending |
| Oudtshoorn | ❌ Pending |
| Plettenberg Bay | ❌ Pending |
| Prince Albert | ❌ Pending |
| Riversdale | ❌ Pending |
| Sedgefield | ❌ Pending |
| Stillbaai | ❌ Pending |
| Uniondale | ❌ Pending |
| Wilderness | ❌ Pending |

---

## 9. Related Files

- **Main blueprint:** `docs/PAGE_GENERATION_BLUEPRINT.md`
- **Template:** `docs/templates/pest-control-content-template.json`
- **Page component:** `src/app/[service]/[town]/page.tsx`
- **Supabase queries:** `src/lib/supabase.ts`

---

*Last updated: 2026-02-15*
