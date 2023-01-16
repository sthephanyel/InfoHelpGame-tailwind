/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Indie Flower, sans-serif',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--gradient-color-stops))',
      },
      colors:{
        purple:{
          500: '#8257E5'
        },
        green: {
          100: '#CFE100',
          300: '#00B37E',
          500: '#00875F',
          700: '#015F43',
          1000: '#327430',
          1100:'#53DB61'

        },
        blue: {
          100: '#81D8F7',
          200: '#0DE7F4',
          500: '#1E253C',
          1000: '#0F122E'
        },
        orange: {
          500: '#FBA94C',
        },
        red: {
          500: '#F75A68',
        },
        gray: {
          100: '#E1E1E6',
          200: '#C4C4CC',
          300: '#8D8D99',
          500: '#323238',
          600: '#29292E',
          700: '#121214',
          900: '#09090A'
        },
        black:{
          200: '#202020'
        },
        whiteText:{
          100: '#FFFFFF'
        }
      }
    },
  },
  plugins: [],
}
