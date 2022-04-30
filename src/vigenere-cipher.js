const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
 const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

class VigenereCipheringMachine {
  constructor(type) {
    this.type = type || arguments.length === 0 ? "direct" : "reverse";
  }

  encrypt(message, key) {
    if (!message || !key) {
      throw new Error("Incorrect arguments!");
    }
    let bigMessage = message.toUpperCase();
    let bigKey = key.toUpperCase();
    let result = "";
    let currIndex = 0;
    for (let i = 0; i < bigMessage.length; ++i) {
      if (ALPHABET.indexOf(bigMessage[i]) === -1) {
        result += bigMessage[i];
        continue;
      }
      result +=
        ALPHABET[
          (ALPHABET.indexOf(bigMessage[i]) +
            ALPHABET.indexOf(bigKey[currIndex])) %
            26
        ];
      currIndex++;
      currIndex === bigKey.length ? (currIndex = 0) : currIndex;
    }
    return this.type === "direct"
      ? result
      : result.split("").reverse().join("");
  }
  decrypt(encryptedMessage, key) {
    if (!encryptedMessage || !key) {
      throw new Error("Incorrect arguments!");
    }
    let bigMessage = encryptedMessage.toUpperCase();
    let bigKey = key.toUpperCase();
    let result = "";
    let currIndex = 0;
    for (let i = 0; i < bigMessage.length; ++i) {
      if (ALPHABET.indexOf(bigMessage[i]) === -1) {
        result += bigMessage[i];
        continue;
      }
      let currLetter =
        (ALPHABET.indexOf(bigMessage[i]) -
          ALPHABET.indexOf(bigKey[currIndex])) %
        26;
      while (currLetter < 0) {
        currLetter += 26;
      }
      result += ALPHABET[currLetter];
      currIndex++;
      currIndex === bigKey.length ? (currIndex = 0) : currIndex;
    }
    return this.type === "direct"
      ? result
      : result.split("").reverse().join("");
  }
}

module.exports = {
  VigenereCipheringMachine
};
