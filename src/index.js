// Created by kirbyjs on 1/21/20.

import 'lazysizes';
import '../sass/main.scss';

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js'));
}
