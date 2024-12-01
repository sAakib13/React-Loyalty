const flowbite = require("flowbite/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js", // Include Flowbite's JavaScript files
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbite, // Add Flowbite plugin here
  ],
};
