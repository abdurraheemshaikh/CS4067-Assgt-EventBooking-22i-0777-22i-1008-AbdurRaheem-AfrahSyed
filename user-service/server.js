const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(require('cors')());

const pool = new Pool({
    user: 'postgres',  // Your PostgreSQL username
    host: 'localhost',
    database: 'userdb',  // Your database name
    password: '678678',  // Replace with your actual PostgreSQL password
    port: 5432,
});


app.post('/users', async (req, res) => {
    const { username, email } = req.body;
    const result = await pool.query('INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *', [username, email]);
    res.json(result.rows[0]);
});

// GET /users - Fetch all users from the database
app.get('/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows);  // Send all users as JSON response
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

const axios = require('axios');

app.get('/events', async (req, res) => {
    try {
        // Assuming Event Service is running on port 3002
        const response = await axios.get('http://localhost:3002/events');
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: "Failed to fetch events" });
    }
});

app.post('/book-event', async (req, res) => {
    try {
        const { user_id, event_id, tickets } = req.body;
        
        // Send request to Booking Service
        const response = await axios.post('http://localhost:3003/bookings', { user_id, event_id, tickets });
        
        res.json(response.data);
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ error: "Failed to create booking" });
    }
});



app.listen(3001, () => console.log('User Service running on port 3001'));
