const exp = require('express');
const session = require('express-session');
const app = exp();

const host = '127.0.0.1';
const port = 5050;

app.use(session({ 
        secret: 'somesecret', 
        saveUninitialized: true, 
        resave: true }
));
app.use(exp.json());
app.use(exp.urlencoded({ 
    extended: true 
}));

app.get('/', (req, res) => {
    if (req.session.name) { return res.redirect('main'); }
    res.sendFile(__dirname + '/index.html');
});

app.post('/count', (req, res) => {
    let innerSession = req.session;
    for (let key in req.body) {
        innerSession[key] = req.body[key];
    }
    const powers = req.body.powers;
    const numberOfChecked = Array.isArray(powers) ? powers.length : powers ? 1 : 0;
    innerSession.expirience = numberOfChecked;
    res.redirect('/main');
});

app.get('/main', (req, res) => {
    let innerSession = req.session;
    res.setHeader('Content-Type', 'text/html');
    res.write(`<h1>Session for new</h1>
    <pre>
    name : ${innerSession.name}
    alias : ${innerSession.alias}
    age : ${innerSession.age}
    description : ${innerSession.description}
    photo : ${innerSession.photo}
    expirience : ${innerSession.expirience}
    level : ${innerSession.control}
    purpose : ${innerSession.publicity}</pre>`);
    res.end(`
    <div style="width: 100%; border: 1px solid black; display: flex; align-items: center; padding: 10px;">
        <button style="margin-right: 10px;"><a style=" text-decoration:none; color:black;"href='/forget'>Forget</a></button>
    </div>
    `);
});

app.get('/forget', (req, res) => {
    req.session.destroy((err) => {
        if (err) { 
            return console.log(err); 
        }
        res.redirect('/');
    });
});

app.listen(process.env.PORT || port, host, () => {
    console.log(`App Started on PORT ${process.env.PORT || port}\n http://${host}:${port}\n Click Ctrl + C for stop server`);
});
