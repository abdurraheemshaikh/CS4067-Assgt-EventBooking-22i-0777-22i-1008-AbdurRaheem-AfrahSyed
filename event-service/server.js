const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(require('cors')());

mongoose.connect('mongodb://localhost:27017/event_db', { useNewUrlParser: true, useUnifiedTopology: true });

const eventSchema = new mongoose.Schema({
    title: String,
    date: String,
    availableTickets: Number,
});

const Event = mongoose.model('Event', eventSchema);

app.get('/events', async (req, res) => {
    const events = await Event.find();
    res.json(events);
});

app.listen(3002, () => console.log('Event Service running on port 3002'));
