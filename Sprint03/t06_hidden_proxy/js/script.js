const validator = {
    get: function (target, prop) {
        console.log(`Trying to access the property '${prop}'...`);
        if (target.hasOwnProperty(prop))
            return target[prop];
        else
            return false;
    },
    set: function (target, prop, value) {
        if (prop === 'age') {
            if (typeof value !== 'number') {
                throw new TypeError("The age is not an integer");
            }
            if (value < 0 || value > 200) {
                throw new RangeError("The age is invalid");
            }
        }
        if (prop === 'gender') {
            if (value !== 'male' && value !== 'female')
                throw new TypeError("The gender is invalid");
        }
        console.log(`Setting value '${value}' to '${prop}'`);
        target[prop] = value;
        return true;
    }
};
