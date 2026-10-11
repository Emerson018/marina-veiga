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
        forest: {
          DEFAULT: "#223829",
          deep: "#1A2B20",
          card: "#263E2E",
          surface: "#2D4735",
        },
        rose: {
          antique: "#D49FAB",
          light: "#F2DCE1",
          muted: "rgba(212, 159, 171, 0.4)",
          border: "rgba(212, 159, 171, 0.25)",
        },
      },
      fontFamily: {
        display: ["var(--font-italiana)", "serif"],
        sans: ["var(--font-montserrat)", "sans-serif"],
      },
      letterSpacing: {
        widest: "0.2em",
        ultra: "0.25em",
      },
    },
  },
  plugins: [],
};

export default config;
