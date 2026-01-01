/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: content paths include your app and src folders
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")], // <--- THIS IS CRITICAL FOR V4
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#121212',
          card: '#1E1E1E',
          text: '#FFFFFF',
          textSec: '#A1A1AA',
        },
        primary: {
          DEFAULT: '#00C896', 
          dim: 'rgba(0, 200, 150, 0.2)',
        },
      },
    },
  },
  plugins: [],
}