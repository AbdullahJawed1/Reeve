// server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; // Set the port

// Middleware
app.use(express.json()); // Parse JSON request bodies

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
