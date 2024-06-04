const express = require('express');
const crypto = require('crypto');
var request = require('request');

const app = express();

const host = '127.0.0.1';
const port = 5050;

const pubKey = 'dc282a98af89db260b4f9011d33b2d53';
const privKey = '6f8a775345b6474610aa12b06babfea374029679';
const now = Date.now();
const ccc = crypto.createHash('md5').update(now + privKey + pubKey).digest('hex');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.get("/script.js", function (request, response) {
    response.sendFile(__dirname + '/script.js');
});
app.get("/style.css", function (request, response) {
    response.sendFile(__dirname + '/style.css');
});

app.get('/show', async function (req, res) {
    request(`http://gateway.marvel.com/v1/public/characters?apikey=${pubKey}&hash=${ccc}&ts=${now}`, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            res.json(JSON.parse(body))
        }
    })
});

app.listen(process.env.PORT || port, host, () => {
    console.log(`App Started on PORT ${process.env.PORT || port}\n http://${host}:${port}\n Click Ctrl + C for stop server`);
});