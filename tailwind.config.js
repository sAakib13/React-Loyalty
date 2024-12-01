const flowbite = require("flowbite/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js", // Include Flowbite's JavaScript files
  ],
  theme: {
    extend: {
      colors: {
        dark: "rgb(28, 28, 26)",
        hover: "rgb(21, 146, 209)",
        light: "#adb9c3"
      },
      fontFamily: {
        "jost": ['Jost', 'sans-serif']
      },
      fontSize: {
        'tiny': '20px',
        'xxl': '32px',
        'huge': '68px',
      },
    },
  },
  plugins: [
    flowbite, // Add Flowbite plugin here
  ],
};
