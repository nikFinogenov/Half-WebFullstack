const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer(function (request, response) {
    let filePath = '.' + request.url;
    if (filePath === './') {
        filePath = './index.html';
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
    };

    const contentTypeHeader = contentType[extname] || 'application/octet-stream';

    fs.readFile(filePath, function (error, content) {
        if (error) {
            if (error.code === 'ENOENT') {
                response.writeHead(404);
                response.end('404 Not Found');
            } else {
                response.writeHead(500);
                response.end('Internal Server Error: ' + error.code);
            }
        } else {
            response.writeHead(200, { 'Content-Type': contentTypeHeader });
            response.end(content, 'utf-8');
        }
    });
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
