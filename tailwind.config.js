/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
  ],

  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        outfit: ['var(--font-outfit)'],
      },
      fontSize: {
        'title-2xl': ['var(--text-title-2xl)', {
          lineHeight: 'var(--text-title-2xl--line-height)',
        }],
        'title-xl': ['var(--text-title-xl)', {
          lineHeight: 'var(--text-title-xl--line-height)',
        }],
        'title-lg': ['var(--text-title-lg)', {
          lineHeight: 'var(--text-title-lg--line-height)',
        }],
        'title-md': ['var(--text-title-md)', {
          lineHeight: 'var(--text-title-md--line-height)',
        }],
        'title-sm': ['var(--text-title-sm)', {
          lineHeight: 'var(--text-title-sm--line-height)',
        }],
        'theme-xl': ['var(--text-theme-xl)', {
          lineHeight: 'var(--text-theme-xl--line-height)',
        }],
        'theme-sm': ['var(--text-theme-sm)', {
          lineHeight: 'var(--text-theme-sm--line-height)',
        }],
        'theme-xs': ['var(--text-theme-xs)', {
          lineHeight: 'var(--text-theme-xs--line-height)',
        }],
      },
      colors: {
        current: 'var(--color-current)',
        transparent: 'var(--color-transparent)',
        white: 'var(--color-white)',
        black: 'var(--color-black)',
        primary: 'var(--color-primary)',
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        text: {
          DEFAULT: 'var(--color-text)',
          secondary: 'var(--color-text-secondary)',
        },
        border: 'var(--color-border)',
      },
    },
  },
  plugins: [],
}