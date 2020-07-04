// Created by kirby15 on 2/1/18.

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpackConfig = require('./common');

const source = path.resolve(__dirname, '..', '..', 'src');

module.exports = {
    ...webpackConfig,
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        contentBase: [source],
        watchContentBase: true,
        open: true,
        port: 9020
    },
    entry: {
        main: './src/index.js',
        'fcc/index': './src/fcc/index.js',
        'fcc/tribute/index': './src/fcc/tribute/index.js'
    },
    output: {
        filename: '[name].js',
        publicPath: '/'
    },
    plugins: [
        ...webpackConfig.plugins,
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ]
};
