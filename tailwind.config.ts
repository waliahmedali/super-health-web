import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "#f7f7f8",
        card: "#ffffff",
        ink: "#111827",
        muted: "#6b7280",
        accent: "#2563eb",
      },
      boxShadow: {
        soft: "0 8px 30px rgba(17,24,39,0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
