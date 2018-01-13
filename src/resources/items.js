const Items = (resourceHelper) => {
  /**
   * A enum type object which contains all available actions for this
   * resource type.
   */
  const actionTypes = {
    ADD: 'item_add',
    UPDATE: 'item_update',
    DELETE: 'item_delete',
    MOVE: 'item_move',
    CLOSE: 'item_close',
    UNCOMPLETE: 'item_uncomplete',
  };

  /**
   * Creates a item_add command from the details provided.
   * Queues the command using the API.
   * Returns the temp_id of the command so that the project can be used
   * elsewhere.
   *
   * @param {String} content
   * @param {Object} params
   *
   * @return {String} The temp_id of the command created
   */
  const create = (content, params = {}) => {
    return resourceHelper.addToQueue(actionTypes.ADD, {
      ...params,
      content: content,
    });
  };

  /**
   *
   * @param {Number} id
   * @param {Object} params
   *
   * @return {String} The temp_id of the command created
   */
  const update = (id, params = {}) => {
    return resourceHelper.addToQueue(actionTypes.UPDATE, {
      ...params,
      id: id,
    });
  };

  /**
   *
   * @param {String|String[]} ids
   *
   * @return {String} The temp_id of the command created
   */
  const remove = (ids) => {
    return resourceHelper.addToQueue(actionTypes.DELETE, {
      ids: resourceHelper.wrapWithArray(ids),
    });
  };

  /**
   *
   * @param {String} fromProjectId The project to move the items from
   * @param {String} toProjectId The project to move the items to
   * @param {String|String[]} itemIds The items to move
   *
   * @return {String} The temp_id of the command created
   */
  const move = (fromProjectId, toProjectId, itemIds) => {
    return resourceHelper.addToQueue(actionTypes.MOVE, {
      project_items: {
        [fromProjectId]: resourceHelper.wrapWithArray(itemIds),
      },
      to_project: toProjectId,
    });
  };

  /**
   * @param {String|String[]} ids
   *
   * @return {String} The temp_id of the command created
   */
  const close = (ids) => {
    return resourceHelper.addToQueue(actionTypes.CLOSE, {
      ids: resourceHelper.wrapWithArray(ids),
    });
  };

  /**
   * @param {String|String[]} ids
   *
   * @return {String} The temp_id of the command created
   */
  const uncomplete = (ids) => {
    return resourceHelper.addToQueue(actionTypes.UNCOMPLETE, {
      ids: resourceHelper.wrapWithArray(ids),
    });
  };

  return {
    create: create,
    update: update,
    remove: remove,
    move: move,
    close: close,
    uncomplete: uncomplete,
  };
};

export default Items;
