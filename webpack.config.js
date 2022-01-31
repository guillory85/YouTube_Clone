const path = require("path");

module.exports = {
  mode: "development",
  entry: ["./src/index.js", "./src/search.js"],
  output: {
    filename: "main.js",
    path: path.join(__dirname, "src/dist"),
    scriptType: "module",
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              "@babel/plugin-transform-arrow-functions",
              "@babel/plugin-transform-runtime",
            ],
          },
        },
      },
    ],
  },
};
