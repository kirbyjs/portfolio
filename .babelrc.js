// Created by kirby15 on 2/1/18.

const plugins = [];

if (process.env.NODE_ENV !== 'production') {
    plugins.push('react-hot-loader/babel');
}

module.exports = {
    ignore: ['node_modules'],
    presets: [
        '@babel/preset-react',
        '@babel/preset-typescript',
        [
            '@babel/preset-env',
            {
                targets: [
                    'defaults',
                    'not ie > 0',
                    'not ie_mob > 0'
                ],
                modules: false
            }
        ]
    ],
    plugins
};
