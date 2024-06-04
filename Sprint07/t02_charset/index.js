const express = require('express');
const session = require('express-session');
const iconv = require('iconv-lite');

const app = express();
const host = '127.0.0.1';
const port = 5050;

app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/submit', (req, res) => {
    const inputString = req.body.inputString;
    const options = Array.isArray(req.body.options) ? req.body.options : [req.body.options];

    let utfString, isoString, winString;

    if (options.includes('utf')) {
        utfString = inputString;
    }
    if (options.includes('iso-8859-1')) {
        isoString = iconv.encode(inputString, 'iso-8859-1').toString('binary');
    }
    if (options.includes('cp1252')) {
        winString = iconv.encode(inputString, 'win1252').toString('binary');
    }

    req.session.inputString = inputString;
    req.session.utfString = utfString;
    req.session.isoString = isoString;
    req.session.winString = winString;

    res.redirect('/result');
});

app.get('/result', (req, res) => {
    const inputString = req.session.inputString;
    const utfString = req.session.utfString;
    const isoString = req.session.isoString;
    const winString = req.session.winString;

    let resultPage = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Charset Conversion Result</title>
    </head>
    <body>
    <h1>Charset</h1>
    <div>
        <form name="options" action="/submit" method="POST">
            <label for="inputString">Change charset:</label>
            <input id="inputString" type="text" name="inputString" placeholder="input string" value="${inputString}"><br><br>

            <label for="choose">Select charset or several charsets:</label>
            <select multiple id="choose" name="options">
                <option value="utf" selected>UTF-8</option>
                <option value="iso-8859-1">ISO-8859-1</option>
                <option value="cp1252">Windows-1252</option>
            </select>

            <input type="submit" value="Change charset" />
            <input type="button" id="clear" value="Clear" onclick="window.location='/clear'">
        </form>
    </div>
    <div class="hidden" style="display: none">
        <label for="input">Input string: </label>
        <textarea name="input" id="input"></textarea>
    </div>
    <div class="hidden" style="display: none">
        <label for="utf">UTF-8: </label>
        <textarea name="utf" id="utf"></textarea>
    </div>
    <div class="hidden" style="display: none">
        <label for="iso">ISO-8859-1: </label>
        <textarea name="iso" id="iso"></textarea>
    </div>
    <div class="hidden" style="display: none">
        <label for="win">Windows-1252: </label>
        <textarea name="win" id="win"></textarea>
    </div>
    `;

    if (utfString !== undefined) {
        resultPage += `
        <div>
            <label for="utf">UTF-8: </label>
            <textarea name="utf" id="utf">${utfString}</textarea>
        </div>
        `;
    }

    if (isoString !== undefined) {
        resultPage += `
        <div>
            <label for="iso">ISO-8859-1: </label>
            <textarea name="iso" id="iso">${isoString}</textarea>
        </div>
        `;
    }

    if (winString !== undefined) {
        resultPage += `
        <div>
            <label for="win">Windows-1252: </label>
            <textarea name="win" id="win">${winString}</textarea>
        </div>
        `;
    }

    resultPage += `
    </body>
    </html>
    `;

    res.send(resultPage);
});

app.get('/clear', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.listen(process.env.PORT || port, host, () => {
    console.log(`App Started on PORT ${process.env.PORT || port}\n http://${host}:${port}\n Click Ctrl + C for stop server`);
});
