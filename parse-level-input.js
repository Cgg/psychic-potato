const buildMap = require('./build-map');
const makeCartItem = require('./make-cart-item');

function makePriceReference (articleArray) {
  return buildMap(articleArray, 'id', a => a.price);
}

function makeCarts (cartArray) {
  return cartArray.map(function (c) {
    return {
      id: c.id,
      items: c.items.map(i => makeCartItem(i.article_id, i.quantity))
    };
  });
}

/**
 * Parse and validate the level input and returns an object with a known and
 * defined structure for the rest of the program to use.
 *
 * @param {String} level input as a JSON string
 * @return {Object}
 *
 * {
 *   priceReference: {<id>: <price>}
 *   carts: [{articleId: <id>, articleQuantity: <quantity>}]
 * }
 */
function parseLevelInput (input) {
  // Really, various validations should be performed against the JSON at this
  // point but here we just JSON.parse it.
  var jsonAsObject = JSON.parse(input);

  return {
    articlePriceReference: makePriceReference(jsonAsObject.articles),
    carts: makeCarts(jsonAsObject.carts)
  };
}

module.exports = parseLevelInput;

