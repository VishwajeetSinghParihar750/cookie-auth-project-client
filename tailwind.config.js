module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white2: "#f5f5f6",
        blueLight: "#f0fbfe",
        blue: "#00b6f0",
        blueBorder: "#00b6f0",
        black: "#1a2129",
        black2: "#5b656a",
        gray: "#667175",
        green: "#00ce5c",
        mustard: "#ffa600",
        red: "#fe4a49",
        borderColor: "#e5e7e8",
      },
      fontFamily: { primaryFont: ["Rubik", "sans-serif"] },
    },
  },
  plugins: [],
};
