const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const File = require('./File');
const FileList = require('./FileList');

const app = express();
const host = '127.0.0.1';
const port = 5050;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    const fileList = new FileList();
    const filesHTML = fileList.getHTMLList();
    const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8').replace('<% filesHTML %>', filesHTML);
    res.send(html);
});

app.post('/create-file', (req, res) => {
    const { filename, content } = req.body;
    const file = new File(filename);
    file.write(content);
    res.redirect('/');
});

app.get('/select-file', (req, res) => {
    const { file } = req.query;
    const selectedFile = new File(file);
    const content = selectedFile.read();
    res.json({ name: file, content });
});

app.delete('/delete-file', (req, res) => {
    const { file } = req.query;
    const selectedFile = new File(file);
    selectedFile.delete();
    res.sendStatus(200);
});

app.listen(process.env.PORT || port, host, () => {
    console.log(`App Started on PORT ${process.env.PORT || port}\n http://${host}:${port}\n Click Ctrl + C for stop server`);
});
