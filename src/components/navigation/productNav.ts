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
  to: string;
  activePaths: string[];
};

export const productNavItems: ProductNavItem[] = [
  { to: "/app", label: "Home", icon: Home, activePaths: ["/app"] },
  { to: "/companion", label: "NEX Node", icon: Bot, activePaths: ["/companion", "/pet", "/pet/world"] },
  { to: "/prediction", label: "Prediction", icon: Target, activePaths: ["/prediction"] },
  { to: "/creator", label: "Creator", icon: Wand2, activePaths: ["/creator"] },
  { to: "/projects", label: "Project", icon: Rocket, activePaths: ["/projects"] },
  { to: "/creator", label: "Community", icon: Users, activePaths: ["/creator", "/creator/"] },
  { to: "/my", label: "Rewards", icon: Gift, activePaths: ["/my", "/mypage"] },
  { to: "/my", label: "Events", icon: CalendarCheck, activePaths: ["/my", "/mypage"] },
  { to: "/projects", label: "Discover", icon: Compass, activePaths: ["/projects"] },
  { to: "/companion", label: "More", icon: MoreHorizontal, activePaths: ["/companion"] },
];

export const companionCard = {
  to: "/companion",
  label: "Ask NEX",
  icon: Sparkles,
};
