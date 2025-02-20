const http = require('http');

const hostname = '0.0.0.0'; // Use '0.0.0.0' to listen on all available interfaces
const port = 5001;  // Port number

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World 5001!\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});