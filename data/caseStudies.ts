import { ProjectStatus } from '../components/ProjectStatusBadge';

// Polymorphic Section Content Types
export interface ParagraphSection {
  type: 'paragraph';
  id: string;
  title: string;
  content: string;
}

export interface BulletListSection {
  type: 'bulletList';
  id: string;
  title: string;
  items: string[];
}

export interface KeyValueSection {
  type: 'keyValue';
  id: string;
  title: string;
  items: { key: string; value: string }[];
}

export interface TagRowSection {
  type: 'tagRow';
  id: string;
  title: string;
  tags: string[];
}

export interface MetricItem {
  value: string;
  label: string;
  description?: string;
}

export interface MetricsRowSection {
  type: 'metricsRow';
  id: string;
  title: string;
  metrics: MetricItem[];
}

export interface CalloutSection {
  type: 'callout';
  id: string;
  title: string;
  text: string;
  variant?: 'info' | 'warning' | 'success' | 'amber';
}

export type CaseStudySection =
  | ParagraphSection
  | BulletListSection
  | KeyValueSection
  | TagRowSection
  | MetricsRowSection
  | CalloutSection;

export interface CaseStudy {
  slug: string;
  name: string;
  oneLiner: string;
  status?: ProjectStatus;
  statusLabel?: string;
  tags?: string[];
  terminalUrl?: string;
  sections?: CaseStudySection[];
}

// Rendering rule helper: check if text is a placeholder containing square brackets
export function hasPlaceholder(str?: string): boolean {
  if (!str) return false;
  return /\[.*?\]/.test(str);
}

// Clean text by stripping out any bracketed placeholders
export function cleanText(str?: string): string {
  if (!str) return '';
  return str.replace(/\[.*?\]/g, '').trim();
}

// Filter case study sections to only those with valid, visible content
export function getVisibleSections(sections?: CaseStudySection[]): CaseStudySection[] {
  if (!sections || sections.length === 0) return [];

  return sections
    .map((section): CaseStudySection | null => {
      if (section.type === 'paragraph') {
        const cleaned = cleanText(section.content);
        if (!cleaned) return null;
        return { ...section, content: cleaned };
      }

      if (section.type === 'bulletList') {
        const validItems = section.items
          .map((item) => cleanText(item))
          .filter((item) => item.length > 0 && !hasPlaceholder(item));
        if (validItems.length === 0) return null;
        return { ...section, items: validItems };
      }

      if (section.type === 'keyValue') {
        const validItems = section.items.filter(
          (kv) =>
            !hasPlaceholder(kv.key) &&
            !hasPlaceholder(kv.value) &&
            kv.key.trim().length > 0 &&
            kv.value.trim().length > 0
        );
        if (validItems.length === 0) return null;
        return { ...section, items: validItems };
      }

      if (section.type === 'tagRow') {
        const validTags = section.tags.filter(
          (t) => !hasPlaceholder(t) && t.trim().length > 0
        );
        if (validTags.length === 0) return null;
        return { ...section, tags: validTags };
      }

      if (section.type === 'metricsRow') {
        const validMetrics = section.metrics.filter(
          (m) =>
            !hasPlaceholder(m.value) &&
            !hasPlaceholder(m.label) &&
            m.value.trim().length > 0 &&
            m.label.trim().length > 0
        );
        if (validMetrics.length === 0) return null;
        return { ...section, metrics: validMetrics };
      }

      if (section.type === 'callout') {
        const cleaned = cleanText(section.text);
        if (!cleaned) return null;
        return { ...section, text: cleaned };
      }

      return section;
    })
    .filter((sec): sec is CaseStudySection => sec !== null);
}

