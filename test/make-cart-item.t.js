const makeCartItem = require('../make-cart-item.js');
const tests = {};

tests['make a cart item with an articleId and a quantity field'] = function (T) {
  var expectedId = 'my-article-id';
  var expectedQuantity = 42;

  T.assert.deepEqual(
      makeCartItem(expectedId, expectedQuantity),
      {
        articleId: expectedId,
        articleQuantity: expectedQuantity
      });
};

module.exports = tests;
