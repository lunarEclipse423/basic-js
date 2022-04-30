const { NotImplementedError } = require('../extensions/index.js');

/**
 * Extract season from given date and expose the enemy scout!
 * 
 * @param {Date | FakeDate} date real or fake date
 * @returns {String} time of the year
 * 
 * @example
 * 
 * getSeason(new Date(2020, 02, 31)) => 'spring'
 * 
 */
function getSeason(date) {
  if (date === undefined) {
    return "Unable to determine the time of year!";
  }

  try {
    date.getTime();
  } catch (err) {
    throw new TypeError("Invalid date!");
  }
    return date.getMonth() < 2 ? "winter"
      : date.getMonth() < 5 ? "spring"
      : date.getMonth() < 8 ? "summer"
      : date.getMonth() < 11 ? "autumn" : "winter";
}

module.exports = {
  getSeason
};
