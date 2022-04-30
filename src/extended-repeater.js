const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create a repeating string based on the given parameters
 *  
 * @param {String} str string to repeat
 * @param {Object} options options object 
 * @return {String} repeating string
 * 
 *
 * @example
 * 
 * repeater('STRING', { repeatTimes: 3, separator: '**', 
 * addition: 'PLUS', additionRepeatTimes: 3, additionSeparator: '00' })
 * => 'STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS'
 *
 */
function repeater(str, options) {
  let repeated = String(str);

  if (options.hasOwnProperty("addition")) {
    let additionStr = String(options["addition"]);
    if (options.hasOwnProperty("additionRepeatTimes")) {
      let separator = options.hasOwnProperty("additionSeparator")
        ? options["additionSeparator"]
        : "|";
      additionStr += separator;
      additionStr = additionStr.repeat(options["additionRepeatTimes"]);
      additionStr = additionStr.slice(0, additionStr.lastIndexOf(separator));
    }
    repeated += additionStr;
  }

  if (options.hasOwnProperty("repeatTimes")) {
    let currSeparator = options.hasOwnProperty("separator")
      ? options["separator"]
      : "+";
    repeated += currSeparator;
    repeated = repeated.repeat(options["repeatTimes"]);
    repeated = repeated.slice(0, repeated.lastIndexOf(currSeparator));
  }

  return repeated;
}

module.exports = {
  repeater
};
