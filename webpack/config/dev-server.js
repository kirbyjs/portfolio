// Created by kirby15 on 2/1/18.

const HtmlWebpackPlugin = require('html-webpack-plugin');
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
    plugins: [
        ...webpackConfig.plugins,
        new HtmlWebpackPlugin({
            template: path.resolve(source, 'index.html')
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ]
};
