const buildMap = require('../build-map.js');

var tests = {};

tests['builds a map out of an array'] = function (T) {
  var input = [
    {id: 1, foo: 'bar'}
  ];
  var expected = {
    1: {id: 1, foo: 'bar'}
  };

  T.assert.deepEqual(buildMap(input), expected);
};

tests['throws if two objects have the same id in the input'] = function (T) {
  var input = [
    {id: 1, foo: 'bar'},
    {id: 1, foo: 'bar'}
  ];

  T.assert.throws(() => {
    buildArticlesMap(input);
  });
};

module.exports = tests;
