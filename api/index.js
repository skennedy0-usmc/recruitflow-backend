const express = require('express');
const app = express();
const serverless = require('serverless-http');

app.use(express.json());

// Example routes — update or expand as needed
app.get('/api/candidates', (req, res) => {
  res.json([{ id: 1, name: "Alex Johnson", email: "alex@example.com" }]);
});

app.get('/api/requisitions', (req, res) => {
  res.json([{ id: 6, title: "Sr TA Partner" }]);
});

module.exports.handler = serverless(app);
