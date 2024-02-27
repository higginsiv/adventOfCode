module.exports = {solve: solve};
const EXPLOSION_RESIDUE = 0;
class Node {
    left;
    right;
    parent;
    value;
    constructor(left, right) {
        this.left = left;
        this.right = right;
    }
}

function solve({lines, rawData}) {
    lines = lines.map(line => buildTree(JSON.parse(line)));
    lines.forEach(line => {
        printTree(line);
        explode(findFirstNodeAtDepth(line,4));
        printTree(line);
        console.log('-------------------');
    });

    const answer = null;
    return {value: answer};
}

// TODO clean up
function buildTree(snailNumber, parent = null) {
    let left = snailNumber[0];
    let right = snailNumber[1];
    let node = new Node(left, right);
    node.parent = parent;
    if (isNaN(left)) {
        node.left = buildTree(left, node);
    } else {
        node.left = new Node();
        node.left.parent = node;
        node.left.value = left;
    }
    if (isNaN(right)) {
        node.right = buildTree(right, node);
    } else {
        node.right = new Node();
        node.right.parent = node;
        node.right.value = right;
    }

    return node;
}

function printTree(node) {
    function buildTreeString(node) {
        let treeString = "";
        if (node == null) {
            return;
        }

        if (node.value != null) {
            treeString += node.value;
            return treeString;
        }
        if (node.value != null) {
            treeString += node.value;
        } else {
            treeString += "(";
            treeString += buildTreeString(node.left);
            treeString += ")";
        }
    
        if (node.value != null) {
            treeString += (',' + node.value);
        } else {
            treeString += "(";
            treeString += buildTreeString(node.right);
            treeString += ")";
        }
        return treeString;
    }

    console.log(buildTreeString(node));
}


function add(a, b) {
    const newRoot = new Node(a, b);
    newRoot.left.parent = newRoot;
    newRoot.right.parent = newRoot;
    return newRoot;
}

function formPair(a, b) {
    return [a, b]
}

function reduce(snailNumber) {
    while (true) {
        searchAndExplode(snailNumber, 0);
        split(snailNumber);
        // TODO replace this with actual exit condition
        if (true) {
            break;
        }
    }

}

function findFirstNodeAtDepth(root, depth) {
    if (root == null || root.value != null) {
        return null;
    }
    if (depth == 0) {
        return root;
    }
    let node = findFirstNodeAtDepth(root.left, depth - 1);
    if (node != null) {
        return node;
    }
    node = findFirstNodeAtDepth(root.right, depth - 1);
    return node;
}

function searchAndExplode(root, depth = 0) {
    let nodeToExplode = findFirstNodeAtDepth(root, 4);
    if (nodeToExplode == null) {
        return;
    }

}

function explode(node) {
    let parent = node.parent;
    const numberToAddLeft = node.left.value;
    const numberToAddRight = node.right.value;

    let nextLeft = findNextLeft(node);
    if (nextLeft != null) {
        nextLeft.value += numberToAddLeft;
    }

    let nextRight = findNextRight(node);
    if (nextRight != null) {
        nextRight.value += numberToAddRight;
    }
    // TODO make this part of the constructor or something
    if (parent.left == node) {
        parent.left = new Node();
        parent.left.parent = parent;
        parent.left.value = EXPLOSION_RESIDUE;
    } else {
        parent.right = new Node();
        parent.right.parent = parent;
        parent.right.value = EXPLOSION_RESIDUE;
    }
}

function findNextLeft(node) {
    let searchingNode = node;
    let lastNode = null;
    while (searchingNode.parent != null) {
        lastNode = searchingNode;
        searchingNode = searchingNode.parent;
        if (searchingNode.left != lastNode) {
            break;
        }
    }
    if (searchingNode.parent == null && searchingNode.left == lastNode) {
        return null;
    } else {
        searchingNode = searchingNode.left;
        if (searchingNode.value != null) {
            return searchingNode;
        }
        while (searchingNode.right != null) {
            searchingNode = searchingNode.right;
        }
        return searchingNode;
    }
}

function findNextRight(node) {
    let searchingNode = node;
    let lastNode = null;
    while (searchingNode.parent != null) {
        lastNode = searchingNode;
        searchingNode = searchingNode.parent;
        if (searchingNode.right != lastNode) {
            break;
        }
    }
    
    if (searchingNode.parent == null && searchingNode.right == lastNode) {
        return null;
    } else {
        searchingNode = searchingNode.right;
        if (searchingNode.value != null) {
            return searchingNode;
        }
        while (searchingNode.left != null) {
            searchingNode = searchingNode.left;
        }
        return searchingNode;
    }
}

function split() {

}