/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
   extend: {
  keyframes: {
    float: {
      '0%, 100%': { transform: 'translateY(0)' },
      '50%': { transform: 'translateY(-5px)' },
    },
    modalIn: {
      '0%': {
        opacity: '0',
        transform: 'scale(0.95)',
      },
      '100%': {
        opacity: '1',
        transform: 'scale(1)',
      },
    },
  },
  animation: {
    float: 'float 3s ease-in-out infinite',
    modalIn: 'modalIn 0.3s ease-out forwards',
  },
  fontFamily: {
    clover: ['clover', 'sans-serif'],
    ibrand: ['ibrand', 'sans-serif'],
  },
}

  },
  plugins: [],
}
