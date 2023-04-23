import { type Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      gray: {
        100: '#B9B9B9',
        200: '#A4A4A4',
        300: '#6F6F6F',
        400: '#4F6071',
        600: '#323940',
        700: '#2D3640',
        750: '#2F363D',
        800: '#272E35',
        900: '#24292E',
        950: '#1F2428',
        1000: '#1C2126',
      },
      green: {
        500: '#13B497',
        600: '#0A7360',
      },
      red: {
        600: '#A61C1C',
      },
      orange: {
        600: '#D07407',
      },
      white: '#ffffff',
    },
    fontFamily: {
      poppins: 'Poppins',
    },
  },
  plugins: [require('daisyui')],
} satisfies Config
