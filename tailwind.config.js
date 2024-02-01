/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      display: ['Gowun Dodum', 'sans-serif'],
      body: ['Gowun Dodum', 'sans-serif'],
      point: ['Noto Sans', 'sans-serif'],
    },
    // textColor: {
    //   'primary-500': '#22A699',
    //   'primary-yellow': '#F2BE22',
    //   'primary-orange': '#F29727',
    //   'primary-red-orange': '#F03A47',
    //   'primary-pink': '#FC60A8',
    //   'white': '#fff'
    // },
    extend: {
      fontSize: {
        14: '14px',
      },
      backgroundColor: {
        'main-bg': '#FAFBFB',
        'main-dark-bg': '#20232A',
        'secondary-dark-bg': '#33373E',
        'light-gray': '#F7F7F7',
        'half-transparent': 'rgba(0, 0, 0, 0.5)',

        'primary-500': '#22A699',
        'primary-yellow': '#F2BE22',
        'primary-orange': '#F29727',
        'primary-dark-green': '#395C6B',
        'primary-red-orange': '#F03A47',
      },
      textColor : {
        'primary-500': '#22A699',
        'primary-yellow': '#F2BE22',
        'primary-orange': '#F29727',
        'primary-dark-green': '#395C6B',
        'primary-red-orange': '#F03A47',
        'white': '#fff'
      },
      borderWidth: {
        1: '1px',
      },
      borderColor: {
        color: 'rgba(0, 0, 0, 0.1)',
      },
      width: {
        400: '400px',
        760: '760px',
        780: '780px',
        800: '800px',
        1000: '1000px',
        1200: '1200px',
        1400: '1400px',
      },
      height: {
        80: '80px',
      },
      minHeight: {
        590: '590px',
      },
      backgroundImage: {
        'hero-pattern':
          "url('https://i.ibb.co/MkvLDfb/Rectangle-4389.png')",
        "amount-pattern":
        "url('public/assets/images/vector_pattern.svg')"
      },
    },
  },
  plugins: [],
};