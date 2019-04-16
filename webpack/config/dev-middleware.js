// Created by kirby15 on 2/1/18.

const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpackConfig = require('./common');
const path = require('path');

module.exports = {
    ...webpackConfig,
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        port: 9020
    },
    entry: {
        app: [
            'react-hot-loader/patch',
            'webpack-hot-middleware/client',
            './src/index.js'
        ]
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '..', '..', 'assets', 'bundle'),
        publicPath: '/assets/bundle'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, '..', 'manifest', 'vendor.json')
        }),
        new AssetsPlugin({
            filename: 'assets.json',
            path: path.join(__dirname, '..', '..', 'assets', 'json'),
            update: true,
            includeAllFileTypes: false
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ]
};
