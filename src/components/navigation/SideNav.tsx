import { Link, useLocation } from "react-router-dom";
import { Mascot } from "../ui/Mascot";
import { productNavItems } from "./productNav";

export function SideNav() {
  const location = useLocation();

  return (
    <aside className="fixed left-5 top-24 z-20 hidden max-h-[calc(100vh-7rem)] w-28 overflow-y-auto pb-4 xl:block">
      <div className="glass rounded-[20px] p-2">
        {productNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.activePaths?.some((path) => location.pathname === path || location.pathname.startsWith(`${path}/`));

          return (
            <Link key={`${item.label}-${item.to}`} to={item.to} className={`mb-1 flex flex-col items-center gap-2 rounded-xl px-2 py-3 text-xs font-semibold ${isActive ? "bg-neon/35 text-white shadow-glow" : "text-slate-400 hover:text-white"}`}>
              <Icon className="h-6 w-6" />
              {item.label}
            </Link>
          );
        })}
      </div>
      <Link to="/companion" className="glass interactive-glow mt-6 block rounded-[20px] p-3 text-xs">
        <Mascot variant="thinking" className="-mt-10 mb-1 w-24" />
        <div className="font-semibold">NEX Companion</div>
        <div>NEX</div>
        <div className="mt-2 text-slate-300">Lv.27</div>
        <div className="mt-2 h-1.5 rounded-full bg-white/10"><span className="block h-full w-2/5 rounded-full bg-neon" /></div>
      </Link>
    </aside>
  );
}
