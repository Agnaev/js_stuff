/**
 * Стэк работает по принципу LIFO
 */
export default class Stack {
    constructor() {
        this.stack = [];
    }

    push(elem) {
        this.stack.push(elem)
    }

    pop() {
        return this.stack.pop()
    }

    isEmpty() {
        return this.stack.length === 0
    }

    [Symbol.iterator]() {
        return {    
            next: () => ({
                done: this.isEmpty(),
                value: this.pop()
            })
        }
    }
}
