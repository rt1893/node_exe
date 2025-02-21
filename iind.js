const express = require('express');
const path = require('path');
const { spawn } = require('child_process');

const app = express();
const PORT = process.env.PORT || 3001;

// Path to the Linux executable
const exePath = path.join(__dirname, 'jiotv_go-linux-386');
const certPath = path.join(__dirname, 'server.crt');
const keyPath = path.join(__dirname, 'server.key');

// Ensure the executable has the right permissions
const chmod = spawn('chmod', ['+x', exePath]);

chmod.on('close', (code) => {

    if (code !== 0) {
        console.error('Failed to set executable permissions.');
        return;
    }

    console.log('Permissions set successfully.');

    // Define your route
    app.get('/run-exe', (req, res) => {

        // Define the arguments - include the dynamic port
        const args = [
            'run',
            '--public',
            '-https',
            '--cert', certPath,
            '--cert-key', keyPath,
            '--port', 5001
        ];

        // Spawn the process for the executable
        const exeProcess = spawn(exePath, args);

        // Capture the output (stdout)
        exeProcess.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        // Capture any error messages (stderr)
        exeProcess.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });

        // Handle process exit
        exeProcess.on('close', (code) => {
            if (code === 0) {
                res.send('Executable ran successfully.');
            } else {
                res.status(500).send(`Executable failed with code ${code}`);
            }
        });

        // Handle any errors with the process itself
        exeProcess.on('error', (err) => {
            console.error(`Failed to start process: ${err.message}`);
            res.status(500).send('Failed to execute the file.');
        });
    });

    // Start the Express server
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
});

chmod.on('error', (err) => {
    console.error(`Error while setting permissions: ${err.message}`);
});
