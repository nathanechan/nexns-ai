import { useEffect, useMemo, useState } from "react";
import { creators, markets, projects } from "../data/previewData";

const parseMoney = (value: string) => Number(value.replace(/[$,M K]/g, ""));
const formatCurrency = (value: number, digits = 2) => value.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits });

function pulse(tick: number, seed: number, span: number) {
  return Math.sin((tick + seed) / 2.2) * span + Math.cos((tick + seed) / 3.7) * span * 0.45;
}

export function useLivePreviewData() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setTick((value) => value + 1), 3000);
    return () => window.clearInterval(id);
  }, []);

  return useMemo(() => {
    const liveMarkets = markets.map((market, index) => {
      const priceNumber = Number(market.price.replace(/,/g, ""));
      const delta = pulse(tick, index + 2, priceNumber * 0.0025);
      const up = Math.max(38, Math.min(76, Math.round(market.up + pulse(tick, index + 6, 4))));
      const participants = Math.round(Number(market.users.replace("K", "")) * 1000 + pulse(tick, index + 10, 380));
      const poolBase = market.pool.includes("M") ? parseMoney(market.pool) * 1_000_000 : parseMoney(market.pool) * 1_000;
      const pool = poolBase + pulse(tick, index + 14, poolBase * 0.012);

      return {
        ...market,
        price: market.symbol === "NEX" ? (priceNumber + delta).toFixed(3) : formatCurrency(priceNumber + delta),
        change: `${delta >= 0 ? "+" : ""}${((delta / priceNumber) * 100 + Number(market.change.replace("%", ""))).toFixed(2)}%`,
        up,
        down: 100 - up,
        users: participants > 999 ? `${(participants / 1000).toFixed(1)}K` : `${participants}`,
        participants,
        pool: pool > 999_999 ? `$${(pool / 1_000_000).toFixed(2)}M` : `$${Math.round(pool / 1000)}K`,
      };
    });

    const liveCreators = creators.map((creator, index) => {
      const baseRoi = Number(creator.roi.replace("+", "").replace("%", ""));
      return {
        ...creator,
        roi: `+${Math.max(20, Math.round(baseRoi + pulse(tick, index + 20, 8)))}%`,
      };
    });

    const liveProjects = projects.map((project, index) => {
      const baseGrowth = Number(project.growth.replace("+", "").replace("%", ""));
      return {
        ...project,
        growth: `+${Math.max(1, baseGrowth + pulse(tick, index + 30, 1.8)).toFixed(1)}%`,
      };
    });

    return {
      tick,
      markets: liveMarkets,
      creators: liveCreators,
      projects: liveProjects,
      btc: liveMarkets[0],
    };
  }, [tick]);
}
