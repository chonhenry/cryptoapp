module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class", // or 'media' or 'class' 00c805
  theme: {
    extend: {
      colors: {
        green: "#00c805",
        red: "#ff5000",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
