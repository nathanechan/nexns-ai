import {
  ArrowLeft,
  Bed,
  Dumbbell,
  Eye,
  FlaskConical,
  Gift,
  Heart,
  Images,
  ListChecks,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { characterAssets, type CharacterVariant } from "../assets/characters/characterAssets";
import nexWorldBg from "../assets/world/nex-world-bg.png";
import nexWorldMobileBg from "../assets/world/nex-world-mobile-bg.png";
import { GlassCard } from "../components/ui/GlassCard";
import { PreviewModal } from "../components/ui/PreviewModal";
import { ToastHost } from "../components/ui/ToastHost";
import { tasks, user } from "../data/previewData";
import { useProductState } from "../state/productState";

type WorldZone = {
  title: string;
  copy: string;
  icon: LucideIcon;
  position: string;
  mobileGroup: "World Areas" | "Progress Actions";
  characterVariant: CharacterVariant;
  action: "train" | "rest" | "observe" | "evolve" | "gallery" | "social" | "growth" | "affection" | "tasks" | "rewards";
};

const worldZones: WorldZone[] = [
  {
    title: "Training Zone",
    copy: "Train NEX and convert energy into pet EXP.",
    icon: Dumbbell,
    position: "left-[4.6%] top-[18%]",
    mobileGroup: "World Areas",
    characterVariant: "evolution",
    action: "train",
  },
  {
    title: "Rest Area",
    copy: "Recover energy and reset the companion mood.",
    icon: Bed,
    position: "left-[4.5%] bottom-[31%]",
    mobileGroup: "World Areas",
    characterVariant: "sleeping",
    action: "rest",
  },
  {
    title: "Observation Deck",
    copy: "Scan the ecosystem and discover growth signals.",
    icon: Eye,
    position: "left-[31%] top-[13%]",
    mobileGroup: "World Areas",
    characterVariant: "thinking",
    action: "observe",
  },
  {
    title: "Evolution Lab",
    copy: "Advance NEX toward the next evolution stage.",
    icon: FlaskConical,
    position: "right-[6.4%] top-[17%]",
    mobileGroup: "World Areas",
    characterVariant: "evolution",
    action: "evolve",
  },
  {
    title: "Gallery",
    copy: "Explore achievements, memories, and collection progress.",
    icon: Images,
    position: "right-[8%] top-[48%]",
    mobileGroup: "World Areas",
    characterVariant: "legend",
    action: "gallery",
  },
  {
    title: "Social Plaza",
    copy: "Meet other explorers and increase social bond.",
    icon: Users,
    position: "right-[3.8%] bottom-[14%]",
    mobileGroup: "World Areas",
    characterVariant: "community",
    action: "social",
  },
  {
    title: "Growth Center",
    copy: "Review milestone progress and evolution goals.",
    icon: Sparkles,
    position: "left-[4.4%] bottom-[11%]",
    mobileGroup: "Progress Actions",
    characterVariant: "evolution",
    action: "growth",
  },
  {
    title: "Daily Affection",
    copy: "Interact with NEX to increase bond.",
    icon: Heart,
    position: "left-[3.6%] bottom-[2.5%]",
    mobileGroup: "Progress Actions",
    characterVariant: "happy",
    action: "affection",
  },
  {
    title: "Mission Center",
    copy: "Complete a pet task and receive growth progress.",
    icon: ListChecks,
    position: "left-[36%] bottom-[2.4%]",
    mobileGroup: "Progress Actions",
    characterVariant: "quest",
    action: "tasks",
  },
  {
    title: "Reward Center",
    copy: "Claim a companion reward and update activity.",
    icon: Gift,
    position: "right-[35%] bottom-[2.4%]",
    mobileGroup: "Progress Actions",
    characterVariant: "reward",
    action: "rewards",
  },
];

export function PetWorldPage() {
  const [modal, setModal] = useState<{ title: string; description: string } | null>(null);
  const { pet, petAction, claimTask, claimedTasks } = useProductState();

  const handleZone = (zone: WorldZone) => {
    const firstPetTask = tasks[0];

    if (zone.action === "tasks") {
      claimTask(`Pet World: ${firstPetTask.label}`, firstPetTask.reward);
      setModal({ title: zone.title, description: `${firstPetTask.label} completed inside NEX World. ${firstPetTask.reward} added to your growth journey.` });
      return;
    }

    if (zone.action === "rewards") {
      claimTask("NEX World Reward", "+25 NS");
      setModal({ title: zone.title, description: "A NEX World reward was added to your reward history and activity feed." });
      return;
    }

    const effects = {
      train: { exp: pet.exp + 8, energy: pet.energy - 8, mood: "Training" },
      rest: { energy: pet.energy + 12, bond: pet.bond + 2, mood: "Calm" },
      observe: { exp: pet.exp + 4, mood: "Curious" },
      evolve: { evolution: pet.evolution + 6, energy: pet.energy - 4, mood: "Evolving" },
      gallery: { exp: pet.exp + 3, bond: pet.bond + 2, mood: "Proud" },
      social: { bond: pet.bond + 4, mood: "Social" },
      growth: { exp: pet.exp + 5, evolution: pet.evolution + 3, mood: "Motivated" },
      affection: { bond: pet.bond + 6, mood: "Loved" },
    } satisfies Record<Exclude<WorldZone["action"], "tasks" | "rewards">, Parameters<typeof petAction>[2]>;

    petAction(zone.title, zone.copy, effects[zone.action]);
    setModal({ title: zone.title, description: zone.copy });
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#030712] px-4 py-5 text-white sm:px-6">
      <div className="mx-auto max-w-[1760px]">
        <header className="relative z-20 flex flex-wrap items-center justify-between gap-4">
          <div className="min-w-0 max-w-full">
            <Link to="/pet" className="interactive-glow mb-4 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <ArrowLeft className="h-5 w-5" /> Back to AI Pet
            </Link>
            <Link to="/companion" className="interactive-glow mb-4 ml-3 inline-flex items-center gap-2 rounded-xl border border-neon/30 bg-neon/10 px-4 py-3">
              Ask NEX
            </Link>
            <h1 className="text-4xl font-black tracking-wide sm:text-5xl md:text-7xl">NEX <span className="text-gradient">WORLD</span></h1>
            <p className="mt-3 max-w-full break-words text-slate-300 sm:max-w-xl">A cinematic companion world where training, rest, evolution, rewards, and social growth happen in one living environment.</p>
          </div>
          <div className="grid w-full max-w-full gap-3 sm:grid-cols-4 lg:w-auto">
            {[
              ["NEXY", `Lv.${user.level}`],
              ["EXP", `${pet.exp} / 100`],
              ["Energy", `${pet.energy} / 100`],
              ["Mood", pet.mood],
            ].map(([label, value]) => (
              <GlassCard key={label} className="p-4">
                <div className="text-xs text-slate-400">{label}</div>
                <div className="mt-1 font-semibold">{value}</div>
              </GlassCard>
            ))}
          </div>
        </header>

        <main className="relative mt-6">
          <section className="relative hidden h-[calc(100vh-260px)] min-h-[720px] max-h-[860px] overflow-hidden rounded-[34px] border border-white/10 bg-black shadow-hero lg:block">
            <img src={nexWorldBg} alt="NEX World companion city" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_56%,transparent_0%,transparent_22%,rgba(3,7,18,0.12)_43%,rgba(3,7,18,0.58)_100%)]" />
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/55 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/65 to-transparent" />

            <Link to="/companion" className="world-hotspot absolute left-[55%] top-[50%] z-30 max-w-60">
              <GlassCard className="interactive-glow p-4">
                <b>Hey, I am NEXY</b>
                <p className="mt-2 text-sm text-slate-300">Choose a zone and keep growing together.</p>
              </GlassCard>
            </Link>

            {worldZones.map((zone) => (
              <WorldHotspot key={zone.title} zone={zone} onClick={() => handleZone(zone)} claimed={zone.action === "tasks" && claimedTasks.includes(`Pet World: ${tasks[0].label}`)} />
            ))}

          </section>

          <div className="hidden lg:block">
            <WorldStatusPanel pet={pet} onAffection={() => handleZone(worldZones.find((zone) => zone.action === "affection")!)} />
          </div>

          <section className="lg:hidden">
            <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-black shadow-hero">
              <img src={nexWorldMobileBg} alt="Mobile NEX World companion city" className="block w-full" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/70" />
              <div className="absolute bottom-5 left-5 right-5">
                <GlassCard className="bg-slate-950/70 p-5">
                  <div className="nex-label">NEX World</div>
                  <h2 className="mt-2 text-3xl font-black">Choose a companion zone</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-300">The world remains cinematic on mobile. Use the touch actions below to train, rest, evolve, claim rewards, and grow NEX.</p>
                </GlassCard>
              </div>
            </div>

            {(["World Areas", "Progress Actions"] as const).map((group) => (
              <div key={group} className="mt-5">
                <h2 className="nex-label mb-3">{group}</h2>
                <div className="grid gap-3">
                  {worldZones.filter((zone) => zone.mobileGroup === group).map((zone) => (
                    <button key={zone.title} type="button" onClick={() => handleZone(zone)} className="world-mobile-action interactive-glow text-left">
                      <zone.icon className="h-5 w-5 text-cyan" />
                      <img src={characterAssets[zone.characterVariant]} alt="" className="h-12 w-12 object-contain" />
                      <span>
                        <b>{zone.title}</b>
                        <small>{zone.copy}</small>
                      </span>
                      <ArrowLeft className="ml-auto h-4 w-4 rotate-180 text-purple-200" />
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <WorldStatusPanel pet={pet} onAffection={() => handleZone(worldZones.find((zone) => zone.action === "affection")!)} mobile />
          </section>
        </main>
      </div>

      <PreviewModal open={!!modal} title={modal?.title ?? ""} description={modal?.description} onClose={() => setModal(null)}>
        <div className="rounded-2xl border border-cyan/20 bg-cyan/10 p-4 text-sm text-slate-200">NEX World uses local state and simulated progression only.</div>
      </PreviewModal>
      <ToastHost />
    </div>
  );
}

function WorldHotspot({ zone, onClick, claimed }: { zone: WorldZone; onClick: () => void; claimed?: boolean }) {
  const Icon = zone.icon;

  return (
    <button type="button" onClick={onClick} className={`world-hotspot absolute z-30 max-w-[260px] text-left ${zone.position}`}>
      <span className="world-pulse" />
      <GlassCard className="interactive-glow border-neon/30 bg-slate-950/60 p-4 shadow-glow">
        <img src={characterAssets[zone.characterVariant]} alt="" className="pointer-events-none absolute bottom-1 right-2 h-16 w-14 object-contain opacity-70 drop-shadow-[0_0_18px_rgba(139,92,246,.65)]" />
        <div className="relative z-10 flex items-center gap-3 pr-12">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-neon/20 text-cyan"><Icon className="h-5 w-5" /></span>
          <span>
            <span className="block text-sm font-black uppercase tracking-wide">{zone.title}</span>
            <span className="mt-1 block text-xs leading-5 text-slate-300">{claimed ? "Claimed today" : zone.copy}</span>
          </span>
        </div>
      </GlassCard>
    </button>
  );
}

function WorldStatusPanel({ pet, onAffection, mobile = false }: { pet: ReturnType<typeof useProductState>["pet"]; onAffection: () => void; mobile?: boolean }) {
  return (
    <GlassCard className={`${mobile ? "mt-5" : "mt-4"} grid gap-4 p-4 lg:grid-cols-[1fr_1fr_1fr]`}>
      <div>
        <div className="flex items-center justify-between gap-3">
          <span><Heart className="mr-2 inline text-pink-300" />Daily Affection</span>
          <button onClick={onAffection} className="purple-button rounded-xl px-5 py-3 font-semibold">Interact</button>
        </div>
        <div className="mt-4 h-3 rounded-full bg-white/10"><span className="block h-full rounded-full bg-gradient-to-r from-neon to-cyan" style={{ width: `${pet.bond}%` }} /></div>
      </div>
      <div>
        <h2 className="font-semibold">Pet State</h2>
        <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
          <span className="rounded-xl bg-white/5 p-3">EXP <b className="block text-white">{pet.exp}</b></span>
          <span className="rounded-xl bg-white/5 p-3">Energy <b className="block text-white">{pet.energy}</b></span>
          <span className="rounded-xl bg-white/5 p-3">Bond <b className="block text-white">{pet.bond}</b></span>
        </div>
      </div>
      <div>
        <h2 className="flex items-center gap-2 font-semibold"><Trophy className="h-5 w-5 text-cyan" />Next Milestone</h2>
        <div className="mt-2 text-3xl font-black">Lv.30</div>
        <div className="mt-3 h-2 rounded-full bg-white/10"><span className="block h-full rounded-full bg-neon" style={{ width: `${pet.evolution}%` }} /></div>
      </div>
    </GlassCard>
  );
}
