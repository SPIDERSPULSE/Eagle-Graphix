require('dotenv').config();
const express = require('express');
const { google } = require('googleapis');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Initialize Google Calendar API
const auth = new google.auth.GoogleAuth({
    credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/calendar']
});

const calendar = google.calendar({ version: 'v3', auth });

// Appointment endpoint
app.post('/submit-appointment', async (req, res) => {
    try {
        const { name, email, phone, notes, date, time } = req.body;
        
        // Combine date and time into DateTime object
        const startDateTime = new Date(`${date}T${time}`);
        const endDateTime = new Date(startDateTime.getTime() + 30 * 60000); // 30 min appointment
        
        // Create event
        const event = {
            summary: `Consultation with ${name}`,
            description: `Client: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nNotes: ${notes || 'None'}`,
            start: {
                dateTime: startDateTime.toISOString(),
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            },
            end: {
                dateTime: endDateTime.toISOString(),
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            },
            attendees: [
                { email: process.env.YOUR_CALENDAR_EMAIL }, // Your calendar
                { email: email } // Client's email
            ],
            reminders: {
                useDefault: false,
                overrides: [
                    { method: 'email', minutes: 24 * 60 }, // 1 day before
                    { method: 'popup', minutes: 30 }, // 30 min before
                ],
            },
        };
        
        // Insert event
        const response = await calendar.events.insert({
            calendarId: 'primary',
            resource: event,
            sendUpdates: 'all',
        });
        
        res.json({
            success: true,
            eventLink: response.data.htmlLink,
            eventId: response.data.id
        });
        
    } catch (error) {
        console.error('Error creating calendar event:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to schedule appointment'
        });
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));