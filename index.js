const { spawn } = require('child_process');
const path = require('path');

// Define the path to the .exe file
const exePath = path.join(__dirname, 'jiotv_go-windows-386');

// Define the arguments for the .exe file
// Remove the executable name from arguments and just pass 'help'
const args = ['run','--public'];

// Spawn the process with arguments
const child = spawn(exePath, args);

// Capture the output of the .exe file (stdout)
child.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

// Capture any error messages (stderr)
child.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

// Handle process exit
child.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
