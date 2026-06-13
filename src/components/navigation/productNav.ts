import {
  Home,
  Landmark,
  MessageCircle,
  MoreHorizontal,
  PlusCircle,
  Sparkles,
  Target,
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
  { to: "/app/genesis", label: "Genesis", icon: Landmark, activePaths: ["/app/genesis"] },
  { to: "/prediction", label: "Prediction", icon: Target, activePaths: ["/prediction"] },
  { to: "/creator", label: "Creators", icon: Wand2, activePaths: ["/creator"] },
  { to: "/community", label: "Community", icon: MessageCircle, activePaths: ["/community"] },
  { to: "/create", label: "Create", icon: PlusCircle, activePaths: ["/create"] },
  { to: "/more", label: "More", icon: MoreHorizontal, activePaths: ["/more", "/my", "/mypage", "/pet", "/pet/world"] },
];

export const companionCard = {
  to: "/app/chat",
  label: "Ask NEX",
  icon: Sparkles,
};
