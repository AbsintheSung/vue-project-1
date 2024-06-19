/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true
    },
    extend: {
      colors: {
        primaryColor: '#00807E',
        primaryBackground: '#F7F7F7',
        secondaryColor: '#64C3BF'
      },
      maxWidth: {
        // 1280: '1280px'
        customWidth: '1110px' // 自定義最大寬度變數
      },
      padding: {
        15: '15px',
        20: '20px',
        95: '95px'
      }
    }
  },
  plugins: []
}
