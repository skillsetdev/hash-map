class BucketNode {
  constructor(key, value, nextNode = null) {
    this.key = key;
    this.value = value;
    this.nextNode = nextNode;
  }
}
export default class Bucket {
  constructor(headNode = null) {
    this.headNode = headNode;
  }
  append(key, value) {
    if (this.headNode === null) {
      this.headNode = new BucketNode(key, value);
    } else {
      let tmp = this.headNode;
      while (tmp.nextNode !== null) tmp = tmp.nextNode;
      tmp.nextNode = new BucketNode(key, value);
    }
  }
  prepend(key, value) {
    if (this.headNode === null) {
      this.headNode = new BucketNode(key, value);
    } else {
      let tmp = new BucketNode(key, value, this.headNode);
      this.headNode = tmp;
    }
  }
  size() {
    let tmp = this.headNode;
    let index = 0;
    while (tmp !== null) {
      index++;
      tmp = tmp.nextNode;
    }
    return index;
  }
  head() {
    return this.headNode;
  }
  tail() {
    let tmp = this.headNode;
    while (tmp !== null) {
      tmp = tmp.nextNode;
    }
    return tmp;
  }
  at(index) {
    let tmp = this.headNode;
    for (let i = 0; i < index; i++) {
      if (tmp === null) return "The List is smaller";
      tmp = tmp.nextNode;
    }
    return tmp;
  }
  containsKey(key) {
    let tmp = this.headNode;

    while (tmp !== null) {
      if (tmp.key === key) {
        return true;
      }
      tmp = tmp.nextNode;
    }
    return false;
  }
  containsValue(value) {
    let tmp = this.headNode;
    while (tmp !== null) {
      if (tmp.value === value) {
        return true;
      }
      tmp = tmp.nextNode;
    }
    return false;
  }
  containsKeyValue(key, value) {
    let tmp = this.headNode;
    while (tmp !== null) {
      if (tmp.key === key && tmp.value === value) {
        return true;
      }
      tmp = tmp.nextNode;
    }
    return false;
  }
  findKey(key) {
    let tmp = this.headNode;
    let index = 0;
    while (tmp !== null) {
      if (tmp.key === key) {
        return index;
      }
      index++;
      tmp = tmp.nextNode;
    }
    return null;
  }
  findValueByKey(key) {
    let tmp = this.headNode;
    let index = 0;
    while (tmp !== null) {
      if (tmp.key === key) {
        return tmp.value;
      }
      index++;
      tmp = tmp.nextNode;
    }
    return null;
  }
  findValue(value) {
    let tmp = this.headNode;
    let index = 0;
    while (tmp !== null) {
      if (tmp.value === value) {
        return index;
      }
      index++;
      tmp = tmp.nextNode;
    }
    return null;
  }
  findKeyValue(key, value) {
    let tmp = this.headNode;
    let index = 0;
    while (tmp !== null) {
      if (tmp.key === key && tmp.value === value) {
        return index;
      }
      index++;
      tmp = tmp.nextNode;
    }
    return null;
  }
  toString() {
    let tmp = this.headNode;
    var resultString = "";
    while (tmp !== null) {
      resultString += ` (${tmp.key}: ${tmp.value}) ${
        tmp.nextNode !== null ? "->" : ""
      }`;
      tmp = tmp.nextNode;
    }
    return resultString;
  }
  insertAt(key, value, index) {
    if (index < 0 || index > this.size()) {
      return "Index out of bounds";
    }
    if (index === 0) {
      this.prepend(key, value);
      return;
    }
    let tmp = this.headNode;
    for (let i = 0; i < index - 1; i++) {
      tmp = tmp.nextNode;
    }
    let newNode = new BucketNode(key, value, tmp.nextNode);
    tmp.nextNode = newNode;
  }
  removeAt(index) {
    if (index < 0 || index >= this.size()) {
      return "Index out of bounds";
    }
    if (index === 0) {
      this.headNode = this.headNode.nextNode;
      return;
    }
    let tmp = this.headNode;
    for (let i = 0; i < index - 1; i++) {
      tmp = tmp.nextNode;
    }
    tmp.nextNode = tmp.nextNode.nextNode;
  }
  keys() {
    let tmp = this.headNode;
    let keysArr = [];
    while (tmp !== null) {
      keysArr.push(tmp.key);
      tmp = tmp.nextNode;
    }
    return keysArr;
  }
  values() {
    let tmp = this.headNode;
    let valuesArr = [];
    while (tmp !== null) {
      valuesArr.push(tmp.value);
      tmp = tmp.nextNode;
    }
    return valuesArr;
  }
  keyValuePairs() {
    let tmp = this.headNode;
    let keyValueArr = [];
    while (tmp !== null) {
      const subArr = [tmp.key, tmp.value];
      keyValueArr.push(subArr);
      tmp = tmp.nextNode;
    }
    return keyValueArr;
  }
}
