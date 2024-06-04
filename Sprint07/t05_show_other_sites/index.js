const express = require('express');
const app = express();
const axios = require('axios');
const jsonParser = express.json();

const host = '127.0.0.1';
const port = 5050;

app.get('/', function (request, response) {
    response.sendFile(__dirname + '/index.html');
});

app.get("/script.js", function (request, response) {
    response.sendFile(__dirname + '/script.js');
});

app.post('/', jsonParser, async function (request, response) {
    const html = await axios.get(request.body.url);
    let content = JSON.stringify(html.data)
    let res = JSON.parse(content);
    let body = res.slice(res.indexOf('body') - 1, res.indexOf('/body') + 6);
    response.json({ html: body, url: request.body.url, });
});

app.listen(process.env.PORT || port, host, () => {
    console.log(`App Started on PORT ${process.env.PORT || port}\n http://${host}:${port}\n Click Ctrl + C for stop server`);
});
