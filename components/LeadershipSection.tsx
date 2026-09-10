import Image from 'next/image';

export default function LeadershipSection() {
  return (
    <>
      <div>
        <div className="border border-gray-600 border-dotted rounded-lg px-6 py-8 md:px-8 md:py-10 text-shade">
          <p className="pb-4 proggy text-lg">Leadership &amp; Venture</p>
          <div className="space-y-4">
            <h2 className="text-bright text-xl md:text-2xl font-medium">
              Founder{' '}
              <span className="transition-all ease duration-300 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary lowercase">
                <a target="_blank" rel="noopener noreferrer" href="https://klavora.vercel.app/">@Klavora</a>
              </span>
            </h2>
            <p className="leading-relaxed">
              Building a pharmacy inventory management SaaS for Ghanaian pharmacies, handling offline-first batch and expiry tracking, point-of-sale, and WhatsApp-based low-stock alerts. Took the product from zero to live paying pharmacy customers through direct outreach. Currently focused on backend reliability, billing infrastructure, and expanding the client base across Ghana.
            </p>
          </div>
          <a target="_blank" rel="noopener noreferrer" className="mt-8 block w-full overflow-hidden rounded-lg cursor-pointer hover:opacity-95 transition-opacity" href="https://klavora.vercel.app/">
            <div className="relative w-full aspect-[21/9] min-h-[180px] rounded-lg overflow-hidden">
               <img src="/klavora.png" alt="Klavora" className="w-full h-full object-cover" />
             </div>
          </a>
        </div>
      </div>
    </>
  );
}
