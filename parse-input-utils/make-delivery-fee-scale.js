/**
 * Build a delivery fee scale based on the input provided in data.json.
 *
 * @param {Object[]} input
 * Input should be an array built thusly:
 *
 * [
    {
      "eligible_transaction_volume": {
        "min_price": 0,
        "max_price": 1000
      },
      "price": 800
    },
    ...
 * ]
 *
 * @returns {Object[]}
 * It returns an array of objects:
 * [
 *  {
 *    minimumPrice: <Number>
 *    fee: <Number>
 *  }
 * ]
 *
 * which is ordered by minimumPrice.
 *
 * It will check these conditions and throw if they are not met:
 *  - input should have at least one item (there should be at least one delivery
 *  fee
 *  - the scale doesn't start with a minimum price of 0.
 *  - the fees in the input are discontinuous or overlapping
 */
function makeDeliveryFeeScale (input) {
  if (!input.length) {
    throw new Error(
        'deliver fee scale input should have at least one item: ' + input);
  }

  input.sort((a, b) =>
      a.eligible_transaction_volume.min_price -
      b.eligible_transaction_volume.min_price);

  if (input[0].eligible_transaction_volume.min_price !== 0) {
    throw new Error(
        'deliver fee scale should start with a minimum price of 0: ' + input);
  }

  return input.reduce(function (currentResult, currentItem, currentIndex) {
    if (currentIndex > 0 &&
        currentItem.eligible_transaction_volume.min_price !==
        input[currentIndex - 1].eligible_transaction_volume.max_price) {

      throw new Error('Fee scale is overlapping or discontinuous: ' + input);
    }

    currentResult.push({
      minimumPrice: currentItem.eligible_transaction_volume.min_price,
      fee: currentItem.price
    });

    return currentResult;
  }, []);
}

module.exports = makeDeliveryFeeScale;


