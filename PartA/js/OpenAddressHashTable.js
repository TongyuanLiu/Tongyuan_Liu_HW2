class KeyValuePair {
    constructor(initKey, initValue) {
        this.key = initKey;
        this.value = initValue;
    }
    
    toString() {
        return "(" + this.key + ", " + this.value.toString() + ")";
    }
}

export default class OpenAddressHashTable {
    constructor(initLength, initKeyLength) {
        this.length = initLength;
        this.size = 0;
        this.keyLength = initKeyLength;
        this.hashTable = [];
    }

    hashCode(key) {
        let charsSum = 0;
        for (let i = 0; i < key.length; i++) {
            let keyChar = key.charAt(i);
            let charAsNum = keyChar.charCodeAt(0);
            charsSum += charAsNum;
        }
        return charsSum % this.length;
    }

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
    getValue(key) {
        let index = this.hashCode(key);
        let counter = 0;
        while(this.hashTable[index] !== null && counter !== this.length){
            if((this.hashTable[index]).key === key){
                return this.hashTable[index].value;
            }
            index = (index + 1) % this.length;
            counter++;
        }
        return null;
    }
    
    // @todo - YOU MUST DEFINE THIS METHOD
    removeValue(key) {  
        // find the key-value pair, remove it, and rehash
        // outer loop to find the key-value pair
        let index = this.hashCode(key);
        while(this.hashTable[index] !== null){
            if(this.hashTable[index].key === key){
                // delete key-value pair and points to null
                this.hashTable[index] = null;
                this.size--;
                // inner loop for rehashing
                index = (index + 1) % this.length;
                while(this.hashTable[index] !== null){
                    let temp_key = this.hashTable[index].key;
                    let temp_value = this.hashTable[index].value;
                    this.hashTable[index] = null;
                    this.size--;
                    this.putValue(temp_key, temp_value);
                    index = (index + 1) % this.length;
                }
                return;
            }
            index = (index + 1) % this.length;
        } 

        // outer loop ends, no key-value pair is found
    }

    // Helper function to find if there is key-value pairs with the same key
    noSameKey(key){
        if(this.getValue(key) === null){
            return true;
        }else{
            return false;
        }
    }

    // @todo - YOU MUST DEFINE THIS METHOD
    putValue(key, item) {
        // if size == length, and there is no key-value pairs with the same keys
        // then double the length and rehash
        if(this.size === this.length && this.noSameKey(key)){
            // update length of hashTable and create new hashTable
            this.length *= 2;
            let tempHashTable = [];
            for(let i = 0; i < this.length; i++){
                tempHashTable[i] = null;
            }

            // copy key-value pairs from old hashTable to new hashTable
            for(let i = 0; i < this.size; i++){
                let index = this.hashCode(this.hashTable[i].key);
                while(1){
                    if(tempHashTable[index] === null){
                        tempHashTable[index] = this.hashTable[i]
                        break;
                    }
                    index = (index + 1) % this.length;
                }
            }

            // delete old hashtable
            this.hashTable = tempHashTable;
        }

        // if size < length, insert key-pair
        // OR size == length, and there is key-value pairs with the same key
        let index = this.hashCode(key);
        while(1){
            // if hashTable[index] is null, insert key-value pair
            if(this.hashTable[index] === null){
                this.hashTable[index] = new KeyValuePair(key, item);
                this.size++;
                return;
            }

            // if hashTable[index] has the same key value, replace item
            if(this.hashTable[index].key === key){
                this.hashTable[index].value = item;
                return;
            }

            // linear probing
            index = (index + 1) % this.length;
        }
    }
    
    toString() {
        let text = "[\n";
        for (let i = 0; i < this.length; i++) {
            let kvp = this.hashTable[i];
            let kvpDescription = "null";
            if (kvp != null) {
                kvpDescription = kvp.toString();
            }
            text += "   " + i + ": " + kvpDescription + "\n";
        }
        text += "]\n";
        return text;
    }
};