# deep-exclude-keys

This package deep copies an object, ignoring any keys specified in the blacklist.

## install

`npm install deep-exclude-keys`

## use

### api surface

__exclude__(`original`, `blacklist`)

* `original` - original object
* `blacklist` - array of string paths to exclude
* returns an object that is a deep copy of `original`, minus any keys (including child objects) that are in the `blacklist`

### example

```javascript
  var exclude = require('deep-exclude-keys');

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
  // `res` should look just like `expected`
```
