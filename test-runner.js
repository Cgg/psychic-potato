const fs = require('fs');
const testArg = {
  assert: require('assert')
};

function runTestFile (testPath) {
  try {
    fs.accessSync(testPath);
  }
  catch (e) {
    throw new Error('Test file ' + testPath + ' does not exist.');
  }

  var testSuite = require(testPath);

  Object.keys(testSuite).forEach(function (testKey) {
    if (!testSuite.hasOwnProperty(testKey)) {
      return;
    }

    var testFunction = testSuite[testKey];

    if (typeof testFunction !== 'function') {
      throw new Error('This test is not a function', testKey);
    }

    console.log('running:', testKey);
    testFunction(testArg);
  });
}


if (process.argv.length < 2) {
  console.log('usage: node test-runner.js <test driver>');
  return;
}

runTestFile(process.argv[2]);
