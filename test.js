var tape = require('tape');
var exclude = require('./deep-exclude-keys');

tape('copy an empty object', function (t) {
  var orig = { };

  var blacklist = [];
  var res = exclude(orig, blacklist);
  t.deepEquals(res, orig, 'got back expected empty object');
  t.end();
});

tape('deep copy without two keys', function (t) {
  var orig = {
    'foo': {
      'bar': true,
      'baz': 'blub',
    },
    'handy': {
      'dandy': {
        'ferrari': {
          'turbocharger': '$10,000',
          'throttle': 'body'
        }
      }
    }
  };

  var expected = {
    'foo': {
      'bar': true,
      'baz': 'blub',
    },
    'handy': {
      'dandy': {
        'ferrari': {
        }
      }
    }
  };

  var blacklist = [
    'handy.dandy.ferrari.turbocharger',
    'handy.dandy.ferrari.throttle'
  ];

  var res = exclude(orig, blacklist);
  t.deepEquals(res, expected, 'got back expected copy without \'turbocharger\' and \'throttle\'');

  t.end();
});

tape('shallow copies a simple object given an empty blacklist', function (t) {
  var orig = {
    'bar': true,
    'baz': 'blub',
  };

  var blacklist = [];
  var res = exclude(orig, blacklist);
  t.deepEquals(res, orig, 'got back expected shallow copy');
  t.end();
});

tape('deep copies an object given an empty blacklist', function (t) {
  var orig = {
    'foo': '0',
    'bar': {
      'baz': '2'
    }
  };

  var blacklist = [];
  var res = exclude(orig, blacklist);
  t.deepEquals(res, orig, 'got back expected deep copy');
  t.end();
});

tape('blacklist an entire sub-object', function (t) {
  var orig = {
    'foo': {
      'bar': true,
      'baz': 'blub',
    },
    'handy': {
      'dandy': {
        'ferrari': {
          'turbocharger': '$10,000',
          'throttle': 'body'
        }
      }
    }
  };

  var expected = {
    'foo': {
      'bar': true,
      'baz': 'blub',
    },
    'handy': {
      'dandy': {
      }
    }
  };

  var blacklist = [ 'handy.dandy.ferrari' ];

  var res = exclude(orig, blacklist);
  t.deepEquals(res, expected, 'got back expected copy without \'ferrari\'');

  t.end();
});
