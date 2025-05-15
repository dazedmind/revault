module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
        mono: ['var(--font-ibm)'],
      },
    },
  },
  variants: {
    extend: {
      backgroundOpacity: {
        '10': '0.1',
      }
    },
  },
  plugins: [],
}
