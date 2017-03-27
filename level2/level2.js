const parseLevelInput = require('../parse-level-input');
const computeItemsTotal = require('../compute-items-total');
const getDeliveryFee = require('../get-delivery-fee');

function makeCheckoutCart (priceReference, deliveryFeeScale, cartInput) {
  var totalWithoutFee = computeItemsTotal(cartInput.items, priceReference);

  return {
    id: cartInput.id,
    total: totalWithoutFee + getDeliveryFee(totalWithoutFee, deliveryFeeScale)
  };
}

function level2 (input) {
  var data = parseLevelInput(input);

  return JSON.stringify({
    carts: data.carts.map(makeCheckoutCart.bind(
        null, data.articlePriceMap, data.deliveryFeeScale))
  });
}

module.exports = level2;
