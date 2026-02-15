# Plumber — Gold Standard Reference

> **⭐ This is the reference implementation.** All other services should follow this exact structure, content format, and quality standard.

---

## Quick Reference

| Item | Location |
|------|----------|
| Full specification | `docs/PAGE_GENERATION_BLUEPRINT.md` |
| Content template | `docs/templates/plumber-content-template.json` |
| Live content | `data/content/live/plumber/*.json` |
| Gallery images | `public/images/plumber-*.png` |
| Hero image | Unsplash (in page.tsx) |

---

## Status: ✅ Complete

- **Content:** 19/19 towns
- **Images:** 6/6 gallery images
- **Template:** Saved

---

## Gallery Images (6)

| # | Filename | Service | Caption |
|---|----------|---------|---------|
| 1 | `plumber-burst-pipe-repair.png` | Emergency repairs | Burst Pipe Repair |
| 2 | `plumber-drain-unblocking.png` | Drain cleaning | Blocked Drain Cleaning |
| 3 | `plumber-geyser-installation.png` | Geyser work | Geyser Installation & Repair |
| 4 | `plumber-tap-repair.png` | Tap repairs | Leaking Tap Repairs |
| 5 | `plumber-toilet-repair.png` | Toilet repairs | Toilet Repairs |
| 6 | `plumber-pressure-testing.png` | Diagnostics | Water Pressure Issues |

### Image Descriptions

```json
[
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
]
```

---

## FAQ Topics (5)

Every plumber page includes these 5 FAQ questions:

1. **Pricing:** "How much does a plumber cost in {town}?"
   - Hourly rates (R400-R650)
   - Callout fees (R350-R550)
   - Common job prices (geyser, drain, tap, toilet)

2. **Emergency services:** "Do {town} plumbers offer emergency services?"
   - 24/7 availability
   - Emergency rates (1.5-2x standard)
   - How to mark request as urgent

3. **Finding reliable:** "How do I find a reliable plumber in {town}?"
   - ProHub verification
   - Reviews and ratings
   - PIRB/IOPSA registration
   - Written quotes

4. **Common problem:** "Why is my water pressure low in {town}?"
   - Ageing pipes
   - Municipal supply
   - Leak indicators
   - When to call professional

5. **Service areas:** "Which areas do {town} plumbers service?"
   - Local suburbs covered
   - Nearby towns
   - Travel fees

---

## Guide Sections (5)

### guideIntro
- Town's geographic/regional context
- Property mix (old vs new estates)
- Local plumbing challenges
- Why ProHub matters here

### guideServiceTypes
- Emergency repairs
- Geyser work (electric and solar)
- Drain unblocking
- Leak detection
- Toilet and tap repairs
- Repiping
- Water tanks/pumps
- Commercial services

### guideDiyVsPro
- What's safe to DIY (tap washers, plunger)
- What needs professional (burst pipes, geysers)
- Risks of DIY gone wrong
- Insurance implications

### guideWhatToExpect
- Quote process (up to 5 providers)
- Response times (emergency vs standard)
- What quotes should include
- Site visits for larger jobs

### guideChoosingProvider
- ProHub reviews
- PIRB/IOPSA registration
- CoC for geyser work
- Response time for emergencies
- Red flags

---

## Content Template Structure

See `docs/templates/plumber-content-template.json` for the complete example.

---

## When Adding New Plumber Towns

1. Copy `docs/templates/plumber-content-template.json`
2. Find/replace "George" with new town name
3. Rewrite `guideIntro` with local context:
   - Local suburbs and areas
   - Property types in the area
   - Specific challenges (water restrictions, old pipes, flooding)
4. Update FAQ answers with local pricing if different
5. Update gallery `alt` text with town name
6. Set status to `"live"` and update `lastUpdated`
7. Save to `data/content/live/plumber/{town-slug}.json`

---

## Files

```
prohub-seo/
├── docs/
│   ├── templates/
│   │   └── plumber-content-template.json  ← Copy this for new towns
│   └── services/
│       └── plumber.md                      ← This file
├── data/
│   └── content/
│       └── live/
│           └── plumber/
│               ├── george.json             ← Reference town
│               ├── knysna.json
│               ├── mossel-bay.json
│               └── ... (19 total)
└── public/
    └── images/
        ├── plumber-burst-pipe-repair.png
        ├── plumber-drain-unblocking.png
        ├── plumber-geyser-installation.png
        ├── plumber-tap-repair.png
        ├── plumber-toilet-repair.png
        └── plumber-pressure-testing.png
```

---

*This is the gold standard. When creating other services, follow this exact pattern.*
