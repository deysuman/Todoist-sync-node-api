import buildUrl from 'build-url';

const authoriseUrl = 'https://todoist.com/oauth/authorize';
const accessTokenUrl = 'https://todoist.com/oauth/access_token';
const revokeUrl = 'https://todoist.com/api/access_tokens/revoke';

/**
 * @param {Api} api
 * @param {string} clientId
 * @param {string} clientSecret
 * @param {string} state
 *
 * @return {Object}
 */
const Auth = (api, clientId, clientSecret, state) => {
  const _clientId = clientId;
  const _clientSecret = clientSecret;
  const _state = state;

  /**
   * Given the prefered scope, generate a url for the user to be directed to so
   * so that they can confirm the oauth
   *
   * @param {string} scope
   *
   * @return {string}
   */
  const createAuthUrl = (scope) => {
    return buildUrl(authoriseUrl, {
      queryParams: {
        client_id: _clientId,
        scope: scope,
        state: _state,
      },
    });
  };

  /**
   * Given the code from the todoist oauth user confirm, fetch an access token
   * to be used on behalf of the user.
   *
   * Also ensures the state returned from the request matches the one sent
   * thereby reducing the chance of a compromised request
   *
   * A redirect uri can be provided to send the user too once this is complete.
   *
   * @param {string} code
   * @param {string} state
   * @param {string} redirectUri
   *
   * @return {Promise}
   */
  const authenticate = (code, state, redirectUri = null) => {
    if (state !== _state) {
      return new Promise((resolve, reject) => {
        reject('State mismatch, request may have been compromised');
      });
    }

    return api
      .post(accessTokenUrl, {
        client_id: _clientId,
        client_secret: _clientSecret,
        code: code,
        redirect_uri: redirectUri,
      })
      .then((res) => {
        const payload = JSON.parse(res.payload);
        return api.setAccessToken(payload.access_token);
      });
  };

  /**
   * Given an access token, revoke the application's access for the user.
   *
   * @param {string} accessToken
   *
   * @return {Promise}
   */
  const revokeAccessToken = (accessToken) => {
    return api
      .setAccessToken(null)
      .then(() => {
        return api.post(revokeUrl, {
          client_id: _clientId,
          client_secret: _clientSecret,
          access_token: accessToken,
        });
      });
  };

  return {
    createAuthUrl: createAuthUrl,
    authenticate: authenticate,
    revokeAccessToken: revokeAccessToken,
  };
};

export default Auth;
