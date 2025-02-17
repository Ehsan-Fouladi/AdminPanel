/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  darkMode: "class",
  plugins: [require("tailwindcss-primeui")],
  theme: {
    extend: {
      screens: {
        xl: { max: "1536px" },
        lg: { max: "1280px" },
        md: { max: "1024px" },
        sm: { max: "768px" },
      },
    },
  },
};
