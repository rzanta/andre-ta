module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    screens: {
      'lg': '1065px',
      'tall': { 'raw': '(min-height: 1104px)' }
    },
    extend: {
      colors: {
        'success': '#4f9669',
        'secondary': '#6E6F6E',
        'danger': '#5D1F1F',
        'green': '#156D55',
        'dark-green': '#294734',
        'light-red': '#C13B3B',
        'black': '#121714',
        'white': '#FFFFFF',
        'charcoal': '#262D27',
        'warning': '#D7C525'
      },
      fontFamily: {
        'montserrat': 'Montserrat',
      },
      maxWidth: {
        'full': '100%',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
