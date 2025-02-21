const express = require('express');
const app = express();
const port = process.env.PORT || 5001;  // Render will assign a port

// Simple route to test if the server is up
app.get('/', (req, res) => {
  res.send('Hello, your executable is running!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});