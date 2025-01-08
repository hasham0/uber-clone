/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        captain: "#10b461",
        user: "#d5622d",
      },
      backgroundImage: {
        trafficLight: "url('/src/assets/images/trafficLight.jpg')",
      },
    },
  },
  plugins: [],
};
