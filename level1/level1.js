const parseLevelInput = require('../parse-level-input');
const computeItemsTotal = require('../compute-items-total');

function makeCheckoutCart (priceReference, cartInput) {
  return {
    id: cartInput.id,
    total: computeItemsTotal(cartInput.items, priceReference)
  };
}

function level1 (input) {
  var data = parseLevelInput(input);

  return JSON.stringify({
    carts: data.carts.map(makeCheckoutCart.bind(null, data.articlePriceMap))
  });
}

module.exports = level1;
