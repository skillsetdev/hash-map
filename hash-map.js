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
  set(key, value, shouldUpdateSize = true) {
    const hashCode = this.hash(key);
    if (this.buckets[hashCode] === null) {
      this.buckets[hashCode] = new Bucket();
      this.buckets[hashCode].append(key, value);
      this.load++;
      if (shouldUpdateSize) {
        this.updateSize();
      }
    } else if (this.buckets[hashCode].containsKey(key)) {
      const oldKeyIndex = this.buckets[hashCode].findKey(key);
      this.buckets[hashCode].at(oldKeyIndex).value = value;
    } else {
      this.buckets[hashCode].append(key, value);
      this.load++;
    }
  }
  updateSize() {
    if (this.load > this.buckets.length * 0.75) {
      const entries = this.entries();
      this.buckets = new Array(this.buckets.length * 2).fill(null);
      this.load = 0; // Reset load count
      entries.forEach((entry) => {
        this.set(entry[0], entry[1], false); // Pass a flag to avoid triggering updateSize again
      });
      console.log(`Size updated, new size: ${this.buckets.length}`);
    }
  }
  get(key) {
    const hashCode = this.hash(key);
    if (this.buckets[hashCode] === null) {
      return null;
    } else if (this.buckets[hashCode].containsKey(key)) {
      return this.buckets[hashCode].findValueByKey(key);
    } else {
      return null;
    }
  }
  has(key) {
    const hashCode = this.hash(key);
    if (this.buckets[hashCode] === null) {
      return false;
    } else {
      return this.buckets[hashCode].containsKey(key);
    }
  }
  remove(key) {
    const hashCode = this.hash(key);
    if (this.buckets[hashCode] === null) {
      return null;
    } else {
      const index = this.buckets[hashCode].findKey(key);
      this.buckets[hashCode].removeAt(index);
    }
  }
  length() {
    let index = 0;
    this.buckets.forEach((bucket) => {
      if (bucket !== null) {
        index += bucket.size();
      }
    });
    return index;
  }
  clear() {
    this.load = 0;
    this.buckets = this.buckets.map(() => null);
  }
  keys() {
    let keysArr = [];
    this.buckets.forEach((bucket) => {
      if (bucket !== null) {
        keysArr.push(...bucket.keys());
      }
    });
    return keysArr;
  }
  values() {
    let valuesArr = [];
    this.buckets.forEach((bucket) => {
      if (bucket !== null) {
        valuesArr.push(...bucket.values());
      }
    });
    return valuesArr;
  }
  entries() {
    let keyValueArr = [];
    this.buckets.forEach((bucket) => {
      if (bucket !== null) {
        keyValueArr = keyValueArr.concat(bucket.keyValuePairs());
      }
    });
    return keyValueArr;
  }
}

// intermediary test
const test = new HashMap();
/*test.set("apple", "red");
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
console.log(`Find a color of the lion: ${test.get("lion")}`);
console.log(
  `The hashmap ${
    test.has("ice cream") ? "contains" : "doesn't contain"
  } ice cream`
);
console.log(
  `The hashmap ${test.has("car") ? "contains" : "doesn't contain"} a car`
);
console.log(`Map size: ${test.length()}`);
test.remove("frog");
console.log(`Removed Frog, lets try to find it: ${test.get("frog")}`);
console.log(`Map size: ${test.length()}`);
console.log(`Keys: ${test.keys()}`);
console.log(`Values: ${test.values()}`);
console.log(test.entries());
test.clear();
console.log(`Map cleared. Map size: ${test.length()}`);*/
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
test.set("r", "u");
test.set("s", "t");
test.set("a", "m");
test.set("t", "u");
test.set("k", "t");
test.set("o", "v");

console.log(JSON.stringify(test, null, 2));
console.log(test.load);
