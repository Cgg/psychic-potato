const parseLevelInput = require('../parse-level-input');
const computeItemsTotal = require('../compute-items-total');
const getDeliveryFee = require('../get-delivery-fee');
const applyDiscountsToPrice = require('../apply-discounts-to-price-reference.js');

function makeCheckoutCart (priceReference, deliveryFeeScale, cartInput) {
  var totalWithoutFee = computeItemsTotal(cartInput.items, priceReference);

  return {
    id: cartInput.id,
    total: totalWithoutFee + getDeliveryFee(totalWithoutFee, deliveryFeeScale)
  };
}

function level3 (input) {
  var data = parseLevelInput(input);

  var discountedPriceReference = applyDiscountsToPrice(
      data.articlePriceReference,
      data.articleDiscountMap);

  return JSON.stringify({
    carts: data.carts.map(makeCheckoutCart.bind(
        null, discountedPriceReference, data.deliveryFeeScale))
  });
}

module.exports = level3;
