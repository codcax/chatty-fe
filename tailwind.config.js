module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        'primary-black': '#202225',
        'secondary-black': '#292B2F',
        'accent-black': '#42454A',
        'primary-gray': '#839297',
        'secondary-gray': '#B9BBBE',
        'accent-gray': '#C7C9CB',
        'primary-green': '#3BA55D',
        // 'secondary-green':'',
        // 'accent-green':'',
        'primary-blue': '#5865F2',
        'secondary-blue': '#828BF6',
        'accent-blue': '#949CF7',
        'primary-white': '#FFFFFF',
        'secondary-white': '#F2F3F5',
        'accent-white': '#F8FAF9',

      },
      fontFamily: {
        'noto-sans': ['Montserrat', 'san-serif'
        ]
      }
    },
  },
  plugins: [],
}
