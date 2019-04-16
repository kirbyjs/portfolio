// Created by kirbyjs on 10/21/18.

function addScriptTag(sourceFile) {
    return `<script src="${sourceFile}"></script>`;
}

function addLinkCSSTag(sourceFile) {
    return `<link rel="stylesheet" type="text/css" href="${sourceFile}">`;
}

export default ({ body }) => {
    const assetsObject = require('../assets/json/assets.json'); // eslint-disable-line global-require

    const assets = Object.values(assetsObject);
    const scriptFiles = assets.filter(asset => asset.js);
    const cssFiles = assets.filter(asset => asset.css);

    const htmlScriptTags = scriptFiles.map(asset => addScriptTag(asset.js));
    const htmlCSSLinkTag = cssFiles.map(asset => addLinkCSSTag(asset.css));

    return `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <title>Kirby Simmons</title>
            <meta name="description" content="Passionate Software Developer, come checkout what I've been up to.">
            <link rel="canonical" href="https://kirbyjs.com/">
            <meta property="og:locale" content="en_US">
            <meta property="og:type" content="website">
            <meta property="og:title" content="Kirby Simmons">
            <meta property="og:description" 
                  content="Passionate Software Developer, come checkout what I've been up to.">
            <meta property="og:url" content="https://kirbyjs.com/">
            <meta property="og:site_name" content="Kirby Simmons">
            <meta name="viewport" content="width=device-width">
            <link rel="manifest" href="/manifest.json">
            ${htmlCSSLinkTag.join('\n')}
          </head>
          <body>
            <div id="root">${body}</div>
            ${htmlScriptTags.join('\n')}
          </body>
        </html>
  `;
};
