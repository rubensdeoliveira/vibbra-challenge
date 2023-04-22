import { type Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      gray: {
        400: '#4F6071',
        600: '#323940',
        700: '#2D3640',
        800: '#272E35',
        900: '#24292E',
      },
      white: '#ffffff',
    },
    fontFamily: {
      poppins: 'Poppins',
    },
  },
  plugins: [require('daisyui')],
} satisfies Config
