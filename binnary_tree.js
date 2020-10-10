const { Queue } = require("./Queue");

class Node {
  constructor(value) {
    this.left = null;
    this.right = null;
    this.value = value;
  }
}

class BinnaryTreeIterator {
  constructor(root) {
    if (root instanceof Node === false) {
      throw new TypeError("Argument must be instance of Node.");
    }
    this.root = root;
  }
  recursively_iterate_tree(root = this.root) {
    console.log(root.value);
    if (root.left !== null && root.right !== null) {
      this.recursively_iterate_tree(root.left);
      this.recursively_iterate_tree(root.right);
    }
  }
  iterate_tree() {
    const queue = new Queue();
    let root = this.root;
    queue.push(root);
    while (queue.isEmpty() === false) {
      root = queue.pop();
      if (root === null) {
        break;
      }
      console.log(root.value);
      if (root.left !== null && root.right !== null) {
        queue.push(root.left);
        queue.push(root.right);
      }
    }
  }
  *iterate_yield() {
    const queue = new Queue();
    let root = this.root;
    queue.push(root);
    while (true) {
      root = queue.pop();
      if (!root) {
        break;
      }
      if (root && root.left !== null && root.right !== null) {
        queue.push(root.left);
        queue.push(root.right);
      }
      yield root.value;
    }
  }
  [Symbol.iterator]() {
    let root = this.root;
    const queue = new Queue();
    queue.push(root);
    return {
      next: () => {
        const node = queue.pop();
        if (node && node.left !== null && node.right !== null) {
          queue.push(node.left);
          queue.push(node.right);
        }
        return {
          done: !node,
          value: node?.value,
        };
      },
    };
  }
}

const root = new Node(1);
const left = new Node(2);
const right = new Node(3);

root.left = left;
root.right = right;

left.left = new Node(4);
left.right = new Node(5);

right.left = new Node(6);
right.right = new Node(7);

const tree_iterator = new BinnaryTreeIterator(root);

console.time("rec");
tree_iterator.recursively_iterate_tree();
console.timeEnd("rec");

console.time("iter");
tree_iterator.iterate_tree();
console.timeEnd("iter");

console.time("symbol_iterate");
for (const val of tree_iterator) {
  console.log(val);
}
console.timeEnd("symbol_iterate");

console.time("yield");
for (const val of tree_iterator.iterate_yield()) {
  console.log(val);
}
console.timeEnd("yield");
