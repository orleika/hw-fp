const path = require('path')
const yml = require('yml')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const config = yml.load('./config.yml')

const srcDir = '/src'
const distDir = '/dist'

module.exports = [{
  entry: {
    'main': `./${srcDir}/main.js`,
    'index': `./${srcDir}/index.js`
  },
  output: {
    path: path.join(__dirname, distDir),
    filename: '[name].js'
  },
  module: {
    rules: [{
      test: /\.tag$/,
      exclude: /node_modules/,
      loader: 'riotjs-loader',
      enforce: 'pre'
    },
    {
      test: /\.js|\.tag$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  node: {
    __dirname: false,
    __filename: false
  },
  resolve: {
    alias: {
      actions: path.join(__dirname, `./${srcDir}/actions`),
      reducers: path.join(__dirname, `./${srcDir}/reducers`),
      tags: path.join(__dirname, `./${srcDir}/tags`)
    },
    extensions: ['.js', '.tag']
  },
  target: 'electron',
  plugins: [
    new webpack.DefinePlugin({
      APP_NAME: JSON.stringify(process.env.npm_package_name),
      APP_VERSION: JSON.stringify(process.env.npm_package_version),
      REPORT_URL: JSON.stringify(config.report_url)
    }),
    new webpack.ProvidePlugin({
      riot: 'riot'
    }),
    new UglifyJsPlugin({
      test: /\.js($|\?)/i
    })
  ]
}, {
  entry: {
    'style': `./${srcDir}/scss/style.scss`
  },
  output: {
    path: path.join(__dirname, distDir),
    filename: '[name].css'
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        use: [{
          loader: 'css-loader'
        }, {
          loader: 'sass-loader'
        }],
        fallback: 'style-loader'
      })
    }, {
      test: /\.(eot|woff|woff2|svg|ttf)$/,
      loader: 'file-loader'
    }]
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new HtmlWebpackPlugin({
      APP_NAME: process.env.npm_package_name,
      APP_VERSION: process.env.npm_package_version,
      template: `./${srcDir}/index.html`,
      filename: path.join(__dirname, distDir, 'index.html'),
      inject: false
    })
  ]
}]
