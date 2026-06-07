import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        void: "#050507",
        panel: "#0E1117",
        neon: "#7C3AED",
        violet: "#7C3AED",
        magenta: "#d946ef",
        cyan: "#00E5FF",
        blue: "#2563eb",
        mint: "#20f29b",
        gold: "#C8A96A",
        danger: "#ff4e6d",
      },
      boxShadow: {
        glow: "0 0 34px rgba(139,92,246,.34), 0 0 18px rgba(34,211,238,.16)",
        cyan: "0 0 30px rgba(34,211,238,.24)",
        hero: "0 0 70px rgba(139,92,246,.42), 0 0 42px rgba(34,211,238,.22)",
      },
      backgroundImage: {
        "space-radial":
          "radial-gradient(circle at 20% 15%, rgba(124,58,237,.18), transparent 28%), radial-gradient(circle at 78% 5%, rgba(0,229,255,.10), transparent 24%), radial-gradient(circle at 48% 70%, rgba(200,169,106,.05), transparent 34%)",
      },
    },
  },
  plugins: [],
} satisfies Config;
