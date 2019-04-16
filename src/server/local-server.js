// Created by kirbyjs on 10/21/18.

import fs from 'fs';
import path from 'path';
import spdy from 'spdy';
import webpack from 'webpack';
import app from './server';
import webpackConfig from '../../webpack/config/dev-middleware';

const compiler = webpack(webpackConfig);

app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));

const certOptions = {
    key: fs.readFileSync(path.resolve('.cert/server.key')),
    cert: fs.readFileSync(path.resolve('.cert/server.crt'))
};

spdy.createServer(certOptions, app).listen(443, (error) => {
    if (error) {
        console.error(error);
        process.exit(1);
    }

    console.log('Listening on port: 443');
});
