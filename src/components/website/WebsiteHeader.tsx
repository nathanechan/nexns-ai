import { ChevronDown, Menu, X } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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

const mobilePrimaryItems: NavItem[] = [
  { label: "Home", href: "/", route: true },
  { label: "Platform", href: "/#architecture" },
  { label: "Ecosystem", href: "/#ecosystem" },
  { label: "Governance", href: "/#governance" },
  { label: "Roadmap", href: "/#roadmap" },
  { label: "Community", href: "/#community" },
  navItems.find((item) => item.label === "Investor Center")!,
  navItems.find((item) => item.label === "Company")!,
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
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMobileMenu();
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [mobileOpen]);

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setMobileExpanded(null);
    setActiveDropdown(null);
  };

  const mobileDrawer = (
    <div
      className={[
        "fixed inset-0 z-[9999] lg:hidden",
        mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        "h-[100dvh] w-screen overflow-hidden bg-black transition-opacity duration-200",
      ].join(" ")}
      aria-hidden={!mobileOpen}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_10%,rgba(0,240,255,0.10),transparent_28%),radial-gradient(circle_at_10%_88%,rgba(138,43,226,0.12),transparent_36%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/40 to-transparent" />

      <div className="relative z-10 flex h-[100dvh] min-h-0 flex-col">
        <div className="flex shrink-0 items-start justify-between border-b border-white/8 px-5 pb-5 pt-[max(1.25rem,env(safe-area-inset-top))]">
          <div>
            <Link to="/" onClick={closeMobileMenu} className="inline-flex items-center gap-3" aria-label="NEXNS home">
              <img src={nexLogoWhite} alt="" className="h-8 w-auto object-contain" draggable={false} />
              <span className="text-xl font-black tracking-[0.16em] text-white">NEXNS</span>
            </Link>
            <p className="mt-3 max-w-[280px] text-[11px] font-black uppercase leading-5 tracking-[0.18em] text-cyan-100/64">
              Global Prediction Growth Infrastructure
            </p>
          </div>
          <button
            type="button"
            onClick={closeMobileMenu}
            className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.055] text-white transition active:scale-95"
            aria-label="Close website navigation"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto overscroll-contain px-5 py-6" aria-label="Mobile official website navigation">
          <div className="grid gap-3">
            {mobilePrimaryItems.map((item) => {
              const expanded = mobileExpanded === item.label;

              if (item.dropdown) {
                return (
                  <div key={item.label} className="rounded-[28px] border border-white/8 bg-white/[0.035]">
                    <button
                      type="button"
                      onClick={() => setMobileExpanded(expanded ? null : item.label)}
                      className="flex min-h-[68px] w-full items-center justify-between px-5 text-left text-[18px] font-black text-white"
                      aria-expanded={expanded}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={`h-5 w-5 text-white/52 transition ${expanded ? "rotate-180" : ""}`} />
                    </button>
                    <div className={`${expanded ? "grid" : "hidden"} gap-1 border-t border-white/8 px-2 py-2`}>
                      {item.dropdown.map((child) => (
                        <SmartLink
                          key={child.label}
                          item={child}
                          onClick={closeMobileMenu}
                          className="block min-h-12 rounded-2xl px-4 py-3 text-sm font-semibold text-white/68 transition active:bg-white/[0.075]"
                        />
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <SmartLink
                  key={item.label}
                  item={item}
                  onClick={closeMobileMenu}
                  className="flex min-h-[68px] items-center rounded-[28px] border border-white/8 bg-white/[0.035] px-5 text-[18px] font-black text-white transition active:bg-white/[0.075]"
                />
              );
            })}
          </div>

          <Link
            to="/app"
            onClick={closeMobileMenu}
            className="mt-7 flex min-h-14 w-full items-center justify-center rounded-full bg-white px-5 py-4 text-sm font-black uppercase tracking-[0.16em] text-black transition active:scale-[0.99]"
          >
            Launch App
          </Link>
        </nav>
      </div>
    </div>
  );

  return (
    <>
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

    </header>
    {typeof document !== "undefined" ? createPortal(mobileDrawer, document.body) : mobileDrawer}
    </>
  );
}
