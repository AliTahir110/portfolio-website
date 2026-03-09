const express = require('express');
const path = require('path');
const cors = require('cors');
const router = express.Router();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
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
    const senderEmail = process.env.FOLIO_EMAIL;
    const recipientEmails =
        process.env.FOLIO_TO_EMAILS || 'mohdalitahir0@gmail.com';

    if (!senderEmail || !process.env.FOLIO_PASSWORD) {
        res.status(500).json({
            message:
                'Email transport is not configured. Set FOLIO_EMAIL and FOLIO_PASSWORD.',
        });
        return;
    }

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: process.env.FOLIO_EMAIL,
            pass: process.env.FOLIO_PASSWORD,
        },
    });

    transporter
        .verify()
        .then(() => {
            transporter
                .sendMail({
                    from: `"${name}" <${senderEmail}>`,
                    to: recipientEmails,
                    subject: `${name} <${email}> ${
                        company ? `from ${company}` : ''
                    } submitted a contact form`,
                    text: `${message}`,
                })
                .then((info) => {
                    console.log({ info });
                    res.json({ message: 'success' });
                })
                .catch((e) => {
                    console.error(e);
                    res.status(500).json({
                        message:
                            e && e.message
                                ? e.message
                                : 'Failed to send email.',
                    });
                });
        })
        .catch((e) => {
            console.error(e);
            res.status(500).json({
                message:
                    e && e.message
                        ? e.message
                        : 'Unable to verify email transport.',
            });
        });
});

// listen to app on port 8080
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
