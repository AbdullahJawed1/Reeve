const express = require('express');
const app = express();

// Import route files
const chatRoutes = require('./Routes/chatRoutes');
const medicationRoutes = require('./Routes/medicationRoutes');
const memoryJournalRoutes = require('./Routes/memoryJournalRoutes');
const profileRoutes = require('./Routes/profileRoutes');

// Use route files
app.use('/api/chat', chatRoutes);
app.use('/api/medication', medicationRoutes);
app.use('/api/memory', memoryJournalRoutes);
app.use('/api/profile', profileRoutes);

// Other middleware and configurations...

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
