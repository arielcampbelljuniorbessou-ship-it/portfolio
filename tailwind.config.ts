import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        void: "#030706",
        obsidian: "#07100e",
        panel: "#0c1613",
        line: "rgba(196, 255, 219, 0.14)",
        neon: "#67ff9a",
        mint: "#b9ffd0",
        aqua: "#63e6ff",
        brass: "#d9c27c",
        ink: "#e9fff0",
        muted: "#93a69a"
      },
      boxShadow: {
        glow: "0 0 34px rgba(103, 255, 154, 0.24)",
        depth: "0 22px 70px rgba(0, 0, 0, 0.42)"
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "Segoe UI",
          "Arial",
          "sans-serif"
        ],
        display: [
          "var(--font-space-grotesk)",
          "Space Grotesk",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif"
        ]
      },
      keyframes: {
        gridMove: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "96px 96px" }
        },
        shimmer: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(120%)" }
        }
      },
      animation: {
        gridMove: "gridMove 24s linear infinite",
        shimmer: "shimmer 2.8s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
