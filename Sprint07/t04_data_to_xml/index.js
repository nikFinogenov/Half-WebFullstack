const express = require('express');
const path = require('path');
const app = express();
const ListAvengerQuotes = require('./ListAvengerQuotes');
const AvengerQuote = require('./AvengerQuote');
const Comment = require('./Comment');
const host = '127.0.0.1';
const port = 5050;


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/script.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'script.js'));
});

app.get('/quotes', (req, res) => {
    const listQuotes = new ListAvengerQuotes();
    const quotes = [
        new AvengerQuote(1, 'Iron Man', 'I am Iron Man.', 'https://example.com/ironman.jpg', '2022-01-01', [new Comment('2022-01-02', 'Great quote!')]),
        new AvengerQuote(2, 'Captain America', 'I can do this all day.', 'https://example.com/captainamerica.jpg', '2022-01-02', [new Comment('2022-01-03', 'Inspiring!')]),
        new AvengerQuote(3, 'Thor', 'Bring me Thanos!', 'https://example.com/thor.jpg', '2022-01-03', [new Comment('2022-01-04', 'Epic!')]),
    ];
    quotes.forEach(quote => listQuotes.addQuote(quote));

    res.json({
        toXML: listQuotes.toXML('avenger_quote.xml'), 
        fromXML: listQuotes.fromXML('avenger_quote.xml')
    });
});

app.listen(process.env.PORT || port, host, () => {
    console.log(`App Started on PORT ${process.env.PORT || port}\n http://${host}:${port}\n Click Ctrl + C for stop server`);
});
