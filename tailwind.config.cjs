const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{vue,ts}',
    './node_modules/@zenky/forms-vue/dist/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: colors.purple,
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    plugin(function ( { addVariant }) {
      addVariant('attachments-grid', ':merge(.attachments-grid) &');
      addVariant('weapons-grid', ':merge(.weapons-grid) &');
    }),
  ],
}
