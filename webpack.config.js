var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var config = require('config');
var cssnano = require('cssnano');
var env = config.util.getEnv('NODE_ENV');
var DEV = env === 'development';
var publicPath = config.get('webpack.publicPath');

var webpackConfig = {
  devtool: config.get('webpack.devtool'),
  resolve: {
    root: path.join(__dirname, 'src'),
    extensions: ['', '.js', '.jsx', '.json', '.ts', '.tsx']
  },
  entry: {
    app: [path.join(__dirname, 'src/index')],
    vendor: [
      'react',
      'react-router'
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: DEV ? "[name].js" : "[name].[hash].js",
    publicPath: publicPath
  }
};

var port = config.get('server.port')
if (DEV) {
  webpackConfig.entry.app.unshift(
    'webpack-hot-middleware/client?path=http://localhost:' + port + '/__webpack_hmr',
    'react-hot-loader/patch'
  );
}

var cssLoader = 'css?sourceMap&-minimize&importLoader=1&modules&localIdentName=[name]__[local]___[hash:base64:5]';
webpackConfig.module = {
  loaders: [
    {
      test: /\.json$/,
      loader: 'json'
    },
    {
      test: /\.tsx?$/,
      loader: 'react-hot-loader/webpack!ts',
      include: /src/,
    },
    {
      test: /\.css$/,
      loader: DEV
        ? 'style!' + cssLoader + '!postcss'
        : ExtractTextPlugin.extract('style', [cssLoader, 'postcss'])
    },
    {
      test: /\.less$/,
      loader: DEV
        ? 'style!' + cssLoader + '!postcss!less?sourceMap'
        : ExtractTextPlugin.extract('style', [cssLoader, 'postcss', 'less?sourceMap'])
    }
  ]
};

webpackConfig.postcss = [
  cssnano({
    autoprefixer: {
      add: true,
      remove: true,
      browsers: ['last 2 versions']
    },
    discardComments: {
      removeAll: true
    },
    discardUnused: false,
    mergeIdents: false,
    reduceIdents: false,
    safe: true,
    sourcemap: true
  })
];

webpackConfig.plugins = [
  new ExtractTextPlugin('[name].[contenthash].css', {
    allChunks: true
  }),
  new HtmlWebpackPlugin({
    template: path.join(__dirname, 'src/index.html'),
    hash: false,
    filename: 'index.html',
    inject: 'body',
    minify: {
      collapseWhitespace: true
    }
  })
];

var globals = config.get('globals');
if (globals) {
  globals['process.env'] = {
    NODE_ENV: JSON.stringify(env)
  };
  webpackConfig.plugins.push(
    new webpack.DefinePlugin(globals)
  );
}

if (DEV) {
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  );
} else {
  webpackConfig.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor']
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false
      }
    })
  )
}

module.exports = webpackConfig;
