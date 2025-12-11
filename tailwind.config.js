/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-pink': 'var(--color-brand-pink)',
        'neon-blue': 'var(--color-neon-blue)',
        'dark-bg': 'var(--color-dark-bg)',
        'dark-card': 'var(--color-dark-card)',
        'purple-dark': 'var(--color-purple-dark)',
      },
      fontFamily: {
        'primary': 'var(--font-primary)',
        'secondary': 'var(--font-secondary)',
        'accent': 'var(--font-accent)',
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '50%': { transform: 'translateY(-30px) translateX(20px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
