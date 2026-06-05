import nexLogoWhite from "../../assets/logo/nex-logo-white.png";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="leading-none">
      <div className="flex items-center gap-3">
        <img src={nexLogoWhite} alt="NEXNS" className={`${compact ? "h-7" : "h-8 sm:h-9"} w-auto object-contain`} draggable={false} />
        <span className={`${compact ? "text-lg" : "text-xl sm:text-2xl"} font-black tracking-[0.14em] text-white`}>NEXNS</span>
      </div>
    </div>
  );
}
