module.exports.Avenger = class Avenger {
    constructor(name, alias, gender, age, powers, hp) {
        this.call = () => {
            this.powers = powers;
            this.alias = alias;
            return [`${this.alias.toUpperCase()}`].concat(this.powers).join('\n');
        }

        this.call.toString = () => {
            this.name = name;
            this.gender = gender;
            this.age = age;
            return `name: ${this.name}\ngender: ${this.gender}\nage: ${this.age}`;
        }

        Object.defineProperty(this.call, 'name', { 'value': this.constructor.name })
        this.call.hp = hp;
        return this.call;
    }
}
