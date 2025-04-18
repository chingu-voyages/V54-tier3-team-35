/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "main-bg":
          "url('https://images.pexels.com/photos/12546554/pexels-photo-12546554.png?auto=compress&cs=tinysrgb&w=600&lazy=load')",
      },
      screens: {
        xs830: "830px",
        "max-xs830": { max: "829px" }, // applies below 830px
      },
    },
  },
  plugins: [],
};
