import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Area, AreaChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const tvlData = [
  { day: "Apr", value: 8.4 },
  { day: "May", value: 11.2 },
  { day: "Jun", value: 14.6 },
  { day: "Jul", value: 16.1 },
  { day: "Aug", value: 19.8 },
  { day: "Sep", value: 24.8 },
];

const activeUserData = [
  { day: "W1", value: 38400 },
  { day: "W2", value: 42600 },
  { day: "W3", value: 51800 },
  { day: "W4", value: 60400 },
  { day: "W5", value: 72100 },
  { day: "W6", value: 82360 },
];

const tokenDistribution = [
  { name: "Ecosystem Rewards", value: 30, color: "#00F0FF", detail: "Funds user rewards, mission completion, retention loops, and network participation incentives." },
  { name: "DAO Treasury", value: 20, color: "#8A2BE2", detail: "Supports governance reserves, long-term protocol stability, ecosystem grants, and strategic operations." },
  { name: "Team", value: 15, color: "#a78bfa", detail: "Aligns core contributors with long-term product, protocol, security, and ecosystem execution." },
  { name: "Investors", value: 10, color: "#6d28d9", detail: "Reserved for strategic capital partners supporting growth, infrastructure, and global market entry." },
  { name: "Liquidity", value: 10, color: "#4c1d95", detail: "Bootstraps market liquidity, exchange readiness, and protocol-level asset depth." },
  { name: "Creator Fund", value: 5, color: "#c4b5fd", detail: "Incentivizes creator onboarding, campaign distribution, community growth, and insight production." },
  { name: "Advisors & Partners", value: 5, color: "#7dd3fc", detail: "Supports advisors, ecosystem alliances, infrastructure partners, and go-to-market channels." },
  { name: "Foundation Reserve", value: 5, color: "#312e81", detail: "Maintains strategic reserves for compliance, protocol continuity, and future expansion." },
];

const baseMetrics = {
  tvl: 24_800_000,
  transactions: 128_560,
  burn: 1_280_000,
};

function formatCurrency(value: number) {
  return `$${(value / 1_000_000).toFixed(2)}M`;
}

function formatInteger(value: number) {
  return Math.round(value).toLocaleString("en-US");
}

function formatMillions(value: number) {
  return `${(value / 1_000_000).toFixed(2)}M`;
}

export function FinancialDashboard() {
  const [metrics, setMetrics] = useState(baseMetrics);
  const [activeAllocation, setActiveAllocation] = useState(0);
  const selectedAllocation = tokenDistribution[activeAllocation];

  useEffect(() => {
    const interval = window.setInterval(() => {
      const jitter = () => 1 + (Math.random() * 0.001 - 0.0005);
      setMetrics({
        tvl: baseMetrics.tvl * jitter(),
        transactions: baseMetrics.transactions * jitter(),
        burn: baseMetrics.burn * jitter(),
      });
    }, 2200);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <ChartCard title="Protocol Metrics">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            ["TVL", formatCurrency(metrics.tvl)],
            ["Transactions", formatInteger(metrics.transactions)],
            ["Burn Rates", formatMillions(metrics.burn)],
          ].map(([label, value]) => (
            <div key={label} className="protocol-pulse-row border-b border-violet-500/20 pb-4">
              <div className="text-[10px] font-black uppercase tracking-[0.18em] text-white/36">{label}</div>
              <div className="mt-2 font-mono text-2xl font-black text-white">{value}</div>
            </div>
          ))}
        </div>
        <div className="mt-7 h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={tvlData}>
              <defs>
                <linearGradient id="tvlGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="#00F0FF" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#00F0FF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fill: "rgba(255,255,255,0.32)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip contentStyle={{ background: "#0A0A0B", border: "1px solid rgba(109,40,217,.28)", borderRadius: 12 }} />
              <Area dataKey="value" stroke="#00F0FF" strokeWidth={2.4} fill="url(#tvlGradient)" type="monotone" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      <div className="nex-panel p-7">
        <h3 className="text-2xl font-black">NEX Protocol Asset Allocation</h3>
        <div className="mt-7 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="relative h-[260px] rounded-3xl border border-violet-500/20 bg-black/30 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={tokenDistribution}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={92}
                  paddingAngle={3}
                  onClick={(_, index) => setActiveAllocation(index)}
                >
                  {tokenDistribution.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={entry.color}
                      stroke={index === activeAllocation ? "#ffffff" : "rgba(10,10,11,0.8)"}
                      strokeWidth={index === activeAllocation ? 2.5 : 1}
                      opacity={index === activeAllocation ? 1 : 0.5}
                      style={{ cursor: "pointer", filter: index === activeAllocation ? `drop-shadow(0 0 8px ${entry.color})` : "none" }}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
              <div>
                <div className="font-mono text-3xl font-black text-white">{selectedAllocation.value}%</div>
                <div className="mt-1 max-w-28 text-[10px] font-black uppercase tracking-[0.12em] text-white/70">{selectedAllocation.name}</div>
              </div>
            </div>
          </div>

          <div className="grid gap-3">
            {tokenDistribution.map((item, index) => {
              const isActive = activeAllocation === index;

              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setActiveAllocation(index)}
                  className={`grid grid-cols-[1fr_auto_auto] items-center gap-3 rounded-2xl border p-3 text-left transition ${
                    isActive ? "border-white/40 bg-white/[0.08] shadow-[0_0_22px_rgba(138,43,226,0.2)]" : "border-violet-500/18 bg-white/[0.018] hover:border-violet-300/35"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="h-3 w-3 rounded-full" style={{ background: item.color, boxShadow: isActive ? `0 0 14px ${item.color}` : undefined }} />
                    <span className="text-sm font-semibold text-white/88">{item.name}</span>
                  </span>
                  <span className="text-white/55">→</span>
                  <span className="font-mono text-sm font-black text-white">{item.value}%</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 rounded-3xl border border-cyan-300/20 bg-cyan-300/[0.055] p-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="h-3 w-3 rounded-full" style={{ background: selectedAllocation.color, boxShadow: `0 0 16px ${selectedAllocation.color}` }} />
            <span className="text-xs font-black uppercase tracking-[0.16em] text-cyan-100">Allocation Detail</span>
            <span className="text-white/45">→</span>
            <span className="font-mono text-sm font-black text-white">{selectedAllocation.value}%</span>
          </div>
          <h4 className="mt-4 text-xl font-black text-white">{selectedAllocation.name}</h4>
          <p className="mt-3 text-sm leading-[1.75] text-white/82">{selectedAllocation.detail}</p>
        </div>
      </div>
    </div>
  );
}

function ChartCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="nex-panel p-7">
      <h3 className="text-2xl font-black">{title}</h3>
      <div className="mt-7">{children}</div>
    </div>
  );
}
