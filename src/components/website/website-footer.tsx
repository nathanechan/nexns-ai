import React from 'react';

export function WebsiteFooter() {
  return (
    <footer className="bg-[#030712] border-t border-white/5 pt-20 pb-12 w-full relative z-10">
      <div className="max-w-[1440px] mx-auto px-6 md:px-16">
        
        {/* 7-COLUMN INTELLECTUAL GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 text-xs">
          
          {/* BRAND PILLAR */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 flex flex-col justify-between">
            <div>
              <span className="text-white font-black text-lg tracking-tight block mb-3">NEXNS</span>
              <p className="text-gray-500 leading-relaxed pr-4">
                The Next-Generation AI-Driven Growth Architecture and Liquidity Settlement Infrastructure.
              </p>
            </div>
            <div className="text-[10px] text-gray-600 mt-6 lg:mt-0">
              © 2026 NEXNS Network.<br />All Rights Reserved.
            </div>
          </div>

          {/* PLATFORM LAYER */}
          <div>
            <h4 className="text-white font-bold tracking-wider uppercase mb-4 text-[11px] opacity-90">Platform</h4>
            <ul className="space-y-2.5 text-gray-500">
              {['Growth Flywheel', 'Prediction Layer', 'Creator Layer', 'Project Growth'].map(i => (
                <li key={i}><a href="#" className="hover:text-gray-300 transition-colors">{i}</a></li>
              ))}
            </ul>
          </div>

          {/* ECONOMY VAULT */}
          <div>
            <h4 className="text-white font-bold tracking-wider uppercase mb-4 text-[11px] opacity-90">Economy</h4>
            <ul className="space-y-2.5 text-gray-500">
              {['Value Flow', 'NEX Token', 'NS Credits', 'Buyback & Burn', 'DAO Treasury'].map(i => (
                <li key={i}><a href="#" className="hover:text-gray-300 transition-colors">{i}</a></li>
              ))}
            </ul>
          </div>

          {/* RESOURCES DUE DILIGENCE */}
          <div>
            <h4 className="text-white font-bold tracking-wider uppercase mb-4 text-[11px] opacity-90">Resources</h4>
            <ul className="space-y-2.5 text-gray-500">
              {['Whitepaper', 'Investor Deck', 'One Pager', 'Documentation', 'Security Audits', 'FAQ'].map(i => (
                <li key={i}><a href="#" className="hover:text-gray-300 transition-colors">{i}</a></li>
              ))}
            </ul>
          </div>

          {/* COMPANY / INTERNAL STORAGE */}
          <div>
            <h4 className="text-white font-bold tracking-wider uppercase mb-4 text-[11px] opacity-90">Company</h4>
            <ul className="space-y-2.5 text-gray-500">
              {['About NEXNS', 'Our Vision', 'Core Team', 'Partners', 'Careers', 'Contact'].map(i => (
                <li key={i}><a href="#" className="hover:text-gray-300 transition-colors">{i}</a></li>
              ))}
            </ul>
          </div>

          {/* COMMUNITY CHANNELS ALL-IN-ONE (10个社区入口清爽全量对齐) */}
          <div>
            <h4 className="text-white font-bold tracking-wider uppercase mb-4 text-[11px] opacity-90">Community</h4>
            <ul className="space-y-2.5 text-gray-500">
              {[
                'X (Twitter)', 'Discord', 'GitHub', 'Telegram', 
                'Medium', 'YouTube', 'Reddit', 'CoinMarketCap', 
                'Instagram', 'TikTok'
              ].map(i => (
                <li key={i}><a href="#" className="hover:text-gray-300 transition-colors">{i}</a></li>
              ))}
            </ul>
          </div>

          {/* LEGAL & COMPLIANCE */}
          <div>
            <h4 className="text-white font-bold tracking-wider uppercase mb-4 text-[11px] opacity-90">Legal</h4>
            <ul className="space-y-2.5 text-gray-500">
              {['Terms of Service', 'Privacy Policy', 'Risk Disclosure', 'Regulatory Compliance'].map(i => (
                <li key={i}><a href="#" className="hover:text-gray-300 transition-colors">{i}</a></li>
              ))}
            </ul>
          </div>

        </div>

        {/* COMPLIANCE DISCLOSURE ACCENT */}
        <div className="border-t border-white/5 mt-16 pt-8 text-[11px] text-gray-600 leading-relaxed">
          Disclaimer: NEXNS operates as a highly technical decentralized predictive algorithmic execution matrix. Engaging with cryptographic network protocols involves significant structural capital hazards. Please examine all Risk Disclosures thoroughly before application integration.
        </div>

      </div>
    </footer>
  );
}