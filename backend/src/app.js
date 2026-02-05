const express = require('express');
const executeRoutes = require('./routes/execute.routes');

const app = express();

app.use(express.json({ limit: '1mb' }));
app.use('/api', executeRoutes);

app.use((err, req, res, next) => {
  const message = err.message || 'Internal server error.';
  res.status(500).json({ error: message });
});

module.exports = app;
