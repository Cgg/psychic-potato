const applyDiscountsToPriceReference = require('../apply-discounts-to-price-reference.js');

var tests = {};

tests['apply percentage discounts'] = function (T) {
  var discount = {
    1: {type: 'percentage', value: 20}
  };

  var priceReference = {
    1: 100
  };

  T.assert.deepEqual(
      applyDiscountsToPriceReference(priceReference, discount),
      {1: 80});
};

tests['apply amount discounts'] = function (T) {
  var discount = {
    1: {type: 'amount', value: 20}
  };

  var priceReference = {
    1: 100
  };

  T.assert.deepEqual(
      applyDiscountsToPriceReference(priceReference, discount),
      {1: 80});
};

module.exports = tests;
