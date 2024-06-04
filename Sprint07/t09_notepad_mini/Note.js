const fs = require('fs');

module.exports = class Note {
    constructor(name, importance, content) {
        this.name = name;
        this.importance = importance;
        this.write(content);
    }

    write(content) {
        let dir = './tmp';

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }

        const path = `./tmp/${this.name}.json`;
        let today = new Date();

        const dataNote = {
            date: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
            name: this.name,
            importance: this.importance,
            text: content
        };

        try {
            fs.writeFileSync(path, JSON.stringify(dataNote, null, 2), 'utf8');
        }
        catch (err) {
            console.log(err);
        }
    }
}
