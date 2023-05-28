import Node from "./Node.js";
class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(arr) {
    //sorts the array
    arr.sort((a, b) => {
      return a - b;
    });

    //removes duplicate elements
    arr = [...new Set(arr)];

    console.log(arr);
    //builds and returns a tree
    if (arr.length === 0) return null;
    else return this.build(arr);
  }

  build(arr, start = 0, end = arr.length - 1) {
    if (start > end) return null;
    const middle = parseInt((start + end) / 2);
    const root = new Node(arr[middle]);
    root.setLeft(this.build(arr, start, middle - 1));
    root.setRight(this.build(arr, middle + 1, end));

    return root;
  }

  insert(value, node = this.root) {
    //Recursion base cases
    if (node === null) {
      return new Node(value);
    }
    if (node.value === value) return;

    //Recursive functioning
    if (value < node.value) node.left = this.insert(value, node.left);
    else node.right = this.insert(value, node.right);
    return node;
  }

  minValueNode(node) {
    const currentNode = node;
    while (currentNode && currentNode.left != null)
      currentNode = currentNode.left;
    return currentNode;
  }

  delete(value, node = this.root) {
    //Base case, not node with that value exists
    if (node === null) {
      return node;
    }
    if (value < node.value) node.left = this.delete(value, node.left);
    else if (value > node.value) node.right = this.delete(value, node.right);
    else {
      //Node has 1 child
      if (node.left === null) return node.right;
      else if (node.right === null) return node.left;
      //Node has 2 children
      else {
        const tempNode = minValueNode(node.right);
        node.value = tempNode.value;
        node.right = deleteNode(node.right, tempNode.value);
      }
    }
    return node;
  }

  find(value, node = this.root) {
    if (node === null || node.value === value) return node;

    if (node.value < value) {
      return this.find(value, node.right);
    } else {
      return this.find(value, node.left);
    }
  }

  levelOrder(callback, node = this.root) {
    const queue = [];
    if (node === null) return;
    queue.push(node);
    while (queue.length > 0) {
      let current = queue.shift();
      callback(current);
      if (current.left != null) queue.push(current.left);
      if (current.right != null) queue.push(current.right);
    }
  }

  inOrder(callback, node = this.root, result = []) {
    if (node === null) return;

    this.inOrder(callback, node.left, result);
    if (!callback) result.push(node.value);
    else callback(node);
    this.inOrder(callback, node.right, result);
    return result;
  }

  preOrder(callback, node = this.root, result = []) {
    if (node === null) return;

    if (!callback) result.push(node.value);
    else callback(node);
    this.preOrder(callback, node.left, result);
    this.preOrder(callback, node.right, result);
    return result;
  }

  postOrder(callback, node = this.root, result = []) {
    if (node === null) return;

    this.postOrder(callback, node.left, result);
    this.postOrder(callback, node.right, result);
    if (!callback) result.push(node.value);
    else callback(node);
    return result;
  }

  height(node = this.root) {
    if (node === null) return 0;

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    if (leftHeight > rightHeight) return leftHeight + 1;
    return rightHeight + 1;
  }

  depth(node, distance = -1, root = this.root) {
    if (node === null || root === null) return -1;
    if (root.value === node.value) return 1 + distance;

    distance = this.depth(node, distance, root.right);
    if (distance >= 0) return 1 + distance;
    distance = this.depth(node, distance, root.left);
    if (distance >= 0) return 1 + distance;
    return distance;
  }

  isBalanced(node = this.root) {
    if (node === null) return true;

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    if (
      Math.abs(leftHeight - rightHeight) <= 1 &&
      this.isBalanced(node.left) &&
      this.isBalanced(node.right)
    )
      return true;
    return false;
  }

  rebalance(){
    this.root =  new Tree(this.inOrder()).root;
  }
}

const prettyPrint = (node = tree.root, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(arr);
console.log(tree);
prettyPrint();

tree.insert(415);
tree.insert(21);
tree.insert(6);
prettyPrint();

tree.delete(9);
tree.delete(500);
tree.delete(5);
prettyPrint();

console.log("level Order");
tree.levelOrder((elem) => {
  console.log(elem.value);
});

console.log("in Order");
tree.inOrder((elem) => {
  console.log(elem.value);
});
console.log(tree.inOrder());

console.log("pre Order");
tree.preOrder((elem) => {
  console.log(elem.value);
});
console.log(tree.preOrder());

console.log(tree.postOrder());
console.log("post Order");
tree.postOrder((elem) => {
  console.log(elem.value);
});
console.log(tree.postOrder());

console.log(tree.height());
/*
console.log(tree.find(6345));
console.log("depth" + tree.depth(tree.find(6345)));

console.log(tree.find(23));
console.log("depth" + tree.depth(tree.find(23)));

console.log(tree.find(8));
console.log("depth" + tree.depth(tree.find(8)));

console.log(tree.find(415));
console.log("depth" + tree.depth(tree.find(415)));

console.log(tree.find(7));
console.log("depth" + tree.depth(tree.find(7)));
*/
console.log ('is balanced: ' + tree.isBalanced());

const arr2 = [1, 7, 4, 23, 8,12, 16, 133];

const tree2 = new Tree(arr2);
prettyPrint(tree2.root);

console.log ('is Balanced: ' + tree2.isBalanced());

tree2.insert(144);
tree2.insert(155);
console.log ('is Balanced: ' + tree2.isBalanced());
prettyPrint(tree2.root);
console.log ('rebalanced');
tree2.rebalance();
prettyPrint(tree2.root);


