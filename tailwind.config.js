/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6B5B95",
        secondary: "#FF6F61",
        accent: {
          blue: "#00E0FF",
          lime: "#CCFF00",
        },
        dark: {
          950: "#080808",
          900: "#121212",
          800: "#1E1E1E",
          700: "#2C2C2C",
        },
      },
      fontFamily: {
        heading: ['Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
        pixel: ['Silkscreen', 'cursive'],
        wide: ['Syncopate', 'sans-serif'],
        script: ['Gloria Hallelujah', 'cursive'],
      },
      boxShadow: {
        'pixel': '4px 4px 0px 0px rgba(0,0,0,1)',
        'pixel-white': '4px 4px 0px 0px rgba(255,255,255,1)',
      },
      backgroundImage: {
        'hero-pattern': "url('/hero-bg.svg')", // Placeholder
      }
    },
  },
  plugins: [],
}
