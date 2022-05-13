module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      borderWidth: {
        DEFAULT: '1px',
        '5': '5px',
        '6': '6px',
      },
      colors: {
        'primary-black': '#202225',
        'secondary-black': '#292B2F',
        'accent-black': '#42454A',
        'primary-gray': '#36393E',
        'secondary-gray': '#424549',
        'accent-gray': '#99AAB5',
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
