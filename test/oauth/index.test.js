import assert from 'assert';

import OAuth from '../../lib/oauth';

let oauth;

describe('Todoist API OAuth object', () => {
  before(function() {
    oauth = OAuth(null, 'abc', 'def', 'ghi');
  });

  it('Has a auth property', function() {
    assert.ok(oauth.hasOwnProperty('auth'));
  });

  it('Has a scopeBuilder property', function() {
    assert.ok(oauth.hasOwnProperty('scopeBuilder'));
  });
});