/** @type {import('tailwindcss').Config} */
// Tailwind CSS configuration file
module.exports = {
  // Specify the paths to all of the template files
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // Custom keyframes for animations
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        }
      },
      // Custom animation utilities
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in',
      },
      // Extend default color palette
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          500: '#64748b',
          600: '#475569',
        }
      },
      // Custom font families
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        omnesarabic: ['OmnesArabic', 'sans-serif'],
      },
    },
  },
  plugins: [],
}