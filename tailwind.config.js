// eslint-disable-next-line no-undef
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {opacity: ['disabled']},
  },
  // eslint-disable-next-line no-undef
  plugins: [require('flowbite/plugin')
  ],
}