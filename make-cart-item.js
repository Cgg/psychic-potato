function makeCartItem (articleId, quantity) {
  return {
    articleId: articleId,
    articleQuantity: quantity
  };
}

module.exports = makeCartItem;
