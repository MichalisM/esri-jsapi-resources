const path = require('path');

const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    index: ['./src/style.css', './src/main.ts']
  },
  node: false,
  output: {
    path: path.join(__dirname, 'dist'),
    chunkFilename: 'chunks/[id].js',
    publicPath: '',
    clean: true
  },
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        type: 'asset'
      },
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      title: 'ArcGIS API for JavaScript',
      template: './index.html',
      filename: './index.html',
      chunksSortMode: 'none',
      inlineSource: '.(css)$'
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[chunkhash].css",
      chunkFilename: "[id].css"
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'node_modules/@esri/calcite-components/dist/calcite/assets',
          to: 'calcite/assets/',
        },
        {
          from: 'node_modules/@arcgis/core/assets/',
          to: 'core/assets/',
        },
        {
          from: './src/assets/t9n/',
          to: 'translations/',
        },
        {
          from: './src/assets/*.svg',
          to: 'assets/[name].svg',
        },
      ]
    }),
  ],
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'node_modules')
    ],
    extensions: [".ts", ".tsx", ".js", ".scss", ".css"],
    alias: { app: path.resolve(__dirname, 'src') } || {},
  },
};
