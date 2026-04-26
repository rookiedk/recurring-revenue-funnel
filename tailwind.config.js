/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0a0f1d",
        panel: "#10172b",
        accent: "#6ea8fe",
      },
    },
  },
  plugins: [],
};
