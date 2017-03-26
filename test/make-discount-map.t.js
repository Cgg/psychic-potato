const makeDiscountMap = require('../make-discount-map.js');

var tests = {};

tests['make a discount map'] = function (T) {
  var input = [
    {article_id: 1, type: 'amount', value: 25},
    {article_id: 3, type: 'percentage', value: 50},
    {article_id: 5, type: 'amount', value: 10},
  ];

  var expected = {
    1: {type: 'amount', value: 25},
    3: {type: 'percentage', value: 50},
    5: {type: 'amount', value: 10}
  };

  T.assert.deepEqual(makeDiscountMap(input), expected);
};

module.exports = tests;

