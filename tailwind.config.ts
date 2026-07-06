import type { Config } from "tailwindcss";

/**
 * Columbina "Hyposelenia" moon palette.
 * Near-monochrome moonlight, with a single warm gold halo accent.
 */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Deep night canvas
        void: "#05060c",
        midnight: "#0a0d1a",
        dusk: "#121629",
        // Moonlight
        moon: {
          50: "#fbfcff",
          100: "#f2f4fb",
          200: "#e6eaf6",
          300: "#d3daef",
          400: "#b6c0e0",
          500: "#93a0c9",
          600: "#6f7ead",
        },
        // Pale lavender shadow
        lavender: "#a9a7d4",
        // Warm gold halo accent
        halo: {
          DEFAULT: "#e9cf8f",
          soft: "#f4e6bf",
          deep: "#c8aa24",
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', "serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      letterSpacing: {
        widest2: "0.32em",
      },
      keyframes: {
        drift: {
          "0%": { transform: "translateY(-10%) translateX(0) rotate(0deg)", opacity: "0" },
          "10%": { opacity: "0.7" },
          "90%": { opacity: "0.5" },
          "100%": { transform: "translateY(110vh) translateX(40px) rotate(120deg)", opacity: "0" },
        },
        haloPulse: {
          "0%, 100%": { opacity: "0.35", transform: "scale(1)" },
          "50%": { opacity: "0.6", transform: "scale(1.04)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.15" },
          "50%": { opacity: "0.9" },
        },
        rise: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        haloPulse: "haloPulse 7s ease-in-out infinite",
        twinkle: "twinkle 4s ease-in-out infinite",
        rise: "rise 1.1s ease-out both",
      },
    },
  },
  plugins: [],
} satisfies Config;
