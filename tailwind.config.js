/** @type {import('tailwindcss').Config} **/
module.exports = {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      sm: ["12px", "15px"],
      base: ["14px", "15px"],
      xl: ["36px", "44px"],
    },

    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
  },
  plugins: [],
};
