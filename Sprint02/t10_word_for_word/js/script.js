function addWords(obj, wrds) {
    let allWords = (obj.words != "") ? obj.words.replace(/\s+/g, " ").trim().split(" ") : [];

    let addWords = wrds.replace(/\s+/g, " ").trim().split(" ");
    let filterWords = [];

    for (let str of allWords) {
        if (!filterWords.includes(str)) {
            filterWords.push(str);
        }
    }

    for (const key in addWords) {
        let i = filterWords.indexOf(addWords[key]);

        if (i != 0) {
            filterWords.push(addWords[key]);
        } else {
            filterWords.splice(i, 1, addWords[key]);
        }
    }

    obj.words = filterWords.join(" ");
}

function removeWords(obj, wrds) {
    let allWords = (obj.words != "") ? obj.words.replace(/\s+/g, " ").trim().split(" ") : [];
    let remove = wrds.replace(/\s+/g, " ").trim().split(" ");
    let filterWords = [];


    for (let str of allWords) {
        if (!filterWords.includes(str)) {
            filterWords.push(str);
        }
    }

    for (const key in remove) {
        let i = filterWords.indexOf(remove[key]);
        filterWords.splice(i, 1);
    }

    obj.words = filterWords.join(" ");
}

function changeWords(obj, oldWrds, newWrds) {
    removeWords(obj, oldWrds);
    addWords(obj, newWrds);
}
