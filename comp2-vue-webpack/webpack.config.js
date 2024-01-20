const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { VueLoaderPlugin } = require("vue-loader");
// const federation  =  require('@originjs/vite-plugin-federation')
// import federation from "@originjs/vite-plugin-federation";


module.exports = {
  output: {
    publicPath: "http://localhost:8000/",
  },

  resolve: {
    extensions: [".vue", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 8000,
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new VueLoaderPlugin(),
    // federation({
    //     name: "comp2",
    //     filename: "comp2-app.js",
    //     exposes: {
    //       "./Comp2App": "./src/bootstrap",
    //     },
    //     shared: ['vue']
    // })

    new ModuleFederationPlugin({
      name: "comp2Webpack",
      filename: "comp2-webpack-app.js",
      exposes: {
        "./Comp2WebPackApp": "./src/Header.vue",
        './mountWrapper': './src/mountWrapper'
      },
      shared: require("./package.json").dependencies,
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
};