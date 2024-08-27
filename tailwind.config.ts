import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#6246ea",
          "primary-content": "#fffffe",
          secondary: "#d1d1e9",
          "secondary-content": "#101013",
          accent: "#e45858",
          "accent-content": "#120303",
          neutral: "#ffb0b0",
          "neutral-content": "#160b0b",
          "base-100": "#fffffe",
          "base-200": "#dededd",
          "base-300": "#bebebd",
          "base-content": "#2b2c34",
          info: "#009df2",
          "info-content": "#1b2d45",
          success: "#00ebc7",
          "success-content": "#00214d",
          warning: "#fde24f",
          "warning-content": "#00214d",
          error: "#e45858",
          "error-content": "#1b2d45",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
export default config;
