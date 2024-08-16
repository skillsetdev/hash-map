import Bucket from "./bucket.js";
export default class HashMap {
  constructor() {
    this.buckets = new Array(16).fill(null);
    this.load = 0;
  }
  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.buckets.length;
    }
    return hashCode;
  }
  set(key, value) {
    const hashCode = this.hash(key);
    if (this.buckets[hashCode] === null) {
      this.buckets[hashCode] = new Bucket();
      this.buckets[hashCode].append(key, value);
    } else if (this.buckets[hashCode].containsKey(key)) {
      const oldKeyIndex = this.buckets[hashCode].findKey(key);
      this.buckets[hashCode].at(oldKeyIndex).value = value;
    } else {
      this.buckets[hashCode].append(key, value);
    }
  }
}

// intermediary test
const test = new HashMap();
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
console.log(JSON.stringify(test, null, 2));
