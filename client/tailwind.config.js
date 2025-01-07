/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        trafficLight: "url('/src/assets/images/trafficLight.jpg')",
      },
    },
  },
  plugins: [],
};
