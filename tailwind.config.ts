import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        chart: {
          ink: "#0B1A24",     // deep chart-table navy
          deep: "#0F2431",    // panel navy
          line: "#2E5A57",    // teal ink lines
          brass: "#C9A24B",   // brass accent
          brasslight: "#E4C778",
          parchment: "#EDE6D3",
          paper: "#F6F1E4",
          rust: "#B4542D",
          fog: "#8FA6A3"
        }
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"]
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(201,162,75,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(201,162,75,0.08) 1px, transparent 1px)"
      },
      backgroundSize: {
        grid: "28px 28px"
      },
      boxShadow: {
        instrument: "0 0 0 1px rgba(201,162,75,0.35), 0 8px 30px rgba(0,0,0,0.45)"
      }
    }
  },
  plugins: []
};
export default config;
