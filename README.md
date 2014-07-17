# read-image-size-promise 

[![NPM version](https://badge.fury.io/js/read-image-size-promise.svg)](http://badge.fury.io/js/read-image-size-promise)
[![Build Status](https://travis-ci.org/shinnn/read-image-size-promise.svg?branch=master)](https://travis-ci.org/shinnn/read-image-size-promise)
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
  console.log(dimensions);
})
.catch(function(reason) {
  throw reason;
});

//=> yields: {width: 320, height: 240}
```

## Installation

[Install with npm](https://www.npmjs.org/doc/cli/npm-install.html). (Make sure you have installed [Node](http://nodejs.org/))

```
npm install --save read-image-size-promise
```

## Supported image formats

* [BMP](http://wikipedia.org/wiki/BMP_file_format)
* [GIF](http://wikipedia.org/wiki/Graphics_Interchange_Format)
* [JPEG](http://wikipedia.org/wiki/JPEG)
* [PNG](http://wikipedia.org/wiki/Portable_Network_Graphics)
* [PSD](http://wikipedia.org/wiki/Adobe_Photoshop#File_format)
* [TIFF](http://wikipedia.org/wiki/Tagged_Image_File_Format)
* [WebP](http://wikipedia.org/wiki/WebP)

## API

```javascript
var readImageSizePromise = require('read-image-size-promise');
```

### readImageSizePromise(imageFilePath)

Return: [`Promise`](http://promises-aplus.github.io/promises-spec/)

It will be [*fulfilled*](http://promises-aplus.github.io/promises-spec/#point-26) with an object in the form `{width: [Number], height: [Number]}` when it detects the width and height of the image file.

It will be [*rejected*](http://promises-aplus.github.io/promises-spec/#point-30) with an error when it fails to read the file, or the file is not supported.

```javascript
var imageSize = readImageSizePromise();

var onFulfilled = function(dimensions) {
  console.log('Size: ' + dimensions.width + ' x ' + dimensions.height);
};

var onRejected = function(reason) {
  throw reason;
};

imageSize('path/to/image.png').then(onFulfilled, onRejected);
```

## License

Copyright (c) 2014 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT LIcense](./LICENSE).
