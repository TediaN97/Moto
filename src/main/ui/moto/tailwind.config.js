/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
        colors: {
            'purple': '#D4CBE3',
            'dark-purple': '#4A4453',
            'light-purple': '#AFA8BA'
        }

    },
    fontFamily:{
        rowdies: ['Rowdies', 'cursive'],
    }
  },
  plugins: [],
}

