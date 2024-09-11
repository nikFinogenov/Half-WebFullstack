const express = require('express');
const app = express();
var path = require('path');
const port = 5050;
const User = require('./models/user');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, 'public/login.html'));
});

app.post('/user/get', async (request, response) => {
    try {
        let user = new User({
            login: request.body.login,
            password: request.body.password
        });
        await user.getUser();
        // console.log(user);
        response.status(201).json({ id: user.id, message: 'Logged in successfully' });
    } catch (error) {
        if (error.message.includes("Does not match")) {
            response.status(400).json({ error: "Login or password doesn't match" });
        }
        else {
            response.status(500).json({ error: 'An error occurred while logining the user.' });
        }
    }
});

app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
});
