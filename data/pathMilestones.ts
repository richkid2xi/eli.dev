export interface PathMilestone {
  id: string;
  year: string;
  title: string;
  description: string;
  isNow?: boolean;
  isWhereThisGoes?: boolean;
}

export interface PathData {
  title: string;
  subtitle: string;
  intro: string;
  milestones: PathMilestone[];
  closingCta: {
    label: string;
    targetId: string;
  };
}

export const pathData: PathData = {
  title: 'The Path',
  subtitle: 'From builder to technical project manager.',
  intro:
    "I didn't start out trying to become a project manager. I started out trying to build things that work, and building taught me something I didn't expect: the part I'm best at was never the code itself.",
  milestones: [
    {
      id: 'step-2023',
      year: '2023',
      title: 'Enrolled at GCTU',
      description:
        'Started a Software Engineering degree because I wanted to build things, not just use them.',
    },
    {
      id: 'step-2024-2025',
      year: '2024–2025',
      title: 'Learned the requirements side',
      description:
        'UX internships taught me to turn user research into wireframes, requirements, and acceptance criteria developers could actually build from.',
    },
    {
      id: 'step-2025-2026',
      year: '2025–2026',
      title: 'Built and shipped',
      description:
        'Took products from a blank page to working software: Klavora, Verdis, Beam, NameCheckGH, Rikelm. I owned the scoping, architecture, deploys, and the 1am bugs.',
    },
    {
      id: 'step-2026',
      year: '2026',
      title: 'Noticed the pattern',
      description:
        "Across every project, the thing I kept gravitating toward wasn't the code. It was scoping the right problem, sequencing the work, and keeping a build from quietly dying halfway through.",
    },
    {
      id: 'step-now',
      year: 'NOW',
      title: 'Pivoting on purpose',
      description:
        'Pursuing Technical Project Management. Next up: Google Project Management and Agile/Scrum certifications. Not leaving engineering behind; using it as leverage.',
      isNow: true,
    },
    {
      id: 'step-future',
      year: 'WHERE THIS GOES',
      title: 'Running the process, not just the build',
      description:
        'I want to run the process that turns ambitious ideas into shipped, sustainable products, and to keep building products of my own along the way.',
      isWhereThisGoes: true,
    },
  ],
  closingCta: {
    label: 'See the projects',
    targetId: 'projects',
  },
};
