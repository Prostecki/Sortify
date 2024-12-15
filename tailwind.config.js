export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sortify: "rgb(133, 62, 244);",
      },
      backgroundColor: {
        habitWhite: "#F9F9F9",
      },
      boxShadow: {
        habitShadow: "0 2px 5px rgba(0,0,0, 0.3)",
        priorityLow: "0 0 20px rgba(46, 183, 18, 0.7)",
        priorityMedium: "0 0 20px rgba(237, 157, 78, 0.7)",
        priorityHigh: "0 0 20px rgba(227,95,83, 0.7)",
      },
    },
  },
  plugins: [],
};
