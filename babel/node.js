// Created by kirbyjs on 10/21/18.

module.exports = {
    ignore: ['node_modules'],
    presets: [
        '@babel/preset-react',
        [
            '@babel/preset-env',
            {
                targets: { node: 'current' }
            }
        ]
    ]
};
