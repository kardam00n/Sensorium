/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        'dark-teal': '#001e28',
      },
      fontFamily: {
        sans: ['KyivTypeSans', 'system-ui', 'sans-serif'],
        heading: ['NeueKaine', 'system-ui', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.kyiv-font-light': { 
          'font-family': 'KyivTypeSans',
          'font-variation-settings': '"wght" 300' 
        },
        '.kyiv-font-normal': { 
          'font-family': 'KyivTypeSans',
          'font-variation-settings': '"wght" 400' 
        },
        '.kyiv-font-medium': { 
          'font-family': 'KyivTypeSans',
          'font-variation-settings': '"wght" 500' 
        },
        '.kyiv-font-semibold': { 
          'font-family': 'KyivTypeSans',
          'font-variation-settings': '"wght" 600' 
        },
        '.kyiv-font-bold': { 
          'font-family': 'KyivTypeSans',
          'font-variation-settings': '"wght" 700' 
        },
        '.kyiv-font-extrabold': { 
          'font-family': 'KyivTypeSans',
          'font-variation-settings': '"wght" 800' 
        },
        '.kyiv-contrast-low': { 'font-variation-settings': '"CNTR" 0' },
        '.kyiv-contrast-high': { 'font-variation-settings': '"CNTR" 100' },
        '.kyiv-midline-low': { 'font-variation-settings': '"MIDL" -1000' },
        '.kyiv-midline-high': { 'font-variation-settings': '"MIDL" 0' },

        '.neue-font-normal': { 
          'font-family': 'NeueKaine',
          'font-variation-settings': '"wght" 400' 
        },
        '.neue-font-medium': { 
          'font-family': 'NeueKaine',
          'font-variation-settings': '"wght" 500' 
        },
        '.neue-font-semibold': { 
          'font-family': 'NeueKaine',
          'font-variation-settings': '"wght" 600' 
        },
        '.neue-font-bold': { 
          'font-family': 'NeueKaine',
          'font-variation-settings': '"wght" 700' 
        },
        '.neue-font-extrabold': { 
          'font-family': 'NeueKaine',
          'font-variation-settings': '"wght" 800' 
        },
        '.neue-font-black': { 
          'font-family': 'NeueKaine',
          'font-variation-settings': '"wght" 900' 
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    }
  ],
}