class Node {
    constructor(initKey, initData, initParent, initLeft, initRight) {
        this.key = initKey;
        this.data = initData;
        this.parent = initParent;
        this.left = initLeft;
        this.right = initRight;
    }
};

export default class BinarySearchTree {
    constructor(initKeyLength) {
        this.root = null;
        this.size = 0;
        this.keyLength = initKeyLength;
    }

    // @todo - YOU MUST UPDATE THIS METHOD SO A KEY ONLY HAS LOWERCASE LETTERS, NO NUMBERS
    generateKey() {
        let key = "";
        for (let i = 0; i < this.keyLength; i++) {
            let randomNum = Math.floor(Math.random() * 36);
            let randomChar;
            if (randomNum < 10) {
                randomNum += 48;
                randomChar = String.fromCharCode(randomNum);
            }
            else {
                randomNum += 55;
                randomChar = String.fromCharCode(randomNum);
            }
            key += randomChar;
        }
        return key;
    }

    // @todo - YOU MUST DEFINE THIS METHOD
    putValue(key, value) {
        // if tree is empty
        if(this.root === null){
            this.root = new Node(key, value, null, null, null);
            this.size++;
            return;
        }

        // if tree is not empty
        let cursor = this.root;
        while(1){
            if(key === cursor.key){
                // replace data, then return
                cursor.data = value;
                return;
            }else if(key < cursor.key){
                if(cursor.left === null){
                    // insert node, then return
                    let temp = new Node(key, data, null, null, null);
                    cursor.left = temp;
                    this.size++;
                    return;
                }else{
                    // move cursor to left child
                    cursor = cursor.left;
                }
            }else if(key > cursor.key){
                if(cursor.right === null){
                    // insert node, then return
                    let temp = new Node(key, data, null, null, null);
                    cursor.right = temp;
                    this.size++;
                    return;
                }else{
                    // move cursor to right child
                    cursor = cursor.right;
                }
            }
        }
    }

    // @todo - YOU MUST DEFINE THIS METHOD
    getValue(key) {
        let cursor = this.root;
        while(cursor !== null){
            if(key < cursor.key){
                // move to left child
                cursor = cursor.left;
            }else if(key > cursor.key){
                // move to right child
                cursor = cursor.right;
            }else{
                return cursor.data;
            }
        }
        return null;
    }

    findPointer(key){
        let cursor = this.root;
        while(key !== cursor.key){
            if(key < cursor.key){
                cursor = cursor.left;
            }else if(key > cursor.key){
                cursor = cursor.right;
            }
        }

        return cursor;
    }

    findParentPointer(node, key){
        // root doesn't have parent node
        if(this.root === node){
            return null;
        }

        // find parent node for a non-root node
        let cursor = this.root;
        while(cursor.left !== node && cursor.right !== node){
            if(key < cursor.key){
                cursor = cursor.left;
            }else if(key > cursor.key){
                cursor = cursor.right;
            }
        }

        return cursor;
    }

    findLargest(root){
        let cursor = root;
        while(cursor.right !== null){
            cursor = cursor.right;
        }
        return cursor;
    }

    findSmallest(root){
        let cursor = root;
        while(cursor.left !== null){
            cursor = cursor.left;
        }
        return cursor;
    }

    // @todo - YOU MUST DEFINE THIS METHOD
    removeValue(key) {
        let deletedNode = this.findPointer(key);

        // if there is no node to be deleted, return
        if(deletedNode === null){
            return;
        }

        // if there is node to be deleted
        // case 1: there is a left child (there is a left child, or there are two children)
        if(deletedNode.left !== null){
            let largest = this.findLargest(deletedNode.left);
            let tempRight = deletedNode.right;
            let tempLeft = deletedNode.left;
            if(tempLeft === largest){
                largest.right = tempRight;
            }else{
                let parent = this.findParentPointer(largest, largest.key);
                parent.right = largest.left;
                largest.right = tempRight;
                largest.left = tempLeft;
            }

            if(deletedNode === this.root){
                this.root = largest;
            }else{
                let parent = this.findParentPointer(deletedNode, deletedNode.key);
                if(parent.left !== null && parent.left === deletedNode){
                    parent.left = largest;
                }else if(parent.right !== null && parent.right === deletedNode){
                    parent.right = largest;
                }else{
                    console.log("Error!");
                }
            }

            // delete deletedNode
            this.size--;
            return;
        }

        // case 2: there is only a right child
        else if(deletedNode.right !== null){
            let smallest = this.findSmallest(deletedNode.right);
            let tempRight = deletedNode.right;
            if(tempRight === smallest){
                // do nothing
            }else{
                let parent = this.findParentPointer(smallest, smallest.key);
                parent.left = smallest.right;
                smallest.right = tempRight;
            }

            if(deletedNode === this.root){
                this.root = smallest;
            }else{
                let parent = this.findParentPointer(deletedNode, deletedNode.key);
                if(parent.left !== null && parent.left === deletedNode){
                    parent.left = smallest;
                }else if(parent.right !== null && parent.right === deletedNode){
                    parent.right = smallest;
                }else{
                    console.log("Error");
                }
            }

            // delete deletedNode;
            this.size--;
            return;
        }

        // case 3: there is no child
        else{
            if(deletedNode === this.root){
                // delete deletedNode;
                this.root = null;
                this.size--;
                return;
            }else{
                let parent = this.findParentPointer(deletedNode, deletedNode.key);
                if(parent.left !== null && parent.left === deletedNode){
                    // delete deletedNode;
                    parent.left = null;
                    this.size--;
                    return;
                }else if (parent.right !== null && parent.right === deletedNode){
                    // delete deletedNode;
                    parent.right = null;
                    this.size--;
                    return;
                }
            }
        }
    }

    toStringRecursively(traveller, level) {
        let text = "";
        if (traveller.left !== null)
            text += this.toStringRecursively(traveller.left, level+1);
        for (let i = 0; i < level; i++) {
            text += "   ";
        }
        text += "   " + traveller.data.toString() + "\n";
        if (traveller.right !== null)
            text += this.toStringRecursively(traveller.right, level+1);
        return text;        
    }

    toString() {
        return this.toStringRecursively(this.root, 0);
    }
}