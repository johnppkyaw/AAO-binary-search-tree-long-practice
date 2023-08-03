const { BinarySearchTree, TreeNode } = require('./binary-search-tree.js');
// Before starting, copy and paste your guided practice work into the copy
// of `binary-search-tree.js` in this folder

// Practice problems on binary trees

function findMinBST (rootNode) {
  let min = rootNode.val;
  let left = rootNode.left;
  while(left) {
    if (left.val < min) {
      min = left.val
    }
    left = left.left;
  }
  return min;
}

function findMaxBST (rootNode) {
  let max = rootNode.val;
  let right = rootNode.right;
  while (right) {
    if (right.val > max) {
      max = right.val
    }
    right = right.right;
  }
  return max;
}

function findMinBT (rootNode) {
  if (rootNode === null) return Infinity;
  const currentNodeVal = rootNode.val;
  const minFromLeft = findMinBT(rootNode.left);
  const minFromRight = findMinBT(rootNode.right);
  return Math.min(currentNodeVal, minFromLeft, minFromRight);
}

function findMaxBT (rootNode) {
  if (rootNode === null) return null;
  const currentNodeVal = rootNode.val;
  const maxFromLeft = findMaxBT(rootNode.left);
  const maxFromRight = findMaxBT(rootNode.right);
  return Math.max(currentNodeVal, maxFromLeft, maxFromRight)
}

function getHeight (rootNode) {
  // Your code here
}

function balancedTree (rootNode) {
  // Your code here
}

function countNodes (rootNode) {
  // Your code here
}

function getParentNode (rootNode, target) {
  // Your code here
}

function inOrderPredecessor (rootNode, target) {
  // Your code here
}

function deleteNodeBST(rootNode, target) {
  // Do a traversal to find the node. Keep track of the parent

  // Undefined if the target cannot be found

  // Set target based on parent

  // Case 0: Zero children and no parent:
  //   return null

  // Case 1: Zero children:
  //   Set the parent that points to it to null

  // Case 2: Two children:
  //  Set the value to its in-order predecessor, then delete the predecessor
  //  Replace target node with the left most child on its right side,
  //  or the right most child on its left side.
  //  Then delete the child that it was replaced with.

  // Case 3: One child:
  //   Make the parent point to the child

}

module.exports = {
    findMinBST,
    findMaxBST,
    findMinBT,
    findMaxBT,
    getHeight,
    countNodes,
    balancedTree,
    getParentNode,
    inOrderPredecessor,
    deleteNodeBST
}
