import { PropsWithChildren } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ProductTopNav } from "../navigation/ProductTopNav";
import { HeaderWidgets } from "../ui/HeaderWidgets";
import { Logo } from "../ui/Logo";
import { ToastHost } from "../ui/ToastHost";

export function AppShell({ children }: PropsWithChildren) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-space-radial px-3 pb-10 pt-3 sm:px-6 sm:pt-4">
      <div className="w-full">
        <div className="sticky top-3 z-40 rounded-[26px] border border-white/8 bg-slate-950/78 px-3 py-2 shadow-[0_18px_60px_rgba(0,0,0,0.32)] backdrop-blur-2xl sm:px-4">
          <div className="flex w-full items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <LinkHome />
              <div className="hidden min-w-0 xl:block">
                <ProductTopNav />
              </div>
            </div>
            <div className="hidden xl:block">
              <HeaderWidgets />
            </div>
            <div className="flex items-center gap-2 xl:hidden">
              <HeaderWidgets compact />
              <button
                type="button"
                onClick={() => setMenuOpen((value) => !value)}
                className="interactive-glow grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white"
                aria-label="Open product navigation"
              >
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
          {menuOpen && (
            <div className="mt-3 rounded-[22px] border border-white/10 bg-black/45 p-2 backdrop-blur-xl xl:hidden">
              <ProductTopNav mobile onNavigate={() => setMenuOpen(false)} />
            </div>
          )}
        </div>

        <main className="mt-5 w-full xl:mt-7">
          {children}
        </main>
      </div>

      <ToastHost />
    </div>
  );
}

function LinkHome() {
  return (
    <Link to="/app" className="shrink-0">
      <Logo />
    </Link>
  );
}
