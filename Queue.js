/**
 * Очередь работает по принципу FIFO
 */
module.exports.Queue = class {
  constructor() {
    this.queue = [];
  }

  push(element) {
    this.queue.push(element);
  }

  pop() {
    return this.queue.shift();
  }

  [Symbol.iterator]() {
    return {
      next: () => ({
        done: this.isEmpty(),
        value: this.pop(),
      }),
    };
  }

  isEmpty() {
    return this.queue.length === 0;
  }
};
