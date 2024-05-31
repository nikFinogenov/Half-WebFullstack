let LLData = require("./LLData");

module.exports.LList = class LList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    getFirst() {
        return this.head;
    }
    getLast() {
        return this.tail;
    }
    add(value) {
        let temp = new LLData(value, null);
        if (this.head === null) {
            this.head = temp;
        } else {
            this.tail.next = temp;
        }
        this.tail = temp;
        this.length++;
    }
    addFromArray(arrayOfData) {
        arrayOfData.forEach(element => {
            this.add(element);
        });
    }
    remove(value) {
        if (this.length === 0) return;

        if (this.head.data === value) {
            this.head = this.head.next;
            if (!this.head) {
                this.tail = null;
            }
            this.length--;
            return;
        }

        let current = this.head;
        while (current.next && current.next.data !== value) {
            current = current.next;
        }

        if (current.next) {
            if (this.tail === current.next) {
                this.tail = current;
            }
            current.next = current.next.next;
            this.length--;
        }
    }
    removeAll(value) {
        if (this.length === 0) return;
        while (this.head && this.head.data === value) {
            this.head = this.head.next;
            this.length--;
        }

        if (!this.head) {
            this.tail = null;
            return;
        }

        let current = this.head;
        while (current && current.next) {
            if (current.next.data === value) {
                if (this.tail === current.next) {
                    this.tail = current;
                }
                current.next = current.next.next;
                this.length--;
            } else {
                current = current.next;
            }
        }
    }
    contains(value) {
        let current = this.head;
        while (current) {
            if (current.data === value) return true;
            current = current.next;
        }
        return false;
    }
    clear() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    count() {
        return this.length;
    }
    toString() {
        let result = '';
        let current = this.head;
        while (current) {
            result += current.data + (current.next ? ',' : '');
            current = current.next;
        }
        return result;
    }
    *getIterator() {
        let current = this.head;
        while (current) {
            yield current.data;
            current = current.next;
        }
    }
    filter(callback) {
        const newList = new LList();
        let current = this.head;
        while (current) {
            if (callback(current.data)) {
                newList.add(current.data);
            }
            current = current.next;
        }
        return newList;
    }

    [Symbol.iterator]() {
        return this.getIterator();
    }
}
