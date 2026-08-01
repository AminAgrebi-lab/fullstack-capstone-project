const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connectToDatabase = require('../models/db');
const pino = require('pino');

const logger = pino({ level: 'info' });
const JWT_SECRET = process.env.JWT_SECRET || 'secret_token';

// Registration Endpoint
router.post('/register', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("users");

        const existingEmail = await collection.findOne({ email: req.body.email });
        if (existingEmail) {
            logger.error('Email already exists');
            return res.status(400).json({ error: 'Email already exists' });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(req.body.password, salt);

        const newUser = await collection.insertOne({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: hashPassword,
            createdAt: new Date(),
        });

        const payload = {
            user: {
                id: newUser.insertedId.toString(),
            },
        };

        const authtoken = jwt.sign(payload, JWT_SECRET);
        res.json({ authtoken, email: req.body.email });
    } catch (e) {
        logger.error(e);
        return res.status(500).send('Internal server error');
    }
});

// Step 1: Implement the /login Endpoint
router.post('/login', async (req, res) => {
    try {
        // Task 1: Connect to `giftsdb` in MongoDB through `connectToDatabase` in `db.js`.
        const db = await connectToDatabase();

        // Task 2: Access MongoDB `users` collection
        const collection = db.collection("users");

        // Task 3: Check for user credentials in database
        const theUser = await collection.findOne({ email: req.body.email });

        // Task 7: Check if user exists
        if (theUser) {
            // Task 4: Check if the password matches the encrypted password and send appropriate message on mismatch
            let result = await bcryptjs.compare(req.body.password, theUser.password);
            
            if (!result) {
                logger.error('Passwords do not match');
                return res.status(404).json({ error: 'Wrong password' });
            }

            // Task 5: Fetch user details from database
            const userName = theUser.firstName;
            const userEmail = theUser.email;

            // Task 6: Create JWT authentication if passwords match with user._id as payload
            let payload = {
                user: {
                    id: theUser._id.toString(),
                },
            };

            const authtoken = jwt.sign(payload, JWT_SECRET);

            return res.json({ authtoken, userName, userEmail });

        } else {
            // Task 7: Send appropriate message if user not found
            logger.error('User not found');
            return res.status(404).json({ error: 'User not found' });
        }

    } catch (e) {
        logger.error(e);
        return res.status(500).send('Internal server error');
    }
});

module.exports = router;