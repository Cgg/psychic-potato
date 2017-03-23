/**
 * Transforms an array of objects with id fields into a map of id to object.
 *
 * @param {Object[]} inputObjectArray an array of object where each object must
 * have at least an "id" field.
 * @return {Object} a map where the keys are the objects ids and the values the
 * objects themselves.
 *
 * @throw if two objects in the array input have the same id.
 *
 * [{id: 1, foo: bar}] will give {1: {id: 1, foo: bar}}
 */
function buildMap (inputObjectArray) {
  return inputObjectArray.reduce(function (currentMap, currentArticle) {
    var currentArticleId = currentArticle.id;

    if (currentMap[currentArticleId]) {
      throw new Error("duplicate article in the input: " + currentArticle);
    }

    currentMap[currentArticleId] = currentArticle;

    return currentMap;
  }, {});
}

module.exports = buildMap;

