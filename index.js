const https = require('https');  // Use 'https' instead of 'http'
const fs = require('fs');  // To load the certificate and private key

// Load your SSL certificate and private key
const privateKey = fs.readFileSync('private.pem', 'utf8');
const certificate = fs.readFileSync('cert.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

// Create a listener function
const listener = function (request, response) {
  // Send the HTTP header
  // HTTP Status: 200 : OK
  // Content-Type: text/html
  response.writeHead(200, {'Content-Type': 'text/html'});

  // Send the response body as "Hello World"
  response.end('<h2 style="text-align: center;">Hello World</h2>');
};

// Create the HTTPS server with the credentials
const server = https.createServer(credentials, listener);

// Listen on port 3000
server.listen(3000, () => {
  console.log('Server running at https://127.0.0.1:3000/');
});