export interface FrameworkStep {
  title: string;
  detail: string;
}

export interface FrameworkPhase {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  goal: string;
  steps: FrameworkStep[];
  stack?: string[];
  outputs: string[];
  exitCriteria: string;
  proof?: string[];
}

export interface FrameworkPrinciple {
  id: string;
  statement: string;
}

export interface ExecutionFrameworkData {
  title: string;
  subtitle: string;
  badge: string;
  phases: FrameworkPhase[];
  principles: FrameworkPrinciple[];
  closingCta: {
    heading: string;
    projectsLabel: string;
    contactLabel: string;
  };
}

export const executionFramework: ExecutionFrameworkData = {
  title: "How I Build",
  subtitle:
    "My execution framework, from problem to production. Three phases, each with defined outputs and exit criteria.",
  badge: "Execution Operating System",
  phases: [
    {
      id: "phase-1",
      number: "01",
      title: "Product Scoping & UI/UX",
      shortTitle: "Scoping & UI/UX",
      goal: "Turn a vague problem into strict, buildable requirements before any code is written.",
      steps: [
        {
          title: "Problem discovery",
          detail:
            "Talk to real users in the target market (e.g. direct outreach to pharmacies for Klavora) and write down the actual workflow being replaced, whether notebook, spreadsheet, or WhatsApp.",
        },
        {
          title: "Scope control",
          detail:
            "Define what the product will NOT do. Example: NameCheckGH answers one question (is this name available?) and does not attempt registration; Tally replaces a manual notebook rather than being a full accounting suite.",
        },
        {
          title: "Wireframes and design direction",
          detail:
            "Decide the UI type from the user's context. Example: Rikelm uses an editorial/minimal mobile-first UI with an app-style bottom nav because most traffic is on phones; Klavora uses a fast, basket-based POS flow because pharmacists sell multi-item transactions.",
        },
        {
          title: "PRD",
          detail:
            "Every project gets a written PRD covering problem, users, scope, features, data model, risks, and success metrics.",
        },
      ],
      outputs: ["PRD", "Wireframes", "Prioritized backlog", "Scoped MVP"],
      exitCriteria:
        "A developer (or an AI agent) can build from the document without asking me questions.",
      proof: [
        "Verdis shipped with a full PRD, technical abstract, README, and poster.",
        "Klavora has PRD plus partner-facing product documentation.",
      ],
    },
    {
      id: "phase-2",
      number: "02",
      title: "AI-Accelerated Engineering",
      shortTitle: "AI Engineering",
      goal: "Ship at solo-builder speed without sacrificing code quality or architecture.",
      steps: [
        {
          title: "Architect & product owner role",
          detail:
            "I act as architect and product owner. I define architecture, data models, and constraints, then direct AI agents (Claude for architecture and planning, Cursor, v0, and Antigravity for implementation) to build against them.",
        },
        {
          title: "Prompts as production specs",
          detail:
            "Prompts are treated like specs: complete, production-ready, with context, constraints, acceptance criteria, and explicit 'do not' rules. Prompts are versioned and refined iteratively when output deviates.",
        },
        {
          title: "Human review gate",
          detail:
            "Every change is reviewed against the PRD. AI output is never merged on trust.",
        },
        {
          title: "Constraint-driven API & integration decisions",
          detail:
            "API and integration decisions are made on real constraints. Example: Stripe was dropped from Rikelm because Ghana is not supported for direct Stripe accounts; a custom Paystack provider covers international cards. WhatsApp alerts (Termii/Twilio) were chosen over email for Klavora because that is where users actually are.",
        },
        {
          title: "Hybrid designs for reliability",
          detail:
            "Hybrid designs where reliability matters. Example: Verdis CropDoctor pairs a deterministic weighted expert system with Gemini RAG so advice is auditable, not hallucinated.",
        },
      ],
      stack: [
        "React",
        "Vite",
        "TypeScript",
        "Tailwind",
        "Next.js",
        "Node.js",
        "Express",
        "Prisma",
        "PostgreSQL",
        "Supabase",
        "Medusa v2",
        "Paystack",
        "Resend",
      ],
      outputs: [
        "Working increments",
        "Versioned prompts",
        "Documented architecture decisions",
      ],
      exitCriteria:
        "Feature meets PRD acceptance criteria and passes review.",
    },
    {
      id: "phase-3",
      number: "03",
      title: "QA & Risk Mitigation",
      shortTitle: "QA & Risk",
      goal: "Make sure it works under real-world conditions, especially bad ones.",
      steps: [
        {
          title: "Load testing",
          detail:
            "k6 load tests against Klavora's backend before pitching to real pharmacies.",
        },
        {
          title: "Offline fail-safes",
          detail:
            "Klavora is an offline-first PWA with IndexedDB sync and heartbeat-based offline detection (a health ping every 15 seconds), because connectivity is the biggest reliability risk in the target market.",
        },
        {
          title: "Staging & graceful degradation",
          detail:
            "Staging environment and controlled releases, plus a maintenance-mode flag in the database so I can take the system down gracefully without a deploy.",
        },
        {
          title: "Root cause analysis debugging",
          detail:
            "Debugging with root cause analysis. Real examples: Paystack webhook HMAC failures traced to express.json() corrupting the raw body; Prisma P2028 transaction timeouts on bulk CSV import fixed with createMany and an extended timeout; CORS and subscription-routing bugs.",
        },
        {
          title: "Security testing",
          detail:
            "IDOR and token-storage checks, consolidated into a penetration test report.",
        },
        {
          title: "Business risk mitigation",
          detail:
            "Designing around failure, not just code. Example: Klavora's grace-period subscription model avoids locking a pharmacy out mid-shift and uses personal follow-up to protect the client relationship.",
        },
        {
          title: "Infrastructure cost risk",
          detail:
            "Hosting moved from Railway to an Oracle Cloud VPS to keep recurring costs sustainable.",
        },
      ],
      outputs: [
        "Test results",
        "Risk register",
        "Runbooks",
        "Staging sign-off",
      ],
      exitCriteria:
        "No known blocking defects, a failure mode documented for each critical path, and recovery steps defined.",
    },
  ],
  principles: [
    {
      id: "principle-1",
      statement: "Decide with constraints, not trends.",
    },
    {
      id: "principle-2",
      statement: "Narrow scope beats feature sprawl.",
    },
    {
      id: "principle-3",
      statement: "Design for the worst connection and the least technical user.",
    },
    {
      id: "principle-4",
      statement: "Document decisions so they survive me.",
    },
  ],
  closingCta: {
    heading: "Want to see this applied?",
    projectsLabel: "View Case Studies",
    contactLabel: "Contact Me",
  },
};
