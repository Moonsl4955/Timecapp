const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const formRoutes = require('./routes/form');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Database connection
const db = require('./db/index');
db();

// Routes
app.use('/api/form', formRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});