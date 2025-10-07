const express = require('express');
const router = express.Router();
const db = require('../event_db'); // Import database connection pool

// 1. Get upcoming events (within next 7 days)
router.get('/upcoming', async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
    const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0];

    const [rows] = await db.execute(
      'SELECT * FROM events WHERE date BETWEEN ? AND ? ORDER BY date ASC',
      [today, nextWeek]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch events: ' + err.message });
  }
});

// 2. Get event details (by ID)
router.get('/:eventId', async (req, res) => {
  try {
    const { eventId } = req.params;
    const [rows] = await db.execute('SELECT * FROM events WHERE id = ?', [eventId]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch event details: ' + err.message });
  }
});

// 3. Search events (by category, date, keyword)
router.get('/search', async (req, res) => {
  try {
    const { category, date, keyword } = req.query;
    let query = 'SELECT * FROM events WHERE 1=1'; // Base query condition
    const params = [];

    // Dynamically build query conditions
    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }
    if (date) {
      query += ' AND date = ?';
      params.push(date);
    }
    if (keyword) {
      query += ' AND (title LIKE ? OR description LIKE ?)';
      params.push(`%${keyword}%`, `%${keyword}%`);
    }

    const [rows] = await db.execute(query, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to search events: ' + err.message });
  }
});

module.exports = router;
