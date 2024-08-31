// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    // Agrega aquí las rutas a tus archivos donde usas Tailwind
  ],
  theme: {
    extend: {
      colors: {
        night: '#131316ff',
        'raisin-black': '#1c1c21ff',
        'raisin-black-2': '#26262cff',
        jet: '#2f3037ff',
        onyx: '#393a41ff',
        'davys-gray': '#4b4c52ff',
        'davys-gray-2': '#5b5c62ff',
        'dim-gray': '#6a6b70ff',
      },
    },
    fontFamily: {
      sans: [
        'Inter',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Oxygen',
        'Ubuntu',
        'Cantarell',
        'Fira Sans',
        'Droid Sans',
        'Helvetica Neue',
        'sans-serif',
      ],
    },
  },
  plugins: [],
}
