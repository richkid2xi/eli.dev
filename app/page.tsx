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

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Richard Elikem Amenorpe',
  alternateName: ['Richard Elikem', 'Richard Amenorpe'],
  url: 'https://richardelikem.com',
  jobTitle: ['Software Engineer', 'Technical Project Manager', 'Founder'],
  description:
    'Software Engineer and Technical Project Manager building scalable SaaS products for African markets. Founder of Klavora — a pharmacy inventory management SaaS for Ghanaian pharmacies.',
  worksFor: {
    '@type': 'Organization',
    name: 'EliTech CreaTives Limited',
  },
  knowsAbout: [
    'Software Engineering',
    'Technical Project Management',
    'SaaS Products',
    'React',
    'Next.js',
    'TypeScript',
    'PostgreSQL',
    'Product Management',
    'Africa Tech',
  ],
  sameAs: [
    'https://github.com/richkid2xi',
    'https://www.linkedin.com/in/richard-amenorpe-292107309/',
  ],
};

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Spotlight />

      {/* Scroll-to-top progress button */}
      <ScrollProgress />

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
        <main className="w-full max-w-[901px] mx-auto px-5 sm:px-8 lg:px-0">
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
    </div>
  );
}
