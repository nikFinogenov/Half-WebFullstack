module.exports.Avenger = class Avenger {
    constructor({ name, alias, gender, age, powers }) {
        this.name = name;
        this.alias = alias;
        this.gender = gender;
        this.age = age;
        this.powers = powers;

        this.call = () => {
            return [`${this.alias.toUpperCase()}`].concat(this.powers).join('\n');
        }

        this.call.toString = () => {
            return `name: ${this.name}\ngender: ${this.gender}\nage: ${this.age}`;
        }

        Object.defineProperty(this.call, 'name', { 'value': this.constructor.name })
        return this.call;
    }
}
