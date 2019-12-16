// Created by kirby15 on 2/1/18.

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import ReactApp from './app';
import '../sass/main.scss';

const render = (App) => {
    ReactDOM.render(
        <AppContainer>
            <App />
        </AppContainer>,
        document.getElementById('root')
    );
};

render(ReactApp);

if (module.hot) {
    module.hot.accept('./app', () => {
        render(ReactApp);
    });
}
