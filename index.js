const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const net = require('net');  // Built-in module for port checking

// Function to find an open port
const findOpenPort = (startPort = 3000, endPort = 4000) => {
    return new Promise((resolve, reject) => {
        let port = startPort;
        const checkPort = () => {
            const server = net.createServer();
            server.unref();
            server.on('error', () => {
                port++;
                if (port > endPort) {
                    reject('No available ports found');
                } else {
                    checkPort(); // Try next port
                }
            });
            server.listen(port, () => {
                server.close();
                resolve(port);
            });
        };
        checkPort();
    });
};

// Define the path to the Linux executable
const exePath = path.join(__dirname, 'jiotv_go-linux-386');

// Define certificate paths
const certPath = path.join(__dirname, 'server.crt');
const keyPath = path.join(__dirname, 'server.key');

// Check if files exist before proceeding
if (!fs.existsSync(exePath)) {
    console.error(`Executable file not found: ${exePath}`);
    return;
}
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

chmodProcess.on('close', (code) => {
    if (code !== 0) {
        console.error('Failed to set executable permissions');
        return;
    }

    // Find an open port dynamically
    findOpenPort(5000, 6000)  // Set port range to check (5000-6000)
        .then((openPort) => {
            console.log(`Found open port: ${openPort}`);

            // Define the arguments - include the dynamic port
            const args = [
                'run',
                '--public',
                '-https',
                '--cert', certPath,
                '--cert-key', keyPath,
                '--port', openPort
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
        })
        .catch((error) => {
            console.error(`Error finding open port: ${error}`);
        });
});

// Handle chmod errors
chmodProcess.stderr.on('data', (data) => {
    console.error(`chmod error: ${data}`);
});

chmodProcess.on('error', (error) => {
    console.error(`Chmod process error: ${error.message}`);
});
