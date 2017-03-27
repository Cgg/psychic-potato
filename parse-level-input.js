const buildMap = require('./build-map');
const makePriceMap = require('./make-price-map');
const makeCartItem = require('./make-cart-item');
const makeDeliveryFeeScale = require('./make-delivery-fee-scale');
const makeDiscountMap = require('./make-discount-map');

function makeCarts (cartArray) {
  return cartArray.map(function (c) {
    return {
      id: c.id,
      items: c.items.map(i => makeCartItem(i.article_id, i.quantity))
    };
  });
}

const JSON_KEYS = {
  ARTICLES: 'articles',
  CARTS: 'carts',
  DELIVERY_FEES: 'delivery_fees',
  DISCOUNTS: 'discounts'
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
    articlePriceMap: makePriceMap(jsonAsObject[JSON_KEYS.ARTICLES]),
    carts: makeCarts(jsonAsObject[JSON_KEYS.CARTS])
  };

  if (jsonAsObject.hasOwnProperty(JSON_KEYS.DELIVERY_FEES)) {
    result.deliveryFeeScale =
        makeDeliveryFeeScale(jsonAsObject[JSON_KEYS.DELIVERY_FEES]);
  }

  if (jsonAsObject.hasOwnProperty(JSON_KEYS.DISCOUNTS)) {
    result.articleDiscountMap =
        makeDiscountMap(jsonAsObject[JSON_KEYS.DISCOUNTS]);
  }

  return result;
}

module.exports = parseLevelInput;

