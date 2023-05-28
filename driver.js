/*Driver script for the binary search tree taken from The Odin Project*/

/*Full instructions below
 1. Create a binary search tree from an array of random numbers < 100.
 2. Confirm that the tree is balanced by calling isBalanced
 3. Print out all elements in level, pre, post, and in order
 4. Unbalance the tree by adding several numbers > 100
 5. Confirm that the tree is unbalanced by calling isBalanced
 6. Balance the tree by calling rebalance
 7. Confirm that the tree is balanced by calling isBalanced
 8. Print out all elements in level, pre, post, and in order
*/

import Tree from "./Tree.js";

/*returns an array of 100 numbers*/
function generateArray(size = 100, upperBound = 10000) {
  const arr = [];
  for (let i = 0; i < size; i++)
    arr.push(Math.floor(Math.random() * upperBound));
  return arr;
}

function main() {
  // Create a binary search tree from an array of random numbers < 100.
  const tree = new Tree(generateArray(6));

  //Confirm that the tree is balanced by calling isBalanced
  if (!tree.isBalanced()) console.error("The tree is not balanced!");

  // Print out all elements in level, pre, post, and in order
  console.log(`In-order:  ${tree.inOrder()}`);
  console.log(`pre-order:  ${tree.preOrder()}`);
  console.log(`post-order:  ${tree.postOrder()}`);

  // Unbalance the tree by adding several numbers > 100
  const arr = generateArray(6);
  for (const value in arr) tree.insert(value);
  // Confirm that the tree is unbalanced by calling isBalanced

  tree.prettyPrint();
  console.log(`Is the tree balanced?  ${tree.isBalanced()}`);

  // Balance the tree by calling rebalance
  tree.rebalance();
  tree.prettyPrint();
  console.log(`Is the tree balanced?  ${tree.isBalanced()}`);

  // Print out all elements in level, pre, post, and in order
  console.log(`In-order:  ${tree.inOrder()}`);
  console.log(`pre-order:  ${tree.preOrder()}`);
  console.log(`post-order:  ${tree.postOrder()}`);
}

main();
