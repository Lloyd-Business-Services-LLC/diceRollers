//testing

const crypto = require('crypto');


class DiceRoller {
  constructor(num,nSides){
    this.num = num;
    this.nSides = nSides;
    this.array = this.roll();
    this.responseString = JSON.stringify(this.array);
  }
  roll() {
    const arrayOfIntegers = [];
    var i = 0;
    while (i < this.num){
      var arrayIndex = 0;
      arrayIndex = crypto.randomInt(1, this.nSides+1);
      arrayOfIntegers.push(arrayIndex);
      i++;
      }
    return arrayOfIntegers;
    }
  }


module.exports = DiceRoller;
