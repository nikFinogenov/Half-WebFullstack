let EatException = require("./eat-exception");

module.exports.Ingestion = class Ingestion {
    constructor(id, meal_type, day_of_diet = 0, products = []) {
        this.id = id;
        this.meal_type = meal_type;
        this.day_of_diet = day_of_diet;
        this.products = products;
    }

    setProduct(product) {
        this.products.push(product);
    }

    getFromFridge(productName) {
        for (let product of this.products) {
            if (product.name === productName) {
                if (product.kcal_per_portion > 200) {
                    throw new EatException(productName, this.meal_type);
                }
            }
        }

    }

    getProductInfo(product) {
        let result = {};
        for (let p of this.products) {
            if (p.name === product) {
                result.kcal = p.kcal_per_portion;
                return result;
            }
        }
    }
}
