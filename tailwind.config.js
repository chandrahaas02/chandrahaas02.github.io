/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        typing: {
          "0%": {
            width: "0%",
            visibility: "hidden"
          },
          "100%": {
            width: "100%"
          }
        },
        "infinite-scroll": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(calc(-50% - 20px))" },
        }
      },
      animation: {
        typing: "typing 2s steps(20)",
        "infinite-scroll": "infinite-scroll 20s linear infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      gridTemplateColumns: {
        30: "repeat(30, minmax(0, 1fr))",
      },
      gridTemplateRows: {
        30: "repeat(30, minmax(0, 1fr))",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#f5f5f5",
          "secondary": "#f2f2f2",
          "accent": "#225522",
          "neutral": "#000000",
          "base-100": "#222222",
          "info": "#00d4ff",
          "success": "#508c00",
          "warning": "#fb6b00",
          "error": "#ff7d7d",
        },
      },
    ],
  },
  plugins: [require('daisyui')],
};
