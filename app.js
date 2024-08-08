const express = require('express');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

const port = process.env.PORT || 5000;

// Import routes
const indexRouter = require('./src/routes/route');
const router2 = require('./src/routes/route2');

// Use routes
app.use(express.json()); // Middleware to parse JSON bodies
app.use('/', indexRouter,router2);

// Start server with error handling
app.listen(port, (err) => {
  if (err) {
    console.error('Failed to start server:', err);
    return;
  }
  console.log(`Server running on port ${port}`);
});
