const makePriceMap = require('../parse-input-utils/make-price-map.js');

var tests = {};

tests['make a price map'] = function (T) {
  var input = [
    {id: 1, name: 'foo', price: 11},
    {id: 3, name: 'bar', price: 22},
  ];

  var expected = {
    1: 11,
    3: 22
  };

  T.assert.deepEqual(makePriceMap(input), expected);
};

module.exports = tests;

