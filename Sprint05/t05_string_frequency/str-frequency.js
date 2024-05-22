module.exports = class StrFrequency{
    constructor(str) {
        this.str = str;
    }
    letterFrequencies() {
        let frequencies = {};
        const cleanedStr = this.str.replace(/[^a-zA-Z]/g, '').toUpperCase();

        for (let char of cleanedStr) {
            if (frequencies[char]) {
                frequencies[char]++;
            } else {
                frequencies[char] = 1;
            }
        }

        return frequencies;
    }
    wordFrequencies() {
        if(this.str === '')
        {
            return {'':1}
        }
        let frequencies = {};
        const cleanedStr = this.str.replace(/[^a-zA-Z\s]/g, '').toUpperCase();
        const words = cleanedStr.split(/\s+/).filter(word => word.length > 0);

        for (let word of words) {
            if (frequencies[word]) {
                frequencies[word]++;
            } else {
                frequencies[word] = 1;
            }
        }

        return frequencies;
    }
    reverseString() {
        return this.str.split('').reverse().join('');
    }
}
