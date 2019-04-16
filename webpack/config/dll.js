// Created by kirby15 on 2/1/18.
const webpack = require('webpack');
const path = require('path');
const AssetsPlugin = require('assets-webpack-plugin');
const webpackConfig = require('./common');
const vendor = require('../vendors');

module.exports = {
    ...webpackConfig,
    entry: { vendor },
    mode: 'development',
    devtool: 'source-map',
    output: {
        filename: '[name].[chunkhash].js',
        library: '[name]',
        path: path.resolve(__dirname, '..', '..', 'assets', 'bundle'),
        publicPath: '/assets/bundle'
    },
    plugins: [
        new webpack.DllPlugin({
            name: '[name]',
            path: path.resolve(__dirname, '..', 'manifest', '[name].json')
        }),
        new webpack.HashedModuleIdsPlugin(),
        new AssetsPlugin({
            filename: 'assets.json',
            path: path.join(__dirname, '..', '..', 'assets', 'json')
        })
    ]
};
