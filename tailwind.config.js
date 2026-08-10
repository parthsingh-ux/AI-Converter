/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}',
    './Design System/ui/src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#010B14',
        surface: '#021528',
        'surface-subtle': '#191C1F',
        'surface-border': '#4B545D',
        primary: {
          DEFAULT: '#0A69C9',
          50: '#E4EEFA',
          100: '#CCDFF4',
          200: '#9BC2E9',
          300: '#6BA4DF',
          400: '#3A87D4',
          500: '#0A69C9',
          600: '#0854A1',
          700: '#063F79',
          800: '#042A50',
          900: '#021528',
          950: '#010B14',
        },
        secondary: {
          DEFAULT: '#148ECD',
          500: '#148ECD',
        },
        success: {
          DEFAULT: '#12A150',
          500: '#12A150',
        },
        warning: {
          DEFAULT: '#DB8700',
          500: '#DB8700',
        },
        danger: {
          DEFAULT: '#DB1439',
          500: '#DB1439',
        },
        gray: {
          default: {
            50: '#F2F4F5',
            100: '#E5E8EB',
            200: '#CBD1D7',
            300: '#B1BAC3',
            400: '#97A3AF',
            500: '#7D8C98',
            600: '#64707C',
            700: '#4B545D',
            800: '#32383E',
            900: '#191C1F',
          }
        }
      },
      fontFamily: {
        sans: ['Figtree', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
};
