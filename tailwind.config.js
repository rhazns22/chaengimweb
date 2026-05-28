/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F0F3FF',
          100: '#E1E6FE',
          200: '#C7D2FD',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#5B78F0', // Brand main color
          600: '#4F65DE',
          700: '#3D4EC4',
          800: '#313FA3',
          900: '#1E297A',
        },
        bgGray: '#F6F7FB',
      },
      fontFamily: {
        sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'Roboto', 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

