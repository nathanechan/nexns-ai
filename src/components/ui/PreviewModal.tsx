import { X } from "lucide-react";
import { PropsWithChildren } from "react";

type PreviewModalProps = PropsWithChildren<{
  title: string;
  description?: string;
  open: boolean;
  onClose: () => void;
}>;

export function PreviewModal({ title, description, open, onClose, children }: PreviewModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/78 px-4 backdrop-blur-md" onClick={onClose}>
      <div
        className="glass interactive-glow relative w-full max-w-xl rounded-[20px] p-6 shadow-glow"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="absolute right-4 top-4 rounded-full border border-white/10 bg-white/5 p-2 text-slate-300 hover:text-white"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="pr-12">
          <div className="nex-label">NEXNS</div>
          <h2 className="nex-title mt-2 text-2xl">{title}</h2>
          {description && <p className="mt-3 leading-7 text-slate-300">{description}</p>}
        </div>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}
