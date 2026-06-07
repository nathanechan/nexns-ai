const footerColumns = [
  {
    title: "Platform",
    links: [
      { label: "Platform Overview", href: "/#architecture" },
      { label: "Prediction Network", href: "/#network" },
      { label: "Creator Network", href: "/#architecture" },
      { label: "Project Growth Layer", href: "/#architecture" },
      { label: "Governance Layer", href: "/#governance" },
    ],
  },
  {
    title: "Ecosystem",
    links: [
      { label: "Users", href: "/#ecosystem" },
      { label: "Creators", href: "/#ecosystem" },
      { label: "Projects", href: "/#ecosystem" },
      { label: "Communities", href: "/#community" },
      { label: "AI Companions", href: "/#ecosystem" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Whitepaper", href: "/investor" },
      { label: "Docs", href: "/#insights" },
      { label: "Blog", href: "/#community" },
      { label: "Media Kit", href: "/#insights" },
      { label: "NEX Economic Architecture", href: "/resources/nex" },
      { label: "NS Credits", href: "/resources/ns" },
    ],
  },
  {
    title: "Investor",
    links: [
      { label: "Investor Center", href: "/investor" },
      { label: "Investment Thesis", href: "/investor/why-nexns" },
      { label: "Platform Architecture", href: "/investor/ecosystem" },
      { label: "Growth Flywheel", href: "/investor/flywheel" },
      { label: "Value Flow", href: "/investor/value-flow" },
      { label: "Investor Brief", href: "/investor/one-page" },
      { label: "Contact", href: "/investor" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About NEXNS", href: "/company/about" },
      { label: "Vision", href: "/company/vision" },
      { label: "Leadership & Contributors", href: "/company/leadership" },
      { label: "Roadmap", href: "/#roadmap" },
      { label: "Community", href: "/#community" },
      { label: "Contact", href: "/company/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Service", href: "/legal/terms" },
      { label: "Privacy Policy", href: "/legal/privacy" },
      { label: "Risk Disclosure", href: "/legal/risk" },
      { label: "Cookie Policy", href: "/legal/cookies" },
      { label: "Disclaimer", href: "/legal/disclaimer" },
    ],
  },
];

export function WebsiteFooter() {
  return (
    <footer className="relative z-10 w-full border-t border-white/5 bg-[#030712] pb-12 pt-20">
      <div className="mx-auto max-w-[1440px] px-6 md:px-16">
        <div className="grid grid-cols-2 gap-8 text-xs md:grid-cols-3 lg:grid-cols-6">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h4 className="mb-4 text-[11px] font-bold uppercase tracking-wider text-white opacity-90">
                {column.title}
              </h4>
              <ul className="space-y-2.5 text-gray-500">
                {column.links.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="transition-colors hover:text-gray-300">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-white/5 pt-8 text-[11px] leading-relaxed text-gray-600">
          NEXNS is Global Prediction Growth Infrastructure. Participation in digital networks involves risk;
          review all relevant disclosures and institutional materials before integration.
        </div>
      </div>
    </footer>
  );
}
