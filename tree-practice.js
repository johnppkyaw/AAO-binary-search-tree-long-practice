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
  if(rootNode === null) return -1;
  if(rootNode.left === null && rootNode.right === null) return 0;
  let left = 0;
  let right = 0;
  if(rootNode.left) {
    left += getHeight(rootNode.left) + 1;
  }
  if(rootNode.right) {
    right += getHeight(rootNode.right) + 1;
  }
  if(left > right) return left;
  else return right;
}

function balancedTree (rootNode) {
  const currentNode = rootNode;
  const stack = [];
  stack.push(currentNode);

  //Breadth first traversal
  while(stack.length > 0) {
    const poppedNode = stack.pop();

    //check current Node's left's height and right's height
    const leftHeight = getHeight(poppedNode.left);
    const rightHeight = getHeight(poppedNode.right);

    //if difference is more than 1 return false
    if (Math.abs(leftHeight - rightHeight) > 1) return false;

    //Add current Node's children if there are
    if (poppedNode.left !== null) {
      stack.push(poppedNode.left)
    }
    if (poppedNode.right !== null) {
      stack.push(poppedNode.right)
    }
  }
  //if no unbalanced height, return true;
  return true;
}

function countNodes (rootNode) {
  if (rootNode === null) return 0;

  let leftNodes = 0;
  let rightNodes = 0;

  if (rootNode.left) {
    leftNodes = countNodes(rootNode.left);
  }

  if (rootNode.right) {
    rightNodes = countNodes(rootNode.right);
  }

  return 1 + leftNodes + rightNodes;
}

function getParentNode (rootNode, target, parent = null) {
  //Base case - leaves' left and right
  if(rootNode === null) return undefined;

  //if parent(root) is the target, return null;
  if(rootNode.val === target) return parent;

  //If current node's child is the target return the parentNode;
  const leftParent = getParentNode(rootNode.left, target, rootNode);
  if (leftParent) return leftParent;

  //recursively call the function on left and right subtrees and return if either side has the target or not.
  return getParentNode(rootNode.right, target, rootNode);
}
//Time complexity
// Unbalaned tree (skewed binary tree aka linked list) - O(N)
//balanced tree - O(logN)
//Space complexity
// O(H) - height of binary tree

function inOrderPredecessor (rootNode, target) {

  //if  starting node is first in-order node, return null;
  if (target === findMinBST(rootNode)) return null;

  //Get target's parent
  const parentNode = getParentNode(rootNode, target)

  //if parent is null, it means the target is the root; no parents)
  if(parentNode === null) {
    //check root's left Node
    if(rootNode.left !== null) {
      let curr = rootNode.left;

      //check left's right child until number is larger than
      while (curr.right !== null && curr.right.val < target) {
      curr = curr.right;
    }
    return curr.val;
    }
  }
  //if target has left child, return that
  if (parentNode.right.left) return parentNode.right.left.val;

  //else return parent
  return parentNode.val;
}

function deleteNodeBST(rootNode, target) {
        //     8
    //       /   \
    //      3     10
    //    /   \     \
    //   2     5     11
    //  /    /  \     \
    // 1    4    7    12
    //          /      \
    //         6       15
    //                /
    //              14
  // If rootNode is empty
  if(rootNode === null) return undefined;

  // Do a traversal to find the node. Keep track of the parent
  let parentNode = getParentNode(rootNode, target);

  // Undefined if the target cannot be found (parentNode will be undefined)
  if (parentNode === undefined) return undefined;

  // Set target based on parent
  let targetNode = parentNode ? (parentNode.left && parentNode.left.val === target ? parentNode.left : parentNode.right) : rootNode;

  //if target node has no parent
  // Target is the root with no children
  if (targetNode === rootNode && targetNode.left === null && targetNode.right === null) {
    return null;
  }

  //if target node has parent
  // Case 1: Zero children:
  if (targetNode.left === null && targetNode.right === null) {
    // Set the parent that points to it to null
    parentNode.left === targetNode ? parentNode.left = null : parentNode.right = null;
  // Case 2: Two children:
  } else if (targetNode.left && targetNode.right) {
    //  Set the value to its in-order predecessor, then delete the predecessor
    let predecessorVal = inOrderPredecessor(rootNode, targetNode.val);
    deleteNodeBST(rootNode, predecessorVal);
    targetNode.val = predecessorVal;
  } else {
    // Case 3: One child:
    //   Make the parent point to the child
    let child = targetNode.left || targetNode.right;
    parentNode.left === targetNode ? parentNode.left = child : parentNode.right = child;
  }


// //different version
  // let parent = null;
  // let current = rootNode;
//   // Traverse the tree to find the target node and its parent
//   while (current !== null && current.val !== target) {
//     parent = current;
//     if (target < current.val) {
//       current = current.left;
//     } else {
//       current = current.right;
//     }
//   }

//   // If target node is not found, return undefined
//   if (current === null) {
//     return undefined;
//   }

//   // Case 0: Zero children and no parent
//   if (parent === null && current.left === null && current.right === null) {
//     return null;
//   }

//   // Case 1: Zero children
//   if (current.left === null && current.right === null) {
//     if (parent.left === current) {
//       parent.left = null;
//     } else {
//       parent.right = null;
//     }
//   }

//   // Case 2: Two children
//   //        4
//     //    /   \
//     //   2     6
//     //  / \   / \
//     // 1   3 5   7
//   else if (current.left !== null && current.right !== null) {
  //  Replace target node with the left most child on its right side,
    //  or the right most child on its left side.
    //  Then delete the child that it was replaced with.
//     let predecessor = current.left;
//     let predecessorParent = current;

//     while (predecessor.right !== null) {
//       predecessorParent = predecessor;
//       predecessor = predecessor.right;
//     }

//     current.val = predecessor.val;

//     if (predecessorParent.left === predecessor) {
//       predecessorParent.left = predecessor.left;
//     } else {
//       predecessorParent.right = predecessor.left;
//     }
//   }

//   // Case 3: One child
//   else {
//     let child = current.left !== null ? current.left : current.right;

//     if (parent.left === current) {
//       parent.left = child;
//     } else {
//       parent.right = child;
//     }
//   }
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
