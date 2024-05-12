const houseMixin = {
    wordReplace(oldWord, newWord) {
        this.description = this.description.replace(oldWord, newWord);
    },
    wordInsertAfter(targetWord, wordToInsert) {
        this.description = this.description.replace(targetWord, targetWord + " " + wordToInsert);
    },
    wordDelete(wordToDelete) {
        this.description = this.description.replace(wordToDelete, '');
    },
    wordEncrypt() {
        this.description = this._cryptMethod(this.description);
    },
    wordDecrypt() {
        this.description = this._cryptMethod(this.description);
    },
    _cryptMethod(str) {
        return str.replace(/[a-zA-Z]/g, function (c) {
            let base = c <= 'Z' ? 65 : 97;
            return String.fromCharCode(base + (c.charCodeAt(0) - base + 13) % 26);
        });
    }
};
