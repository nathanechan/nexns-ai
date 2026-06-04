import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import nexLogoWhite from "../../assets/logo/nex-logo-white.png";

const navItems = [
  { label: "NETWORK", href: "#network" },
  { label: "ECOSYSTEM", href: "#ecosystem" },
  { label: "GOVERNANCE", href: "#governance" },
  { label: "INSIGHTS", href: "#insights" },
  { label: "COMMUNITY", href: "#community" },
];

export function WebsiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/5 bg-black/88 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:px-10 xl:px-14">
        <a href="#home" onClick={closeMobileMenu} className="inline-flex items-center gap-3" aria-label="NEXNS home">
          <img src={nexLogoWhite} alt="" className="h-7 w-auto object-contain" draggable={false} />
          <span className="hidden text-xl font-black tracking-[0.16em] text-white sm:inline">NEXNS</span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Official website navigation">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="text-xs font-bold tracking-[0.2em] text-white/58 transition-colors hover:text-white">
              {item.label}
            </a>
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
        className={`absolute left-0 top-full w-full lg:hidden ${mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} transition-opacity duration-200`}
      >
        <div className="mx-4 mt-3 rounded-3xl border border-violet-500/20 bg-black/96 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.75)] backdrop-blur-xl">
          <nav className="grid gap-2" aria-label="Mobile official website navigation">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={closeMobileMenu}
                className="rounded-2xl border border-white/5 bg-white/[0.025] px-4 py-4 text-sm font-black uppercase tracking-[0.16em] text-white/86 transition hover:border-violet-300/35 hover:bg-violet-500/10 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <Link
            to="/app"
            onClick={closeMobileMenu}
            className="mt-3 flex w-full items-center justify-center rounded-2xl bg-white px-4 py-4 text-sm font-black uppercase tracking-[0.16em] text-black transition hover:bg-violet-100"
          >
            Launch App
          </Link>
        </div>
      </div>
    </header>
  );
}
