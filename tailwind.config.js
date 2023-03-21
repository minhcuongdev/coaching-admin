const windmill = require('@windmill/react-ui/config')

module.exports = windmill({
  // content: ['./src/**/*.{js,jsx,ts,tsx}'],
  purge: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
    './node_modules/tw-elements/dist/js/**/*.js',
  ],
  theme: {
    colors: {
      blue: '#1fb6ff',
      purple: '#7e5bef',
      pink: '#ff49db',
      orange: '#ff7849',
      green: '#13ce66',
      yellow: '#ffc82c',
      'gray-dark': '#273444',
      gray: '#8492a6',
      'gray-light': '#d3dce6',
    },
    extend: {},
  },
  plugins: [require('tw-elements/dist/plugin')],
})
