const db = require('./db');

class Model {
    constructor(table, attributes = {}) {
        this.table = table;
        this.attributes = attributes;
    }

    async find(id) {
        const [rows] = await db.query(`SELECT * FROM ${this.table} WHERE id = ? LIMIT 1`, [id]);

        if (rows.length > 0) {
            this.attributes = rows[0];
            return this;
        } else {
            throw new Error(`Not found`);
        }
    }

    async delete() {
        if (!this.attributes.id) {
            throw new Error("ID not set. Cannot delete a record without an ID.");
        }

        await db.query(`DELETE FROM ${this.table} WHERE id = ?`, [this.attributes.id]);
        this.attributes = {};
    }

    async save() {
        if (this.attributes.id) {
            const { id, ...fields } = this.attributes;
            await db.query(`UPDATE ${this.table} SET ? WHERE id = ?`, [fields, id]);
        } else {
            try {
                const [res] = await db.query(`INSERT INTO ${this.table} SET ?`, this.attributes);
                this.attributes.id = res.insertId;
            } catch (error) {
                throw new Error('Duplicate');
            }
        }
    }

}

module.exports = Model;
