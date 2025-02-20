const { spawn } = require('child_process');
const path = require('path');

// Define the path to the Linux executable
const exePath = path.join(__dirname, 'jiotv_go-linux-386');

// Make the file executable using chmod
const chmodProcess = spawn('chmod', ['+x', exePath]);

chmodProcess.on('close', (code) => {
    if (code !== 0) {
        console.error('Failed to set executable permissions');
        return;
    }

    // Define the arguments
    const args = ['run', '--public', '-https', '--cert server.crt', '--cert-key server.key'];

    // Spawn the process with arguments
    const child = spawn(exePath, args, {
        // Add executable permissions to the process
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
        console.log(`child process exited with code ${code}`);
    });
});

// Handle chmod errors
chmodProcess.stderr.on('data', (data) => {
    console.error(`chmod error: ${data}`);
});
