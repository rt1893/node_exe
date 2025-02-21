const net = require('net');

// Function to find an available port dynamically
function findOpenPort(callback) {
  const server = net.createServer();
  
  // Try to listen on an available port
  server.listen(0, '::', () => {
    const port = server.address().port;
    console.log(`Found open port: ${port}`);
    server.close(); // Close the server after getting the port
    callback(port);
  });

  server.on('error', (err) => {
    console.error('Error finding open port:', err);
  });
}

// Now dynamically find an open port and start your server on that port
findOpenPort((port) => {
  const https = require('https');
  const fs = require('fs');
  const path = require('path');
  
  // Replace with actual certificate paths
  const certPath = path.join(__dirname, 'server.crt');
  const keyPath = path.join(__dirname, 'server.key');
  
  const options = {
    cert: fs.readFileSync(certPath),
    key: fs.readFileSync(keyPath),
    rejectUnauthorized: false  // Disable peer certificate verification
  };

  https.createServer(options, (req, res) => {
    console.log('Request received:', req.url);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, this is a secure server');
  }).listen(port, '::', () => {  // Listen on the found IPv6 port
    console.log(`Server is running on https://[::1]:${port}`);
    console.log('Certificate Content:', fs.readFileSync(certPath));
    console.log('Key Content:', fs.readFileSync(keyPath));
  });
});