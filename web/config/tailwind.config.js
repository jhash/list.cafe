const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      minHeight: {
        20: '5rem',
      },
      spacing: {
        sidebar: '14rem',
        xl: '14rem',
      },
      width: {
        sidebar: '14rem',
      },
      maxWidth: {
        sidebar: '14rem',
      },
      transitionProperty: {
        maxWidth: 'max-width',
        left: 'left',
        padding: 'padding',
      },
      colors: {
        ivory: '#fffff0',
        whiteSmoke: '#f5f5f5',
        snow: '#fffafa',
        cream: '#f9f5eb',
      },
      fontFamily: {
        dmSans: 'DM Sans',
        libreBaskerville: 'Libre Baskerville',
        bricolageGrotesque: 'Bricolage Grotesque',
      },
      screens: {
        tall: {
          raw: '(min-height: 900px)',
        },
      },
      borderColor: {
        DEFAULT: colors.gray[300],
      },
    },
    fontFamily: {
      sans: ['DM Sans', 'sans-serif'],
      serif: ['Libre Baskerville', 'Bricolage Grotesque', 'serif'],
    },
  },

  plugins: [require('daisyui')],

  daisyui: {
    themes: ['cupcake', 'dracula'], // false, // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: 'dracula', // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
    prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: false, // Shows info about daisyUI version and used config in the console when building your CSS
  },
}
