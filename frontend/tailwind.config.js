/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem', 
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      animation: {
        'in': 'fadeIn 0.5s ease-in-out',
        'out': 'fadeOut 0.5s ease-in-out',
        'slide-in-from-left': 'slideInFromLeft 0.5s ease-in-out',
        'slide-out-to-left': 'slideOutFromLeft 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
        slideInFromLeft: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideOutFromLeft: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      backgroundImage: {
        hero: 'url("../app/images/hero/bg.jpg")'
      },
      colors: {
        primary: {
          DEFAULT: '#292836',
          hover: '#3e3d4a',
        },
        secondary: {
          DEFAULT: '#6b6a71',
        },
        accent: {
          DEFAULT: '#e85f4c',
          hover: '#ea6f5e',
        },
        grey: {
          DEFAULT: '#a09faf',
        },
      },
    },
  },
  plugins: [],
};
