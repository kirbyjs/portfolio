// Created by kirby15 on 2/1/18.

const HtmlWebpackPlugin = require('html-webpack-plugin');
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
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, '..', '..', 'assets', 'bundle'),
        publicPath: '/'
    },
    plugins: [
        ...webpackConfig.plugins,
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '..', '..', 'src', 'index.html')
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        })
    ]
};
