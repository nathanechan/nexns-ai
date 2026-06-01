import { HTMLAttributes, PropsWithChildren } from "react";

type Props = PropsWithChildren<HTMLAttributes<HTMLElement> & {
  className?: string;
}>;

export function GlassCard({ children, className = "", ...props }: Props) {
  return <section className={`glass nex-card ${className}`} {...props}>{children}</section>;
}
