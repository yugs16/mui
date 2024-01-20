const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { VueLoaderPlugin } = require("vue-loader");

const path = require("path");
const deps = require("./package.json").dependencies;
module.exports = (_, argv) => ({
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "build"),
    },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json", ".vue", ".vuex"],
  },

  devServer: {
    port: 3000,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
          test: /\.svg$/,
          loader: 'svg-inline-loader'
      },
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new VueLoaderPlugin(),
    new ModuleFederationPlugin({
      name: "main",
      filename: "remoteEntry.js",
      remotes: {
        "comp1": "comp1@http://localhost:5000/comp1-app.js",
        // "comp2": 'import("http://localhost:9000/assets/comp2-app.js")'

        "comp2Webpack": 'comp2Webpack@http://localhost:8000/comp2-webpack-app.js'
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
        "react-router-dom": {
          singleton: true,
          requiredVersion: deps["react-router-dom"],
        },
      },
    }),
    new HtmlWebPackPlugin({
        template: path.join(__dirname, "public", "index.html"),
    }),
  ],
});