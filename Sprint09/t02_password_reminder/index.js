const express = require('express');
const app = express();
var path = require('path');
const port = 5050;
const User = require('./models/user');
var nodemailer = require('nodemailer');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, 'views')));
app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, 'views/reminder.html'));
})

app.post('/user/forgot', async (request, response) => {
    try {
        let user = new User({
            email: request.body.email
        });
        await user.getUserByEmail();
        await sendEmail(user.email, user.password);
        response.status(201).json({ id: user.id, message: 'Email sent successfully' });
    } catch (error) {
        if (error.message.includes("Not found")) {
            response.status(400).json({ error: "Not found user with this email." });
        }
        else {
            response.status(500).json({ error: 'An error occurred while sending email.' });
        }
    }
})

app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
});

async function sendEmail(email, pass) {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "qwerty5.finogenov@gmail.com", 
                pass: "jhwh spwc raga ssrw"
            }
        });

        const mailOptions = {
            from: 'qwerty5.finogenov@gmail.com',
            to: email,
            subject: 'Password Reminder',
            text: `Your password is: ${pass}`
        };

        let info = await transporter.sendMail(mailOptions);

        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Sending failed');
    }
}

