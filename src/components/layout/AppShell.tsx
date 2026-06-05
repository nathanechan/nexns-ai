import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { ProductTopNav } from "../navigation/ProductTopNav";
import { HeaderWidgets } from "../ui/HeaderWidgets";
import { Logo } from "../ui/Logo";
import { ToastHost } from "../ui/ToastHost";

export function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-space-radial px-4 pb-10 pt-4 sm:px-6">
      <div className="w-full">
        <div className="sticky top-3 z-40 rounded-[22px] border border-white/10 bg-slate-950/68 p-2 shadow-glow backdrop-blur-xl">
          <div className="flex w-full flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-center justify-between gap-3">
              <LinkHome />
              <div className="xl:hidden">
                <HeaderWidgets />
              </div>
            </div>
            <ProductTopNav />
            <div className="hidden xl:block">
              <HeaderWidgets />
            </div>
          </div>
        </div>

        <main className="mt-6 w-full xl:mt-8">
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
