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
        'primary-error': '#E53935',
        'secondary-error': '#EF5350',
        'accent-error': '#EF9A9A',
        'primary-warning': '#FDE047',
        'secondary-warning': '#FEF08A',
        'accent-warning': '#FEFEC8',
        'primary-success': '#4ADE80',
        'secondary-success': '#86EFAC',
        'accent-success': '#BBF7D0',

      },
      fontFamily: {
        'noto-sans': ['Montserrat', 'san-serif'
        ]
      }
    },
  },
  plugins: [],
}
