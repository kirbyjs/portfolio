// Created by kirby15 on 2/1/18.

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const { v4 } = require('uuid');
const md5 = require('md5-file');
const { GenerateSW } = require('workbox-webpack-plugin');
const webpackConfig = require('./common');

const publicAssetsDirectory = path.resolve(__dirname, '..', 'assets', 'public');

module.exports = {
    ...webpackConfig,
    mode: 'production',
    optimization: {
        splitChunks: {
            chunks: 'initial'
        },
        minimizer: [new TerserPlugin(), new CssMinimizerPlugin()]
    },
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, '..', 'assets', 'bundle'),
        publicPath: '/'
    },
    plugins: [
        ...webpackConfig.plugins,
        new GenerateSW({
            swDest: 'sw.js',
            clientsClaim: true,
            skipWaiting: true,
            additionalManifestEntries: [
                {
                    url: '/index.html',
                    revision: v4()
                        .split('-')
                        .join('')
                },
                {
                    url: '/manifest.json',
                    revision: md5.sync(path.resolve(publicAssetsDirectory, 'manifest.json'))
                },
                {
                    url: '/favicon.ico',
                    revision: md5.sync(path.resolve(publicAssetsDirectory, 'favicon.ico'))
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        })
    ]
};
