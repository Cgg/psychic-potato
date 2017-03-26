const makeDeliveryFeeScale = require('../make-delivery-fee-scale.js');

var tests = {};

tests['throws if input is empty'] = function (T) {
  T.assert.throws(() => makeDeliveryFeeScale([]));
};

tests['throws if input does not start with a minimum price of 0'] = function (T) {
  T.assert.throws(() => makeDeliveryFeeScale([{
    eligible_transaction_volume: {
      min_price: 42
    }
  }]));
};

tests['throws if input presents discontinuous delivery fees'] = function (T) {
  T.assert.throws(() => makeDeliveryFeeScale([
    {
      eligible_transaction_volume: {
        min_price: 0,
        max_price: 42
      }
    },
    {
      eligible_transaction_volume: {
        min_price: 84,
      }
    }
  ]));
};

tests['throws if input presents overlapping fees'] = function (T) {
  T.assert.throws(() => makeDeliveryFeeScale([
    {
      eligible_transaction_volume: {
        min_price: 0,
        max_price: 42
      }
    },
    {
      eligible_transaction_volume: {
        min_price: 24,
      }
    }
  ]));
};

tests['builds an ordered delivery fee scale'] = function (T) {
  const input = [
    {
      eligible_transaction_volume: {
        min_price: 0,
        max_price: 42
      },
      price: 100
    },
    {
      eligible_transaction_volume: {
        min_price: 42,
        max_price: 84
      },
      price: 50
    },
    {
      eligible_transaction_volume: {
        min_price: 84,
      },
      price: 0
    }
  ];

  const expectedOutput = [
    {minimumPrice: 0, fee: 100},
    {minimumPrice: 42, fee: 50},
    {minimumPrice: 84, fee: 0}
  ];

  T.assert.deepEqual(makeDeliveryFeeScale(input), expectedOutput);
};

module.exports = tests;

