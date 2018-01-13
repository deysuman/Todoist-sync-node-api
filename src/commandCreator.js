import uuid from 'uuid';

const CommandCreator = () => {
  /**
   * Creates a command object which is wrapped
   * with the uuid and temp_id required by the Sync API
   *
   * @param {String} type The type of command to be added.
   * It MUST match a command type that the Todoist Sync API provides.
   * It MUST be camel_case.
   * @param {Object} params The arguments to send with the command.
   *
   * @return {Object} A newly created command.
   */
  const create = (type, params = {}) => ({
    type: type,
    temp_id: uuid.v4(),
    uuid: uuid.v4(),
    args: params,
  });

  return {
    create: create,
  };
};

export default CommandCreator;
