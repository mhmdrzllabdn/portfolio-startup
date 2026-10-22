import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: "#FAFAFA",
          subtle: "#F4F4F2",
          dark: "#EFEFEA",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          muted: "#F7F7F7",
          border: "#E5E5E5",
        },
        obsidian: {
          DEFAULT: "#111111",
          950: "#0A0A0A",
          900: "#111111",
          850: "#161616",
        },
        charcoal: {
          DEFAULT: "#1A1A1A",
          light: "#222222",
          border: "#2A2A2A",
        },
        ivory: {
          DEFAULT: "#F0EFEB",
          light: "#F9F8F6",
          dark: "#E3E1D9",
          border: "#DFDDD5",
        },
        concrete: {
          DEFAULT: "#737373",
          light: "#A3A3A3",
          dark: "#525252",
        },
        mutedGray: "#737373",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        heading: ["var(--font-sora)", "Sora", "sans-serif"],
      },
      maxWidth: {
        "screen-desktop": "1440px",
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.02em",
        widest: "0.15em",
        mega: "0.25em",
      },
      screens: {
        xs: "475px",
      },
    },
  },
  plugins: [],
};
export default config;
