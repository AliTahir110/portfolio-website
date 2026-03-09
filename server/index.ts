const express = require('express');
const path = require('path');
const cors = require('cors');
const router = express.Router();
const bodyParser = require('body-parser');
const compression = require('compression');

const app = express();
const port = Number(process.env.PORT) || 8080;

app.use(cors());
app.use(compression());

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../public')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Handle GET requests to /api route
app.post('/api/send-email', (req, res) => {
    const { name, company, email, message } = req.body;
    const recipientEmails =
        process.env.FOLIO_TO_EMAILS || 'mohdalitahir0@gmail.com';
    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail =
        process.env.RESEND_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';

    if (!resendApiKey) {
        res.status(500).json({
            message:
                'Email transport is not configured. Set RESEND_API_KEY.',
        });
        return;
    }

    fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            from: fromEmail,
            to: recipientEmails.split(',').map((item) => item.trim()),
            reply_to: email,
            subject: `${name} <${email}> ${
                company ? `from ${company}` : ''
            } submitted a contact form`,
            text: `${message}`,
        }),
    })
        .then(async (response) => {
            if (!response.ok) {
                let details = '';
                try {
                    const errorBody = await response.json();
                    details = errorBody?.message || JSON.stringify(errorBody);
                } catch (_) {
                    details = await response.text();
                }
                throw new Error(details || 'Failed to send email.');
            }
            return response.json();
        })
        .then((data) => {
            console.log({ data });
            res.json({ message: 'success' });
        })
        .catch((e) => {
            console.error(e);
            res.status(500).json({
                message:
                    e && e.message ? e.message : 'Failed to send email.',
            });
        });
});

// listen to app on port 8080
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
