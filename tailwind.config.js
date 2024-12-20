export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sortify: "rgb(133, 62, 244);",
        customBlack: "rgb(14, 14, 14)",
      },
      backgroundColor: {
        habitWhite: "#F9F9F9",
        eventsYellow: "rgb(249, 221, 120)",
        eventsRed: "rgba(238, 122, 96)",
        eventsBlue: "rgba(76, 168, 219)",
        eventsGrey: "rgba(232, 233, 233)",
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
