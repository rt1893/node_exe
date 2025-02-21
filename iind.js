const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const http = require('https');
const host = '[::]';
const PORT = process.env.PORT || 10000;

// Define the path to the Linux executable
const exePath = path.join(__dirname, 'jiotv_go-linux-386');

// Check if files exist before proceeding
if (!fs.existsSync(exePath)) {
    console.error(`Executable file not found: ${exePath}`);
    return;
}

// Define certificate paths
const certPath = path.join(__dirname, 'server.crt');
const keyPath = path.join(__dirname, 'server.key');

if (!fs.existsSync(certPath)) {
    console.error(`Certificate file not found: ${certPath}`);
    return;
}
if (!fs.existsSync(keyPath)) {
    console.error(`Key file not found: ${keyPath}`);
    return;
}

// Make the file executable using chmod
const chmodProcess = spawn('chmod', ['+x', exePath]);

// Define the arguments - include the dynamic port
const args = [
    'run',
    '--public',
    '--host', host,
    '--port', PORT,
    '--tls',
    '--tls-cert',
    certPath,
    '--tls-key',
    keyPath
];

// Spawn the process with arguments
const child = spawn(exePath, args, {
    mode: 0o755
});

// Capture the output (stdout)
child.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

// Capture any error messages (stderr)
child.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
    accessWebService();
});

// Handle process exit
child.on('close', (code) => {
    if (code !== 0) {
        console.error(`Process failed with exit code ${code}`);
    } else {
        console.log(`Process completed successfully with code ${code}`);
    }
});

// Handle process errors
child.on('error', (error) => {
    console.error(`Process error: ${error.message}`);
});

// Function to access the web service on port 5001
function accessWebService() {
    // Making a GET request to the service running on port 5001
    const options = {
      hostname: 'node-exe.onrender.com',
      port: PORT,
      path: '/',
      method: 'GET',
      ca: fs.readFileSync(certPath),  // Provide the custom certificate
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
  