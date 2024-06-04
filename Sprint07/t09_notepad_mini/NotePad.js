const fs = require('fs');

module.exports = class NotePad {
    hasFiles() {
        return fs.existsSync('./tmp');
    }

    getRenderList() {
        let arr = fs.readdirSync('./tmp');
        let tag = '<ul>';

        for (let i = 0; i < arr.length; i++) {
            const data = fs.readFileSync(`./tmp/${arr[i]}`);
            let jsonData = JSON.parse(data);
            tag += `<li><a onclick="renderNote(event)" href>${jsonData.date} > ${jsonData.name}</a> <a href name="${jsonData.name}" onclick="deleteFile(event)">DELETE</a></li>`;
        }
        tag += '</ul>';
        return tag;
    }

    getJsonList(name) {
        const data = fs.readFileSync(`./tmp/${name}.json`);
        let jsonData = JSON.parse(data);
        let keys = Object.keys(jsonData);
        let val = Object.values(jsonData);

        let tag = '<ul>';
        for (let i = 0; i < keys.length; i++) {

            tag += `<li>${keys[i]}: <span style="font-weight: bold">${val[i]}</span></li>`;
        }
        tag += '</ul>';
        return tag;
    }

    delete(name) {
        if (fs.existsSync(`tmp/${name}.json`)) {
            fs.unlinkSync(`tmp/${name}.json`);
        }
    }
}
