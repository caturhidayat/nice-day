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
                    primary: "#0c2d57",

                    "primary-content": "#f3f4f6",

                    secondary: "#075985",

                    "secondary-content": "#cdd9d8",

                    accent: "#fc6737",

                    "accent-content": "#1c1917",

                    neutral: "#ffb0b0",

                    "neutral-content": "#160b0b",

                    "base-100": "#efeeef",

                    "base-200": "#d0cfd0",

                    "base-300": "#b1b1b1",

                    "base-content": "#141414",

                    info: "#009df2",

                    "info-content": "#000914",

                    success: "#00b088",

                    "success-content": "#000b06",

                    warning: "#ffb242",

                    "warning-content": "#160c01",

                    error: "#f05560",

                    "error-content": "#140203",
                },
            },
            "light",
            "dark",
        ],
    },
    plugins: [require("daisyui")],
};
export default config;
