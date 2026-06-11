import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        maejo: {
          green: "#005C3B",
          "green-light": "#007A4E",
          "green-dark": "#003D27",
          gold: "#FFDE00",
          "gold-light": "#FFE840",
          "gold-dark": "#CCB200",
        },
      },
      fontFamily: {
        sans: [
          "Sarabun",
          "Noto Sans Thai",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
export default config;
