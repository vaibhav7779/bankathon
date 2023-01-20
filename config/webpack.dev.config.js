/**
 * DEVELOPMENT WEBPACK CONFIGURATION
 */
// const path = require('path')
const webpack = require('webpack');
const CircularDependencyPlugin = require('circular-dependency-plugin');
// const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const paths = require('./paths');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const baseWebPackFunc = require('./webpack.base.config');

module.exports = baseWebPackFunc({
  mode: 'development',
  devtool: 'eval-source-map',
  // Add hot reloading in development
  entry: [
    'eventsource-polyfill', // Necessary for hot reloading with IE
    'webpack-hot-middleware/client?reload=true',
    paths.appIndexJs,
  ],

  // Don't use hashes in dev mode for better performance
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },

  // Add development plugins
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // Tell webpack we want hot reloading
    new CaseSensitivePathsPlugin(),
    // If you require a missing module and then `npm install` it, you still have
    // to restart the development server for Webpack to discover it. This plugin
    // makes the discovery automatic so you don't have to restart.
    // See https://github.com/facebook/create-react-app/issues/186
    new WatchMissingNodeModulesPlugin(paths.appNodeModules),
    new CircularDependencyPlugin({
      exclude: /a\.js|node_modules/, // exclude node_modules
      failOnError: false, // show a warning when there is a circular dependency
    }),
    new ReactRefreshWebpackPlugin(),
  ],
  performance: {
    hints: false,
  },
  optimization: {
    minimize: false,
  },
  cssOptions: {
    importLoaders: 1, // No of loaders before css-loder
    sourceMap: false,
  },
  cssModuleOptions: {
    importLoaders: 1, // No of loaders before css-loder
    sourceMap: false,
    modules: true,
    // getLocalIdent: getCSSModuleLocalIdent, // ou can also specify the absolute path to your custom getLocalIdent function to generate classname based on a different schema. By default we use built-in function to generate a classname.
  },
  sassOptions: {
    importLoaders: 2, // No of loaders before css-loder
    sourceMap: false,
  },
  sassModuleOptions: {
    importLoaders: 2, // No of loaders before css-loder
    sourceMap: false,
    modules: true,
    // getLocalIdent: getCSSModuleLocalIdent, // ou can also specify the absolute path to your custom getLocalIdent function to generate classname based on a different schema. By default we use built-in function to generate a classname.
  },
  sassSourceMap: false,
  cssSourceMap: false,
  HtmlWebpackPluginMinifyOptions: undefined,
  cssLoaders: ['style-loader'],
});
