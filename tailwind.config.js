/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        outfit: ['var(--font-outfit)'],
      },
      screens: {
        '2xsm': 'var(--breakpoint-2xsm)',
        'xsm': 'var(--breakpoint-xsm)',
        'sm': 'var(--breakpoint-sm)',
        'md': 'var(--breakpoint-md)',
        'lg': 'var(--breakpoint-lg)',
        'xl': 'var(--breakpoint-xl)',
        '2xl': 'var(--breakpoint-2xl)',
        '3xl': 'var(--breakpoint-3xl)',
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


// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   darkMode: 'class',
//   theme: {
//     extend: {
//       fontFamily: {
//         outfit: ['var(--font-outfit)'],
//       },
//       screens: {
//         '2xsm': 'var(--breakpoint-2xsm)',
//         'xsm': 'var(--breakpoint-xsm)',
//         'sm': 'var(--breakpoint-sm)',
//         'md': 'var(--breakpoint-md)',
//         'lg': 'var(--breakpoint-lg)',
//         'xl': 'var(--breakpoint-xl)',
//         '2xl': 'var(--breakpoint-2xl)',
//         '3xl': 'var(--breakpoint-3xl)',
//       },
//       fontSize: {
//         'title-2xl': ['var(--text-title-2xl)', {
//           lineHeight: 'var(--text-title-2xl--line-height)',
//         }],
//         'title-xl': ['var(--text-title-xl)', {
//           lineHeight: 'var(--text-title-xl--line-height)',
//         }],
//         'title-lg': ['var(--text-title-lg)', {
//           lineHeight: 'var(--text-title-lg--line-height)',
//         }],
//         'title-md': ['var(--text-title-md)', {
//           lineHeight: 'var(--text-title-md--line-height)',
//         }],
//         'title-sm': ['var(--text-title-sm)', {
//           lineHeight: 'var(--text-title-sm--line-height)',
//         }],
//         'theme-xl': ['var(--text-theme-xl)', {
//           lineHeight: 'var(--text-theme-xl--line-height)',
//         }],
//         'theme-sm': ['var(--text-theme-sm)', {
//           lineHeight: 'var(--text-theme-sm--line-height)',
//         }],
//         'theme-xs': ['var(--text-theme-xs)', {
//           lineHeight: 'var(--text-theme-xs--line-height)',
//         }],
//       },
//       colors: {
//         current: 'var(--color-current)',
//         transparent: 'var(--color-transparent)',
//         white: 'var(--color-white)',
//         black: 'var(--color-black)',
//         primary: 'var(--color-primary)',
//         background: 'var(--color-background)',
//         surface: 'var(--color-surface)',
//         text: {
//           DEFAULT: 'var(--color-text)',
//           secondary: 'var(--color-text-secondary)',
//         },
//         border: 'var(--color-border)',
//       },
//     },
//   },
//   plugins: [],
// }