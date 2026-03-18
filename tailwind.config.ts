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
        background: {
          primary: "#F5F1E8", // Warm neutral cream
          secondary: "#FFFFFF",
        },
        accent: {
          forest: "#2D4A3E", // Deep forest green
          muted: "#6B6B6B", // Warm gray
        },
        text: {
          primary: "#1A1A1A",
          secondary: "#6B6B6B",
        },
        border: {
          light: "#E8E3D6",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)"],
        sans: ["var(--font-sans)"],
      },
    },
  },
  plugins: [],
};
export default config;
