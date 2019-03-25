const {store} = require('./models.js');

const api = {
    frame: {},
}

api.frame.get = params => {
    return store.getFromFS(params.frameHash);
}

api.frame.post = async (_params, _query, body) => {
    const frameHash = await store.create(body);
    return frameHash;
}

api.frame.getPage = async params => {
    const htmlFrame = await store.getFromFS(params.htmlFrameHash);
    const jsFrame = await store.getFromFS(params.jsFrameHash);
    return `
        <!DOCTYPE html>
        <html>
        <head><title>Live Frame | CodeFrame</title></head>
        <body>
        ${htmlFrame}
        <script src="https://unpkg.com/torus-dom/dist/index.min.js"></script>
        <script>${jsFrame}</script>
        </body>
        </html>`;
}

module.exports = api;