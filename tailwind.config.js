module.exports = {
  purge: ['./src/**/*.{vue,js,ts,jsx,tsx,html}'],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: '#0b8e3f',
        secondary: '#a8e6a1',

        gdgreen: {
          300: '#6EE7B7',
          400: '#6EE7B7',
          500: '#10B981',
          700: '#047857',
        },
        gdgray: {
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          700: '#374151',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
