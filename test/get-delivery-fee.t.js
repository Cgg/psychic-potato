const getDeliveryFee = require('../get-delivery-fee.js');

const feeScale = [
  {minimumPrice: 0, fee: 100},
  {minimumPrice: 42, fee: 50},
  {minimumPrice: 84, fee: 0}
];

var tests = {};

tests['get the correct delivery fee'] = function (T) {

  T.assert.equal(getDeliveryFee(100, feeScale), 0);
  T.assert.equal(getDeliveryFee(43, feeScale), 50);
  T.assert.equal(getDeliveryFee(12, feeScale), 100);
};

tests['the minimum price in the scale is inclusive'] = function (T) {
  T.assert.equal(getDeliveryFee(42, feeScale), 50);
};

module.exports = tests;

