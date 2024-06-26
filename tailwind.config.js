/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,css}", ".src/app/**/*.{html,ts,css}"],
  theme: {
    extend: {
      colors: {
        text: "#0a1516",
        background: "#f7fbfc",
        primary: "#58acb6",
        secondary: "#b89dd4",
        accent: "#c280c7",
      },
    },
  },
  plugins: [],
};
