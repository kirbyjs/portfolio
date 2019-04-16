// Created by kirbyjs on 10/21/18.

import path from 'path';
import fs from 'fs';
import spdy from 'spdy';
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../app';
import template from '../index.html';

const app = express();

app.use('/assets', express.static(path.join(__dirname, '..', '..', 'assets')));
app.use('/', express.static(path.join(__dirname, '..', '..', 'assets', 'public')));

app.get('/', (req, res) => {
    const appString = process.env.NODE_ENV !== 'localhost' ? renderToString(<App />) : '';

    res.send(template({
        body: appString
    }));
});

if (process.env.NODE_ENV !== 'localhost') {
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
}

export default app;
