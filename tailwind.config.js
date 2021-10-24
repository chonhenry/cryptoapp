module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class", // or 'media' or 'class' 00c805
  theme: {
    extend: {
      colors: {
        green_base: "rgb(0,200,5)",
        green_hover: "rgba(0,180,5,1)",
        red_base: "#ff5000",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
