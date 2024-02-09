// Import necessary modules and database connection pool
const express = require('express');
const router = express.Router();
const { poolPromise, sql } = require('../database'); // Import your database connection



router.post('/medication/new-reminder', async (req, res) => {
    const { medicationName, medicationSchedule, phoneNumber } = req.body;
  
    try {
      const pool = await poolPromise;
      const request = pool.request();
  
      const query = `
        INSERT INTO Reminders (MedicationName, MedicationSchedule, PhoneNumber)
        VALUES (@MedicationName, @MedicationSchedule, @PhoneNumber);
      `;
  
      const result = await request
        .input('MedicationName', sql.NVarChar, medicationName)
        .input('MedicationSchedule', sql.NVarChar, medicationSchedule)
        .input('PhoneNumber', sql.NVarChar, phoneNumber)
        .query(query);
  
      res.status(201).send('Reminder inserted successfully');
    } catch (error) {
      console.error('Error inserting reminder:', error.message);
      res.status(500).send('Error inserting reminder');
    }
  });
  