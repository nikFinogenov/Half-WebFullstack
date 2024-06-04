const express = require("express");
const fs = require("fs");
const request = require("request");
const sharp = require("sharp");

const app = express();
const host = '127.0.0.1';
const port = 5050;

app.use("/", express.static(__dirname + "/"));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
app.get("/script.js", function (request, response) {
  response.sendFile(__dirname + '/script.js');
});
app.get("/style.css", function (request, response) {
  response.sendFile(__dirname + '/style.css');
});

app.get("/upload", async (req, responce) => {
  const path = "./image.png";
  let url = req.query.url;
  request.head(url, async (err, res, body) => {
    request(url)
      .pipe(fs.createWriteStream(path))
      .on("close", await imageCheck);
  });

  function imageCheck() {
    let arr = [
      [
        [1, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      [
        [0, 0, 0],
        [1, 0, 0],
        [0, 0, 0],
      ],
      [
        [0, 0, 0],
        [0, 0, 0],
        [1, 0, 0],
      ],
    ];
    for (let i = 1; i <= 4; i++) {
      let img = sharp("image.png");
      if (i > 1) {
        img = img.recomb(arr[i - 2]);
      }
      img.resize(250, 250).toFile(`image${i}.png`, (err, info) => {
        if (i === 4) {
          responce.json({
            img: [`image1.png`, `image2.png`, `image3.png`, `image4.png`],
          });
        }
      });
    }
  }
});
app.get("/clear", function (req, res) {
  [`image.png`, `image1.png`, `image2.png`, `image3.png`, `image4.png`].forEach(elem => fs.unlinkSync(elem));
});

app.listen(process.env.PORT || port, host, () => {
  console.log(`App Started on PORT ${process.env.PORT || port}\n http://${host}:${port}\n Click Ctrl + C for stop server`);
});