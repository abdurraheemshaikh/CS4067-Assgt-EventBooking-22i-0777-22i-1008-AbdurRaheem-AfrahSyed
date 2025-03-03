const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/eventservicedb", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const EventSchema = new mongoose.Schema({
  event_id: Number,
  name: String,
  available_tickets: Number,
  price: Number
});

const Event = mongoose.model("events", EventSchema);

// ✅ Get all events
app.get("/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

// ✅ Get a specific event by ID
app.get("/events/:event_id", async (req, res) => {
  try {
    const event = await Event.findOne({ event_id: parseInt(req.params.event_id) });
    if (!event) return res.status(404).json({ error: "Event not found" });
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch event" });
  }
});

// ✅ Decrease available tickets after booking
app.patch("/events/:event_id/book", async (req, res) => {
  try {
    const event = await Event.findOne({ event_id: parseInt(req.params.event_id) });
    if (!event) return res.status(404).json({ error: "Event not found" });

    if (event.available_tickets > 0) {
      event.available_tickets -= 1;
      await event.save();
      res.json({ message: "Ticket booked successfully", available_tickets: event.available_tickets });
    } else {
      res.status(400).json({ error: "No tickets available" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to book ticket" });
  }
});

app.listen(3002, () => console.log("Event Service running on port 3002"));
