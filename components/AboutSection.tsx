import Image from 'next/image';

export default function AboutSection() {
  return (
    <>
      <div className="pt-6 mt-16 md:mt-24 border-b border-dashed border-shade/30 pb-6 mb-12">
        <h1 className="text-2xl md:text-4xl font-bold leading-relaxed">About</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="text-shade flex flex-col space-y-6 text-sm md:text-base">
          <p className="leading-relaxed">
            Hi! My name is Elikem, I'm a final-year Software Engineering student and founder building real products for African markets with global scaling potential.
          </p>
          <p className="leading-relaxed">
            I'm a strong problem solver and self-directed builder. Over the past few years, I've founded <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-fuchsia-400 to-secondary animate-text-gradient bg-[length:200%_auto] font-medium">EliTech CreaTives Limited</span>, working with collaborators like Bright and Andy across a portfolio of ventures, actively shipping products and engaging with Ghana's tech ecosystem to drive real outcomes. I've also led <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-fuchsia-400 to-secondary animate-text-gradient bg-[length:200%_auto] font-medium">Klavora</span>, a pharmacy inventory management SaaS, from concept to live paying pharmacy customers, handling everything from backend reliability to direct outreach. I'm passionate about leveraging technology to build impactful, self-sustaining businesses.
          </p>
          <p className="leading-relaxed">
            I thrive in dynamic, high-ownership environments where I can apply my skills to solve real problems and drive meaningful outcomes.
          </p>
        </div>
        <div className="group flex justify-center lg:justify-end">
          <div className="w-full max-w-[350px] h-[420px] sm:h-[450px] border border-shade/30 rounded p-4 group-hover:transform group-hover:scale-105 transition-all ease duration-300 cursor-pointer">
             <div className="w-full h-full grayscale group-hover:grayscale-0 rounded overflow-hidden relative transition-all duration-300">
               <img src="/Profile.png" alt="Richard Elikem" className="w-full h-full object-cover object-top" />
             </div>
          </div>
        </div>
      </div>
    </>
  );
}
