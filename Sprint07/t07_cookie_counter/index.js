const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const host = '127.0.0.1';
const port = 5050;

app.use(cookieParser());

let pageLoadTimes = [];

app.use((req, res, next) => {
    const now = Date.now();
    const oneMinuteAgo = now - 60000;
    pageLoadTimes = pageLoadTimes.filter(time => time > oneMinuteAgo);

    pageLoadTimes.push(now);

    next();
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/script.js', (req, res) => {
    res.sendFile(__dirname + '/script.js');
});

app.get('/count', (req, res) => {
    res.json({ count: pageLoadTimes.length });
});

app.listen(process.env.PORT || port, host, () => {
    console.log(`App Started on PORT ${process.env.PORT || port}\n http://${host}:${port}\n Click Ctrl + C for stop server`);
});
