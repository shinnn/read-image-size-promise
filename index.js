/*!
 * read-image-size-promise | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/image-size-stream
*/

'use strict';

var fs = require('fs');

var ES6Promise = global.Promise || require('es6-promise').Promise;

var imageSizeStream = require('image-size-stream');

module.exports = function readImageSizePromise(filePath) {
  return new ES6Promise(function(resolve, reject) {
    var size = imageSizeStream()
    .on('size', function(dimensions) {
      stream.destroy();
      resolve(dimensions);
    })
    .on('error', reject);

    var stream = fs.createReadStream(filePath)
    .on('error', reject)
    .pipe(size);
  });
};
