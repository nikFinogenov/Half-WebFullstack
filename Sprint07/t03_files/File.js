const fs = require('fs');
const path = require('path');

class File {
    constructor(filename) {
        this.filename = path.join('./tmp', filename);
        this.dir = path.join('./', 'tmp');
        if (!fs.existsSync(this.dir)) {
            fs.mkdirSync(this.dir);
        }
    }

    write(content) {
        if (!fs.existsSync(this.filename)) {
            fs.writeFileSync(this.filename, content);
        } else {
            fs.appendFileSync(this.filename, content);
        }
    }

    read() {
        return fs.existsSync(this.filename) ? fs.readFileSync(this.filename, 'utf8') : null;
    }

    delete() {
        if (fs.existsSync(this.filename)) {
            fs.unlinkSync(this.filename);
        }
    }
}

module.exports = File;
