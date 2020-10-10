/**
 * Стэк работает по принципу LIFO
 */
module.exports.Stack = class {
  constructor() {
    this.stack = [];
  }

  push(elem) {
    this.stack.shift(elem);
  }

  pop() {
    return this.stack.pop();
  }

  isEmpty() {
    return this.stack.length === 0;
  }

  [Symbol.iterator] = () => ({
    next: () => ({
      done: this.isEmpty(),
      value: this.pop(),
    }),
  });
};
