/**
 * Transforms an array of objects with id fields into a map of id to object.
 *
 * @param {Object[]} articleArray an array of article object. Each has an id
 * field.
 * @return {Object} a map where the keys are the articles ids and the values the
 * articles themselves (including their ids)
 *
 * @throw if two articles in the array input have the same id.
 *
 * [{id: 1, foo: bar}] will give {1: {id: 1, foo: bar}}
 */
function buildArticlesMap (articleArray) {
  return articleArray.reduce(function (currentMap, currentArticle) {
    var currentArticleId = currentArticle.id;

    if (currentMap[currentArticleId]) {
      throw new Error("duplicate article in the input: " + currentArticle);
    }

    currentMap[currentArticleId] = currentArticle;

    return currentMap;
  }, {});
}

/**
 * Compute the total price of a list of items.
 *
 * @param {Object[]} items
 * @param {Object} articles
 *
 * @return {Number}
 *
 * @throw if an item isn't found in the articles map
 */
function computeItemsTotal (items, articles) {
  return items.reduce(function (currentTotal, currentItem) {
    var currentArticleId = currentItem.article_id;
    var article = articles[currentArticleId];

    if (!article) {
      throw new Error("Article id not found in the given map: " + currentArticleId);
    }

    return currentTotal + currentItem.quantity * article.price;
  }, 0);
}


/**
 * Function performing the level 1 task
 *
 * @param {String} input typically as read from 'data.json'
 * @return {String} result, typically to be compared to 'output.json'
 */
function level1 (input) {

  var inputObject = JSON.parse(input);
  var articlesMap = buildArticlesMap(inputObject.articles || []);
  var carts = inputObject.carts || [];

  var cartTotalsArray = [];

  carts.forEach(c => {
    try {
      cartTotalsArray.push({
        id: c.id,
        total: computeItemsTotal(c.items, articlesMap)
      });
    }
    catch (e) {
      console.log('Error while computing total for cart ', c.id, e);
    }
  });

  return JSON.stringify({carts: cartTotalsArray});
}


// TESTS

var assert = require('assert');
var tests = {};

tests['buildArticlesMap'] = function () {
  var input = [
    {id: 1, foo: 'bar'}
  ];
  var expected = {
    1: {id: 1, foo: 'bar'}
  };

  assert.deepEqual(buildArticlesMap(input), expected);

  input.push(input[0]);
  assert.throws(() => {
    buildArticlesMap(input);
  });
};

tests['computeItemsTotal'] = function () {
  var articleMap = {
    1: {id: 1, name: 'foo', price: 42},
    2: {id: 2, name: 'bar', price: 24},
  };
  var inputCart = [
    {article_id: 1, quantity: 2},
    {article_id: 2, quantity: 1}
  ];

  assert.equal(computeItemsTotal(inputCart, articleMap), 108);

  assert.throws(() => {
    computeItemsTotal(inputCart, {});
  });
};

tests['whole level 1 test'] = function () {
  const fs = require('fs');
  const dataPath = 'data.json', outputPath = 'output.json';

  assert.deepEqual(
      // sorry about that
      JSON.stringify(JSON.parse(fs.readFileSync('output.json'))),
      level1(fs.readFileSync('data.json')));
};


function testsRunner (tests) {
  Object.keys(tests).forEach(function (testKey) {
    if (!tests.hasOwnProperty(testKey)) {
      return;
    }

    var testFunction = tests[testKey];

    if (typeof testFunction !== 'function') {
      console.log('WARNING: this test is not a function', testKey);
    }

    console.log('running', testKey);
    testFunction();
  });
}

testsRunner(tests);
