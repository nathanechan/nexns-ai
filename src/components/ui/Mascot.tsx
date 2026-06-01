import { characterAssets, type CharacterVariant } from "../../assets/characters/characterAssets";

export function Mascot({ className = "", variant = "default", alt }: { className?: string; variant?: CharacterVariant; alt?: string }) {
  return (
    <img
      src={characterAssets[variant]}
      alt={alt ?? "NEXNS AI companion"}
      className={`drop-shadow-[0_0_44px_rgba(139,92,246,.72)] ${className}`}
      draggable={false}
    />
  );
}
