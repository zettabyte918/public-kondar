/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

// Rotate X utilities
const rotateX = plugin(function ({ addUtilities }) {
  addUtilities({
    ".rotate-y-20": {
      transform: "rotateY(20deg)",
    },
  });
});

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    rotateX,
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
