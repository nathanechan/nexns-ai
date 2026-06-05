import { Link, useLocation } from "react-router-dom";
import { productNavItems } from "./productNav";

export function ProductTopNav({ mobile = false, onNavigate }: { mobile?: boolean; onNavigate?: () => void }) {
  const location = useLocation();

  return (
    <nav className={mobile ? "grid gap-2" : "flex min-w-0 items-center gap-1 overflow-x-auto rounded-full border border-white/8 bg-black/28 p-1"}>
      {productNavItems.map((item) => {
        const Icon = item.icon;
        const isActive = item.activePaths.some((path) => location.pathname === path || location.pathname.startsWith(`${path}/`));

        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={`group flex items-center gap-2 transition-all ${
              mobile
                ? `rounded-2xl px-4 py-3 text-base font-semibold ${isActive ? "bg-neon/20 text-white" : "bg-white/[0.04] text-slate-300 hover:bg-white/8 hover:text-white"}`
                : `rounded-full px-3.5 py-2 text-sm font-semibold ${isActive ? "bg-white/10 text-white shadow-[0_0_18px_rgba(139,92,246,0.18)]" : "text-slate-300 hover:bg-white/8 hover:text-white"}`
            }`}
          >
            <Icon className={`h-4 w-4 ${isActive ? "text-cyan" : "text-slate-400 group-hover:text-cyan"}`} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
