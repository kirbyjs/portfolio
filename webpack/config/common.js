// Created by kirby15 on 2/1/18.

const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
                test: /\.scss/,
                use: scssCommonLoaders
            }
        ]
    }
};
