const { exec } = require('child_process');
const axios = require('axios');
const path = require('path');

// Path to your Linux executable file
const executablePath = path.join(__dirname, 'jiotv_go-linux-386');

// Function to execute the Linux file
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
  // Making a GET request to the service running on port 5001
  axios.get('http://localhost:5001')
    .then(response => {
      console.log('Web Service Response:', response.data);
    })
    .catch(error => {
      console.error('Error accessing the web service:', error);
    });
}

// Run the executable and then access the web service
runExecutable();
