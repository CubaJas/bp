// webpack.config.js
const Encore = require('@symfony/webpack-encore');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

Encore
// directory where all compiled assets will be stored
  .setOutputPath('./local/build/')
// what's the public path to this directory (relative to your project's document root dir)
  .setPublicPath('/local/build/')

// empty the outputPath dir before each build
  .cleanupOutputBeforeBuild()

// will output as web/build/app.js
  .addEntry('main', './local/assets/scripts/main.js')

  .enableVueLoader((options) => {
    options.loaders = {
      stylus: ExtractTextPlugin.extract({
        use: 'css-loader!stylus-loader',
        fallback: 'vue-style-loader',
      }),
    };
  })

// will output as web/build/global.css
  .addStyleEntry('global', './local/assets/styles/global.styl')
  .enableStylusLoader()

// allow legacy applications to use $/jQuery as a global variable
// .autoProvidejQuery()

// you can use this method to provide other common global variables,
// such as '_' for the 'underscore' library
  .autoProvideVariables({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
    BX: 'BX',
    'window.BX': 'BX',
  })

  .enableSourceMaps(!Encore.isProduction())

// https://webpack.js.org/plugins/define-plugin/
  .configureDefinePlugin((options) => {
    options.DEBUG = !Encore.isProduction();
  })

// create hashed filenames (e.g. app.abc123.css)

  .configureFilenames({
    js: '[name].[hash:8].js',
	css: '[name].[hash:8].css'
  })

  .enableVersioning();
const config = Encore.getWebpackConfig();

config.externals = {
  jquery: 'jQuery',
  BX: 'BX',
};

// export the final configuration
module.exports = config;
