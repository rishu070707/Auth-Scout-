/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand yellow accent (image 2 primary)
        brand: {
          50:  '#fffde7',
          100: '#fff9c4',
          200: '#fff59d',
          300: '#fff176',
          400: '#ffee58',
          500: '#FFE500',  // Primary yellow
          600: '#fdd835',
          700: '#f9a825',
          800: '#f57f17',
          900: '#e65100',
        },
        // Terminal greens
        term: {
          green:  '#00FF94',
          yellow: '#FFE500',
          red:    '#FF4D4D',
          blue:   '#00C8FF',
          dim:    '#666666',
        },
        // Near-blacks & dark grays
        void: {
          50:  '#f5f5f5',
          100: '#e8e8e8',
          200: '#c8c8c8',
          300: '#a0a0a0',
          400: '#707070',
          500: '#404040',
          600: '#2a2a2a',
          700: '#1a1a1a',
          800: '#111111',
          900: '#0a0a0a',
          950: '#050505',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      backgroundImage: {
        'dot-grid': 'radial-gradient(circle, #2a2a2a 1px, transparent 1px)',
        'dot-grid-light': 'radial-gradient(circle, #333333 1px, transparent 1px)',
      },
      backgroundSize: {
        'dot-sm': '20px 20px',
        'dot-md': '28px 28px',
        'dot-lg': '36px 36px',
      },
      boxShadow: {
        'brand': '4px 4px 0px 0px #FFE500',
        'brand-sm': '2px 2px 0px 0px #FFE500',
        'brand-lg': '6px 6px 0px 0px #FFE500',
        'green': '4px 4px 0px 0px #00FF94',
        'inset-brand': 'inset 0 0 0 2px #FFE500',
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
        'scan': 'scan 3s linear infinite',
        'flicker': 'flicker 0.15s infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        flicker: {
          '0%': { opacity: '0.9' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0.9' },
        },
      },
    },
  },
  plugins: [],
}
