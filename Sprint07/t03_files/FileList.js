const fs = require('fs');
const path = require('path');

class FileList {
    constructor() {
        this.dir = path.join('./', 'tmp');
        if (!fs.existsSync(this.dir)) {
            fs.mkdirSync(this.dir);
        }
    }

    getList() {
        return fs.readdirSync(this.dir).filter(file => {
            const filePath = path.join(this.dir, file);
            return fs.statSync(filePath).isFile();
        });
    }

    hasFiles() {
        return this.getList().length > 0;
    }

    getHTMLList() {
        const files = this.getList();
        if (files.length === 0) {
            return '';
        }
        const fileLinks = files.map(file => `<li><a href="/select-file?file=${file}">${file}</a></li>`).join('');
        return `<ul>${fileLinks}</ul>`;
    }
}

module.exports = FileList;
