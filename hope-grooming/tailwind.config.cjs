module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1f2937", // Customize as needed
        secondary: "#3b82f6",
      },
      fontFamily: {
        sans: ["Campton", "sans-serif"],
        playfair: ["Playfair", "serif"],
        raleway: ["Raleway", "sans-serif"],
        nunito: ["Nunito", "sans-serif"],
        recoleta: ["Recoleta", "serif"],
      },
    },
  },
  plugins: [],
};
