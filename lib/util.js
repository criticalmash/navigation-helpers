


var util = {};

// stollen from helpers-collections.js
util.getDescendantProp = function (obj, desc) {
  var arr = desc.split('.');
  while (arr.length && (obj = obj[arr.shift()])) {
    continue;
  }
  return obj;
};




module.exports = util;