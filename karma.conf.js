var postcssImport = require('postcss-import')
var postcssCustomProperties = require('postcss-custom-properties')

module.exports = function (config) {
  config.set({
    browsers: [
      'PhantomJS'
    ],
    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      {
        pattern: 'test/karma.tests.js',
        served: true,
        included: true,
      },
    ],

    frameworks: [ 'chai', 'mocha' ],

    plugins: [
      'karma-firefox-launcher',
      'karma-chai',
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-webpack'
    ],

    preprocessors: {
      'test/karma.tests.js': [ 'webpack' ]
    },

    reporters: [ 'mocha' ],
    singleRun: true,
    logLevel: config.LOG_INFO,
    webpack: {
      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/,
            query: {
              cacheDirectory: true,
            },
          },
          {
            test: /\.css$/,
            loader: 'style-loader!css-loader!postcss-loader'
          },
          {
            test: /\.json$/,
            loader: 'json'
          }
        ]
      },
      postcss: function () {
        return [
          postcssImport,
          postcssCustomProperties,
        ]
      }
    },


    webpackMiddleware: {
      noInfo: true
    },

    client: {
      mocha: {
        reporter: 'html',
        ui: 'bdd'
      },
      captureConsole: true,
    }

  })
}

