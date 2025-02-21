const { exec } = require('child_process');
const path = require('path');
const http = require('http');  // Ensure this line is here

// Path to your Linux executable file
const executablePath = path.join(__dirname, 'jiotv_go-linux-386');

// Arguments to be passed to the executable (example arguments)
const args = ['run'];

// Function to execute the Linux file with arguments
function runExecutable() {
  // Create the full command by joining the executable path and arguments
  const command = `${executablePath} ${args.join(' ')}`;
  
  exec(command, (error, stdout, stderr) => {
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
  // Making a GET request to the service running on port 5001
  const options = {
    hostname: 'localhost',
    port: 5001,
    path: '/',
    method: 'GET',
  };

  const req = http.request(options, (res) => {
    let data = '';

    // Collect the response data
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

// Run the executable with arguments and then access the web service
runExecutable();