// Created by kirby15 on 2/1/18.

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const source = path.resolve(__dirname, '..', 'src');
const assetsDirectory = path.resolve(__dirname, '..', 'assets');
const isProduction = process.env.NODE_ENV === 'production';
const scssCommonLoaders = [
    {
        loader: MiniCssExtractPlugin.loader
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
            postcssOptions: {
                plugins: ['autoprefixer']
            }
        }
    }
];

module.exports = {
    entry: {
        main: './src/index.js'
    },
    module: {
        rules: [
            {
                test: /\.(jpg|jp2|webp|pdf|png|svg|ttf|woff.*)$/,
                type: 'asset/resource',
                generator: {
                    filename: '[name].[contenthash][ext]'
                }
            },
            {
                test: /\.scss/,
                use: scssCommonLoaders
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            favicon: './src/favicon.ico',
            chunks: ['main'],
            template: path.resolve(source, 'index.ejs')
        }),
        new CopyPlugin({
            patterns: [{
                from: assetsDirectory
            }]
        })
    ]
};
