const http = require('https');

const server = http.createServer((req, res) => {
    // Common server/request information equivalents to $_SERVER
    const serverInfo = {
        // Request Method (equivalent to $_SERVER['REQUEST_METHOD'])
        REQUEST_METHOD: req.method,

        // URL Path (equivalent to $_SERVER['REQUEST_URI'])
        REQUEST_URI: req.url,

        // HTTP Headers (equivalent to $_SERVER['HTTP_*'])
        HTTP_HOST: req.headers.host,
        HTTP_USER_AGENT: req.headers['user-agent'],
        HTTP_ACCEPT: req.headers.accept,

        // Server Protocol (equivalent to $_SERVER['SERVER_PROTOCOL'])
        SERVER_PROTOCOL: `HTTP/${req.httpVersion}`,

        // Remote Address (equivalent to $_SERVER['REMOTE_ADDR'])
        REMOTE_ADDR: req.socket.remoteAddress,

        // Server Port (equivalent to $_SERVER['SERVER_PORT'])
        SERVER_PORT: req.socket.localPort,

        // Query String (equivalent to $_SERVER['QUERY_STRING'])
        QUERY_STRING: req.url.includes('?') ? req.url.split('?')[1] : '',
    };

    // Send response with server info
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(serverInfo, null, 2));
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});