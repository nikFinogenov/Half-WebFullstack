const express = require('express');
const app = express();
var path = require('path');
const port = 5050;
const User = require('./models/user');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, 'public/register.html'));
});

app.post('/user/add', async (request, response) => {
try {
    let user = new User({
        login: request.body.login, 
        password: request.body.password, 
        full_name: request.body.fullName, 
        email: request.body.email
    });
    await user.save();
    response.status(201).json({ id: user.id, message: 'User created successfully' });
} catch (error) {
    if(error.message.includes("Duplicate")) {
        response.status(400).json({ error: 'A user with the same login or email already exists.' });
    }
    else{
        response.status(500).json({ error: 'An error occurred while registering the user.' });
    }
}
});

app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
});
