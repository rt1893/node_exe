const express = require('express');
const app = express();

app.get('/', (req, res) => {
    const serverInfo = {
        // Request Method
        REQUEST_METHOD: req.method,

        // URL Path
        REQUEST_URI: req.originalUrl,

        // HTTP Headers
        HTTP_HOST: req.hostname,
        HTTP_USER_AGENT: req.get('User-Agent'),
        HTTP_ACCEPT: req.get('Accept'),

        // Server Protocol
        SERVER_PROTOCOL: req.protocol,

        // Remote Address
        REMOTE_ADDR: req.ip,

        // Server Port
        SERVER_PORT: req.socket.localPort,

        // Query String
        QUERY_STRING: req.query,

        // Additional Express-specific information
        PATH_INFO: req.path,
        CONTENT_TYPE: req.get('Content-Type'),
        CONTENT_LENGTH: req.get('Content-Length'),
    };

    res.json(serverInfo);
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});


// const { exec } = require('child_process');
// const path = require('path');
// const http = require('http');  // Ensure this line is here

// // Path to your Linux executable file
// const executablePath = path.join(__dirname, 'jiotv_go-linux-386');

// // Arguments to be passed to the executable (example arguments)
// const args = ['run'];

// // Function to execute the Linux file with arguments
// function runExecutable() {
//   // Create the full command by joining the executable path and arguments
//   const command = `${executablePath} ${args.join(' ')}`;
  
//   exec(command, (error, stdout, stderr) => {
//     if (error) {
//       console.error(`exec error: ${error}`);
//       return;
//     }

//     // Log the output of the executable
//     console.log(`stdout: ${stdout}`);
//     console.error(`stderr: ${stderr}`);

//     // Once the executable is run, assume it generates a web service on port 5001
//     accessWebService();
//   });
// }

// // Function to access the web service on port 5001
// function accessWebService() {
//   // Making a GET request to the service running on port 5001
//   const options = {
//     hostname: 'localhost',
//     port: 5001,
//     path: '/',
//     method: 'GET',
//   };

//   const req = http.request(options, (res) => {
//     let data = '';

//     // Collect the response data
//     res.on('data', (chunk) => {
//       data += chunk;
//     });

//     res.on('end', () => {
//       console.log('Web Service Response:', data);
//     });
//   });

//   req.on('error', (error) => {
//     console.error('Error accessing the web service:', error);
//   });

//   req.end();
// }

// // Run the executable with arguments and then access the web service
// runExecutable();