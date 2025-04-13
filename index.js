const express = require('express');
const app = express();
const cors = require('cors');
const { Pool } = require('pg');

app.use(express.json());
app.use(cors());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'recruitflow_db',
  password: 'BosCelts@2025!', 
  port: 5432,
});

app.get('/candidates', async (req, res) => {
  const result = await pool.query('SELECT * FROM candidates');
  res.json(result.rows);
});

app.post('/candidates', async (req, res) => {
  const { name, email, phone, resume_url } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO candidates (name, email, phone, resume_url) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, phone, resume_url]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error adding candidate' });
  }
});

app.post('/requisitions', async (req, res) => {
  const {
    title,
    department,
    location,
    status,
    date_opened,
    date_closed,
    hiring_manager,
    recruiter,
    notes
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO requisitions 
        (title, department, location, status, date_opened, date_closed, hiring_manager, recruiter, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [title, department, location, status, date_opened, date_closed, hiring_manager, recruiter, notes]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating requisition:', error);
    res.status(500).json({ error: 'Error creating requisition' });
  }
});

app.get('/requisitions', async (req, res) => {
console.log('GET /requisitions called');
  try {
    const result = await pool.query('SELECT * FROM requisitions');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching requisitions:', error);
    res.status(500).json({ error: 'Error fetching requisitions' });
  }
});
app.post('/links', async (req, res) => {
  const { candidate_id, requisition_id, status, notes } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO candidate_requisitions 
        (candidate_id, requisition_id, status, notes)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [candidate_id, requisition_id, status, notes]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error linking candidate to requisition:', error);
    res.status(500).json({ error: 'Error linking candidate to requisition' });
  }
});
app.get('/links', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM candidate_requisitions');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching links:', error);
    res.status(500).json({ error: 'Error fetching links' });
  }
});

app.listen(3000, () => {
  console.log('RecruitFlow API running on http://localhost:3000');
});