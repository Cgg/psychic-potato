const buildMap = require('../build-map.js');

var tests = {};

tests['builds a map out of an array using the identity as the default ' +
'transformer function'] = function (T) {
  var input = [
    {id: 1, foo: 'bar'}
  ];
  var expected = {
    1: {id: 1, foo: 'bar'}
  };

  T.assert.deepEqual(buildMap(input, 'id'), expected);
};

tests['can provide a custom transformer function'] = function (T) {
  var input = [
    {id: 1, foo: 'bar'}
  ];
  var expected = {
    1: {baz: 'bar'}
  };

  T.assert.deepEqual(buildMap(input, 'id', o => {return {baz: o.foo};}), expected);
};

tests['can use another key name'] = function (T) {
  var input = [
    {customId: 1, foo: 'bar'},
    {customId: 2, foo: 'baz'}
  ];
  var expected = {
    1: 'bar',
    2: 'baz'
  };

  T.assert.deepEqual(buildMap(input, 'customId', o => o.foo), expected);
};

tests['throws if two objects have the same id in the input'] = function (T) {
  var input = [
    {id: 1, foo: 'bar'},
    {id: 1, foo: 'bar'}
  ];

  T.assert.throws(() => {
    buildArticlesMap(input, 'id');
  });
};

module.exports = tests;
