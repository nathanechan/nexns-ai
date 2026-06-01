import { CheckCircle2, X } from "lucide-react";
import { useEffect } from "react";
import { useProductState } from "../../state/productState";

export function ToastHost() {
  const { toast, dismissToast } = useProductState();

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(dismissToast, 3600);
    return () => window.clearTimeout(id);
  }, [dismissToast, toast]);

  if (!toast) return null;

  return (
    <div className="fixed right-4 top-4 z-[70] max-w-sm rounded-[20px] border border-neon/40 bg-slate-950/90 p-4 shadow-glow backdrop-blur-xl">
      <div className="flex items-start gap-3">
        <span className="nex-icon h-9 w-9 shrink-0"><CheckCircle2 className="h-5 w-5" /></span>
        <div className="min-w-0">
          <div className="font-semibold text-white">{toast.title}</div>
          <p className="mt-1 text-sm leading-5 text-slate-300">{toast.detail}</p>
        </div>
        <button type="button" onClick={dismissToast} className="rounded-full p-1 text-slate-400 hover:text-white" aria-label="Dismiss notification">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
