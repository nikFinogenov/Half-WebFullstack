module.exports.EatException = class EatException extends Error {
    constructor(product, meal) {
        super();
        this.message = 'No more junk food, dumpling';
        this.message = `Too many calories in ${product} for ${meal}`;
    }
}
