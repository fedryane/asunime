const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    // screens: {
    //   xs: "380px",
    // },
  },
  plugins: [
    // plugin to hide scroll bar
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".scrollbar-hide": {
          "scrollbar-width": "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      };
      addUtilities(newUtilities);
    }),
  ],
};
