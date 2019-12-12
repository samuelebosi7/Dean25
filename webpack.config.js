const webpack = require('webpack');
const path = require( 'path' );
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve( __dirname, 'dist' ),
        filename: 'bundle.js',
    },
    module: {
      rules: [
        {
            test: /\.css$/,
            use: [
                'vue-style-loader',
                'css-loader',
            ],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            'style-loader',
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader',
          ],
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.js$/,
          loader: 'babel-loader'
        }
      ],
    },
    plugins: [
      // make sure to include the plugin for the magic
      new VueLoaderPlugin(),
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
      }),
      new webpack.ProvidePlugin({
        Vue: ['vue/dist/vue.esm.js', 'default']
      })
    ]
  };