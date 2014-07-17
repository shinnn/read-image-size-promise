'use strict';

var assert = require('assert');

var readImageSizePromise = require('require-main')();

describe('readImageSizePromise()', () => {
  it('should detect the width and height of an image.', () => {
    return readImageSizePromise('test/fixture.gif')
    .then(dimensions => {
      assert.deepEqual(dimensions, {width: 1, height: 1});
    });
  });
  it('should be rejected when the file doesn\'t exist.', () => {
    return readImageSizePromise('foo/bar/baz')
    .then(val => {
      assert(!val, 'Expecting a rejection.');
    })
    .catch(err => {
      assert.throws(() => assert.ifError(err), /ENOENT/);
    });
  });
  it('should be rejected when the stream receives an unsupported file.', () => {
    return readImageSizePromise('package.json')
    .then(val => {
      assert(!val, 'Expecting a rejection.');
    })
    .catch(err => {
      assert.throws(() => assert.ifError(err), TypeError);
    });
  });
});
