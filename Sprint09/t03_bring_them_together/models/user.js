const Model = require('../model');
const db = require('../db');

class User extends Model {
    constructor(attributes = {}) {
        super('users', attributes);
        this.login = attributes.login || '';
        this.password = attributes.password || ''; 
        this.full_name = attributes.full_name || '';
        this.email = attributes.email || '';
        this.status = '';
        this.id = -1;
    }
    clear() {
        this.attributes = {};
        this.id = -1;
        this.login = '';
        this.password = '';
        this.full_name = '';
        this.email = '';
        this.status = '';
    }
    async save() {
        await super.save();
        this.id = this.attributes.id;
    }

    async getUserByEmail() {
        const [rows] = await db.query(`SELECT * FROM users WHERE email = ? LIMIT 1`, [this.email]);
        if (rows.length > 0) {
            this.attributes = rows[0];
            this.password = this.attributes.password;
        } else {
            throw new Error(`Not found`);
        }
    }
    async getUser() {
        const [rows] = await db.query(`SELECT * FROM users WHERE login = ? AND password = ? LIMIT 1`, [this.login, this.password]);
        if (rows.length > 0) {
            this.attributes = rows[0];
            this.full_name = this.attributes.full_name;
            this.email = this.attributes.email;
            this.status = this.attributes.status;
            this.id = this.attributes.id;
        } else {
            throw new Error(`Does not match`);
        }
    }
}

module.exports = User;
