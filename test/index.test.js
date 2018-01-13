import assert from 'assert';

import Client from '../lib/client';

describe('Todoist API index', () => {
  it('Is CommonJS compatible', () => {
    assert.equal(typeof require('../lib/index'), 'function');
  });
});
