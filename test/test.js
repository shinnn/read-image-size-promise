'use strict';

var readImageSizePromise = require('..');
var test = require('tape');

test('readImageSizePromise()', function(t) {
  t.plan(7);

  t.equal(readImageSizePromise.name, 'readImageSizePromise', 'should have a function name.');

  readImageSizePromise('test/fixture_1x1.gif').then(function(dimensions) {
    t.deepEqual(
      dimensions, {width: 1, height: 1, type: 'gif'},
      'should detect the width and height of an image.'
    );
  }, t.fail);

  readImageSizePromise('test/fixture_1x1.gif', {
    highWaterMark: 1,
    limit: 2
  }).then(t.fail, function(err) {
    t.ok(
      /Reached the limit before detecting image type/.test(err),
      'should pass options to fs.createWriteStream and image-size-stream.'
    );
  });

  readImageSizePromise('package.json').then(t.fail, function(err) {
    t.ok(
      /TypeError.*unsupported/.test(err),
      'should be rejected when it reads an unsupported file.'
    );
  });

  readImageSizePromise('__this_file_does_not_exist__').then(t.fail, function(err) {
    t.equal(err.code, 'ENOENT', 'should be rejected when it fails to read the file.');
  });

  t.throws(
    readImageSizePromise.bind(null, 1),
    /TypeError.*path/,
    'should throw a type error when the first argument is not a string.'
  );

  t.throws(
    readImageSizePromise.bind(null, 'test/fixture_1x1.gif', {limit: '0123'}),
    /TypeError.*0123 .* must be a number/,
    'should throw a type error when it takes an invalid option.'
  );
});
