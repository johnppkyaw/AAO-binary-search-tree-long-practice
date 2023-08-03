// Before starting, copy and paste your guided practice work from
// `binary-search-tree.js` into this file

// Do not change this
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {

  constructor() {
    this.root = null;
  }

  insert(val, currentNode=this.root) {
    const newNode = new TreeNode(val);
    if (currentNode === null) {
      this.root = newNode
    } else if (val < currentNode.val) {
      if (currentNode.left !== null) {
        this.insert(val, currentNode.left)
      } else {
        currentNode.left = newNode
      }
    } else if (val > currentNode.val) {
      if (currentNode.right !== null) {
        this.insert(val, currentNode.right)
      } else {
        currentNode.right = newNode
      }
    }
  }

  search(val, currentNode = this.root) {
    if (currentNode === null) return false
    if (currentNode.val === val) return true;
    if (this.search(val, currentNode.left)) return true;
    else return this.search(val, currentNode.right);
  }


  preOrderTraversal(currentNode = this.root) {
    if(currentNode === null) return
    console.log(currentNode.val);
    this.preOrderTraversal(currentNode.left)
    this.preOrderTraversal(currentNode.right)
  }


  inOrderTraversal(currentNode = this.root) {
    if(currentNode === null) return
    this.inOrderTraversal(currentNode.left)
    console.log(currentNode.val)
    this.inOrderTraversal(currentNode.right)
  }


  postOrderTraversal(currentNode = this.root) {
    if(currentNode === null) return
    this.postOrderTraversal(currentNode.left)
    this.postOrderTraversal(currentNode.right)
    console.log(currentNode.val)
  }

    // Breadth First Traversal - Iterative
  breadthFirstTraversal() {
    const queue = [];
    queue.push(this.root);
    while (queue.length !== 0) {
      const firstElement = queue.shift();
      console.log(firstElement.val);
      if (firstElement.left !== null) {
        queue.push(firstElement.left)
      }
      if (firstElement.right !== null) {
        queue.push(firstElement.right)
      }
    }
  }

  // Depth First Traversal - Iterative
  depthFirstTraversal() {
   const stack = [];
   const currentNode = this.root;
   stack.push(currentNode);
   while (stack.length > 0) {
    const currentNode = stack.pop();
    console.log(currentNode.val);
    if(currentNode.left !== null) {
      stack.push(currentNode.left)
    }
    if(currentNode.right !== null) {
      stack.push(currentNode.right)
    }
   }

}
}

module.exports = { BinarySearchTree, TreeNode };
