import { ChevronDown, Menu, X } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import nexLogoWhite from "../../assets/logo/nex-logo-white.png";

type NavLink = {
  label: string;
  href: string;
  route?: boolean;
};

type NavItem = NavLink & {
  dropdown?: NavLink[];
};

const navItems: NavItem[] = [
  { label: "Home", href: "/", route: true },
  { label: "Platform", href: "/#architecture" },
  { label: "Ecosystem", href: "/#ecosystem" },
  { label: "Governance", href: "/#governance" },
  { label: "Roadmap", href: "/#roadmap" },
  { label: "Community", href: "/#community" },
  {
    label: "Company",
    href: "/company/about",
    route: true,
    dropdown: [
      { label: "About NEXNS", href: "/company/about", route: true },
      { label: "Vision", href: "/company/vision", route: true },
      { label: "Leadership & Contributors", href: "/company/leadership", route: true },
      { label: "Contact", href: "/company/contact", route: true },
    ],
  },
  {
    label: "Investor Center",
    href: "/investor",
    route: true,
    dropdown: [
      { label: "Investment Thesis", href: "/investor/why-nexns", route: true },
      { label: "Platform Architecture", href: "/investor/ecosystem", route: true },
      { label: "NEX Economic Architecture", href: "/resources/nex", route: true },
      { label: "NS Credits", href: "/resources/ns", route: true },
      { label: "Growth Flywheel", href: "/investor/flywheel", route: true },
      { label: "Value Flow", href: "/investor/value-flow", route: true },
      { label: "Investor Brief", href: "/investor/one-page", route: true },
      { label: "Contact", href: "/investor", route: true },
    ],
  },
];

function SmartLink({
  item,
  className,
  onClick,
  children,
}: {
  item: NavLink;
  className: string;
  onClick?: () => void;
  children?: ReactNode;
}) {
  if (item.route) {
    return (
      <Link to={item.href} onClick={onClick} className={className}>
        {children ?? item.label}
      </Link>
    );
  }

  return (
    <a href={item.href} onClick={onClick} className={className}>
      {children ?? item.label}
    </a>
  );
}

