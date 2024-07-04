/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'blue-400': '#60a5fa',
        'purple-500': '#a78bfa',
        'blue-500': '#3b82f6',
        'blue-600': '#2563eb',
        'green-500': '#22c55e',
        'green-600': '#16a34a',
        white: '#ffffff',
      },
      fontFamily: {
        'Gilroy-Medium': ['Gilroy-Medium', 'sans-serif'],
        'Gilroy-ExtraBold': ['Gilroy-ExtraBold', 'sans-serif'],
        'Gilroy-Regular': ['Gilroy-Regular', 'sans-serif'],
        'Gilroy-Bold': ['Gilroy-Bold', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
