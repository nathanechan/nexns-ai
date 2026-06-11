import {
  AlertTriangle,
  Download,
  ExternalLink,
  Loader2,
  LockKeyhole,
  RefreshCw,
  Search,
  ShieldCheck,
} from "lucide-react";
import { useMemo, useState } from "react";
import { AppShell } from "../../components/layout/AppShell";
import { GlassCard } from "../../components/ui/GlassCard";
import {
  fetchGenesisAdminContributions,
  fetchGenesisRuntimeDiagnostics,
  type GenesisContributionRecord,
  type GenesisRuntimeDiagnostics,
} from "./genesisSupabase";

const GENESIS_POOL = 100_000_000;
const GENESIS_HARD_CAP_SOL = 100_000;

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 4 }).format(value);
}

function shortenAddress(address: string) {
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

function sumContributions(records: GenesisContributionRecord[]) {
  return records.reduce((sum, record) => sum + record.contributionAmountSOL, 0);
}

function getUniqueParticipantCount(records: GenesisContributionRecord[]) {
  return new Set(records.map((record) => record.walletAddress)).size;
}

function getTopContributors(records: GenesisContributionRecord[]) {
  const totals = new Map<string, { walletAddress: string; totalSOL: number; estimatedNEX: number; lockedNS: number; count: number }>();

  for (const record of records) {
    const current = totals.get(record.walletAddress) ?? {
      walletAddress: record.walletAddress,
      totalSOL: 0,
      estimatedNEX: 0,
      lockedNS: 0,
      count: 0,
    };
    current.totalSOL += record.contributionAmountSOL;
    current.estimatedNEX += record.estimatedNEXAllocation;
    current.lockedNS += record.lockedNSCredits;
    current.count += 1;
    totals.set(record.walletAddress, current);
  }

  return Array.from(totals.values())
    .sort((first, second) => second.totalSOL - first.totalSOL)
    .slice(0, 10);
}

function toCsv(records: GenesisContributionRecord[]) {
  const headers = [
    "wallet_address",
    "contribution_amount_sol",
    "estimated_nex_allocation",
    "locked_ns_credits",
    "transaction_signature",
    "status",
    "created_at",
    "solscan_url",
  ];
  const rows = records.map((record) => [
    record.walletAddress,
    record.contributionAmountSOL,
    record.estimatedNEXAllocation,
    record.lockedNSCredits,
    record.transactionSignature,
    record.status,
    record.timestamp,
    `https://solscan.io/tx/${record.transactionSignature}`,
  ]);
  const escapeCell = (value: string | number) => `"${String(value).replace(/"/g, '""')}"`;
  return [headers, ...rows].map((row) => row.map(escapeCell).join(",")).join("\n");
}

function downloadCsv(records: GenesisContributionRecord[]) {
  const blob = new Blob([toCsv(records)], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `nexns-genesis-contributions-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function GenesisAdminPage() {
  const [passwordInput, setPasswordInput] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [accessError, setAccessError] = useState("");
  const [records, setRecords] = useState<GenesisContributionRecord[]>([]);
  const [loadMessage, setLoadMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [diagnostics, setDiagnostics] = useState<GenesisRuntimeDiagnostics | null>(null);
  const [diagnosticsMessage, setDiagnosticsMessage] = useState("");
  const [isDiagnosticsLoading, setIsDiagnosticsLoading] = useState(false);

  async function loadRecords(password = passwordInput) {
    setIsLoading(true);
    try {
      const result = await fetchGenesisAdminContributions(password);
      setLoadMessage(result.message);
      setRecords(result.records);
      if (result.source === "error") {
        setAccessError(result.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function unlockAdmin() {
    setAccessError("");

    if (!passwordInput) {
      setAccessError("Genesis admin password is required.");
      return;
    }

    const result = await fetchGenesisAdminContributions(passwordInput);
    if (result.source === "error") {
      setAccessError(result.message);
      return;
    }
    setRecords(result.records);
    setLoadMessage(result.message);
    setIsUnlocked(true);
    void loadDiagnostics(passwordInput);
  }

  async function loadDiagnostics(password = passwordInput) {
    setIsDiagnosticsLoading(true);
    setDiagnosticsMessage("");
    try {
      const result = await fetchGenesisRuntimeDiagnostics(password);
      setDiagnostics(result);
      setDiagnosticsMessage("Runtime health checked.");
    } catch (error) {
      setDiagnostics(null);
      setDiagnosticsMessage(error instanceof Error ? error.message : "Unable to load Genesis runtime health.");
    } finally {
      setIsDiagnosticsLoading(false);
    }
  }

  const filteredRecords = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    const start = startDate ? new Date(`${startDate}T00:00:00`).getTime() : null;
    const end = endDate ? new Date(`${endDate}T23:59:59`).getTime() : null;

    return records.filter((record) => {
      const matchesSearch =
        !normalizedSearch ||
        record.walletAddress.toLowerCase().includes(normalizedSearch) ||
        record.transactionSignature.toLowerCase().includes(normalizedSearch);
      const matchesStatus = statusFilter === "all" || record.status.toLowerCase() === statusFilter.toLowerCase();
      const timestamp = new Date(record.timestamp).getTime();
      const matchesStart = start === null || timestamp >= start;
      const matchesEnd = end === null || timestamp <= end;
      return matchesSearch && matchesStatus && matchesStart && matchesEnd;
    });
  }, [endDate, records, searchTerm, startDate, statusFilter]);

  const totalSOL = sumContributions(filteredRecords);
  const participantCount = getUniqueParticipantCount(filteredRecords);
  const transactionCount = filteredRecords.length;
  const averageContribution = transactionCount > 0 ? totalSOL / transactionCount : 0;
  const largestContribution = Math.max(0, ...filteredRecords.map((record) => record.contributionAmountSOL));
  const progress = Math.min((totalSOL / GENESIS_HARD_CAP_SOL) * 100, 100);
  const allocationRate = totalSOL > 0 ? GENESIS_POOL / totalSOL : null;
  const estimatedNexPrice = totalSOL > 0 ? totalSOL / GENESIS_POOL : null;
  const topContributors = getTopContributors(filteredRecords);
  const latestContributions = filteredRecords.slice(0, 10);

  return (
    <AppShell>
      <div className="mx-auto max-w-[1500px]">
        <GlassCard className="p-6 md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <div className="nex-label">Genesis Admin</div>
              <h1 className="mt-3 text-4xl font-black text-white md:text-6xl">Internal Monitoring Dashboard</h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
                Read-only Genesis contribution monitoring for internal operations. No write, edit, delete, claim, or allocation override controls are available here.
              </p>
            </div>
            <span className="rounded-full border border-gold/20 bg-gold/10 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-gold">
              MVP Access Gate
            </span>
          </div>
        </GlassCard>

        {!isUnlocked ? (
          <GlassCard className="mt-5 p-6 md:p-8">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl border border-cyan/25 bg-cyan/10 text-cyan">
                <LockKeyhole className="h-6 w-6" />
              </span>
              <div>
                <div className="nex-label">Protected Access</div>
                <h2 className="text-2xl font-black text-white">Enter Genesis admin password.</h2>
              </div>
            </div>

            <div className="mt-6 grid max-w-xl gap-3 sm:grid-cols-[1fr_auto]">
              <input
                type="password"
                value={passwordInput}
                onChange={(event) => setPasswordInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") void unlockAdmin();
                }}
                className="rounded-2xl border border-white/10 bg-black/50 px-5 py-4 text-sm font-bold text-white outline-none transition focus:border-cyan/40"
                placeholder="Genesis admin password"
              />
              <button
                type="button"
                onClick={() => void unlockAdmin()}
                className="rounded-2xl bg-white px-6 py-4 text-sm font-black uppercase tracking-[0.14em] text-black transition hover:bg-cyan"
              >
                Unlock
              </button>
            </div>

            {accessError && <p className="mt-4 text-sm font-bold text-gold">{accessError}</p>}
            <p className="mt-6 max-w-3xl text-xs leading-6 text-slate-500">
              This admin dashboard uses temporary server-side password protection for MVP monitoring. Production admin authentication should be upgraded before public scale.
            </p>
          </GlassCard>
        ) : (
          <>
            <GlassCard className="mt-5 p-6 md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="nex-label">Overview Metrics</div>
                  <p className="mt-2 text-sm text-slate-300">{loadMessage || "Genesis records ready."}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => void loadRecords()}
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-white transition hover:border-cyan/40 hover:text-cyan"
                  >
                    <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                    Refresh
                  </button>
                  <button
                    type="button"
                    onClick={() => void loadDiagnostics()}
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-white transition hover:border-cyan/40 hover:text-cyan"
                  >
                    <ShieldCheck className={`h-4 w-4 ${isDiagnosticsLoading ? "animate-pulse" : ""}`} />
                    Runtime Health
                  </button>
                  <button
                    type="button"
                    onClick={() => downloadCsv(filteredRecords)}
                    className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-black transition hover:bg-cyan"
                  >
                    <Download className="h-4 w-4" />
                    Export CSV
                  </button>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {[
                  ["Total SOL Raised", `${formatNumber(totalSOL)} SOL`],
                  ["Total Participants", `${participantCount}`],
                  ["Total Transactions", `${transactionCount}`],
                  ["Average Contribution", `${formatNumber(averageContribution)} SOL`],
                  ["Largest Contribution", `${formatNumber(largestContribution)} SOL`],
                  ["Genesis Progress", `${progress.toFixed(2)}%`],
                  ["Estimated Allocation Rate", allocationRate ? `1 SOL ≈ ${formatNumber(allocationRate)} NEX` : "Pending"],
                  ["Estimated NEX Price", estimatedNexPrice ? `${estimatedNexPrice.toFixed(9)} SOL` : "Pending"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <div className="text-[0.66rem] font-black uppercase tracking-[0.16em] text-slate-400">{label}</div>
                    <div className="mt-2 break-words font-mono text-xl font-black text-white">{value}</div>
                  </div>
                ))}
              </div>
            </GlassCard>

            <RuntimeHealthPanel
              diagnostics={diagnostics}
              message={diagnosticsMessage}
              isLoading={isDiagnosticsLoading}
              onRefresh={() => void loadDiagnostics()}
            />

            <GlassCard className="mt-5 p-6 md:p-8">
              <div className="nex-label">Search & Filter</div>
              <div className="mt-5 grid gap-3 lg:grid-cols-[1fr_180px_180px_180px]">
                <label className="relative block">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-black/50 px-11 py-4 text-sm font-bold text-white outline-none transition focus:border-cyan/40"
                    placeholder="Wallet address or transaction hash"
                  />
                </label>
                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  className="rounded-2xl border border-white/10 bg-black/50 px-4 py-4 text-sm font-bold text-white outline-none transition focus:border-cyan/40"
                >
                  <option value="all">All Status</option>
                  <option value="confirmed">Confirmed</option>
                </select>
                <input
                  type="date"
                  value={startDate}
                  onChange={(event) => setStartDate(event.target.value)}
                  className="rounded-2xl border border-white/10 bg-black/50 px-4 py-4 text-sm font-bold text-white outline-none transition focus:border-cyan/40"
                />
                <input
                  type="date"
                  value={endDate}
                  onChange={(event) => setEndDate(event.target.value)}
                  className="rounded-2xl border border-white/10 bg-black/50 px-4 py-4 text-sm font-bold text-white outline-none transition focus:border-cyan/40"
                />
              </div>
            </GlassCard>

            <section className="mt-5 grid gap-5 xl:grid-cols-2">
              <AdminList title="Top Contributors" records={topContributors} />
              <LatestAdminList title="Latest Contributions" records={latestContributions} />
            </section>

            <GlassCard className="mt-5 overflow-hidden p-0">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 p-6">
                <div>
                  <div className="nex-label">Contribution Table</div>
                  <div className="mt-2 text-sm text-slate-300">{filteredRecords.length} record(s)</div>
                </div>
                {isLoading && (
                  <div className="inline-flex items-center gap-2 text-sm font-bold text-cyan">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading
                  </div>
                )}
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-[1100px] w-full border-collapse text-left text-sm">
                  <thead className="bg-white/[0.035] text-[0.66rem] uppercase tracking-[0.14em] text-slate-400">
                    <tr>
                      <th className="px-4 py-4">Wallet Address</th>
                      <th className="px-4 py-4">SOL Amount</th>
                      <th className="px-4 py-4">Estimated NEX</th>
                      <th className="px-4 py-4">Locked NS</th>
                      <th className="px-4 py-4">Transaction Signature</th>
                      <th className="px-4 py-4">Status</th>
                      <th className="px-4 py-4">Timestamp</th>
                      <th className="px-4 py-4">Solscan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {filteredRecords.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="px-4 py-8 text-center text-slate-400">
                          No Genesis contribution records found.
                        </td>
                      </tr>
                    ) : (
                      filteredRecords.map((record) => (
                        <tr key={record.transactionSignature} className="text-slate-200">
                          <td className="px-4 py-4 font-mono text-xs text-white">{record.walletAddress}</td>
                          <td className="px-4 py-4 font-mono font-black text-cyan">{formatNumber(record.contributionAmountSOL)}</td>
                          <td className="px-4 py-4 font-mono">{formatNumber(record.estimatedNEXAllocation)}</td>
                          <td className="px-4 py-4 font-mono">{formatNumber(record.lockedNSCredits)}</td>
                          <td className="px-4 py-4 font-mono text-xs text-slate-300">{shortenAddress(record.transactionSignature)}</td>
                          <td className="px-4 py-4 font-black text-cyan">{record.status}</td>
                          <td className="px-4 py-4 text-slate-300">{formatDate(record.timestamp)}</td>
                          <td className="px-4 py-4">
                            <a
                              href={`https://solscan.io/tx/${record.transactionSignature}`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 font-black text-white transition hover:text-cyan"
                            >
                              Open <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </GlassCard>

            <GlassCard className="mt-5 p-5">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <p className="text-xs leading-6 text-slate-400">
                  This admin dashboard uses temporary server-side password protection for MVP monitoring. Production admin authentication should be upgraded before public scale. This dashboard is read-only and does not expose service role keys.
                </p>
              </div>
            </GlassCard>
          </>
        )}
      </div>
    </AppShell>
  );
}

