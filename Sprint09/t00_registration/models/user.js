const Model = require('../model');

class User extends Model {
    constructor(attributes = {}) {
        super('users', attributes);
        this.login = attributes.login || '';
        this.password = attributes.password || ''; 
        this.full_name = attributes.full_name || '';
        this.email = attributes.email || '';
        this.id = -1;
    }
    async save() {
        await super.save();
        this.id = this.attributes.id;
    }
}

module.exports = User;
