const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const app = express();
const port = 5050;
const host = '127.0.0.1'

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

app.use(express.urlencoded({ extended: true }));

async function generateHash(password, salt) {
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

async function comparePassword(enteredPassword, hashedPassword) {
  const match = await bcrypt.compare(enteredPassword, hashedPassword);
  return match;
}

app.post('/', async (req, res) => {
  const password = req.body.password;
  const salt = parseInt(req.body.salt);
  const hash = await generateHash(password, salt);
  req.session.hash = hash;
  res.send(`
    <h1>Password</h1>
    <p>Password saved at session.</p>
    <p>Hash: ${hash}</p>
    <form action="/check" method="POST">
        <p>Try to guess: <input type="text" name="text"></p>
        <button type="submit">Check password</button>
    </form>
    <button onclick="location.href='/logout'">Clear</button>
  `);
});

app.post('/check', async (req, res) => {
  const guessedPassword = req.body.text;
  const hashedPassword = req.session.hash;
  const match = await comparePassword(guessedPassword, hashedPassword);
  if (match) {
    res.send(`
    <h1>Password</h1>
    <h2 style="color:green">Hacked!</h2>
    <form action="/" method="POST" >
    <p>Password not saved at session.</p>
    <p>Password for saving to session<input type="password" name="password" placeholder="Password to session"></p>
    <p>Salt for saving to session<input type="number" name="number" placeholder="Salt to session"></p>
    <button type="submit">Save</button>
    </form>
    `);
  } else {
    res.send(`
    <h1>Password</h1>
    <h2 style="color:red">Access denied!</h2>
    <form action="/check" method="POST" >
    <p>Password saved at session.</p>
    <p>Hash is ${hashedPassword}</p>
    <p>Try to guess:<input type="text" name="text" placeholder="Password to session"><button type="submit">Check password</button></p>
    </form>
    <button onclick="location.href='/logout'">Clear</button>
    `);
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

app.get('/', (req, res) => {
  res.send(`
  <h1>Password</h1>
  <form action="/" method="POST" >
  <p>Password not saved at session.</p>
  <p>Password for saving to session<input type="password" name="password" placeholder="Password to session"></p>
  <p>Salt for saving to session<input type="number" name="number" placeholder="Salt to session"></p>
  <button type="submit">Save</button>
  </form>
  `);
});

app.listen(port, () => {
    console.log(`App Started on PORT ${process.env.PORT || port}\n http://${host}:${port}\n Click Ctrl + C for stop server`);
});
