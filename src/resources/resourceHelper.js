/**
 * @param {Api} api
 * @param {CommandCreator} commandCreator
 *
 * @return {Object} Resource helper methods
 */
const ResourceHelper = (api, commandCreator) => {
  /**
   * @param {String} actionType The type of action to create.
   * This MUST match a type the Todoist Sync API can respond to.
   * @param {Object} params Any additional parameters for the command.
   *
   * @return {String} The temp_id of the command created
   */
  const addToQueue = (actionType, params) => {
    const command = commandCreator.create(actionType, params);
    api.queueCommand(command);
    return command.temp_id;
  };

  /**
   * If the given value is not already an array wrap it in one.
   *
   * @param {any} val The value to be wrapped
   *
   * @return {Array} The given value wrapped in an array
   */
  const wrapWithArray = (val) => {
    return !Array.isArray(val) ? [val] : val;
  };

  return {
    addToQueue: addToQueue,
    wrapWithArray: wrapWithArray,
  };
};

export default ResourceHelper;
