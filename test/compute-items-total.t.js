const makeCartItem = require('../parse-input-utils/make-cart-item');
const computeItemsTotal = require('../compute-items-total.js');

const tests = {};

const priceReference = {
  1: 42,
  2: 24
};

tests['compute the total for a given list of cart items'] = function (T) {
  var items = [
    makeCartItem(1, 2),
    makeCartItem(2, 1)
  ];

  T.assert.equal(
      computeItemsTotal(items, priceReference),
      108);
};

tests['throws if one of the item is not in the given price reference'] = function (T) {
  T.assert.throws(() => {
    computeItemsTotal([makeCartItem(404, 3)], priceReference);
  });
};

module.exports = tests;
