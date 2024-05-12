class HardWorker {
    constructor(name, age, salary) {
        this.name = name;
        this._age = age;
        this._salary = salary
    }

    get age() {
        return this._age;
    }

    set age(value) {
        this._age = this.validateAge(value);
    }

    get salary() {
        return this._salary;
    }

    set salary(newSalary) {
        this._salary = this.validateSalary(newSalary);
    }

    validateAge(value) {
        if (value >= 1 && value < 100) {
            return value;
        } else {
            return this._age;
        }
    }

    validateSalary(value) {
        if (value >= 100 && value < 10000) {
            return value;
        } else {
            return this._salary;
        }
    }

    toObject() {
        return {
            name: this.name,
            age: this.age,
            salary: this.salary
        };
    }
}
