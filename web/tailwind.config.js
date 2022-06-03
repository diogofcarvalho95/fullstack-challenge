const brandColors = {
  white: '#ffffff',
  blue: '#1D9BF0',
  platinium: '#E7E9EA',
  silver: '#71767B',
  onix: '#333639',
  richBlack: '#15202B'
}

module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        ... brandColors,
        transparent: 'transparent',
        current: 'currentColor',
        backgroundColor: brandColors.richBlack,
        textColor: brandColors.platinium
      },
    },
  },
  plugins: [],
}
