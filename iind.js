const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Define the path to the Linux executable
const exePath = path.join(__dirname, 'jiotv_go-linux-386');

// Check if files exist before proceeding
if (!fs.existsSync(exePath)) {
    console.error(`Executable file not found: ${exePath}`);
    return;
}

// Make the file executable using chmod
const chmodProcess = spawn('chmod', ['+x', exePath]);

// Define the arguments - include the dynamic port
const args = ['run'];

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