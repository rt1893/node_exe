const { exec } = require('child_process');
const http = require('http');
const path = require('path');

// Construct the path dynamically using path.join
const executablePath = path.join(__dirname, 'node_exe', 'jiotv_go');

// Log the full path for debugging
console.log('Executable Path:', executablePath);

// Function to run the executable
function runExecutable() {
  exec(executablePath, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }

    // Log the output of the executable
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);

    // Once the executable is run, assume it generates a web service on port 5001
    accessWebService();
  });
}

// Function to access the web service on port 5001
function accessWebService() {
  const options = {
    hostname: 'localhost',
    port: 5001, // Adjust the port if needed
    path: '/',
    method: 'GET',
  };

  const req = http.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      console.log('Web Service Response:', data);
    });
  });

  req.on('error', (error) => {
    console.error('Error accessing the web service:', error);
  });

  req.end();
}

// Run the executable and then access the web service
runExecutable();