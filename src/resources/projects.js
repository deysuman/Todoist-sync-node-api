const Projects = (resourceHelper) => {
  /**
   * A enum type object which contains all available actions for this
   * resource type.
   */
  const actionTypes = {
    ADD: 'project_add',
    UPDATE: 'project_update',
    DELETE: 'project_delete',
    ARCHIVE: 'project_archive',
    UNARCHIVE: 'project_unarchive',
  };

  /**
   * Creates a project command from details provided.
   * Queues the command using the API.
   *
   * @param {String} name
   * @param {Object} params
   *
   * @return {String} The temp_id of the command created
   */
  const create = (name, params = {}) => {
    return resourceHelper.addToQueue(actionTypes.ADD, {
      ...params,
      name: name,
    });
  };

  /**
   *
   * @param {String} id
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
   * @param {String|String[]} ids
   *
   * @return {String} The temp_id of the command created
   */
  const archive = (ids) => {
    return resourceHelper.addToQueue(actionTypes.ARCHIVE, {
      ids: resourceHelper.wrapWithArray(ids),
    });
  };

  /**
   *
   * @param {String|String[]} ids
   *
   * @return {String} The temp_id of the command created
   */
  const unarchive = (ids) => {
    return resourceHelper.addToQueue(actionTypes.UNARCHIVE, {
      ids: resourceHelper.wrapWithArray(ids),
    });
  };

  return {
    create: create,
    update: update,
    remove: remove,
    archive: archive,
    unarchive: unarchive,
  };
};

export default Projects;
