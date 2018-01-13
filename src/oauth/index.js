import Auth from './auth';
import ScopeBuilder from './scopeBuilder';

/**
 * Top level interface to the steps for oauthing a user
 *
 * @param {Api} api
 * @param {string} clientId
 * @param {string} clientSecret
 * @param {string} state
 *
 * @return {Object} The interface of the OAuth wrapper
 */
const OAuth = (api, clientId, clientSecret, state) => {
  return {
    auth: Auth(api, clientId, clientSecret, state),
    scopeBuilder: ScopeBuilder(),
  };
};

export default OAuth;
