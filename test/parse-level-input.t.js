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
    articlePriceReference: {
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

module.exports = tests;

