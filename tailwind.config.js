/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1A202C",
        primaryLight: "#2A344A",
        tertiary: "#226D7C",
      },
    },
  },
  plugins: [],
};
