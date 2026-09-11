export default function LittleBragSection() {
  return (
    <>
      <div className="pt-6 mt-16 md:mt-24">
        <div className="mb-10 md:mb-14 border-b pb-6 border-gray-700 border-dotted">
          <h2 className="text-2xl md:text-4xl font-bold leading-relaxed">Little Brag...</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="text-shade">
            <div style={{ opacity: 1, transform: 'none' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-bright text-xl md:text-2xl font-medium">I built a pharmacy SaaS from zero to paying pharmacies</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-bright text-lg font-medium mb-2">The Challenge</h4>
                  <p className="leading-relaxed">Ghanaian pharmacies were managing inventory, expiry tracking, and point-of-sale on paper or spreadsheets. No visibility into stock levels, no low-stock or expiry alerts, and no reliable way to catch expired drugs before they reached a customer. Also very easy to lose an entire afternoon to a spreadsheet named "final_final_v2."</p>
                </div>
                <div>
                  <h4 className="text-bright text-lg font-medium mb-2">The Solution</h4>
                  <p className="leading-relaxed">I built Klavora, an offline-capable pharmacy inventory management SaaS. The real challenge was making offline and online mode actually cooperate. Internet in a lot of these pharmacies is more of a suggestion than a guarantee, so I built a PWA with IndexedDB sync that lets a pharmacy keep selling with zero connection, then quietly reconciles everything the moment the internet remembers it exists. No lost sales, no duplicates, no drama. On top of that, I built FEFO batch tracking, a controlled substances register, multi-drug basket POS, bulk CSV import, and WhatsApp-based low-stock/expiry alerts via Termii. I also handled Paystack webhook integration, subscription and grace-period billing logic, and load testing with k6, and I'm now doing direct cold outreach to Ghanaian pharmacies to turn the product into actual paying customers.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="card-wrapper p-[1px] w-full" style={{ opacity: 1, transform: 'none' }}>
              <div className="card-content h-full w-full bg-[#0a0a0a] p-6 space-y-4 rounded-[15px]">
                <div className="flex items-center space-x-3" style={{ opacity: 1, transform: 'none' }}>
                  <div className="w-3 h-3 rounded-full bg-primary" style={{ transform: 'none' }}></div>
                  <span className="text-bright font-medium">Offline PWA with IndexedDB Sync</span>
                </div>
                <div className="flex items-center space-x-3" style={{ opacity: 1, transform: 'none' }}>
                  <div className="w-3 h-3 rounded-full bg-secondary" style={{ transform: 'none' }}></div>
                  <span className="text-bright font-medium">FEFO Batch & Expiry Management</span>
                </div>
                <div className="flex items-center space-x-3" style={{ opacity: 1, transform: 'none' }}>
                  <div className="w-3 h-3 rounded-full bg-primary" style={{ transform: 'none' }}></div>
                  <span className="text-bright font-medium">WhatsApp Low-Stock Alerts</span>
                </div>
                <div className="flex items-center space-x-3" style={{ opacity: 1, transform: 'none' }}>
                  <div className="w-3 h-3 rounded-full bg-secondary" style={{ transform: 'none' }}></div>
                  <span className="text-bright font-medium">Paystack Billing Integration</span>
                </div>
                <div className="flex items-center space-x-3" style={{ opacity: 1, transform: 'none' }}>
                  <div className="w-3 h-3 rounded-full bg-primary" style={{ transform: 'none' }}></div>
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
