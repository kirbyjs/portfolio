// Created by kirby15 on 2/1/18.

const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpackConfig = require('./common');

module.exports = {
    ...webpackConfig,
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        host: 'localhost',
        open: true,
        port: 9020
    },
    output: {
        filename: '[name].js',
        publicPath: '/'
    },
    plugins: [
        ...webpackConfig.plugins,
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ]
};
