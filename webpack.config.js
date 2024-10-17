const path = require("path");

module.exports = {
  mode: 'development',
  entry: {
    newTab: "./src/newTab.js",
    background: "./src/background.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "build"),
  },
};
