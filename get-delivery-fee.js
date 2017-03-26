/**
 * Get the delivery fee for a given price.
 *
 * @param {Number} totalPrice
 * @param {Object} deliveryFeeScale as built by makeDeliveryFeeScale.
 *
 * @return {Number} fee associated with the price
 *
 * Behaviour is undefined is the given scale is empty or starts above the given
 * price.
 */
function getDeliveryFee (totalPrice, deliveryFeeScale) {
  var i, currentScaleItem;

  for (i = deliveryFeeScale.length - 1; currentScaleItem = deliveryFeeScale[i]; i--) {
    if (totalPrice >= currentScaleItem.minimumPrice) {
      return currentScaleItem.fee;
    }
  }
}

module.exports = getDeliveryFee;
