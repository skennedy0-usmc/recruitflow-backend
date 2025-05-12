console.log("🚨 This candidates.js is executing");

const express = require('express');
const router = express.Router();
console.log("✅ Loaded candidates.js route");

let candidates = [
  {
    id: 1,
    name: 'Jane Doe',
    email: 'jane@example.com',
    status: 'Interviewing',
    notes: [],
    tags: []
  },
  {
    id: 2,
    name: 'John Smith',
    email: 'john@example.com',
    status: 'Applied',
    notes: [],
    tags: []
  }
];

// GET all candidates or filter by name
router.get('/', (req, res) => {
  const { name } = req.query;
  if (name) {
    const filtered = candidates.filter(c =>
      c.name.toLowerCase().includes(name.toLowerCase())
    );
    return res.json(filtered);
  }
  res.json(candidates);
});

// POST a new candidate
router.post('/', (req, res) => {
  const { name, email, phone, resume_url, requisition_id } = req.body;
  const newCandidate = {
    id: candidates.length + 1,
    name,
    email,
    phone,
    resume_url,
    requisition_id,
    status: 'Applied',
    notes: [],
    tags: []
  };
  candidates.push(newCandidate);
  res.status(201).json(newCandidate);
});

// PUT to update candidate (e.g., status, tags, notes)
router.put('/:id', (req, res) => {
  const candidateId = parseInt(req.params.id);
  const index = candidates.findIndex(c => c.id === candidateId);
  if (index === -1) return res.status(404).json({ error: 'Candidate not found' });

  candidates[index] = { ...candidates[index], ...req.body };
  res.json(candidates[index]);
});

module.exports = router;
