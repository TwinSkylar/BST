import Node from "./Node.js";

export default class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  /*
  Purpose:  Build a binary search tree given an array of integers
  Parameters:
    arr: an array of integers
  Return:  The root node of a tree
  */

  buildTree(arr) {
    //sorts the array
    arr.sort((a, b) => {
      return a - b;
    });

    //removes duplicate elements
    arr = [...new Set(arr)];

    //builds and returns a tree
    if (arr.length === 0) return null;
    else return this.build(arr);
  }

  /*
  Purpose:  Build a binary search tree given an array of integers
  Parameters:
    arr: an array of integers
    start: (optional) the starting index of the array to build
    end: (optional) the ending index of the array to build
  Return:  The root node of a tree
  */
  build(arr, start = 0, end = arr.length - 1) {
    if (start > end) return null;
    const middle = parseInt((start + end) / 2);
    const root = new Node(arr[middle]);
    root.left = this.build(arr, start, middle - 1);
    root.right = this.build(arr, middle + 1, end);

    return root;
  }

  /*
  Purpose:  Insert a node into a tree
  Parameters:
    value: the value of the new node
    node: (optional) the root of the tree to insert the new node
  Return:  the new node inserted into the tree
  */
  insert(value, node = this.root) {
    //Recursion base cases
    if (node === null) {
      return new Node(value);
    }
    if (node.value === value) return node;

    //Inserts the node to the left if it is less then the root
    if (value < node.value) node.left = this.insert(value, node.left);
    //Inserts the node to the right if it is greater then the root
    else node.right = this.insert(value, node.right);
    return node;
  }

  /*
  Purpose:  determines the smallest value in a tree
  Parameters:
    node:  the root of the tree to find the smallest value
  Return:  the node with the smallest value
  */
  minValueNode(node) {
    const currentNode = node;
    while (currentNode && currentNode.left != null)
      currentNode = currentNode.left;
    return currentNode;
  }
  /*
  Purpose:  deletes the node from the tree with the given value
  Parameters:
    value:  the value to delete from the tree
    node: (optional) the tree to search the value for

  Return:  the root node of the tree
  */

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

  /*
  Purpose:  find the node from the tree with the given value
  Parameters:
    value:  the value to find from the The height of a treetree
    node: (optional) the tree to search the value for

  Return:  the node of the tree with the given value
  */
  find(value, node = this.root) {
    if (node === null || node.value === value) return node;

    if (node.value < value) {
      return this.find(value, node.right);
    } else {
      return this.find(value, node.left);
    }
  }

  /*
  Purpose:  traverses a tree by level
  Parameters:  
    callback: run a function with each node
    node: (optional) the root to begin the traversal

  Return:  noneThe height of a tree
  */
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

  /*
  Purpose:  in order traversal of a tree
  Parameters:  
    callback: run a function with each node
    node: (optional) the root to begin the traversal
    result:(optional) an array to store values as it traverses the tree
  Return:  An in order array of the tree
  */

  inOrder(callback, node = this.root, result = []) {
    if (node === null) return;

    this.inOrder(callback, node.left, result);
    if (!callback) result.push(node.value);
    else callback(node);
    this.inOrder(callback, node.right, result);
    return result;
  }

  /*
  Purpose:  pre order traversal of a tree
  Parameters:  
    callback: run a function with each node
    node: (optional) the root to begin the traversal
    result:(optional) an array to store values as it traverses the tree
  Return:  An pre order array of the trThe height of a treeee
  */
  preOrder(callback, node = this.root, result = []) {
    if (node === null) return;

    if (!callback) result.push(node.value);
    else callback(node);
    this.preOrder(callback, node.left, result);
    this.preOrder(callback, node.right, result);
    return result;
  }

  /*
  Purpose:  post order traversal of a tree
  Parameters:  
    callback: run a function with each node
    node: (optional) the root to begin the traversal
    result:(optional) an array to store values as it traverses the tree
  Return:  An post order array of the tree
  */
  postOrder(callback, node = this.root, result = []) {
    if (node === null) return;

    this.postOrder(callback, node.left, result);
    this.postOrder(callback, node.right, result);
    if (!callback) result.push(node.value);
    else callback(node);
    return result;
  }

  /*
  Purpose:  determines the height of a  tree
  Parameters:  
    node: (optional) the root to begin calculation
  Return:  The height of a tree
  */

  height(node = this.root) {
    if (node === null) return 0;

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    if (leftHeight > rightHeight) return leftHeight + 1;
    return rightHeight + 1;
  }

  /*
  Purpose:  determines the depth of a node
  Parameters:  
    node: the node to determine the depth of
    distance: (optional) the number of edges to the root
    root: (optional) the root of the tree
  Return:  The depth of the node
  */
  depth(node, distance = -1, root = this.root) {
    if (node === null || root === null) return -1;
    if (root.value === node.value) return 1 + distance;

    distance = this.depth(node, distance, root.right);
    if (distance >= 0) return 1 + distance;
    distance = this.depth(node, distance, root.left);
    if (distance >= 0) return 1 + distance;
    return distance;
  }

  /*
  Purpose:  determines if a tree is balanced
  Parameters:  
    node: (optional) the root to begin calculation
  Return:  boolean
  */
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

  /*
  Purpose:  rebalances a the current tree
  Parameters:  none
  Return:  none
  */

  rebalance() {
    this.root = new Tree(this.inOrder()).root;
  }
 
  /*
  Purpose:  a visual representation of a tree
  Parameters:  
    node: (optional) the root to begin printing
    prefix: the edges of a node
    isLeft: if there is more of the tree to print
  Return:  none
  */

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}
