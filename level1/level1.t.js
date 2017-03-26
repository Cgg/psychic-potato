const fs = require('fs');
const path = require('path');
const level1 = require('./level1.js');

var tests = {};

tests['LEVEL1 PASS'] = function (T) {
  const outputPath = path.join(__dirname, 'output.json');
  const dataPath = path.join(__dirname, 'data.json');

  console.log();
  T.assert.deepEqual(
    JSON.stringify(JSON.parse(fs.readFileSync(outputPath))),
    level1(fs.readFileSync(dataPath))
  );
};

module.exports = tests;
