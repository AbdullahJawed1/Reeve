// Import necessary modules and database connection pool
const express = require('express');
const router = express.Router();
const { poolPromise, sql } = require('../database'); // Import your database connection

// Endpoint to handle inserting a new memory into the database
router.post('/memory/new-memory', async (req, res) => {
  const { memory, selectedImage } = req.body;

  try {
    const pool = await poolPromise;
    const request = pool.request();

    // Define the SQL query for inserting a new memory
    const query = `
      INSERT INTO Memories (MemoryText, ImageURL)
      VALUES (@MemoryText, @ImageURL);
    `;

    // Execute the query
    const result = await request
      .input('MemoryText', sql.NVarChar, memory)
      .input('ImageURL', sql.NVarChar, selectedImage)
      .query(query);

    res.status(201).send('Memory inserted successfully');
  } catch (error) {
    console.error('Error inserting memory:', error.message);
    res.status(500).send('Error inserting memory');
  }
});

module.exports = router;
