/*jslint esversion: 8 */
const express = require('express');
const cors = require('cors');
const pinoLogger = require('./logger');

// Import Database Connection
const connectToDatabase = require('./models/db');

// Import Routes
const giftRoutes = require('./routes/giftRoutes');
const searchRoutes = require('./routes/searchRoutes');
// Task 1: Import authRoutes
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = 3060;

// Connect to MongoDB
connectToDatabase()
    .then(() => {
        pinoLogger.info('Connected to database');
    })
    .catch((e) => {
        pinoLogger.error('Failed to connect to database', e);
    });

// Middlewares
app.use(cors());
app.use(express.json());

// Routes Setup
app.use('/api/gifts', giftRoutes);
app.use('/api/search', searchRoutes);

// Task 2: Use authRoutes for the /api/auth path
app.use('/api/auth', authRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
    pinoLogger.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start Server
app.listen(port, () => {
    pinoLogger.info(`Server running on port ${port}`);
});

module.exports = app;