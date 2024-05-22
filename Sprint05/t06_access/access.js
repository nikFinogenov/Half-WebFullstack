module.exports = class Access{
    constructor(mark_LXXXV) {
        this.mark_LXXXV = mark_LXXXV;
        if(this.mark_LXXXV === null) {
            return 'null';
        }
        if(this.mark_LXXXV === undefined) {
            return 'undefined';
        }
        else {
            return this.mark_LXXXV;
        }
    }
}
