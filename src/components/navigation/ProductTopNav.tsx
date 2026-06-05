import { Link, useLocation } from "react-router-dom";
import { productNavItems } from "./productNav";

export function ProductTopNav() {
  const location = useLocation();

  return (
    <nav className="flex min-w-0 items-center gap-1 overflow-x-auto rounded-2xl border border-white/10 bg-slate-950/72 p-1.5 shadow-glow backdrop-blur-xl">
      {productNavItems.map((item) => {
        const Icon = item.icon;
        const isActive = item.activePaths.some((path) => location.pathname === path || location.pathname.startsWith(`${path}/`));

        return (
          <Link
            key={item.to}
            to={item.to}
            className={`group flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
              isActive ? "bg-neon/25 text-white shadow-glow" : "text-slate-300 hover:bg-white/8 hover:text-white"
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