function statusTone(status: string) {
  const normalized = status.toLowerCase();
  if (normalized.includes("connected") || normalized.includes("configured") || normalized === "ok") {
    return "border-cyan/25 bg-cyan/8 text-cyan";
  }
  if (normalized.includes("missing") || normalized.includes("invalid") || normalized.includes("unavailable") || normalized.includes("error")) {
    return "border-gold/25 bg-gold/10 text-gold";
  }
  return "border-white/10 bg-white/[0.04] text-slate-300";
}

function RuntimeHealthPanel({
  diagnostics,
  message,
  isLoading,
  onRefresh,
}: {
  diagnostics: GenesisRuntimeDiagnostics | null;
  message: string;
  isLoading: boolean;
  onRefresh: () => void;
}) {
  return (
    <GlassCard className="mt-5 p-6 md:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="nex-label">Runtime Health</div>
          <h2 className="mt-2 text-2xl font-black text-white">Genesis connectivity diagnostics</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Server configuration, Supabase, Solana Mainnet RPC, and Genesis API reachability are checked without exposing secrets.
          </p>
          {message && <p className="mt-3 text-xs font-bold text-gold">{message}</p>}
        </div>
        <button
          type="button"
          onClick={onRefresh}
          className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-white transition hover:border-cyan/40 hover:text-cyan"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          Check Again
        </button>
      </div>

      {!diagnostics ? (
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.035] p-5 text-sm leading-6 text-slate-400">
          Runtime health has not loaded yet. Unlock admin access, then run the diagnostic check.
        </div>
      ) : (
        <div className="mt-6 grid gap-5">
          <div className="grid gap-4 xl:grid-cols-2">
            <DiagnosticEnvGroup title="Frontend ENV" items={diagnostics.frontendEnv} />
            <DiagnosticEnvGroup title="Server ENV" items={diagnostics.serverEnv} />
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <DiagnosticStatusCard title="Supabase" status={diagnostics.supabase.status} message={diagnostics.supabase.message} detail={diagnostics.supabase.recommendedFix || diagnostics.supabase.error} />
            <DiagnosticStatusCard title="Solana RPC" status={diagnostics.solanaRpc.status} message={diagnostics.solanaRpc.message} detail={diagnostics.solanaRpc.recommendedFix || diagnostics.solanaRpc.error} />
          </div>

          <div>
            <div className="nex-label">API Endpoint Status</div>
            <div className="mt-4 grid gap-3 lg:grid-cols-2">
              {diagnostics.api.map((endpoint) => (
                <div key={endpoint.path} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="font-mono text-sm font-black text-white">{endpoint.path}</div>
                    <span className={`rounded-full border px-3 py-1 text-[0.65rem] font-black uppercase tracking-[0.14em] ${statusTone(endpoint.reachable ? "connected" : "error")}`}>
                      {endpoint.reachable ? "Reachable" : "Failed"}
                    </span>
                  </div>
                  <div className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">{endpoint.methodExpected}</div>
                  <div className="mt-2 text-sm leading-6 text-slate-400">
                    {typeof endpoint.statusCode === "number" ? `HTTP ${endpoint.statusCode}. ` : ""}
                    {endpoint.message || "No response message."}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-xs leading-6 text-slate-500">Last checked: {formatDate(diagnostics.checkedAt)}</div>
        </div>
      )}
    </GlassCard>
  );
}

function DiagnosticEnvGroup({ title, items }: { title: string; items: GenesisRuntimeDiagnostics["frontendEnv"] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
      <div className="nex-label">{title}</div>
      <div className="mt-4 grid gap-3">
        {items.map((item) => (
          <div key={item.name} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/25 p-3">
            <div>
              <div className="font-mono text-sm font-black text-white">{item.name}</div>
              <div className="mt-1 text-xs text-slate-500">{item.maskedValue || item.message}</div>
            </div>
            <span className={`rounded-full border px-3 py-1 text-[0.65rem] font-black uppercase tracking-[0.14em] ${statusTone(item.status)}`}>
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DiagnosticStatusCard({ title, status, message, detail }: { title: string; status: string; message: string; detail?: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-lg font-black text-white">{title}</div>
        <span className={`rounded-full border px-3 py-1 text-[0.65rem] font-black uppercase tracking-[0.14em] ${statusTone(status)}`}>
          {status}
        </span>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-300">{message}</p>
      {detail && <p className="mt-3 text-xs leading-6 text-slate-500">{detail}</p>}
    </div>
  );
}

function AdminList({
  title,
  records,
}: {
  title: string;
  records: Array<{ walletAddress: string; totalSOL: number; estimatedNEX: number; lockedNS: number; count: number }>;
}) {
  return (
    <GlassCard className="p-6 md:p-8">
      <div className="nex-label">{title}</div>
      <div className="mt-5 grid gap-3">
        {records.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 text-sm text-slate-400">No records found.</div>
        ) : (
          records.map((record, index) => (
            <div key={record.walletAddress} className="grid gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4 sm:grid-cols-[auto_1fr_auto] sm:items-center">
              <div className="font-mono text-xs font-black text-cyan">{String(index + 1).padStart(2, "0")}</div>
              <div>
                <div className="font-mono text-sm font-black text-white">{shortenAddress(record.walletAddress)}</div>
                <div className="mt-1 text-xs font-bold text-gold">
                  {formatNumber(record.estimatedNEX)} estimated NEX / {record.count} tx
                </div>
              </div>
              <div className="font-mono text-lg font-black text-cyan">{formatNumber(record.totalSOL)} SOL</div>
            </div>
          ))
        )}
      </div>
    </GlassCard>
  );
}

function LatestAdminList({ title, records }: { title: string; records: GenesisContributionRecord[] }) {
  return (
    <GlassCard className="p-6 md:p-8">
      <div className="nex-label">{title}</div>
      <div className="mt-5 grid gap-3">
        {records.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 text-sm text-slate-400">No records found.</div>
        ) : (
          records.map((record) => (
            <div key={record.transactionSignature} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="font-mono text-sm font-black text-white">{shortenAddress(record.walletAddress)}</div>
                  <div className="mt-1 text-xs text-slate-400">{formatDate(record.timestamp)}</div>
                </div>
                <div className="font-mono text-lg font-black text-cyan">{formatNumber(record.contributionAmountSOL)} SOL</div>
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="font-bold text-gold">{formatNumber(record.estimatedNEXAllocation)} estimated NEX</span>
                <a
                  href={`https://solscan.io/tx/${record.transactionSignature}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 font-black uppercase tracking-[0.12em] text-white transition hover:text-cyan"
                >
                  Solscan <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </GlassCard>
  );
}
