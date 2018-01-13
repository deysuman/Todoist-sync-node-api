import OAuth from './oauth';
import Items from './resources/items';
import Projects from './resources/projects';

/**
 * Top level interface to each of the resources and the generic sync call
 *
 * @param {Api} api
 * @param {ResourceHelper} resourceHelper
 *
 * @return {Object} The interface of the API wrapper
 */
const Client = (api, resourceHelper) => {
  return {
    commit: api.commit,
    sync: api.sync,

    oauth: OAuth(
      api,
      process.env.TODOIST_CLIENT_ID,
      process.env.TODOIST_CLIENT_SECRET,
      process.env.TODOIST_OAUTH_STATE_KEY
    ),

    // Attach the resources
    items: Items(resourceHelper),
    projects: Projects(resourceHelper),
  };
};

export default Client;
