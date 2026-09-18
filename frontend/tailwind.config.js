/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        beacon: {
          canvas: '#FAF8F5',
          surface: '#FFFFFF',
          subtle: '#F4F2EB',
          muted: '#EAE6DD',
          border: '#E4E0D5',
          amber: {
            50: '#FFFBEB',
            100: '#FEF3C7',
            200: '#FDE68A',
            300: '#FCD34D',
            400: '#FBBF24',
            500: '#F59E0B',
            600: '#D97706',
            700: '#B45309',
            800: '#92400E',
            900: '#78350F',
          },
          stone: {
            50: '#FAFAF9',
            100: '#F5F5F4',
            200: '#E7E5E4',
            300: '#D6D3D1',
            400: '#A8A29E',
            500: '#78716C',
            600: '#57534E',
            700: '#44403C',
            800: '#292524',
            900: '#1C1917',
          }
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'soft-xs': '0 1px 2px rgba(28, 25, 23, 0.03)',
        'soft-sm': '0 2px 6px -1px rgba(28, 25, 23, 0.04), 0 1px 3px rgba(28, 25, 23, 0.02)',
        'soft-md': '0 6px 18px -3px rgba(28, 25, 23, 0.05), 0 2px 6px -1px rgba(28, 25, 23, 0.02)',
        'soft-lg': '0 12px 32px -4px rgba(28, 25, 23, 0.07), 0 4px 12px -2px rgba(28, 25, 23, 0.03)',
        'warm-glow': '0 0 24px -2px rgba(217, 119, 6, 0.18)',
      }
    },
  },
  plugins: [],
}
