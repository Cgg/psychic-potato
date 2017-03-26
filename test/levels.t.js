const fs = require('fs');
const path = require('path');

const level1 = require('../level1/level1.js');

function pass (levelDir, T) {
  const outputPath = path.join(__dirname, '..', levelDir, 'output.json');
  const dataPath = path.join(__dirname, '..', levelDir, 'data.json');

  const levelFunction = require(path.join(__dirname, '..', levelDir, levelDir + '.js'));

  T.assert.deepEqual(
    JSON.stringify(JSON.parse(fs.readFileSync(outputPath))),
    levelFunction(fs.readFileSync(dataPath))
  );
}

var tests = {};

tests['LEVEL1 PASS'] = function (T) {
  pass('level1', T);
};

tests['LEVEL2 PASS'] = function (T) {
  pass('level2', T);
};

tests['LEVEL3 PASS'] = function (T) {
  pass('level3', T);
};

module.exports = tests;

