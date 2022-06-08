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

    // @todo - YOU MUST DEFINE THIS METHOD
    removeValue(key) {

    }

    toStringRecursively(traveller, level) {
        let text = "";
        if (traveller.left != null)
            text += this.toStringRecursively(traveller.left, level+1);
        for (let i = 0; i < level; i++) {
            text += "   ";
        }
        text += "   " + traveller.data.toString() + "\n";
        if (traveller.right != null)
            text += this.toStringRecursively(traveller.right, level+1);
        return text;        
    }

    toString() {
        return this.toStringRecursively(this.root, 0);
    }
}