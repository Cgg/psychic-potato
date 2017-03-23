/**
 * Compute the total price of a list of cart items.
 *
 * @param {CartItem[]} items
 * @param {Object} priceMap
 *
 * @return {Number}
 *
 * @throw if an item isn't found in the articles map
 */
function computeItemsTotalPrice (items, priceMap) {
  return items.reduce(function (currentTotal, currentItem) {
    var currentArticleId = currentItem.articleId;
    var price = priceMap[currentArticleId];

    if (!price) {
      throw new Error('Price not found for this article id: ' + currentArticleId);
    }

    return currentTotal + currentItem.quantity * price;
  }, 0);
}

module.exports = computeItemsTotalPrice;
