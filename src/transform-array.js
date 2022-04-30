const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * 
 */
function transform(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError("'arr' parameter must be an instance of the Array!");
  }

  let transformedArray = []
  let wasDiscarded = false;
  for (let i = 0; i < arr.length; ++i) {
    if (typeof arr[i] === "string") {
      switch(arr[i]) {
        case "--discard-next":
          if (i + 1 !== arr.length) {
            ++i;
            wasDiscarded = true;
          }
          break;
        case "--discard-prev":
          if (i !== 0 && wasDiscarded !== true) {
            transformedArray.pop();
          }
          wasDiscarded = false;
          break;
        case "--double-next":
          if (i + 1 !== arr.length) {
            transformedArray.push(arr[i + 1]);
          }
          break;
        case "--double-prev":
          if (i !== 0 && wasDiscarded !== true) {
            transformedArray.push(arr[i - 1]);
          }
          wasDiscarded = false;
          break;
        default:
          transformedArray.push(arr[i]);
      }
    } else {
      transformedArray.push(arr[i]);
    }
  }
  return transformedArray;
}

module.exports = {
  transform
};
