import React from 'react';

export default function LittleBragSection() {
  return (
    <>
      <div className="pt-6 mt-16 md:mt-24">
        <div className="mb-10 md:mb-14 border-b pb-6 border-gray-700 border-dotted">
          <h2 className="text-2xl md:text-4xl font-bold leading-relaxed">Little Brag...</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-6 lg:gap-x-16 items-start">
          {/* Left Column: Story Copy */}
          <div className="text-shade">
            <h3 className="text-bright text-xl md:text-2xl font-medium mb-4">
              I built a pharmacy SaaS that keeps selling when the internet doesn&apos;t
            </h3>

            <div className="space-y-4">
              <div>
                <h4 className="text-bright text-lg font-medium mb-2">The Challenge</h4>
                <p className="leading-relaxed">
                  Ghanaian pharmacies were managing inventory, expiry tracking, and point-of-sale on paper or spreadsheets. No visibility into stock levels, no low-stock or expiry alerts, and no reliable way to catch expired drugs before they reached a customer. It&apos;s also very easy to lose an entire afternoon to a spreadsheet named &quot;final_final_v2.&quot;
                </p>
              </div>

              <div>
                <h4 className="text-bright text-lg font-medium mb-2">The Solution</h4>
                <div className="space-y-4">
                  <p className="leading-relaxed">
                    I built Klavora, an offline-capable pharmacy inventory management SaaS, and I own it end to end: product scoping, architecture, build, billing, and go-to-market.
                  </p>
                  <p className="leading-relaxed">
                    The hardest part was making offline and online mode actually cooperate. Internet in many pharmacies is more of a suggestion than a guarantee, so I built a PWA with IndexedDB sync that lets a pharmacy keep selling with zero connection, then reconciles everything when the connection returns. The design goal: no lost sales, no duplicates, no drama.
                  </p>
                  <p className="leading-relaxed">
                    On top of that: FEFO batch tracking so the earliest-expiring stock sells first, a controlled substances register, multi-drug basket POS, bulk CSV import for onboarding, and WhatsApp low-stock and expiry alerts via Termii. I also built Paystack webhook integration, subscription and grace-period billing, and load-tested the backend with k6.
                  </p>
                  <p className="leading-relaxed">
                    I made one deliberate product call: an expired subscription doesn&apos;t lock a pharmacy out mid-shift. It flags them for a personal follow-up instead, because in this market relationships close deals, not lockouts.
                  </p>
                  <p className="leading-relaxed">
                    Now I&apos;m doing direct outreach to Ghanaian pharmacies to put working software into daily use.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Pills Card on Desktop, 24px spacing on Mobile */}
          <div className="lg:sticky lg:top-[120px] lg:self-start">
            <div className="card-wrapper w-full rounded-2xl overflow-hidden shadow-2xl">
              <div className="card-content bg-[#0a0a0a] p-6 space-y-4 rounded-[14.5px]">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-primary shrink-0"></div>
                  <span className="text-bright font-medium">Offline PWA with IndexedDB Sync</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-secondary shrink-0"></div>
                  <span className="text-bright font-medium">FEFO Batch & Expiry Management</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-primary shrink-0"></div>
                  <span className="text-bright font-medium">WhatsApp Low-Stock Alerts</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-secondary shrink-0"></div>
                  <span className="text-bright font-medium">Paystack Billing Integration</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-primary shrink-0"></div>
                  <span className="text-bright font-medium">Controlled Substances Register</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
