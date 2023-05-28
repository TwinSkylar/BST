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
function generateArray(size = 100, upperBound = 500) {
  const arr = [];
  for (let i = 0; i < size; i++)
    arr.push(Math.floor(Math.random() * upperBound + 1));
  return arr;
}

function main() {
  // Create a binary search tree from an array of random numbers < 100.
  const tree = new Tree(generateArray());

  //Confirm that the tree is balanced by calling isBalanced
  if (!tree.isBalanced()) console.error("The tree is not balanced!");

  // Print out all elements in level, pre, post, and in order
  console.log(`In-order:  ${tree.inOrder()}`);
  console.log(`pre-order:  ${tree.preOrder()}`);
  console.log(`post-order:  ${tree.postOrder()}`);

  // Unbalance the tree by adding several numbers > 100
  const arr = generateArray();
  for (let i = 0; i < arr.length; i++) tree.insert(arr[i]);
  // Confirm that the tree is unbalanced by calling isBalanced

  console.log(`Inserted 100 more nodes.  Is the tree still balanced?  ${tree.isBalanced()}`);

  // Balance the tree by calling rebalance
  tree.rebalance();
  console.log(`Rebalancing... Is the tree balanced?  ${tree.isBalanced()}`);

  // Print out all elements in level, pre, post, and in order
  console.log(`In-order:  ${tree.inOrder()}`);
  console.log(`pre-order:  ${tree.preOrder()}`);
  console.log(`post-order:  ${tree.postOrder()}`);
}

main();
