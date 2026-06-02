import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { user } from "../data/previewData";

export type ActivityEvent = {
  id: string;
  title: string;
  detail: string;
  createdAt: string;
  type: "prediction" | "creator" | "project" | "pet" | "reward" | "system";
};

export type PreviewPrediction = {
  id: string;
  market: string;
  direction: "UP" | "DOWN";
  amount: number;
  odds: number;
  status: "pending" | "won" | "lost";
  createdAt: string;
  rewardPreview: number;
};

export type CompanionMessage = {
  id: string;
  role: "user" | "nex";
  text: string;
  createdAt: string;
};

type PetState = {
  exp: number;
  energy: number;
  bond: number;
  mood: string;
  evolution: number;
};

type ProductState = {
  followedCreators: string[];
  joinedCreatorCommunities: string[];
  watchedProjects: string[];
  joinedCampaigns: string[];
  claimedTasks: string[];
  predictions: PreviewPrediction[];
  rewards: ActivityEvent[];
  activities: ActivityEvent[];
  toast: ActivityEvent | null;
  nsBalance: number;
  userExp: number;
  seasonPoints: number;
  streak: number;
  pet: PetState;
  companionMessages: CompanionMessage[];
  companionFirstChatRewarded: boolean;
};

type ProductActions = {
  dismissToast: () => void;
  followCreator: (name: string) => void;
  joinCreatorCommunity: (name: string) => void;
  watchProject: (name: string) => void;
  joinCampaign: (name: string) => void;
  claimTask: (task: string, reward?: string) => void;
  createPrediction: (input: Omit<PreviewPrediction, "id" | "status" | "createdAt" | "rewardPreview">) => PreviewPrediction;
  settlePrediction: (id: string, won?: boolean) => void;
  petAction: (action: string, detail: string, effect?: Partial<PetState>) => void;
  sendCompanionMessage: (question: string, answer: string, growthRelated?: boolean) => void;
  addActivity: (event: Omit<ActivityEvent, "id" | "createdAt">) => void;
};

const storageKey = "nexns-living-product-state-v1";

const numeric = (value: string) => Number(value.replace(/,/g, ""));

const initialState: ProductState = {
  followedCreators: [],
  joinedCreatorCommunities: [],
  watchedProjects: [],
  joinedCampaigns: [],
  claimedTasks: [],
  predictions: [],
  rewards: [],
  activities: [
    {
      id: "seed-activity",
      title: "NEXNS network online",
      detail: "The activity layer is tracking predictions, follows, rewards, and pet growth.",
      createdAt: new Date().toISOString(),
      type: "system",
    },
  ],
  toast: null,
  nsBalance: numeric(user.ns),
  userExp: user.exp,
  seasonPoints: 245,
  streak: 7,
  pet: {
    exp: 23,
    energy: 80,
    bond: 72,
    mood: "Happy",
    evolution: 50,
  },
  companionMessages: [],
  companionFirstChatRewarded: false,
};

const ProductStateContext = createContext<(ProductState & ProductActions) | null>(null);

function makeEvent(event: Omit<ActivityEvent, "id" | "createdAt">): ActivityEvent {
  return {
    ...event,
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    createdAt: new Date().toISOString(),
  };
}

function parseReward(reward?: string) {
  if (!reward) return 10;
  const match = reward.match(/\+?(\d+)/);
  return match ? Number(match[1]) : 10;
}

