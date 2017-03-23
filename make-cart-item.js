function makeCartItem (articleId, quantity) {
  return {
    articleId: articleId,
    quantity: quantity
  };
}

module.exports = makeCartItem;
