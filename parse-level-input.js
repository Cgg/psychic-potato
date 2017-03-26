const buildMap = require('./build-map');
const makeCartItem = require('./make-cart-item');
const makeDeliveryFeeScale = require('./make-delivery-fee-scale');

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

const JSON_KEYS = {
  DELIVERY_FEES: 'delivery_fees'
};

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

  var result = {
    articlePriceReference: makePriceReference(jsonAsObject.articles),
    carts: makeCarts(jsonAsObject.carts)
  };

  if (jsonAsObject.hasOwnProperty(JSON_KEYS.DELIVERY_FEES)) {
    result.deliveryFeeScale =
        makeDeliveryFeeScale(jsonAsObject[JSON_KEYS.DELIVERY_FEES]);
  }

  return result;
}

module.exports = parseLevelInput;

