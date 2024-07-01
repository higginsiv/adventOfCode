const EXPLOSION_RESIDUE = 0;
const SPLIT_THRESHOLD = 10;
const { floor, ceil } = Math;

class Node {
    left;
    right;
    parent;
    value;
    constructor(left, right, parent, value) {
        this.left = left;
        this.right = right;
        this.parent = parent;
        this.value = value;
    }
}

export default function solve({ lines, rawData }) {
    lines = lines.map((line) => buildTree(JSON.parse(line)));
    let snailNumber = lines.shift();
    while (lines.length > 0) {
        snailNumber = add(snailNumber, lines.shift());
    }

    const answer = findMagnitude(snailNumber);
    return { value: answer };
}

export function buildTree(snailNumber, parent = null) {
    let left = snailNumber[0];
    let right = snailNumber[1];
    let node = new Node(left, right, parent, null);
    if (isNaN(left)) {
        node.left = buildTree(left, node);
    } else {
        node.left = new Node(null, null, node, left);
    }

    if (isNaN(right)) {
        node.right = buildTree(right, node);
    } else {
        node.right = new Node(null, null, node, right);
    }

    return node;
}

export function add(a, b) {
    let snailNumber = formPair(a, b);
    reduce(snailNumber);
    return snailNumber;
}

function formPair(a, b) {
    const newRoot = new Node(a, b);
    newRoot.left.parent = newRoot;
    newRoot.right.parent = newRoot;
    return newRoot;
}

function reduce(snailNumber) {
    while (true) {
        const explosion = searchAndExplode(snailNumber);
        if (explosion) {
            continue;
        }
        const split = searchAndSplit(snailNumber);
        if (!explosion && !split) {
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

function findFirstNodeToSplit(root) {
    if (root == null) {
        return null;
    }
    if (root.value != null && root.value >= SPLIT_THRESHOLD) {
        return root;
    }
    let node = findFirstNodeToSplit(root.left);
    if (node != null && node.value >= SPLIT_THRESHOLD) {
        return node;
    }
    node = findFirstNodeToSplit(root.right);
    if (node != null && node.value >= SPLIT_THRESHOLD) {
        return node;
    }
    return null;
}

function searchAndExplode(root) {
    let nodeToExplode = findFirstNodeAtDepth(root, 4);
    if (nodeToExplode == null) {
        return false;
    } else {
        explode(nodeToExplode);
        return true;
    }
}

function searchAndSplit(root) {
    let nodeToSplit = findFirstNodeToSplit(root);
    if (nodeToSplit == null) {
        return false;
    } else {
        split(nodeToSplit);
        return true;
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

    let explodedNode = new Node(null, null, parent, EXPLOSION_RESIDUE);
    if (parent.left == node) {
        parent.left = explodedNode;
    } else {
        parent.right = explodedNode;
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

function split(node) {
    const leftValue = floor(node.value / 2);
    const rightValue = ceil(node.value / 2);
    const leftNode = new Node(null, null, node, leftValue);
    const rightNode = new Node(null, null, node, rightValue);
    node.left = leftNode;
    node.right = rightNode;
    node.value = null;
}

export function findMagnitude(snailNumber) {
    if (snailNumber.value != null) {
        return snailNumber.value;
    } else {
        return 3 * findMagnitude(snailNumber.left) + 2 * findMagnitude(snailNumber.right);
    }
}
