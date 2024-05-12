class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    add(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
    }

    remove(value) {
        if (!this.head) {
            return false;
        }
        if (this.head.data === value) {
            this.head = this.head.next;
            return true;
        }
        let current = this.head;
        while (current.next) {
            if (current.next.data === value) {
                current.next = current.next.next;
                return true;
            }
            current = current.next;
        }
        return false;
    }

    contains(value) {
        let current = this.head;
        while (current) {
            if (current.data === value) {
                return true;
            }
            current = current.next;
        }
        return false;
    }

    *[Symbol.iterator]() {
        let current = this.head;
        while (current) {
            yield current.data;
            current = current.next;
        }
    }

    clear() {
        this.head = null;
    }

    count() {
        let count = 0;
        let current = this.head;
        while (current) {
            count++;
            current = current.next;
        }
        return count;
    }

    log() {
        let result = '';
        let current = this.head;
        while (current) {
            result += current.data;
            if (current.next) {
                result += ', ';
            }
            current = current.next;
        }
        console.log(result);
    }
}

function createLinkedList(arr) {
    const ll = new LinkedList();
    for (const item of arr) {
        ll.add(item);
    }
    return ll;
}
