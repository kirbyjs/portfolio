// Created by kirby15 on 2/1/18.

const path = require('path');
const { v4 } = require('uuid');
const md5 = require('md5-file');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');

const publicAssetsDirectory = path.resolve(__dirname, '..', '..', 'assets', 'public');
const isProduction = process.env.NODE_ENV === 'production';
const scssCommonLoaders = [
    {
        loader: MiniCssExtractPlugin.loader,
        options: {
            hmr: !isProduction,
            reloadAll: !isProduction
        }
    },
    {
        loader: 'css-loader',
        options: {
            sourceMap: !isProduction
        }
    },
    {
        loader: 'sass-loader',
        options: { sourceMap: !isProduction }
    },
    {
        loader: 'postcss-loader',
        options: {
            plugins: [autoprefixer()]
        }
    }
];

module.exports = {
    module: {
        rules: [
            {
                test: /\.(jpg|jp2|webp|pdf|png|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[contenthash].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.scss/,
                use: scssCommonLoaders
            }
        ]
    },
    plugins: [
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
        new CopyPlugin([
            {
                from: publicAssetsDirectory
            }
        ])
    ]
};
