const express = require('express');
const cors = require('cors'); // Solve cross-origin issues
const eventsRouter = require('./routes/events'); // Import event-related routes

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware configuration
app.use(cors()); // Allow all cross-origin requests (restrict in production)
app.use(express.json()); // Parse JSON request bodies

// Mount routes
app.use('/api/events', eventsRouter); // Event-related endpoints: /api/events/*

// Start server
app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});
