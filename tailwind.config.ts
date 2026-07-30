import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: {
          50: "#fff5f8",
          100: "#ffe4ee",
          200: "#ffc9dd",
          300: "#ffa3c4",
          400: "#ff7bab",
          500: "#f75694",
          600: "#d93f78",
          700: "#b32e60",
          800: "#8c2249",
          900: "#6b1937",
        },
        lavender: {
          50: "#f6f3ff",
          100: "#ede4ff",
          200: "#dcc9ff",
          300: "#c3a3ff",
          400: "#a97bff",
          500: "#8f56f7",
          600: "#7a3fe0",
          700: "#6330b8",
          800: "#4b2490",
          900: "#351a66",
        },
        gold: {
          50: "#fffbea",
          100: "#fff3c4",
          200: "#ffe58a",
          300: "#ffd452",
          400: "#f8bd2e",
          500: "#e0a316",
          600: "#c1860c",
          700: "#9c6a08",
          800: "#77500a",
          900: "#543908",
        },
        cream: "#fff9f0",
        night: {
          900: "#0b0b1f",
          800: "#14142e",
          700: "#1e1e3f",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      backgroundImage: {
        "radial-fade": "radial-gradient(circle at center, var(--tw-gradient-stops))",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-18px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
          "50%": { transform: "translateY(-12px) translateX(8px)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.2", transform: "scale(0.8)" },
          "50%": { opacity: "1", transform: "scale(1.2)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "gate-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
        "gate-right": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
        rainbow: {
          "0%": { filter: "hue-rotate(0deg)" },
          "100%": { filter: "hue-rotate(360deg)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 9s ease-in-out infinite",
        twinkle: "twinkle 3s ease-in-out infinite",
        "spin-slow": "spin-slow 8s linear infinite",
        shimmer: "shimmer 2.5s linear infinite",
        rainbow: "rainbow 3s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
