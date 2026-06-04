import { Link, useLocation } from "react-router-dom";
import { productNavItems } from "./productNav";

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed inset-x-3 bottom-3 z-30 mx-auto max-w-4xl rounded-[20px] border border-neon/20 bg-slate-950/88 p-2 shadow-glow backdrop-blur-xl">
      <div className="flex gap-1 overflow-x-auto">
      {productNavItems.map((item) => {
        const Icon = item.icon;
        const isActive = item.activePaths?.some((path) => location.pathname === path || location.pathname.startsWith(`${path}/`));

        return (
          <Link key={item.to} to={item.to} className={`flex min-w-[92px] flex-col items-center justify-center gap-1 rounded-xl px-2 py-3 text-xs font-semibold ${isActive ? "bg-neon/15 text-white shadow-glow" : "text-slate-400 hover:text-white"}`}>
            <Icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        );
      })}
      </div>
    </nav>
  );
}
