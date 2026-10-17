/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          950: '#030508',
          900: '#05070A',
          850: '#070C14',
          800: '#0B1220',
          750: '#0E172A',
          700: '#131F37',
          600: '#1E293B',
          border: 'rgba(0, 217, 255, 0.15)',
          'border-green': 'rgba(0, 255, 156, 0.2)',
        },
        neon: {
          green: '#00FF9C',
          'green-glow': '#00ff9c44',
          cyan: '#00D9FF',
          'cyan-glow': '#00d9ff44',
          emerald: '#10B981',
          amber: '#F59E0B',
          rose: '#F43F5E',
          purple: '#A855F7',
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'neon-cyan': '0 0 20px -2px rgba(0, 217, 255, 0.35)',
        'neon-green': '0 0 20px -2px rgba(0, 255, 156, 0.35)',
        'cyber-card': '0 8px 32px 0 rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(0, 217, 255, 0.12)',
        'cyber-glow': '0 0 35px -5px rgba(0, 217, 255, 0.2)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scanline': 'scanline 8s linear infinite',
        'radar': 'radar 4s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'grid-scroll': 'gridScroll 20s linear infinite',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        radar: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        gridScroll: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 40px' },
        }
      }
    },
  },
  plugins: [],
}
