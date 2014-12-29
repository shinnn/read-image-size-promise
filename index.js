/*!
 * read-image-size-promise | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/image-size-stream
*/

'use strict';

var fs = require('fs');

var imageSizeStream = require('image-size-stream');
var wrapPromise = require('wrap-promise');

module.exports = function readImageSizePromise(filePath, options) {
  return wrapPromise(function(resolve, reject) {
    var stream = fs.createReadStream(filePath, options)
      .on('error', reject)
      .pipe(
        imageSizeStream(options)
          .on('error', reject)
          .on('size', function(dimensions) {
            stream.destroy();
            resolve(dimensions);
          })
      );
  });
};
