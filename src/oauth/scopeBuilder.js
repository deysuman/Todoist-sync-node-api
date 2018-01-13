/**
 * A simple builder to allow the consumer to create scope strings easily
 * without having to worry about how they are actually formatted
 *
 * @return {ScopeBuilder}
 */
const ScopeBuilder = () => {
  let builderScopes = [];

  const scopes = {
    TASK_ADD: 'task:add',
    DATA_READ: 'data:read',

    // Includes TASK_ADD and DATA_READ
    DATA_READ_WRITE: 'data:read_write',
    PROJECT_DELETE: 'project:delete',
  };

  const scopeValues = Object.keys(scopes).map((key) => {
    if (scopes.hasOwnProperty(key)) {
      return scopes[key];
    }
  });

  /**
   * @param {string} scope
   *
   * @return {ScopeBuilder}
   */
  const addScope = (scope) => {
    if (scopeValues.includes(scope)) {
      builderScopes.push(scope);
    }

    return self;
  };

  /**
   * @return {ScopeBuilder}
   */
  const addAllScopes = () => {
    /**
     * DATA_READ_WRITE includes TASK_ADD and DATA_READ, however, still add
     * them all incase this changes in the future
     */

    addScope(scopes.TASK_ADD);
    addScope(scopes.DATA_READ);
    addScope(scopes.DATA_READ_WRITE);
    addScope(scopes.PROJECT_DELETE);

    return self;
  };

  const getBuilderScopes = () => {
    return builderScopes;
  };

  /**
   * @return {string}
   */
  const build = () => {
    // Reduce the builder scopes into a single comma concatted string
    const scope = builderScopes.reduce((currentScope, scope) => {
      if (currentScope !== '') {
        currentScope += ',';
      }

      return currentScope + scope;
    }, '');

    // Reset the scope builder
    builderScopes = [];

    return scope;
  };

  const self = {
    scopes: scopes,
    addScope: addScope,
    addAllScopes: addAllScopes,
    build: build,
    getBuilderScopes: getBuilderScopes,
  };

  return self;
};

export default ScopeBuilder;
