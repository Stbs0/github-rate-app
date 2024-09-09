/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#24292e",
        secondary: "#586069",
      },
      backgroundColor: {
        primary: "#0366d6",
        mainBackground: "#e1e4e8",
      },
    },
  },
  plugins: [],
};
