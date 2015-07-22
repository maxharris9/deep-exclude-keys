module.exports = exclude;

function exclude (original, blacklist, path) {
  var keys = Object.keys(original);

  var result = {};

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];

    var newPath = (!path) ? key : path + '.' + key;

    if (blacklist.indexOf(newPath) < 0) { // copy the children if we don't match anything in the blacklist
      result[key] = original[key];
      if ('object' === typeof original[key]) {
        result[key] = exclude(original[key], blacklist, newPath);
      }
    }
  }

  return result;
}
