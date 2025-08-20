/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}", // Vite dùng thư mục src
    ],
    theme: {
      extend: {
        fontSize: {
          xxs: '0.625rem', // ~10px
        },
      },
    },
    plugins: [],
  };
  