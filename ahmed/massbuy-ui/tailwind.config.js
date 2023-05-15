/** @type {import('tailwindcss').Config} */  

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    fontFamily: {
      sans: [ 'Roboto',  ...defaultTheme.fontFamily.sans],

      Inter: [
        "Inter-Regular",
        // Font-Weight: 400
      ],
      "Inter-Regular": [
        "Inter-Regular",
        // Font-Weight: 400
      ],
      "Inter-ExtraBold": [
        "Inter-ExtraBold",
        // Font-Weight: 800
      ],
      "Inter-Bold": [
        "Inter-Bold",
        // Font-Weight: 700
      ],
      "Inter-Medium": [
        "Inter-Medium",
        // Font-Weight: 500
      ],
      "Inter-SemiBold": [
        "Inter-SemiBold",
        // Font-Weight: 600
      ], 
    },
    extend: {},
  },
  plugins: [],
}
