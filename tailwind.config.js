/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00ffff',
        secondary: '#ff00ff',
        accent: '#ffff00',
        surface: '#1a1a2e',
        background: '#0a0a0f',
        success: '#00ff88',
        warning: '#ff9900',
        error: '#ff0066',
        info: '#00aaff',
        cyan: {
          500: '#00ffff',
          400: '#33ffff',
          300: '#66ffff',
        },
        magenta: {
          500: '#ff00ff',
          400: '#ff33ff',
          300: '#ff66ff',
        },
        yellow: {
          500: '#ffff00',
          400: '#ffff33',
          300: '#ffff66',
        }
      },
      fontFamily: {
        'display': ['Bungee', 'sans-serif'],
        'body': ['Space Grotesk', 'sans-serif'],
      },
      animation: {
        'pulse-neon': 'pulse-neon 2s ease-in-out infinite alternate',
        'glow': 'glow 1.5s ease-in-out infinite alternate',
        'dissolve': 'dissolve 0.3s ease-out forwards',
      },
      keyframes: {
        'pulse-neon': {
          '0%': { boxShadow: '0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 15px #00ffff' },
          '100%': { boxShadow: '0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff' },
        },
        'glow': {
          '0%': { filter: 'brightness(1) drop-shadow(0 0 3px currentColor)' },
          '100%': { filter: 'brightness(1.2) drop-shadow(0 0 6px currentColor)' },
        },
        'dissolve': {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.5)' },
        }
      },
      boxShadow: {
        'neon': '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor',
        'neon-strong': '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor',
      }
    },
  },
  plugins: [],
}