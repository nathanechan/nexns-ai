import { ArrowRight, Bot, BrainCircuit, CheckCircle2, Crown, Flame, MessageCircle, Rocket, Send, Sparkles, Target, Users, Zap } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AppShell } from "../components/layout/AppShell";
import { ActivityFeed } from "../components/ui/ActivityFeed";
import { GlassCard } from "../components/ui/GlassCard";
import { Mascot } from "../components/ui/Mascot";
import { user } from "../data/previewData";
import { useProductState } from "../state/productState";

const answerBook: Record<string, string> = {
  "what is nexns?": "NEXNS is a PredictionFi Growth Network connecting users, creators, projects, and AI companions into one ecosystem where every prediction creates attention, every creator builds influence, and every project accelerates growth.",
  "how do i grow in nexns?": "You grow by making predictions, following creators, joining project campaigns, completing tasks, and caring for your NEX companion. Every action can earn EXP, rewards, progress, and ecosystem reputation.",
  "what should i do next?": "Your next best action is to complete one prediction, follow a top creator, and claim your daily growth task. This will increase your EXP, improve your pet bond, and unlock more progress.",
  "how does nex help me?": "NEX helps you understand markets, track your growth, remind you of tasks, explain creator insights, and guide you through the NEXNS ecosystem.",
  "why is nexns different?": "Most prediction platforms stop at markets. NEXNS combines PredictionFi, creator economy, project growth, AI companion, and user progression into one living growth network.",
  "how do projects grow here?": "Projects launch campaigns, attract creators, activate user predictions, build communities, and convert attention into measurable growth.",
  "how do creators earn?": "Creators share insights, build followers, lead communities, support projects, and earn from prediction influence, campaigns, and ecosystem rewards.",
  "why will users return every day?": "NEXNS gives users recurring reasons to return: active markets, creator alerts, daily growth tasks, reward claims, streaks, and companion progression that improves with each action.",
  "why will creators stay?": "Creators stay because NEXNS turns insight into measurable influence, community growth, campaign opportunities, and recurring reward paths tied to prediction performance.",
  "why will projects pay?": "Projects pay when NEXNS converts launch attention into prediction volume, creator distribution, community tasks, and measurable campaign progress.",
  "how does nexns create network effects?": "Each participant strengthens the others: users create market activity, creators distribute insight, projects fund campaigns, rewards drive retention, and NEX companions keep users progressing.",
  "how does ai companion improve retention?": "The companion makes progress personal. It tracks actions, recommends next steps, rewards consistency, and connects predictions, creators, projects, tasks, and pet growth into one daily habit loop.",
};

const userQuestions = [
  "What is NEXNS?",
  "How do I grow in NEXNS?",
  "What should I do next?",
  "How does NEX help me?",
  "Why is NEXNS different?",
  "How do projects grow here?",
  "How do creators earn?",
];

const investorQuestions = [
  "Why will users return every day?",
  "Why will creators stay?",
  "Why will projects pay?",
  "How does NEXNS create network effects?",
  "How does AI companion improve retention?",
];

const fallbackAnswer = "I’m still learning this part of NEXNS. For now, I can help explain predictions, creators, projects, growth, rewards, and your NEX companion.";

function normalizeQuestion(value: string) {
  return value.trim().toLowerCase();
}

