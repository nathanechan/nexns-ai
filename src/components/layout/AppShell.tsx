import { PropsWithChildren } from "react";
import { HeaderWidgets } from "../ui/HeaderWidgets";
import { Logo } from "../ui/Logo";
import { BottomNav } from "../navigation/BottomNav";
import { SideNav } from "../navigation/SideNav";
import { ToastHost } from "../ui/ToastHost";

export function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-space-radial px-4 pb-24 pt-5 sm:px-6 xl:pb-8">
      <div className="mx-auto flex max-w-[1480px] items-start justify-between gap-4 xl:pl-36">
        <Logo />
        <HeaderWidgets />
      </div>
      <SideNav />
      <main className="mx-auto mt-6 max-w-[1300px] xl:mt-8 xl:pl-28">{children}</main>
      <div className="xl:hidden"><BottomNav /></div>
      <ToastHost />
    </div>
  );
}
