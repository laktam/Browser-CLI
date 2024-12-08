const path = require("path");

module.exports = {
  mode: 'production',
  entry: {
    // newTab: "./src/newTab.js",
    background: "./src/background.js",
    content: "./src/content.js"
  },
  output: {
    filename: (pathData) => {
      if (pathData.chunk.name === 'newTab') {
        return 'new-tab/[name].js';
      }
      // if (pathData.chunk.name === 'background') {
      //   return '[name].js';
      // }
      return '[name].js';
    },
    path: path.resolve(__dirname, "build"),
  },
};
