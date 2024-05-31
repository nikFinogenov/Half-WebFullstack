const fs = require('fs');
const ejs = require('ejs');
const path = require('path');

function calculateTime() {
    const startDate = new Date(1939, 0, 1);
    const now = new Date();

    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();

    if (days < 0) {
        months--;
        days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    const quantumYears = Math.floor(years / 7.5);
    const quantumMonths = Math.floor(months / 2.4);
    const quantumDays = days;

    return [quantumYears, quantumMonths, quantumDays];
}

function quantumRouter(req, res) {
    const quantumTime = calculateTime();
    const templatePath = path.join(__dirname, 'views', 'quantum.ejs');
    fs.readFile(templatePath, 'utf8', (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        } else {
            const rendered = ejs.render(data, { years: quantumTime[0], months: quantumTime[1], days: quantumTime[2] });
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(rendered);
        }
    });
}

module.exports = quantumRouter;
