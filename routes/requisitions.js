const express = require('express');
const router = express.Router();
const pool = require('../db'); // ✅ Make sure this points to your db config

// GET /api/requisitions
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM requisitions ORDER BY date_opened DESC');

    res.json(result.rows);
  } catch (err) {
  console.error('❌ Error fetching requisitions:', err.stack);
  res.status(500).json({ error: 'Internal server error' });
}
});

module.exports = router;