export function CompanionPage() {
  const [input, setInput] = useState("");
  const {
    companionMessages,
    sendCompanionMessage,
    pet,
    userExp,
    streak,
    seasonPoints,
    predictions,
    followedCreators,
    watchedProjects,
    joinedCampaigns,
    claimedTasks,
  } = useProductState();

  const pendingPredictions = predictions.filter((prediction) => prediction.status === "pending");
  const growthRelatedWords = useMemo(() => ["grow", "growth", "return", "creator", "project", "network", "retention", "next", "earn"], []);

  function submitQuestion(question: string, keepInput = false) {
    const clean = question.trim();
    if (!clean) return;
    const key = normalizeQuestion(clean);
    const answer = answerBook[key] ?? fallbackAnswer;
    const growthRelated = growthRelatedWords.some((word) => key.includes(word));
    sendCompanionMessage(clean, answer, growthRelated);
    if (!keepInput) setInput("");
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitQuestion(input);
  }

  function askSuggested(question: string) {
    setInput(question);
    submitQuestion(question, true);
  }

  return (
    <AppShell>
      <section className="grid gap-5 xl:grid-cols-[300px_1fr_330px]">
        <GlassCard className="p-5">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan">NEX AI Companion</div>
          <Mascot variant="thinking" className="mx-auto mt-4 w-52 drop-shadow-[0_0_45px_rgba(139,92,246,.75)]" />
          <h2 className="mt-4 text-2xl font-black">NEX</h2>
          <p className="mt-2 leading-7 text-slate-300">NEX is your AI growth companion inside NEXNS.</p>
          <div className="mt-5 grid gap-3">
            {[
              ["Level", `Lv.${user.level}`, Crown],
              ["EXP", `${userExp.toLocaleString()} / ${user.nextExp.toLocaleString()}`, Sparkles],
              ["Energy", `${pet.energy} / 100`, Zap],
              ["Mood", pet.mood, Flame],
              ["Bond", `${pet.bond} / 100`, Users],
              ["Streak", `${streak} Days`, CheckCircle2],
            ].map(([label, value, Icon]) => (
              <div key={String(label)} className="rounded-xl border border-white/10 bg-white/5 p-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2 text-sm text-slate-300"><Icon className="h-4 w-4 text-neon" />{String(label)}</span>
                  <b>{String(value)}</b>
                </div>
                {label === "Bond" && <div className="mt-2 h-1.5 rounded-full bg-white/10"><span className="block h-full rounded-full bg-gradient-to-r from-neon to-cyan" style={{ width: `${pet.bond}%` }} /></div>}
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="flex min-h-[760px] flex-col overflow-hidden p-0">
          <div className="border-b border-white/10 p-5 md:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl font-black md:text-5xl">NEX is your AI growth companion inside NEXNS.</h1>
                <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">NEX is not just a chatbot. It connects prediction, creators, projects, rewards, and pet growth into one guided product layer.</p>
              </div>
              <span className="rounded-full border border-mint/30 bg-mint/10 px-4 py-2 text-sm text-mint">Growth Companion</span>
            </div>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto p-5 md:p-7">
            <div className="flex gap-3">
              <Mascot variant="guiding" className="h-14 w-14 shrink-0" />
              <div className="max-w-[82%] rounded-2xl border border-neon/20 bg-neon/10 p-4 leading-7 text-slate-100">
                Welcome back. I can explain NEXNS, guide your next action, connect market activity to growth, and help investors understand why the ecosystem compounds.
              </div>
            </div>
            {companionMessages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} gap-3`}>
                {message.role === "nex" && <Mascot variant="thinking" className="h-12 w-12 shrink-0" />}
                <div className={`max-w-[82%] rounded-2xl p-4 leading-7 ${message.role === "user" ? "bg-gradient-to-r from-neon to-blue-600 text-white" : "border border-white/10 bg-white/5 text-slate-100"}`}>
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 p-5 md:p-7">
            <div className="mb-4 grid gap-3 lg:grid-cols-2">
              <QuestionGroup title="User Questions" questions={userQuestions} onAsk={askSuggested} />
              <QuestionGroup title="Investor Questions" questions={investorQuestions} onAsk={askSuggested} />
            </div>
            <form onSubmit={onSubmit} className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-2">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                className="min-w-0 flex-1 bg-transparent px-4 py-3 text-white outline-none"
                aria-label="Ask NEX about predictions, creators, projects, growth, rewards"
              />
              <button type="submit" className="purple-button interactive-glow rounded-xl px-5 py-3 font-semibold">
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        </GlassCard>

        <div className="grid gap-5">
          <GlassCard className="p-5">
            <h2 className="text-xl font-bold">Growth Summary</h2>
            <div className="mt-4 grid gap-3">
              <SummaryRow icon={Target} label="Current Predictions" value={`${pendingPredictions.length} Pending`} />
              <SummaryRow icon={Crown} label="Creator Alerts" value={`${followedCreators.length} Following`} />
              <SummaryRow icon={Rocket} label="Project Reminders" value={`${watchedProjects.length + joinedCampaigns.length} Active`} />
              <SummaryRow icon={Bot} label="Pet Status" value={`${pet.mood}, Bond ${pet.bond}`} />
              <SummaryRow icon={Sparkles} label="Season Points" value={`${seasonPoints} SP`} />
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <h2 className="text-xl font-bold">Next Best Action</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">NEX recommends the fastest path to visible progress.</p>
            <div className="mt-4 grid gap-3">
              <ActionLink to="/prediction" icon={Target} title="Make one prediction" copy="Create a new prediction and grow EXP." />
              <ActionLink to="/creator" icon={Crown} title="Follow one creator" copy="Add a creator signal to your feed." />
              <ActionLink to="/projects" icon={Rocket} title="Join one project campaign" copy="Move project growth and earn progress." />
              <ActionLink to="/my" icon={CheckCircle2} title="Claim today’s growth task" copy={`${claimedTasks.length} tasks already claimed.`} />
              <ActionLink to="/pet" icon={Bot} title="Train your NEX companion" copy="Increase bond, mood, and companion progress." />
            </div>
          </GlassCard>

          <ActivityFeed compact />
        </div>
      </section>
    </AppShell>
  );
}

function QuestionGroup({ title, questions, onAsk }: { title: string; questions: string[]; onAsk: (question: string) => void }) {
  return (
    <div>
      <div className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-cyan">{title}</div>
      <div className="flex flex-wrap gap-2">
        {questions.map((question) => (
          <button key={question} type="button" onClick={() => onAsk(question)} className="interactive-glow rounded-full border border-white/10 bg-white/5 px-3 py-2 text-left text-xs text-slate-200 hover:border-neon/50">
            {question}
          </button>
        ))}
      </div>
    </div>
  );
}

function SummaryRow({ icon: Icon, label, value }: { icon: typeof Target; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
      <span className="flex items-center gap-2 text-sm text-slate-300"><Icon className="h-4 w-4 text-neon" />{label}</span>
      <b className="text-sm">{value}</b>
    </div>
  );
}

function ActionLink({ to, icon: Icon, title, copy }: { to: string; icon: typeof Target; title: string; copy: string }) {
  return (
    <Link to={to} className="interactive-glow flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-neon/20 text-cyan"><Icon className="h-5 w-5" /></span>
      <span className="min-w-0 flex-1">
        <b className="block">{title}</b>
        <small className="text-slate-400">{copy}</small>
      </span>
      <ArrowRight className="h-4 w-4 text-purple-300" />
    </Link>
  );
}
