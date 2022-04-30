const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement chainMaker object according to task description
 * 
 */
const chainMaker = {
  chain: [],
  getLength() {
    return this.chain.length;
  },
  addLink(value) {
    this.chain.push(value);
    return this;
  },
  removeLink(position) {
    if (
      typeof position !== "number" ||
      !Number.isInteger(position) ||
      this.chain.length < position ||
      position < 1
    ) {
      this.chain.splice(0, this.chain.length);
      throw new Error("You can't remove incorrect link!");
    }
    this.chain.splice(position - 1, 1);
    return this;
  },
  reverseChain() {
    if (this.chain.length === 0) {
      return this;
    }
    this.chain.reverse();
    return this;
  },
  finishChain() {
    this.chain = this.chain.map((element) => "( " + String(element) + " )");
    let result = this.chain.join("~~");
    this.chain.splice(0, this.chain.length);
    return result;
  },
};

module.exports = {
  chainMaker
};
