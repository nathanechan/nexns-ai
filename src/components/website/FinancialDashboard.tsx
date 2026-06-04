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
  { name: "Ecosystem Rewards", value: 30, color: "#00F0FF" },
  { name: "DAO Treasury", value: 20, color: "#8A2BE2" },
  { name: "Team", value: 15, color: "#a78bfa" },
  { name: "Investors", value: 10, color: "#6d28d9" },
  { name: "Liquidity", value: 10, color: "#4c1d95" },
  { name: "Creator Fund", value: 5, color: "#c4b5fd" },
  { name: "Advisors & Partners", value: 5, color: "#7dd3fc" },
  { name: "Foundation Reserve", value: 5, color: "#312e81" },
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
        <div className="mt-6 h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={tokenDistribution} dataKey="value" nameKey="name" innerRadius={58} outerRadius={88} paddingAngle={3}>
                {tokenDistribution.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} stroke="rgba(10,10,11,0.8)" />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: "#0A0A0B", border: "1px solid rgba(109,40,217,.28)", borderRadius: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid gap-2">
          {tokenDistribution.map((item) => (
            <div key={item.name} className="flex items-center justify-between text-sm">
              <span className="text-white/48">{item.name}</span>
              <span className="font-mono font-bold text-white">{item.value}%</span>
            </div>
          ))}
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
