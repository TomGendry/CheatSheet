/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx }"],
  darkMode: ['class', '[data-mode="dark"]'],
  // Custom colors and fonts
  theme: {
    extend: {
      backgroundImage: {
        '404': "url('https://res.cloudinary.com/davims6ce/image/upload/v1597465164/404_hlikzw.png')"
      },
      height: {
        header: '560px',
        rate: '400px',
      },
      fontSize: {
        h1: '2.6rem',
      },
      screens: {
        xs: '475px',
      },
      colors: {
        main: '#080A1A',
        subMain: '#F20000',
        dry: '#0B0F29',
        star: '#FFB000',
        text: '#C0C0C0',
        border: '#4B5563',
        dryGray: '#E0D5D5',
        dryGrayHover: '#d0c6c6',
        code: '#272029'
      }
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
