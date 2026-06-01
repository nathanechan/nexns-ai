import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        void: "#030712",
        panel: "#071426",
        neon: "#8b5cf6",
        violet: "#6d5dfc",
        magenta: "#d946ef",
        cyan: "#22d3ee",
        blue: "#2563eb",
        mint: "#20f29b",
        gold: "#f5b942",
        danger: "#ff4e6d",
      },
      boxShadow: {
        glow: "0 0 34px rgba(139,92,246,.34), 0 0 18px rgba(34,211,238,.16)",
        cyan: "0 0 30px rgba(34,211,238,.24)",
        hero: "0 0 70px rgba(139,92,246,.42), 0 0 42px rgba(34,211,238,.22)",
      },
      backgroundImage: {
        "space-radial":
          "radial-gradient(circle at 20% 15%, rgba(139,92,246,.28), transparent 26%), radial-gradient(circle at 78% 5%, rgba(34,211,238,.18), transparent 23%), radial-gradient(circle at 48% 70%, rgba(91,33,182,.22), transparent 34%)",
      },
    },
  },
  plugins: [],
} satisfies Config;
