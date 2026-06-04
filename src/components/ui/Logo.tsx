import nexLogoWhite from "../../assets/logo/nex-logo-white.png";

export function Logo({ compact = false }: { compact?: boolean }) {
  void compact;

  return (
    <div className="leading-none">
      <div className="flex items-center gap-3">
        <img src={nexLogoWhite} alt="NEXNS" className="h-9 w-auto object-contain" draggable={false} />
        <span className="text-2xl font-black tracking-[0.14em] text-white">NEXNS</span>
      </div>
    </div>
  );
}
