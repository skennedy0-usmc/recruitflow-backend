const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Route files
const path = require('path');
console.log("🕵️ Using candidates route from:", path.resolve('./routes/candidates'));
const candidatesRoutes = require('./routes/candidates');
const requisitionsRoutes = require('./routes/requisitions');
const interviewsRoutes = require('./routes/interviews'); // Optional if you're using this

// Route mounting
app.use('/api/candidates', candidatesRoutes);
app.use('/api/requisitions', requisitionsRoutes);
app.use('/api/interviews', interviewsRoutes); // Optional

module.exports = app;
