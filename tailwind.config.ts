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
        primary: "#ED1E79",
        secondary: "#662D8C",
        shade: "#8d8d8d",
        bright: "#fefefe",
        lubesurgeons: "#ff9f15",
        ruachost: "#14e6c5",
        cloudnetvox: "#06155a",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        manrope: ["var(--font-manrope)", "sans-serif"],
        proggy: ["var(--font-proggy)", "monospace"],
        space: ["var(--font-space)", "sans-serif"],
      },
      animation: {
        "bg-gradient": "spreadGradient 5s ease infinite",
        "gradient": "moveGradient 4s ease infinite",
        "pulses": "pulse 2s infinite alternate",
        "pulse-slow": "pulse 5s ease infinite",
        "border-spin": "border-spin 7s linear infinite",
        "ping": "ping 1s cubic-bezier(0,0,0.2,1) infinite",
        "scroll": "scroll 20s linear infinite",
        "text-gradient": "text-gradient 5s ease infinite",
      },
      keyframes: {
        spreadGradient: {
          "0%": { backgroundPosition: "0 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0 50%" },
        },
        moveGradient: {
          "0%": { backgroundPosition: "0 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0 50%" },
        },
        pulse: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" },
        },
        "border-spin": {
          to: { transform: "rotate(-1turn)" },
        },
        ping: {
          "75%, 100%": {
            transform: "scale(2)",
            opacity: "0",
          },
        },
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "text-gradient": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center"
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center"
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
