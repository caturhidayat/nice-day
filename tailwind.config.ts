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
          primary: "#ffd803",

          "primary-content": "#272343",

          secondary: "#e3f6f5",

          "secondary-content": "#161616",

          accent: "#272343",

          "accent-content": "#f2f7f5",

          neutral: "#ffffff",

          "neutral-content": "#161616",

          "base-100": "#fffffe",

          "base-200": "#e3f6f0",

          "base-300": "#bebebe",

          "base-content": "#161616",

          info: "#bae8e8",

          "info-content": "#161616",

          success: "#475d2b",

          "success-content": "#f2f7f5",

          warning: "#ffd883",

          "warning-content": "#161616",

          error: "#fa7743",

          "error-content": "#161616",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
export default config;
