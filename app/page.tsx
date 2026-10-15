import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ExperienceSection from '../components/ExperienceSection';
import LeadershipSection from '../components/LeadershipSection';
import LittleBragSection from '../components/LittleBragSection';
import ProjectsSection from '../components/ProjectsSection';
import Footer from '../components/Footer';
import LeftSidebar from '../components/LeftSidebar';
import RightSidebar from '../components/RightSidebar';
import Spotlight from '../components/Spotlight';
import ScrollProgress from '../components/ScrollProgress';
import Reveal from '../components/Reveal';
import PathModal from '../components/PathModal';
import { getSiteUrl } from '../lib/siteUrl';
import { caseStudies } from '../data/caseStudies';
import { pathData } from '../data/pathMilestones';

export default function Home() {
  const siteUrl = getSiteUrl();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${siteUrl}/#person`,
        name: 'Richard Elikem Amenorpe',
        alternateName: [
          'Elikem Amenorpe',
          'Richard Elikem',
          'Richard Amenorpe',
          'Elikem Richard Amenorpe',
          'Amenorpe Richard Elikem',
          'Amenorpe Elikem',
        ],
        givenName: 'Richard Elikem',
        familyName: 'Amenorpe',
        jobTitle: 'Technical Project Manager',
        url: siteUrl,
        description:
          'Elikem Amenorpe, software engineer turned technical project manager in Accra, Ghana. Case studies on Klavora, Verdis, Beam and more.',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Accra',
          addressCountry: 'GH',
        },
        alumniOf: {
          '@type': 'EducationalOrganization',
          name: 'Ghana Communication Technology University',
        },
        knowsAbout: [
          'Technical project management',
          'Product requirements',
          'Software engineering',
          'Offline-first web apps',
          'AI-assisted development',
        ],
        sameAs: [
          'https://github.com/richkid2xi',
          'https://www.linkedin.com/in/richard-amenorpe-292107309/',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        name: 'Richard Elikem Amenorpe',
        url: siteUrl,
        publisher: {
          '@id': `${siteUrl}/#person`,
        },
      },
      {
        '@type': 'ProfilePage',
        '@id': `${siteUrl}/#profilepage`,
        url: siteUrl,
        name: 'Richard Elikem Amenorpe | Technical Project Manager',
        mainEntity: {
          '@id': `${siteUrl}/#person`,
        },
      },
    ],
  };

  return (
    <div className="relative min-h-[100svh]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Spotlight />

      {/* Scroll-to-top progress button */}
      <ScrollProgress />

      {/* The Path Modal-to-Canvas Component */}
      <PathModal />

      {/* Sidebars - Fixed at the edges of the 1200px container */}
      <div className="fixed inset-0 pointer-events-none z-50 hidden md:block">
        <div className="w-full max-w-[1200px] mx-auto h-full px-6 lg:px-0 flex justify-between relative">
          <div className="w-[50px] h-full flex flex-col justify-center items-start pointer-events-auto">
            <LeftSidebar />
          </div>
          <div className="w-[50px] h-full flex flex-col justify-center items-end pointer-events-auto">
            <RightSidebar />
          </div>
        </div>
      </div>

      {/* Main Wrapper - centered, full width on mobile */}
      <div className="w-full max-w-[1200px] mx-auto relative">
        {/* Main Content (Centered) */}
        <main className="w-full max-w-[901px] mx-auto px-5 sm:px-8 lg:px-0 pt-[calc(56px+env(safe-area-inset-top,0px))] lg:pt-0">
          <Navbar />
          <Reveal direction="up" delay={100}>
            <HeroSection />
          </Reveal>
          <Reveal direction="up" delay={0}>
            <AboutSection />
          </Reveal>
          <Reveal direction="up" delay={0}>
            <ExperienceSection />
          </Reveal>
          <Reveal direction="up" delay={0}>
            <LeadershipSection />
          </Reveal>
          <Reveal direction="up" delay={0}>
            <LittleBragSection />
          </Reveal>
          <Reveal direction="up" delay={0}>
            <ProjectsSection />
          </Reveal>
          <Reveal direction="up" delay={0}>
            <Footer />
          </Reveal>
        </main>
      </div>

      {/* Server-Rendered Semantic Index for Web Crawlers & Screen Readers */}
      <section className="sr-only" aria-label="Case Studies and Milestones Archive">
        <h2>Case Studies Index</h2>
        {Object.values(caseStudies).map((study) => (
          <article key={study.slug} id={`index-${study.slug}`}>
            <h3>{study.name} — {study.oneLiner}</h3>
            <p><strong>Status:</strong> {study.statusLabel || study.status}</p>
            <p><strong>Stack:</strong> {study.tags?.join(', ')}</p>
            <div>
              {study.sections?.map((sec) => (
                <div key={sec.id}>
                  <h4>{sec.title}</h4>
                  {'content' in sec && typeof sec.content === 'string' && <p>{sec.content}</p>}
                  {'items' in sec && Array.isArray(sec.items) && (
                    <ul>
                      {sec.items.map((item, idx) => (
                        <li key={idx}>
                          {typeof item === 'string' ? item : `${item.key}: ${item.value}`}
                        </li>
                      ))}
                    </ul>
                  )}
                  {'tags' in sec && Array.isArray(sec.tags) && <p>{sec.tags.join(', ')}</p>}
                </div>
              ))}
            </div>
          </article>
        ))}

        <h2>The Path: Evolution from Builder to Technical Project Manager</h2>
        {pathData.milestones.map((milestone) => (
          <article key={milestone.id}>
            <h3>{milestone.title} ({milestone.year})</h3>
            <p>{milestone.description}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