export function ProductStateProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<ProductState>(() => {
    try {
      const saved = window.localStorage.getItem(storageKey);
      return saved ? { ...initialState, ...JSON.parse(saved), toast: null } : initialState;
    } catch {
      return initialState;
    }
  });

  useEffect(() => {
    const { toast, ...persisted } = state;
    window.localStorage.setItem(storageKey, JSON.stringify(persisted));
  }, [state]);

  const pushEvent = useCallback((event: Omit<ActivityEvent, "id" | "createdAt">) => {
    const next = makeEvent(event);
    setState((current) => ({
      ...current,
      toast: next,
      activities: [next, ...current.activities].slice(0, 40),
    }));
  }, []);

  const boostPet = useCallback((effect: Partial<PetState>) => {
    setState((current) => ({
      ...current,
      pet: {
        ...current.pet,
        ...effect,
        exp: Math.min(100, effect.exp ?? current.pet.exp),
        energy: Math.max(0, Math.min(100, effect.energy ?? current.pet.energy)),
        bond: Math.max(0, Math.min(100, effect.bond ?? current.pet.bond)),
        evolution: Math.max(0, Math.min(100, effect.evolution ?? current.pet.evolution)),
      },
    }));
  }, []);

  const value = useMemo<ProductState & ProductActions>(() => ({
    ...state,
    dismissToast: () => setState((current) => ({ ...current, toast: null })),
    addActivity: pushEvent,
    followCreator: (name) => {
      const followed = state.followedCreators.includes(name);
      setState((current) => ({
        ...current,
        followedCreators: followed ? current.followedCreators.filter((item) => item !== name) : [name, ...current.followedCreators],
        userExp: current.userExp + (followed ? 0 : 8),
        pet: followed ? current.pet : { ...current.pet, exp: Math.min(100, current.pet.exp + 4), mood: "Inspired" },
      }));
      pushEvent({ type: "creator", title: followed ? `Unfollowed ${name}` : `Following ${name}`, detail: followed ? "Creator alerts paused." : "Creator calls will now influence your feed." });
    },
    joinCreatorCommunity: (name) => {
      if (state.joinedCreatorCommunities.includes(name)) {
        pushEvent({ type: "creator", title: `${name} community already joined`, detail: "You are already receiving community updates." });
        return;
      }
      setState((current) => ({
        ...current,
        joinedCreatorCommunities: [name, ...current.joinedCreatorCommunities],
        nsBalance: current.nsBalance + 15,
        userExp: current.userExp + 12,
        pet: { ...current.pet, bond: Math.min(100, current.pet.bond + 3), mood: "Social" },
      }));
      pushEvent({ type: "creator", title: `Joined ${name} community`, detail: "+15 NS, +12 EXP, and NEX feels more social." });
    },
    watchProject: (name) => {
      const watched = state.watchedProjects.includes(name);
      setState((current) => ({
        ...current,
        watchedProjects: watched ? current.watchedProjects.filter((item) => item !== name) : [name, ...current.watchedProjects],
        pet: watched ? current.pet : { ...current.pet, evolution: Math.min(100, current.pet.evolution + 2), mood: "Curious" },
      }));
      pushEvent({ type: "project", title: watched ? `Stopped watching ${name}` : `Watching ${name}`, detail: watched ? "Project alerts paused." : "Project growth updates added to your network feed." });
    },
    joinCampaign: (name) => {
      if (state.joinedCampaigns.includes(name)) {
        pushEvent({ type: "project", title: `${name} campaign already joined`, detail: "Campaign progress is already active." });
        return;
      }
      setState((current) => ({
        ...current,
        joinedCampaigns: [name, ...current.joinedCampaigns],
        seasonPoints: current.seasonPoints + 15,
        userExp: current.userExp + 20,
        pet: { ...current.pet, exp: Math.min(100, current.pet.exp + 8), evolution: Math.min(100, current.pet.evolution + 4), mood: "Ambitious" },
      }));
      pushEvent({ type: "project", title: `Joined ${name} campaign`, detail: "+20 EXP, +15 SP, and project progress moved forward." });
    },
    claimTask: (task, reward) => {
      if (state.claimedTasks.includes(task)) {
        pushEvent({ type: "reward", title: `${task} already claimed`, detail: "This task reward has already been collected." });
        return;
      }
      const amount = parseReward(reward);
      const rewardEvent = makeEvent({ type: "reward", title: `${task} reward claimed`, detail: `+${amount} NS and +10 EXP added to your growth journey.` });
      setState((current) => ({
        ...current,
        claimedTasks: [task, ...current.claimedTasks],
        rewards: [rewardEvent, ...current.rewards].slice(0, 20),
        activities: [rewardEvent, ...current.activities].slice(0, 40),
        toast: rewardEvent,
        nsBalance: current.nsBalance + amount,
        userExp: current.userExp + 10,
        seasonPoints: current.seasonPoints + 5,
        pet: { ...current.pet, exp: Math.min(100, current.pet.exp + 5), bond: Math.min(100, current.pet.bond + 2), mood: "Rewarded" },
      }));
    },
    createPrediction: (input) => {
      const prediction: PreviewPrediction = {
        ...input,
        id: `${Date.now()}-${input.market}-${input.direction}`,
        status: "pending",
        createdAt: new Date().toISOString(),
        rewardPreview: Math.round(input.amount * input.odds),
      };
      setState((current) => ({
        ...current,
        predictions: [prediction, ...current.predictions].slice(0, 20),
        userExp: current.userExp + 12,
        seasonPoints: current.seasonPoints + 5,
        pet: { ...current.pet, exp: Math.min(100, current.pet.exp + 8), energy: Math.max(0, current.pet.energy - 4), mood: "Focused" },
      }));
      pushEvent({ type: "prediction", title: `${input.market} ${input.direction} prediction created`, detail: `${input.amount} NS entry recorded. Potential reward: ${prediction.rewardPreview} NS.` });
      return prediction;
    },
    settlePrediction: (id, won = true) => {
      let settled: PreviewPrediction | undefined;
      setState((current) => {
        const predictions = current.predictions.map((prediction) => {
          if (prediction.id !== id || prediction.status !== "pending") return prediction;
          settled = { ...prediction, status: won ? "won" : "lost" };
          return settled;
        });
        const rewardEvent = settled && won ? makeEvent({ type: "reward", title: `${settled.market} prediction won`, detail: `+${settled.rewardPreview} NS reward settled.` }) : null;
        return {
          ...current,
          predictions,
          rewards: rewardEvent ? [rewardEvent, ...current.rewards].slice(0, 20) : current.rewards,
          activities: rewardEvent ? [rewardEvent, ...current.activities].slice(0, 40) : current.activities,
          toast: rewardEvent ?? current.toast,
          nsBalance: current.nsBalance + (won && settled ? settled.rewardPreview : 0),
          userExp: current.userExp + (won ? 18 : 6),
          pet: { ...current.pet, exp: Math.min(100, current.pet.exp + (won ? 12 : 4)), bond: Math.min(100, current.pet.bond + 2), mood: won ? "Excited" : "Learning" },
        };
      });
      pushEvent({ type: "prediction", title: won ? "Prediction settled: win" : "Prediction settled: learning moment", detail: won ? "Rewards, EXP, and pet bond increased." : "EXP still increased because every prediction grows the journey." });
    },
    petAction: (action, detail, effect = {}) => {
      boostPet(effect);
      pushEvent({ type: "pet", title: action, detail });
    },
    sendCompanionMessage: (question, answer, growthRelated = false) => {
      const firstReward = !state.companionFirstChatRewarded;
      const now = new Date().toISOString();
      const userMessage: CompanionMessage = {
        id: `${Date.now()}-user`,
        role: "user",
        text: question,
        createdAt: now,
      };
      const nexMessage: CompanionMessage = {
        id: `${Date.now()}-nex`,
        role: "nex",
        text: answer,
        createdAt: now,
      };
      const event = makeEvent({
        type: "pet",
        title: firstReward ? "First NEX conversation complete" : "NEX companion guidance updated",
        detail: firstReward ? "+5 EXP and bond increased through companion guidance." : "Bond increased and NEX mood shifted to Inspired.",
      });
      setState((current) => ({
        ...current,
        companionMessages: [...current.companionMessages, userMessage, nexMessage].slice(-40),
        companionFirstChatRewarded: true,
        userExp: current.userExp + (firstReward ? 5 : 0),
        pet: {
          ...current.pet,
          bond: Math.min(100, current.pet.bond + 2),
          mood: "Inspired",
        },
        activities: growthRelated || firstReward ? [event, ...current.activities].slice(0, 40) : current.activities,
        toast: event,
      }));
    },
  }), [boostPet, pushEvent, state]);

  return <ProductStateContext.Provider value={value}>{children}</ProductStateContext.Provider>;
}

export function useProductState() {
  const context = useContext(ProductStateContext);
  if (!context) throw new Error("useProductState must be used inside ProductStateProvider");
  return context;
}
