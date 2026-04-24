/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Jost', 'system-ui', 'sans-serif'],
      },
      colors: {
        gallery: {
          white:      '#FFFFFF',
          offwhite:   '#F8F6F2',
          lightgray:  '#E8E5E0',
          gray:       '#999999',
          darkgray:   '#555555',
          black:      '#0D0D0D',
          orange:     '#C8581A',
          'orange-light': '#E8722A',
        },
      },
      letterSpacing: {
        widest: '0.22em',
        wider:  '0.18em',
        wide:   '0.12em',
      },
      fontSize: {
        '2xs': '0.625rem',
        xs:    '0.6875rem',
      },
    },
  },
  plugins: [],
}
