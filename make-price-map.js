const buildMap = require('./build-map');

function makePriceMap (input) {
  return buildMap(input, 'id', a => a.price);
}

module.exports = makePriceMap;
