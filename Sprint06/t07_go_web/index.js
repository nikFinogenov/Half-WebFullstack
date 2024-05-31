const http = require('http');
const normalRouter = require('./normal-router');
const quantumRouter = require('./quantum-router');

const port = 5001;

const server = http.createServer((req, res) => {
    if (req.url === '/' || req.url === '/index.html') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Welcome to the Quantum Time Calculator</h1><p><a href="/normal">Normal Time</a></p><p><a href="/quantum">Quantum Time</a></p>');
    } else if (req.url.startsWith('/normal')) {
        normalRouter(req, res);
    } else if (req.url.startsWith('/quantum')) {
        quantumRouter(req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
