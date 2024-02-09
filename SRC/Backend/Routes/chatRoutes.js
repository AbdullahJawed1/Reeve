// Import necessary modules and database connection pool
const express = require('express');
const router = express.Router();
const { poolPromise, sql } = require('../database'); // Import your database connection

// Endpoint to handle inserting a new message into the database
router.post('/chat/new-message', async (req, res) => {
  const { message, selectedImage } = req.body;

  try {
    const pool = await poolPromise;
    const request = pool.request();

    // Define the SQL query for inserting a new message
    const query = `
      INSERT INTO ChatMessages (MessageText, ImageURL)
      VALUES (@MessageText, @ImageURL);
    `;

    // Execute the query
    const result = await request
      .input('MessageText', sql.NVarChar, message)
      .input('ImageURL', sql.NVarChar, selectedImage)
      .query(query);

    res.status(201).send('Message inserted successfully');
  } catch (error) {
    console.error('Error inserting message:', error.message);
    res.status(500).send('Error inserting message');
  }
});

module.exports = router;
