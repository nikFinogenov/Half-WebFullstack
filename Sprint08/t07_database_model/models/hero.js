const Model = require('../model');

class Hero extends Model {
    constructor(attributes = {}) {
        super('heroes', attributes);
        this.name = attributes.name || '';
        this.description = attributes.description || ''; 
        this.classRole = attributes.class_role || '';
        this.raceId = attributes.race_id || '';
    }

    changeDescription(newDescription) {
        this.description = newDescription;
    }

    changeClassRole(newClassRole) {
        this.classRole = newClassRole;
    }

    getFullInfo() {
        return {
            id: this.attributes.id,
            name: this.name,
            description: this.description,
            classRole: this.classRole,
            raceId: this.raceId
        };
    }

    validate() {
        if (!this.name) {
            throw new Error("Hero must have a name.");
        }
        if (!this.classRole) {
            throw new Error("Hero must have a class role.");
        }
        if (!this.raceId) {
            throw new Error("Hero must have a race ID.");
        }
    }

    async save() {
        this.validate();
        await super.save();
    }
}

module.exports = Hero;
