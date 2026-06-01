import {
  Bot,
  CalendarCheck,
  Compass,
  Gift,
  Home,
  MoreHorizontal,
  Rocket,
  Sparkles,
  Target,
  Users,
  Wand2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ProductNavItem = {
  label: string;
  icon: LucideIcon;
  to?: string;
  activePaths?: string[];
  soon?: boolean;
};

export const productNavItems: ProductNavItem[] = [
  { to: "/app", label: "Home", icon: Home, activePaths: ["/app"] },
  { to: "/companion", label: "NEX Companion", icon: Bot, activePaths: ["/companion", "/pet", "/pet/world"] },
  { to: "/prediction", label: "Prediction", icon: Target, activePaths: ["/prediction"] },
  { to: "/creator", label: "Creator", icon: Wand2, activePaths: ["/creator"] },
  { to: "/projects", label: "Project", icon: Rocket, activePaths: ["/projects"] },
  { label: "Community", icon: Users, soon: true },
  { to: "/my", label: "Rewards", icon: Gift, activePaths: ["/my"] },
  { label: "Events", icon: CalendarCheck, soon: true },
  { label: "Discover", icon: Compass, soon: true },
  { label: "More", icon: MoreHorizontal, soon: true },
];

export const companionCard = {
  to: "/companion",
  label: "Ask NEX",
  icon: Sparkles,
};