export const caseStudies: Record<string, CaseStudy> = {
  klavora: {
    slug: 'klavora',
    name: 'Klavora',
    oneLiner:
      'A multi-tenant SaaS that helps Ghanaian pharmacies track stock, expiry, and sales, and keeps them running through unreliable internet.',
    status: 'live',
    statusLabel: 'Active',
    terminalUrl: 'klavora.store',
    tags: ['React', 'TypeScript', 'Supabase', 'Prisma', 'PostgreSQL', 'Paystack'],
    sections: [
      {
        type: 'paragraph',
        id: 'problem',
        title: 'Problem',
        content:
          'Most independent pharmacies in Ghana run on notebooks or spreadsheets. Expired stock gets sold or written off late, stockouts go unnoticed, and controlled substances are hard to audit. The cost is direct: wasted stock, compliance risk, lost sales.',
      },
      {
        type: 'paragraph',
        id: 'users',
        title: 'Users',
        content:
          'Pharmacy owners (visibility and loss prevention), pharmacists and staff (fast selling), platform admins (subscriptions and support).',
      },
      {
        type: 'bulletList',
        id: 'key-decisions',
        title: 'Key Decisions',
        items: [
          'FEFO batch management (First-Expired-First-Out): pharmacies lose money on expiry, so the earliest-expiring batch is dispensed first.',
          'Multi-drug basket POS: the first version sold one drug at a time; real counter transactions are baskets, so the flow was replaced.',
          'MedImport CSV bulk onboarding: a pharmacy with thousands of SKUs won\'t type them in by hand. Cutting onboarding friction was a growth decision as much as a feature.',
          'Controlled substances register and expired-batch soft-delete with a waste log, so every loss leaves an audit trail.',
          'WhatsApp alerts over email for low-stock and expiry notices (Termii/Twilio), because users live on WhatsApp and rarely check email.',
          'Grace-period subscription model: an expired subscription used to lock a pharmacy into read-only mode. Now they keep working, the admin dashboard flags them as overdue, and staff call to discuss renewal or a grace extension. B2B relationships in this market are built personally, and a hard lockout mid-shift is both harmful and bad for retention.',
        ],
      },
      {
        type: 'bulletList',
        id: 'architecture',
        title: 'Architecture',
        items: [
          'Frontend: React, Vite, TypeScript, Tailwind on Vercel.',
          'Backend: Node.js, Express, Prisma, PostgreSQL.',
          'Offline-first PWA with IndexedDB sync and heartbeat-based offline detection (health ping every 15 seconds). Connectivity is the biggest reliability risk in the target market, so selling cannot depend on it.',
          'Payments via Paystack with HMAC-verified webhooks.',
          'Transactional email (OTP, invites, alerts, reminders) via Resend.',
          'Maintenance mode is a flag in a system_settings table, so the system can go down gracefully without a deploy.',
          'Hosting moved from Railway to an Oracle Cloud VPS (ARM A1.Flex) for cost sustainability on a bootstrapped product.',
        ],
      },
      {
        type: 'bulletList',
        id: 'engineering',
        title: 'Engineering Problems Solved',
        items: [
          'Paystack webhook signature failures: express.json() altered the raw body and broke HMAC verification; fixed by capturing the raw body for the webhook route.',
          'Prisma P2028 transaction timeouts on bulk CSV import: fixed with createMany and an extended transaction timeout.',
          'Subscription routing bug that mis-sent expired vs. grace-period users.',
          'CORS cache-control header whitelist issue.',
          'Load testing with k6 and a staging environment before pitching to real pharmacies.',
        ],
      },
      {
        type: 'bulletList',
        id: 'tradeoffs',
        title: 'Tradeoffs',
        items: [
          'Offline mode adds sync-conflict complexity; accepted because the alternative fails exactly when customers need it.',
          'The human-in-the-loop renewal process does not scale to hundreds of clients; right for the first 20 to 50 customers, to be automated later.',
          'Self-managing a VPS costs ops time but removes the recurring hosting bill.',
        ],
      },
      {
        type: 'paragraph',
        id: 'delivery',
        title: 'Delivery',
        content:
          'Solo build with a collaborator on the landing page and frontend. Wrote the PRD and partner-facing product documentation, prioritized the backlog, ran outreach to pharmacies, and set pricing. Planned extension: Klavora Finder, a consumer-facing drug-availability map.',
      },
    ],
  },

  verdis: {
    slug: 'verdis',
    name: 'Verdis',
    oneLiner:
      'Weather-aware crop guidance for Ghanaian smallholder farmers, built on district-level data.',
    status: 'live',
    statusLabel: 'Completed',
    terminalUrl: 'verdis-farm.vercel.app',
    tags: ['Python', 'Gemini RAG', 'Open-Meteo', 'BeautifulSoup'],
    sections: [
      {
        type: 'paragraph',
        id: 'problem',
        title: 'Problem',
        content:
          'Smallholder farmers make planting and disease decisions on instinct or hearsay while climate variability makes those decisions riskier each season. Generic weather apps don\'t map to crops, and no usable dataset of Ghana\'s districts existed.',
      },
      {
        type: 'paragraph',
        id: 'users',
        title: 'Users',
        content:
          'Smallholder farmers (primary); agricultural extension officers and NGOs (secondary, as distribution channels).',
      },
      {
        type: 'bulletList',
        id: 'key-decisions',
        title: 'Key Decisions',
        items: [
          'PlantWise: what to plant and when, based on location and weather (Open-Meteo plus Nominatim geocoding).',
          'CropDoctor: symptom-based disease diagnosis using a weighted expert system plus Gemini RAG for explanation.',
          'WeatherAware: a 16-day forecast framed around farm actions rather than raw meteorology.',
        ],
      },
      {
        type: 'bulletList',
        id: 'architecture',
        title: 'Architecture',
        items: [
          'Data gap: no clean Ghana district dataset existed, so a Python/BeautifulSoup scraper collected it. This removed a hard blocker and made the data a differentiator.',
          'Hybrid diagnosis (expert system plus LLM): a pure LLM can hallucinate on high-stakes agricultural advice. The weighted expert system is deterministic and auditable; the RAG layer handles explanation and follow-up, grounded in retrieved content.',
          'Free, open weather and geocoding APIs keep unit costs near zero, which matters for low-income users.',
        ],
      },
      {
        type: 'bulletList',
        id: 'tradeoffs',
        title: 'Tradeoffs',
        items: [
          'Expert-system rules need domain validation; agronomist review planned before real-world launch.',
          'Open APIs create dependency risk, mitigated with caching and graceful fallbacks.',
          'Mobile-first, low-bandwidth design matters more than feature breadth for this audience.',
        ],
      },
      {
        type: 'paragraph',
        id: 'delivery',
        title: 'Delivery',
        content:
          'Full PRD, technical abstract, GitHub README, A1 research poster, UI generation prompts, prototype data pipelines, and interactive Python dashboards that turn data into actionable guidance.',
      },
    ],
  },

  beam: {
    slug: 'beam',
    name: 'Beam',
    oneLiner:
      'Cast your Android screen to a browser over your own network, with no cloud, no account, and nothing to install on the viewing device.',
    status: 'live',
    statusLabel: 'Live',
    terminalUrl: 'beam-livecast.vercel.app',
    tags: ['Kotlin', 'Android', 'Wi-Fi', 'PWA-style web viewer', 'Serverless'],
    sections: [
      {
        type: 'paragraph',
        id: 'problem',
        title: 'Problem',
        content:
          'Showing a phone screen on a bigger display usually means installing apps on both devices, signing up for an account, or routing video through someone else\'s servers. That adds friction, hurts privacy, and fails when mobile data is unavailable. People presenting, demoing, or teaching just want to open a link and see the screen.',
      },
      {
        type: 'paragraph',
        id: 'users',
        title: 'Users',
        content:
          'Developers and students demoing apps, teachers and presenters sharing a phone on a bigger screen, and anyone who needs a quick screen share with no setup on the receiving side.',
      },
      {
        type: 'bulletList',
        id: 'key-decisions',
        title: 'Key Decisions',
        items: [
          'Serverless by design: there is no backend, no authentication, and no database in v1. The stream travels directly from the phone to the browser on the same network. This removes hosting cost and a whole class of privacy and security risk, and it means there is no user data to leak. I treated this as a product constraint, not a shortcut.',
          'Browser as the viewer: nothing to install on the receiving device. The viewer is a web page, so any laptop, desktop, or TV browser can receive a cast.',
          'Pairing flow with explicit consent: the user pastes a one-time link generated by the phone, the viewer shows a code, the code appears on the phone only once the viewer is detected, and the phone must approve before any screen is shared. Links change on every cast and expire (2 to 30 minutes), so a leaked link is short-lived.',
          'Phone to browser first: casting in the other direction, a Windows app, and keyboard/mouse control were deliberately postponed to later versions to ship one thing that works end to end.',
          'Native Kotlin over a cross-platform framework: screen capture and background services need deep Android integration, so I chose native for reliability.',
          'Beam keeps running when the user leaves the app until they stop it explicitly, and Pause genuinely pauses the stream, because a screen share that silently stops is worse than none.',
          'Privacy by default: session history is stored locally on the device only, never uploaded.',
        ],
      },
      {
        type: 'bulletList',
        id: 'architecture',
        title: 'Architecture',
        items: [
          'Android app (Kotlin): handles network detection, link and code generation, the approval flow, system screen capture permission, and the streaming engine, running as a foreground service so it survives backgrounding.',
          'Web viewer: a static page that connects to the phone\'s address on the local network, completes the code handshake, and renders the incoming stream, with quality settings (low, medium, high) and the ability to stretch or expand the view.',
          'Landing site: a public page explaining the product, with a Get started flow that leads to the viewer, plus terms of service and developer info.',
          'Connection modes: Wi-Fi is working end to end. Hotspot and USB modes share the same engine and are planned next.',
          'Test-mode logging: an embedded activity and error log in both the app and the viewer, so every failure in the handshake or stream can be inspected quickly while debugging.',
        ],
      },
      {
        type: 'bulletList',
        id: 'engineering',
        title: 'Engineering Problems Solved',
        items: [
          'Built the pairing handshake (link, code, approval, capture permission) across two independent clients with no server to coordinate them.',
          'Debugged a stage where the phone showed live capture but the browser stayed on "awaiting approval", by tracing the handshake step by step and fixing it before touching anything else. The result: Wi-Fi casting works end to end from phone to browser.',
          'Replaced a simulated prototype (fake status bar, fake history, pretend permissions) with a real engine: real permission prompts, real network detection, real history and settings.',
          'Worked around constrained dev hardware (8 GB RAM, no emulator): built an APK, installed it directly on a physical phone, and iterated through short test loops.',
        ],
      },
      {
        type: 'bulletList',
        id: 'tradeoffs',
        title: 'Tradeoffs',
        items: [
          'No backend means no analytics, accounts, or remote control, which is a deliberate trade for privacy and zero hosting cost.',
          'Casting works over the local network, so both devices must be reachable on the same Wi-Fi or hotspot.',
          'Shipping a Wi-Fi-only first release means less coverage at launch, in exchange for a stable core before adding other modes.',
          'A native Android app limits v1 to Android, in exchange for reliability of capture and background behavior.',
        ],
      },
      {
        type: 'paragraph',
        id: 'delivery',
        title: 'Delivery',
        content:
          'Solo project. Wrote the product requirements and the v1 scope, designed the web viewer, landing page, and Android UI (Stitch and Figma), broke the Kotlin work into small steps for AI coding agents, and tested on real devices, including on a different network. Not a commercial product: built as a portfolio and technical exploration project.',
      },
      {
        type: 'callout',
        id: 'outcome',
        title: 'Outcome',
        text: 'Status: Live at beam-livecast.vercel.app with APK release and web viewer running end-to-end.',
        variant: 'success',
      },
    ],
  },

  namecheckgh: {
    slug: 'namecheckgh',
    name: 'NameCheckGH',
    oneLiner:
      'Check whether a business name is available in Ghana before you start the registration process.',
    status: 'live',
    statusLabel: 'Completed',
    terminalUrl: 'namecheckgh.vercel.app',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    sections: [
      {
        type: 'paragraph',
        id: 'problem',
        title: 'Problem',
        content:
          'Entrepreneurs fill in registry forms, wait, and only then learn the name is taken, wasting days and sometimes fees. The failure is late feedback on a simple question.',
      },
      {
        type: 'paragraph',
        id: 'users',
        title: 'Users',
        content:
          'First-time founders, SMEs, and registration agents.',
      },
      {
        type: 'paragraph',
        id: 'key-decisions',
        title: 'Key Decisions',
        content:
          'Move validation to the start of the journey. The product answers one question, "can I use this name?", instantly. Scope was deliberately kept narrow, with no registration flow, because a single-purpose tool is faster to ship, easier to explain, and a natural top-of-funnel for adjacent services.',
      },
    ],
  },

  rikelm: {
    slug: 'rikelm',
    name: 'Rikelm',
    oneLiner:
      'A fast, mobile-first commerce store on a headless architecture, with international payments that work from Ghana.',
    status: 'coming-soon',
    statusLabel: 'In development · Coming soon',
    terminalUrl: 'rikelm.com',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Paystack'],
    sections: [
      {
        type: 'paragraph',
        id: 'problem',
        title: 'Problem',
        content:
          'Dropshipping stores usually look like templated clones. The goal was a distinct brand experience, multi-currency selling, and payments that work for a Ghana-based merchant.',
      },
      {
        type: 'bulletList',
        id: 'key-decisions',
        title: 'Key Decisions',
        items: [
          'One unified catalog: skincare, recovery, and eco-essentials appear as a single collection with tag-based filters instead of category menus, so the store feels curated.',
          'Editorial/minimal UI (off-white, charcoal text, cobalt accent, hairline dividers, sharp corners), chosen over an earlier neo-brutalist direction for brand fit: calm and premium suits skincare, and it is lighter to render on low-end phones.',
          'Mobile-first with an app-style bottom nav and PWA install support, because most traffic will be on phones.',
          '"Pip", a reactive mascot with an adjustable intensity setting (full, moderate, off), giving the brand personality without becoming an annoyance.',
        ],
      },
      {
        type: 'bulletList',
        id: 'architecture',
        title: 'Architecture',
        items: [
          'Frontend: Next.js (App Router, TypeScript, Tailwind), Zustand for state.',
          'Backend: Medusa v2 headless commerce on Supabase Postgres, across four regions and currencies (GHS, USD, GBP, EUR).',
          'Payments: a custom Paystack payment provider. Stripe was dropped because Ghana is not supported for direct Stripe accounts, and Paystack alone covers international cards.',
          'Why headless: full control over the frontend, with commerce logic (cart, regions, orders) handled by a proven engine instead of built from scratch.',
        ],
      },
      {
        type: 'bulletList',
        id: 'engineering',
        title: 'Engineering Problems Solved',
        items: [
          'Cart failures traced to a missing Stock Location and Sales Channel configuration in Medusa. Account creation and sign-in verified against the real backend.',
          'Status: Password-reset OTP is still simulated, pending Resend integration. Shown openly as honest scoping.',
        ],
      },
    ],
  },
};
