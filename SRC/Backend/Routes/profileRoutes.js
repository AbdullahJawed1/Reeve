// Import necessary modules and database connection pool
const express = require('express');
const router = express.Router();
const { poolPromise, sql } = require('../database'); // Import your database connection

// Endpoint to handle updating the user profile in the database
router.post('/profile/update-profile', async (req, res) => {
  const { fullName, age, address, email, phone, profilePicture } = req.body;

  try {
    const pool = await poolPromise;
    const request = pool.request();

    // Define the SQL query for updating the user profile
    const query = `
      UPDATE UserProfile
      SET FullName = @FullName, Age = @Age, Address = @Address, Email = @Email, Phone = @Phone, ProfilePicture = @ProfilePicture
      WHERE UserID = @UserID;
    `;

    // Execute the query
    const result = await request
      .input('FullName', sql.NVarChar, fullName)
      .input('Age', sql.Int, age)
      .input('Address', sql.NVarChar, address)
      .input('Email', sql.NVarChar, email)
      .input('Phone', sql.NVarChar, phone)
      .input('ProfilePicture', sql.NVarChar, profilePicture)
      .input('UserID', sql.Int, userID) // Assuming you have a way to get the user ID
      .query(query);

    res.status(200).send('Profile updated successfully');
  } catch (error) {
    console.error('Error updating profile:', error.message);
    res.status(500).send('Error updating profile');
  }
});

module.exports = router;
