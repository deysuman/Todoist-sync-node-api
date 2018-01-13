import assert from 'assert';

import ScopeBuilder from '../../lib/oauth/scopeBuilder';

let scopeBuilder;

describe('Todoist API OAuth object', () => {
  before(function() {
    scopeBuilder = ScopeBuilder();
  });

  it('Creates a scope with a single scope added', function() {
    const builder = scopeBuilder.addScope(scopeBuilder.scopes.TASK_ADD);
    assert.equal(scopeBuilder.build(), 'task:add');
  });

  it('Creates a scope with multiple scopes added', function() {
    const builder = scopeBuilder
                      .addScope(scopeBuilder.scopes.TASK_ADD)
                      .addScope(scopeBuilder.scopes.PROJECT_DELETE);

    assert.equal(scopeBuilder.build(), 'task:add,project:delete');
  });

  it('Creates a scope with all scopes added', function() {
    const builder = scopeBuilder.addAllScopes();
    assert.equal(scopeBuilder.build(), 'task:add,data:read,data:read_write,project:delete');
  });
});