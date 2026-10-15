import Image from 'next/image';

export default function AboutSection() {
  return (
    <>
      <div className="pt-6 mt-16 md:mt-24 border-b border-dashed border-shade/30 pb-6 mb-12">
        <h2 className="text-2xl md:text-4xl font-bold leading-relaxed">About</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="text-shade flex flex-col space-y-6 text-sm md:text-base">
          <p className="leading-relaxed">
            I&apos;m Elikem, a software engineer turning toward technical project management. I take problems from user research to production: I write the PRD, make the architecture calls, direct the build, and test it against real-world conditions like unreliable internet and low-end phones.
          </p>
          <p className="leading-relaxed">
            I&apos;ve built Klavora, an offline-first pharmacy inventory SaaS, along with a climate advisory platform for smallholder farmers, a phone-to-browser screen-casting app, and a headless commerce store. I use AI agents across the whole development lifecycle, always behind a review gate, to move faster without lowering the standard.
          </p>
          <p className="leading-relaxed">
            I work best in high-ownership teams where scoping, sequencing, and follow-through decide whether a product ships. Open to Technical Project Management and Solutions Engineering roles.
          </p>
          <div className="pt-2 text-xs sm:text-sm text-shade/70 leading-relaxed">
            BSc Software Engineering, GCTU (expected 2027) · Google IT Support · Google UX Design · ALX Prompt Engineering · Based in Accra, Ghana
          </div>
        </div>
        <div className="group flex justify-center lg:justify-end">
          <div className="w-full max-w-[350px] h-[420px] sm:h-[450px] border border-shade/30 rounded p-4 group-hover:transform group-hover:scale-105 transition-all ease duration-300 cursor-pointer">
             <div className="w-full h-full grayscale group-hover:grayscale-0 rounded overflow-hidden relative transition-all duration-300">
               <img src="/Profile.png" alt="Richard Elikem Amenorpe - Technical Project Manager and Software Engineer" loading="lazy" width={350} height={420} className="w-full h-full object-cover object-top translate-y-6 scale-[1.1]" />
             </div>
          </div>
        </div>
      </div>
    </>
  );
}
