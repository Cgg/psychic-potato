var testRunner = require('../test-runner.js');

var tests = {};

tests['Each test is passed a test case with an assert field'] = function (T) {
  // all of this is very meta.
  T.assert.notStrictEqual(T.assert, undefined);
};

module.exports = tests;
