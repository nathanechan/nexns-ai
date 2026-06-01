import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  Bot,
  Crown,
  Flame,
  Gamepad2,
  Gem,
  Rocket,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
  Zap,
} from "lucide-react";

export type Market = {
  symbol: string;
  pair: string;
  price: string;
  change: string;
  up: number;
  down: number;
  pool: string;
  users: string;
  color: string;
  data: { name: string; value: number }[];
};

export type Creator = {
  name: string;
  level: number;
  followers: string;
  winRate: string;
  roi: string;
  style: string;
  avatar: string;
  data: { name: string; value: number }[];
};

export type Project = {
  name: string;
  category: string;
  cap: string;
  growth: string;
  icon: LucideIcon;
  data: { name: string; value: number }[];
};

const series = (seed: number) =>
  Array.from({ length: 24 }, (_, index) => ({
    name: `${index}`,
    value: Math.round(seed + Math.sin(index / 2) * 8 + index * (1 + seed / 90) + ((index * seed) % 11)),
  }));

export const user = {
  name: "Nex Explorer",
  level: 27,
  vip: 3,
  exp: 12580,
  nextExp: 18000,
  ns: "12,450",
  nex: "1,245",
  avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=NexExplorer&backgroundColor=5b21b6",
};

export const stats = [
  { label: "Total Users", value: "1.28M", icon: Users },
  { label: "Total Predictions", value: "24.58M", icon: Zap },
  { label: "Total Prize Pool", value: "$24.58M", icon: Trophy },
  { label: "Win Rate (24H)", value: "62.7%", icon: ShieldCheck },
];

export const markets: Market[] = [
  { symbol: "BTC", pair: "BTC / USDT", price: "68,342.21", change: "+1.32%", up: 58, down: 42, pool: "$2.45M", users: "23.4K", color: "#f7931a", data: series(62) },
  { symbol: "ETH", pair: "ETH / USDT", price: "3,142.18", change: "+0.85%", up: 53, down: 47, pool: "$1.87M", users: "18.3K", color: "#8b5cf6", data: series(48) },
  { symbol: "SOL", pair: "SOL / USDT", price: "154.73", change: "+2.21%", up: 61, down: 39, pool: "$1.23M", users: "15.6K", color: "#22d3ee", data: series(41) },
  { symbol: "BNB", pair: "BNB / USDT", price: "612.90", change: "+0.62%", up: 55, down: 45, pool: "$980K", users: "12.2K", color: "#fbbf24", data: series(36) },
  { symbol: "NEX", pair: "NEX / USDT", price: "1.245", change: "+8.71%", up: 71, down: 29, pool: "$987K", users: "15.6K", color: "#7c3aed", data: series(57) },
];

export const creators: Creator[] = [
  { name: "CryptoKing", level: 28, followers: "128K", winRate: "68.4%", roi: "+145%", style: "Aggressive", avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=CryptoKing", data: series(38) },
  { name: "BellaTrader", level: 26, followers: "76.3K", winRate: "65.2%", roi: "+98%", style: "Technical", avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Bella", data: series(31) },
  { name: "InsightX", level: 30, followers: "65.2K", winRate: "63.8%", roi: "+87%", style: "Fundamental", avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=InsightX", data: series(28) },
  { name: "Visionary", level: 27, followers: "54.8K", winRate: "61.3%", roi: "+76%", style: "Macro", avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Visionary", data: series(25) },
];

export const projects: Project[] = [
  { name: "NEXUS AI", category: "AI", cap: "$48.6M", growth: "+24.5%", icon: Sparkles, data: series(52) },
  { name: "MetaPlay", category: "GameFi", cap: "$32.7M", growth: "+18.3%", icon: Gamepad2, data: series(43) },
  { name: "DePIN Hub", category: "DePIN", cap: "$28.1M", growth: "+15.7%", icon: ShieldCheck, data: series(39) },
  { name: "Web3 Social", category: "SocialFi", cap: "$18.9M", growth: "+10.8%", icon: Users, data: series(33) },
  { name: "GreenRWA", category: "RWA", cap: "$28.1M", growth: "+15.7%", icon: Gem, data: series(37) },
  { name: "MemeX", category: "Meme", cap: "$18.9M", growth: "+12.6%", icon: Flame, data: series(35) },
];

export const tasks = [
  { label: "Make a Prediction", reward: "+20 NS", progress: "Claim", icon: Rocket },
  { label: "Win a Prediction", reward: "+30 NS", progress: "Claim", icon: Trophy },
  { label: "Share a Market", reward: "+15 NS", progress: "0/1", icon: Users },
  { label: "Invite a Friend", reward: "+50 NS", progress: "0/1", icon: Bot },
  { label: "Complete 3 Predictions", reward: "+25 NS", progress: "2/3", icon: BadgeCheck },
];

export const rewards = [
  { label: "Prediction Win", value: "+120 NS", time: "2m ago", icon: Gem },
  { label: "Daily Check-in", value: "+10 NS", time: "1h ago", icon: BadgeCheck },
  { label: "Task Reward", value: "+25 NS", time: "3h ago", icon: Trophy },
  { label: "Creator Follow Bonus", value: "+15 NS", time: "1d ago", icon: Users },
  { label: "Season Reward", value: "+300 NS", time: "2d ago", icon: Crown },
];

export const roiData = series(70);
export const revenueData = [
  { name: "Prediction Revenue", value: 52, fill: "#8b5cf6" },
  { name: "Project Campaign", value: 23, fill: "#0ea5e9" },
  { name: "Community Rewards", value: 15, fill: "#22d3ee" },
  { name: "Advertising", value: 10, fill: "#fbbf24" },
];
