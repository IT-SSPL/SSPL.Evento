/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
      keyframes: {
        ghost: {
          "0%, 100%": { transform: "translateX(-150%)" },
          "50%": { transform: "translateX(150%)" },
        },
        "bounce-horizontal": {
          "0%, 100%": { transform: "translateX(-25%)" },
          "50%": { transform: "translateX(25%)" },
        },
      },
      animation: {
        ghost: "ghost 10s ease-in-out infinite",
        "bounce-horizontal": "bounce-horizontal 2s infinite",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#739E8B", //"#1B1A22",
          secondary: "#52528C",
        },
      },
    ],
  },
};
