const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
    minWidth: {
      '0': '0',
      '300': '300px',
      'full': '100%',
    }
  },
  variants: {
    extend: {

    },
  },
  plugins: [],
}
