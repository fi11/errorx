Simple base error class.

## Installation

```
$ npm install errorx
```

## Example

```js
var Err = require('errorx');
var SomeError = Err.create('Some Error');

// for format message using util.format
throw new SomeError('Foo %s', 'bar');

/*
throw new SomeError('Foo %s', 'bar');
      ^
SomeError: Foo bar
    at Object.<anonymous> (/foo/bar/baz/index.js:6:7)
    at Module._compile (module.js:449:26)
    at Object.Module._extensions..js (module.js:467:10)
    at Module.load (module.js:349:32)
    ...
*/

var err = Err.create(function HttpBadRequestError(context) {
    Err.apply(this, ['Bad request "%s": %j', context.path, context.result]);
    this.statusCode = 400;
});

try {
    throw new err({ path: '/foo/', result: { msg: 'property bar must be a string' } });
} catch (err) {
    if (err.statusCode === 400) console.log(err.toString());
    // >>> HttpBadRequestError: Bad request "/foo/": {"msg":"property bar must be a string"}
}

// Capture another error

var err = new Error('ups');

throw new SomeError(err, 'Foo %s', 'bar');

/*
throw new SomeError(err, 'Foo %s', 'bar');
      ^
SomeError: Foo bar [Error: ups]
    at Object.<anonymous> (/foo/bar/baz/index.js:7:7)
    at Object.<anonymous> (/foo/bar/baz/index.js:5:7)
    at Module._compile (module.js:449:26)
    at Object.Module._extensions..js (module.js:467:10)
    at Module.load (module.js:349:32)
    ...
*/

```
## Inherits

For inheritance detail see [obx](https://www.npmjs.org/package/obx)

## Running tests

```
$ make test
```

## Authors

  - [Pavel Silin](https://github.com/fi11)

# License

  MIT
