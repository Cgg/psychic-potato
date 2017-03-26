function identity () {
  return arguments[0];
}

/**
 * Transforms an array of objects with a key field into a map of key to object.
 *
 * @param {Object[]} inputObjectArray an array of objects
 * @param {String} keyName the name of the field on the objects that will be
 * used as the key in the resulting map
 * @param {Function} [transformerFunction] function applied to each input object
 * before setting it as a value on the map. If not provided, the identity is
 * used, ie the original object is used as the value.
 *
 * @return {Object} a map where the keys are the objects ids and the values the
 * objects themselves.
 *
 * @throw if two objects in the array input have the same id.
 *
 * buildMap([{id: 1, foo: bar}], 'id') results in {1: {id: 1, foo: bar}}
 * buildMap([{id: 1, foo: bar}], 'id', o => o.foo) results in {1: bar}
 */
function buildMap (inputObjectArray, keyName, transformerFunction) {
  return inputObjectArray.reduce(function (currentMap, currentArticle) {
    var currentArticleId = currentArticle[keyName];

    if (currentMap[currentArticleId]) {
      throw new Error("duplicate article in the input: " + currentArticle);
    }

    transformerFunction = transformerFunction || identity;

    currentMap[currentArticleId] = transformerFunction(currentArticle);

    return currentMap;
  }, {});
}

module.exports = buildMap;

