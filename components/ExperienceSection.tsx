'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ExperienceItem {
  company: string;
  role: string;
  date: string;
  link?: string;
  handle?: string;
  bullets: string[];
}

const experiences: ExperienceItem[] = [
  {
    company: 'Ideation Axis Group',
    role: 'UX Designer Intern',
    date: 'September 2024 - December 2024 · Internship',
    link: 'https://ideationaxis.com/',
    bullets: [
      'Turned user research into wireframes, technical requirements, and acceptance criteria that developers could build from on client projects.',
    ],
  },
  {
    company: 'Ideagap',
    role: 'UX Design Specialist',
    date: 'June 2026 · Freelance',
    link: 'https://ideagap.org/',
    bullets: [
      'Built interactive prototypes and high-fidelity demos to validate UX flows and support pre-sales conversations.',
      'Served as the primary technical liaison between engineering and end users, converting market feedback into roadmap priorities and developer-ready requirements.',
    ],
  },
  {
    company: 'Node Eight',
    role: 'Product Designer Intern',
    date: 'February 2025 - May 2025 · Internship',
    link: 'https://nodeeight.org/',
    bullets: [
      'Ran on-site user research and converted the findings into rapid prototypes and PoC/demo requirements the team could build against.',
      'Streamlined the internal design system, shortening the path from requirement gathering to technical release.',
    ],
  },
  {
    company: 'Self-directed',
    role: 'Product Builder',
    date: '2024 - Present',
    bullets: [
      'Build lab: Klavora, Verdis, Beam, NameCheckGH and Rikelm, designed, scoped and shipped end to end.',
      'Certifications: Google IT Support, Google UX Design, ALX Prompt Engineering. In progress: Google Project Management, Agile/Scrum.',
    ],
  },
];

export default function ExperienceSection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      {/* Top gap - smaller on mobile */}
      <div id="experience" className="mt-16 md:mt-[163px] mb-16 md:mb-[160px] relative">
        {/* Subtle radial glow accents bleeding in from edges (bottom-left) */}
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-gradient-radial from-fuchsia-600/15 to-transparent blur-3xl rounded-full pointer-events-none -z-10"></div>

        {/* HEADER */}
        <h2 className="text-[32px] md:text-[40px] font-bold text-white tracking-wide">
          Experience
        </h2>
        {/* Thin horizontal divider line below header */}
        <div className="w-full h-px bg-white/10 mt-6 mb-6 md:mt-6 md:mb-6 border-b border-white/10 border-dashed"></div>

        {/* Inner Grid */}
        <div className="flex flex-col md:flex-row gap-16 md:gap-20 pt-6">
          {/* TAB LIST (Column 2) */}
          <div className="w-full md:w-[280px] shrink-0">
            <nav className="proggy">
              <ul className="flex flex-col space-y-4">
                {experiences.map((exp, index) => (
                  <li
                    key={exp.company}
                    onClick={() => setActiveTab(index)}
                    className={`cursor-pointer pl-2 hover:bg-opacity-25 hover:bg-shade py-2 text-[20px] leading-[28px] transition-all duration-300 ${
                      activeTab === index
                        ? 'border-l text-bright'
                        : 'border-l border-transparent text-[#6b7280]'
                    }`}
                  >
                    {exp.company}
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* DETAIL PANEL (Column 3) */}
          <div className="flex-1">
            <div className="relative min-h-[300px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0"
                >
                  {/* Role Title Line */}
                  <h3 className="text-bright text-xl md:text-2xl font-medium flex flex-wrap items-center gap-2">
                    {experiences[activeTab].role}
                    <span className="bg-gradient-to-r from-[#FF4FD8] to-[#C239B3] text-transparent bg-clip-text">
                      {experiences[activeTab].link ? (
                        <a target="_blank" href={experiences[activeTab].link} rel="noopener noreferrer">
                          @{experiences[activeTab].handle || experiences[activeTab].company.replace(/\s+/g, '').toLowerCase()}
                        </a>
                      ) : (
                        <span>
                          @{experiences[activeTab].handle || experiences[activeTab].company.replace(/\s+/g, '').toLowerCase()}
                        </span>
                      )}
                    </span>
                  </h3>

                  {/* Metadata line */}
                  <p className="proggy pt-2 text-lg text-[#8d8d8d]">
                    {experiences[activeTab].date}
                  </p>

                  {/* Bullet list */}
                  <ul className="list-none pt-3 space-y-7 max-w-[550px]">
                    {experiences[activeTab].bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start">
                        {/* Square bullet marker */}
                        <span className="mt-[8px] w-2 h-2 mr-4 bg-white flex-shrink-0"></span>
                        <span className="text-[#d1d5db] font-normal text-[16px] leading-[1.6]">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
