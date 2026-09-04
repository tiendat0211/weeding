import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        wedding: {
          gold: "#c5a880",
          goldDark: "#9d7c50",
          goldLight: "#f4ede4",
          brown: "#7b6252",
          stone: "#c1beb8",
          charcoal: "#2c2825",
          sand: "#f9f7f2",
          cream: "#faf8f5",
          border: "#e8e2d8",
          rose: "#c98288",
        },
      },
      fontFamily: {
        cafeta: ["var(--font-cafeta)", "sans-serif"],
        azkia: ["var(--font-azkia)", "cursive"],
        cormorant: ["var(--font-cormorant)", "serif"],
        pinyon: ["var(--font-pinyon)", "cursive"],
        alex: ["var(--font-alex)", "cursive"],
        ephesis: ["var(--font-ephesis)", "cursive"],
        barlow: ["var(--font-barlow)", "sans-serif"],
        montserrat: ["var(--font-montserrat)", "sans-serif"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        "heartbeat": "heartbeat 1.6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        heartbeat: {
          "0%, 100%": { transform: "scale(1)" },
          "14%": { transform: "scale(1.18)" },
          "28%": { transform: "scale(1)" },
          "42%": { transform: "scale(1.12)" },
          "70%": { transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
