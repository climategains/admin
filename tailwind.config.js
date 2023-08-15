
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  content: [
    'node_modules/preline/dist/*.js'
  ],
  plugins: [
      require('preline/plugin')
  ]
}
