/**
 * Apply discounts to a price reference, return a new price reference with
 * discounted prices.
 *
 * @param {Object} priceRef
 * @param {Object} discountMap as built by makeDiscountMap
 *
 * @return {Object} a new price reference with discounted prices
 */
function applyDiscountsToPriceReference (priceRef, discountMap) {
  var result = Object.assign({}, priceRef);

  Object.keys(discountMap).forEach(function (id) {
    if (!discountMap.hasOwnProperty(id) ||
        !result.hasOwnProperty(id)) {
      return;
    }

    discount = discountMap[id];

    switch (discount.type) {
      case 'percentage':
        result[id] -=  result[id] * discount.value / 100;
        break;
      case 'amount':
        result[id] -= discount.value;
        break;
    }

  });

  return result;
}

module.exports = applyDiscountsToPriceReference;

