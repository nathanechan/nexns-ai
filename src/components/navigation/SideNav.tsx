import { Link, useLocation } from "react-router-dom";
import { PawPrint, UserCircle } from "lucide-react";
import { Mascot } from "../ui/Mascot";
import { productNavItems } from "./productNav";

export function SideNav() {
  const location = useLocation();

  return (
    <aside className="fixed left-5 top-24 z-20 hidden max-h-[calc(100vh-7rem)] w-24 overflow-y-auto pb-4 xl:block">
      <div className="glass rounded-[18px] p-1.5">
        {productNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.activePaths?.some((path) => location.pathname === path || location.pathname.startsWith(`${path}/`));

          return (
            <Link key={`${item.label}-${item.to}`} to={item.to} className={`mb-1 flex flex-col items-center gap-1.5 rounded-xl px-1.5 py-2.5 text-[11px] font-semibold ${isActive ? "bg-neon/35 text-white shadow-glow" : "text-slate-400 hover:text-white"}`}>
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </div>
      <div className="glass mt-4 grid gap-2 rounded-[18px] p-2 text-[11px]">
        <Link to="/my" className="interactive-glow flex items-center gap-2 rounded-xl bg-white/5 p-2 text-slate-200">
          <UserCircle className="h-4 w-4 text-cyan" />
          Personal
        </Link>
        <Link to="/pet" className="interactive-glow flex items-center gap-2 rounded-xl bg-white/5 p-2 text-slate-200">
          <PawPrint className="h-4 w-4 text-neon" />
          Pet Home
        </Link>
      </div>
      <Link to="/pet" className="glass interactive-glow mt-4 block rounded-[18px] p-3 text-xs">
        <Mascot variant="thinking" className="-mt-8 mb-1 w-20" />
        <div className="font-semibold">NEX Companion</div>
        <div>AI Pet Home</div>
        <div className="mt-2 text-slate-300">Lv.27</div>
        <div className="mt-2 h-1.5 rounded-full bg-white/10"><span className="block h-full w-2/5 rounded-full bg-neon" /></div>
      </Link>
    </aside>
  );
}
