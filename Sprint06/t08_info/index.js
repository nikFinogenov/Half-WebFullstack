const http = require('http');
const os = require('os');
const url = require('url');

const PORT = 5001;

const server = http.createServer((req, res) => {
  const scriptName = process.argv[1];
  const scriptArgs = process.argv.slice(2);
  const networkInterfaces = os.networkInterfaces();
  const serverIpAddress = Object.values(networkInterfaces)
    .flat()
    .find((details) => details.family === 'IPv4' && !details.internal)
    .address;

  const hostName = os.hostname();
  const protocolNameVersion = `HTTP/${req.httpVersion}`;
  const queryMethod = req.method;
  const userAgent = req.headers['user-agent'];
  const clientIpAddress = req.connection.remoteAddress;
  const urlParams = url.parse(req.url, true).query;

  console.log(`
    Script Name: ${scriptName}
    Arguments Passed to Script: ${scriptArgs}
    Server IP Address: ${serverIpAddress}
    Host Name: ${hostName}
    Protocol Name and Version: ${protocolNameVersion}
    Query Method: ${queryMethod}
    User-Agent: ${userAgent}
    Client IP Address: ${clientIpAddress}
    URL Parameters: ${JSON.stringify(urlParams)}
  `);

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Check the console for the logged information.');
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
