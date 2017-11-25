const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const QiniuPlugin = require('qiniu-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const resolve = file => path.resolve(__dirname, file)
const isProd = process.env.NODE_ENV === 'production'
const isDev = process.env.NODE_ENV === 'development'
const qiniu = require('../.env').qiniu

module.exports = {
  devtool: isDev ? 'sourcemap' : false,
  output: {
    path: resolve('../dist'),
    publicPath: isProd ? `${qiniu.host}${qiniu.prefix}` : '/dist/',
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    alias: {
      'api': resolve('../src/api'),
      'view': resolve('../src/views'),
      'utils': resolve('../src/utils'),
      'assets': resolve('../src/assets'),
      'static': resolve('../src/static'),
      'layout': resolve('../src/layouts'),
      'component': resolve('../src/components')
    },
    extensions: ['.js', '.vue', '.scss', 'css']
  },
  module: {
    noParse: /es6-promise\.js$/,
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              extractCSS: !isDev,
              preserveWhitespace: false,
              postcss: [
                require('autoprefixer')({
                  browsers: [
                    'last 3 versions'
                  ]
                })
              ],
              loaders: {
                scss: [
                  'vue-style-loader',
                  'css-loader',
                  'sass-loader',
                  {
                    loader: 'sass-resources-loader',
                    options: {
                      resources: [
                        resolve('../src/assets/css/variables.scss'),
                        resolve('../src/assets/css/mixins.scss')
                      ]
                    }
                  }
                ],
                i18n: '@kazupon/vue-i18n-loader'
              }
            }
          }
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'file-loader',
        query: {
          limit: 10000,
          name: '[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.(scss|css)$/,
        use: isDev
          ? ['vue-style-loader', 'css-loader', 'sass-loader']
          : ExtractTextPlugin.extract({
            fallback: 'vue-style-loader',
            use: ['css-loader?minimize', 'postcss-loader', 'sass-loader']
          })
      },
      {
        test: /\.(js|vue)$/,
        exclude: /node_modules/,
        use: {
          loader: 'eslint-loader',
          options: {
            enforce: 'pre',
            cacheDirectory: true
          }
        }
      }
    ]
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: isProd ? 'warning' : false
  },
  plugins: (function () {
    let pluginArr = [
      new webpack.ProvidePlugin({

      })
    ]

    if (isProd) {
      pluginArr = pluginArr.concat([
        new QiniuPlugin({
          ACCESS_KEY: qiniu.access,
          SECRET_KEY: qiniu.secret,
          bucket: qiniu.bucket,
          path: qiniu.prefix
        })
      ])
    }

    if (!isDev) {
      pluginArr = pluginArr.concat([
        new UglifyJsPlugin({
          sourceMap: false
        }),
        new CopyWebpackPlugin([
          {from: resolve('../src/static')}
        ]),
        new ExtractTextPlugin({
          filename: 'common.[chunkhash].css'
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new CompressionPlugin({
          asset: '[path].gz[query]',
          algorithm: 'gzip',
          test: /\.js$|\.css$|\.html$/,
          threshold: 10240,
          minRatio: 0.8
        })
      ])
    }

    return pluginArr
  }())
}
