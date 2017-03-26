const buildMap = require('./build-map');

/**
 * Builds a map of article id <=> discount
 * @param {Object[]} input
 * each item looks like this: {article_id: <id>, type: <type>, value: <value>}
 * @return {Object} map using the article id as a key, and objects with type
 * and value fields as values.
 *
 * [{article_id: 1, type: 'foo', value: 42}] will give
 * {1: {type: 'foo', value: 42}}
 */
function makeDiscountMap (input) {
  return buildMap(input, 'article_id', function (discount) {
    return {type: discount.type, value: discount.value};
  });
}

module.exports = makeDiscountMap;

