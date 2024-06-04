const express = require('express');
const path = require('path');
const Note = require('./Note.js')
const NotePad = require('./NotePad.js')

const app = express();
const jsonParser = express.json();

const host = '127.0.0.1';
const port = 5050;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/script.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'script.js'));
});
app.post('/', jsonParser, function(request, response) {
    let files = new NotePad()
    if (files.hasFiles())  {
        response.json({list: files.getRenderList()});
    }
});

app.post('/create', jsonParser, function(request, response) {
    let note = new Note(request.body.name, request.body.importance, request.body.content);
    let list = new NotePad();

    response.json({list: list.getRenderList()})
});

app.post('/getnote', jsonParser, function(request, response) {
    let list = new NotePad();
    response.json({list: list.getJsonList(request.body.filename)});
});

app.post('/delete', jsonParser, function(request, response) {
    let list = new NotePad();
    list.delete(request.body.filename);
    response.json({list: list.getRenderList()})
});

app.listen(process.env.PORT || port, host, () => {
    console.log(`App Started on PORT ${process.env.PORT || port}\n http://${host}:${port}\n Click Ctrl + C for stop server`);
});
  