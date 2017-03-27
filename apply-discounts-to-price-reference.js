/**
 * Apply discounts to a price reference, return a new price reference with
 * discounted prices.
 *
 * @param {Object} priceRef
 * @param {Object} discountMap as built by makeDiscountMap
 *
 * @return {Object} a new price reference with discounted prices. When applying
 * a percentage discount, discount amount is rounded up to the next integer.
 *
 * For example, a discount of 30% of a 99 price would lower the price by 29.7
 * but the actual discount is rounded up to 30 giving a final price of 69.
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
        result[id] -=  Math.ceil(result[id] * discount.value / 100);
        break;
      case 'amount':
        result[id] -= discount.value;
        break;
    }

  });

  return result;
}

module.exports = applyDiscountsToPriceReference;

