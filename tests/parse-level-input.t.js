const parseLevelInput = require('../parse-level-input.js');

var tests = {};

tests['nominal case'] = function (T) {
  var input = JSON.stringify({
    articles: [
      {id: 1, price: 100}
    ],
    carts: [
      {
        id: 1,
        items: [{article_id: 1, quantity: 6}]
      }
    ]
  });

  var expectedOutput = {
    articlePriceMap: {
      1: 100
    },
    carts: [
      {
        id: 1,
        items: [{articleId: 1, articleQuantity: 6}]
      }
    ]
  };

  T.assert.deepEqual(parseLevelInput(input), expectedOutput);
};

tests['add a deliveryFeeScale field in the result if fees in the input'] = function (T) {
  var input = JSON.stringify({
    articles: [
      {id: 1, price: 100}
    ],
    carts: [
      {
        id: 1,
        items: [{article_id: 1, quantity: 6}]
      }
    ],
    delivery_fees: [
      {
        eligible_transaction_volume: {min_price: 0},
        price: 100
      }
    ]
  });

  var expectedOutput = {
    articlePriceMap: {
      1: 100
    },
    carts: [
      {
        id: 1,
        items: [{articleId: 1, articleQuantity: 6}]
      }
    ],
    deliveryFeeScale: [
      {minimumPrice: 0, fee: 100}
    ]
  };

  T.assert.deepEqual(parseLevelInput(input), expectedOutput);
};

tests['add a articleDiscountMap field in the result if discounts in the input'] =
function (T) {
  var input = JSON.stringify({
    articles: [
    ],
    carts: [
    ],
    discounts: [
      {article_id: 'foo', type: 'bar', value: 'baz'}
    ]
  });

  var expectedOutput = {
    articlePriceMap: {
    },
    carts: [
    ],
    articleDiscountMap: {
      foo: {type: 'bar', value: 'baz'}
    }
  };

  T.assert.deepEqual(parseLevelInput(input), expectedOutput);
};

module.exports = tests;

