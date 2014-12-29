# read-image-size-promise 

[![Build Status](https://img.shields.io/travis/shinnn/read-image-size-promise.svg?style=flat)](https://travis-ci.org/shinnn/read-image-size-promise)
[![Build status](https://ci.appveyor.com/api/projects/status/6bo8ejml9y4n1j6c?svg=true)](https://ci.appveyor.com/project/ShinnosukeWatanabe/read-image-size-promise)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/read-image-size-promise.svg?style=flat)](https://coveralls.io/r/shinnn/read-image-size-promise)
[![Dependency Status](https://david-dm.org/shinnn/read-image-size-promise.svg)](https://david-dm.org/shinnn/read-image-size-promise)
[![devDependency Status](https://david-dm.org/shinnn/read-image-size-promise/dev-status.svg)](https://david-dm.org/shinnn/read-image-size-promise#info=devDependencies)

Promise to detect the image dimensions from a file, using [image-size-stream](https://github.com/shinnn/image-size-stream)

```javascript
//       +-----------+
//       |           |
// 240px |  foo.jpg  |
//       |           |
//       +-----------+
//           320px 

var readImageSizePromise = require('read-image-size-promise');

readImageSizePromise('path/to/foo.jpg')
.then(function(dimensions) {
  dimensions; //=> {width: 320, height: 240, type: 'jpg'}
})
.catch(function(reason) {
  console.warn(reason);
});
```

## Installation

[![NPM version](https://img.shields.io/npm/v/read-image-size-promise.svg?style=flat)](https:// www.npmjs.com/package/read-image-size-promise)

[Use npm.](https://www.npmjs.org/doc/cli/npm-install.html)

```
npm install read-image-size-promise
```

## Supported image formats

Check [image-size-stream](https://github.com/shinnn/image-size-stream#supported-image-formats) doc.

## API

```javascript
var readImageSizePromise = require('read-image-size-promise');
```

### readImageSizePromise(*imageFilePath* [, *options*])

*imageFilePath*: `String` (local file path)  
*options*: `String` (directly passed to [fs.createWriteStream](http://nodejs.org/api/fs.html#fs_fs_createwritestream_path_options) options and [image-size-stream](https://github.com/shinnn/image-size-stream#optionlimit) option)  
Return: `Object` ([Promise](https://promisesaplus.com/))

When it detects the width and height of the image file, it will be [*fulfilled*](http://promisesaplus.com/#point-26) with an object in the form `{width: [Number], height: [Number], type: [String]}` as an argument.

`type` will be one of the following strings: `bmp` `gif` `jpg` `png` `psd` `svg` `tiff` `webp`

When it fails to read the file, or the file is not supported, it will be [*rejected*](http://promisesaplus.com/#point-30) with an error as an argument.

```javascript
var imageSize = readImageSizePromise();

var onFulfilled = function(dimensions) {
  console.log('Size: ' + dimensions.width + ' x ' + dimensions.height);
};

var onRejected = function(reason) {
  console.warn(reason.message);
};

imageSize('path/to/image.png').then(onFulfilled, onRejected);
```

## License

Copyright (c) 2014 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT LIcense](./LICENSE).
