import request from 'request';
require('request-to-curl');

/**
 * A HTTP wrapper around the sync API which preforms
 * POST requests to the api route given.
 *
 * @param {CommandQueue} queue
 * @param {Object} params Any additional parameters
 *
 * @return {Object} The api interface
 */
const Api = (queue, params = {}) => {
  const options = Object.assign({
    baseUrl: 'https://todoist.com/API/v7/sync',
    token: null,
    sync_token: '*',
    resource_types: '["all"]',
  }, params);

  /**
   * Added a command to the queue to be commited.
   * A command MUST have a type, temp_id, and a uuid.
   * A command MAY have args
   *
   * @param {Object} command The command to be queued
   *
   * @return {undefined}
   */
  const queueCommand = (command) => {
    if (!hasValidProperty(command, 'type') ||
        !hasValidProperty(command, 'temp_id') ||
        !hasValidProperty(command, 'uuid')) {
          throw new Error('A command must have a type, temp_id, and uuid.');
        }

    queue.add(command);
  };

  /**
   * Creates a single request using the commands in the queue.
   *
   * @return {Promise} Includes the response from the commit request
   */
  const commit = () => {
    const response = post(getUrl(), getCommandRequestData());
    queue.clear();
    return response;
  };

  /**
   * Preforms a sync request to fetch data from the endpoint
   *
   * @return {Promise} Any new data from the Sync API relative to the sync_token
   */
  const sync = () => {
    return post(
      getUrl(), {
        resource_types: options.resource_types,
        token: options.token,
        sync_token: options.sync_token,
      }
    );
  };

  /**
   * @param {String} url The url to POST to
   * @param {Object} data The data to send in the POST request
   *
   * @return {Promise} A promise containing the result of the post request
   */
  const post = (url, data) => {
    const params = {url: url, form: data};

    return new Promise((resolve, reject) => {
      request.post(params, (err, res, payload) => {
        if (err) {
          reject(err);
        }

        // Save the sync token for future requests
        if (payload.sync_token) {
          options.sync_token = payload.sync_token;
        }

        resolve({
          payload: payload,
          response: res,
        });
      });
    });
  };

  /**
   * @param {String} token
   *
   * @return {Promise}
   */
  const setAccessToken = (token) => {
    return new Promise((resolve, reject) => {
      options.token = token;
      options.sync_token = ['*'];

      resolve();
    });
  };

  /**
   * @param {String} path The path to add to the base url
   *
   * @return {String} A merge between the base url and the path given
   */
  const getUrl = (path = '') => {
    return options.baseUrl + path;
  };

  /**
   * Merges the commands with the token and sync_token stored in the object.
   *
   * @return {Object} An object containing the data used in the POST request
   */
  const getCommandRequestData = () => {
    return {
      commands: JSON.stringify(queue.getQueue()),
      token: options.token,
      sync_token: options.sync_token,
    };
  };

  /**
   * Returns true if the property exists on the object and if the property
   * is not null and not undefined.
   *
   * @param {Object} obj The object to check the prop againt
   * @param {String} property The property to check
   *
   * @return {Boolean} The result of the comparison.
   */
  const hasValidProperty = (obj, property) => {
    return obj.hasOwnProperty(property) &&
           obj[property] !== null &&
           typeof obj[property] !== 'undefined';
  };

  return {
    commit: commit,
    sync: sync,
    post: post,
    queueCommand: queueCommand,
    setAccessToken: setAccessToken,
  };
};

export default Api;