export function WebsiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const updateScrollState = () => setScrolled(window.scrollY > 16);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setMobileExpanded(null);
    setActiveDropdown(null);
  };

  return (
    <header
      ref={headerRef}
      className={[
        "fixed left-0 top-0 z-[1000] w-full border-b transition-all duration-300",
        scrolled
          ? "border-white/10 bg-black/88 shadow-[0_18px_60px_rgba(0,0,0,0.42)] backdrop-blur-xl"
          : "border-white/5 bg-black/18 backdrop-blur-md",
      ].join(" ")}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:px-10 xl:px-14">
        <Link to="/" onClick={closeMobileMenu} className="inline-flex items-center gap-3" aria-label="NEXNS home">
          <img src={nexLogoWhite} alt="" className="h-7 w-auto object-contain" draggable={false} />
          <span className="hidden text-xl font-black tracking-[0.16em] text-white sm:inline">NEXNS</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Official website navigation">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setActiveDropdown(item.dropdown ? item.label : null)}
              onMouseLeave={() => setActiveDropdown(null)}
              onFocus={() => setActiveDropdown(item.dropdown ? item.label : null)}
            >
              <SmartLink
                item={item}
                onClick={() => {
                  if (!item.dropdown) setActiveDropdown(null);
                }}
                className={[
                  "inline-flex h-10 items-center gap-1 whitespace-nowrap rounded-full px-4 text-sm font-semibold transition duration-200",
                  activeDropdown === item.label
                    ? "bg-white/[0.055] text-white"
                    : "text-white/66 hover:bg-white/[0.045] hover:text-white",
                ].join(" ")}
              >
                <span>{item.label}</span>
                {item.dropdown ? (
                  <ChevronDown className={`h-3.5 w-3.5 transition ${activeDropdown === item.label ? "rotate-180" : ""}`} />
                ) : null}
              </SmartLink>

              {item.dropdown ? (
                <div
                  className={[
                    "absolute left-1/2 top-full z-[1100] w-[320px] -translate-x-1/2 pt-3 transition duration-200",
                    activeDropdown === item.label
                      ? "pointer-events-auto translate-y-0 opacity-100"
                      : "pointer-events-none translate-y-2 opacity-0",
                  ].join(" ")}
                >
                  <div className="rounded-3xl border border-white/12 bg-[#030712]/[0.985] p-3 shadow-[0_28px_100px_rgba(0,0,0,0.88)] backdrop-blur-2xl">
                    {item.dropdown.map((child) => (
                      <SmartLink
                        key={child.label}
                        item={child}
                        onClick={() => setActiveDropdown(null)}
                        className="block rounded-2xl px-4 py-3 text-sm font-bold text-white/78 transition hover:bg-white/[0.075] hover:text-white"
                      />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/app"
            onClick={closeMobileMenu}
            className="rounded-full border border-violet-500/30 bg-white px-4 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-black shadow-[0_0_18px_rgba(255,255,255,0.08)] transition duration-200 ease-out hover:scale-[1.035] hover:bg-violet-100 hover:shadow-[0_0_26px_rgba(167,139,250,0.28)] active:scale-[0.99] sm:px-5 sm:text-xs"
          >
            Launch App
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white transition hover:border-violet-300/40 hover:bg-violet-500/10 lg:hidden"
            aria-label={mobileOpen ? "Close website navigation" : "Open website navigation"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={[
          "fixed inset-0 z-[1200] lg:hidden",
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
          "bg-[#030712] transition-opacity duration-200",
        ].join(" ")}
        aria-hidden={!mobileOpen}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_12%,rgba(0,240,255,0.10),transparent_28%),radial-gradient(circle_at_14%_78%,rgba(138,43,226,0.12),transparent_32%)]" />
        <div className="relative z-10 flex h-full min-h-0 flex-col">
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/8 px-5">
            <Link to="/" onClick={closeMobileMenu} className="inline-flex items-center gap-3" aria-label="NEXNS home">
              <img src={nexLogoWhite} alt="" className="h-7 w-auto object-contain" draggable={false} />
              <span className="text-lg font-black tracking-[0.16em] text-white">NEXNS</span>
            </Link>
            <button
              type="button"
              onClick={closeMobileMenu}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/12 bg-white/[0.045] text-white transition hover:border-violet-300/40 hover:bg-violet-500/10"
              aria-label="Close website navigation"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav
            className="flex-1 overflow-y-auto px-5 py-6"
            aria-label="Mobile official website navigation"
          >
            <div className="grid gap-1">
              {navItems.map((item) => {
                const expanded = mobileExpanded === item.label;

                if (item.dropdown) {
                  return (
                    <div key={item.label} className="border-b border-white/8 py-2">
                      <button
                        type="button"
                        onClick={() => setMobileExpanded(expanded ? null : item.label)}
                        className="flex w-full items-center justify-between py-4 text-left text-[17px] font-black text-white"
                        aria-expanded={expanded}
                      >
                        <span>{item.label}</span>
                        <ChevronDown className={`h-5 w-5 text-white/52 transition ${expanded ? "rotate-180" : ""}`} />
                      </button>
                      <div className={`${expanded ? "grid" : "hidden"} gap-1 pb-3`}>
                        {item.dropdown.map((child) => (
                          <SmartLink
                            key={child.label}
                            item={child}
                            onClick={closeMobileMenu}
                            className="block rounded-2xl px-4 py-3 text-sm font-semibold text-white/68 transition hover:bg-white/[0.055] hover:text-white"
                          />
                        ))}
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={item.label} className="border-b border-white/8 py-2">
                    <SmartLink
                      item={item}
                      onClick={closeMobileMenu}
                      className="block py-4 text-[17px] font-black text-white transition hover:text-cyan-100"
                    />
                  </div>
                );
              })}
            </div>

            <Link
              to="/app"
              onClick={closeMobileMenu}
              className="mt-8 flex w-full items-center justify-center rounded-full bg-white px-5 py-4 text-sm font-black uppercase tracking-[0.16em] text-black transition hover:bg-violet-100"
            >
              Launch App
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
