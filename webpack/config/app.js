// Created by kirby15 on 2/1/18.

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpackConfig = require('./common');
const path = require('path');

module.exports = {
    ...webpackConfig,
    mode: 'production',
    optimization: {
        splitChunks: {
            chunks: 'initial'
        },
        minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin()]
    },
    entry: {
        main: './src/index.js',
        'fcc/index': './src/fcc/index.js',
        'fcc/tribute/index': './src/fcc/tribute/index.js'
    },
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, '..', '..', 'assets', 'bundle'),
        publicPath: '/'
    },
    plugins: [
        ...webpackConfig.plugins,
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        })
    ]
};
