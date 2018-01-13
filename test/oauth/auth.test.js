import assert from 'assert';

import OAuth from '../../lib/oauth';

describe('Todoist API OAuth authing', () => {
  it('Creates an auth url', function() {
    const oauth = OAuth(null, 'id', 'secret', 'state');

    const authUrl = oauth.auth.createAuthUrl('test');
    assert.equal(authUrl, 'https://todoist.com/oauth/authorize?client_id=id&scope=test&state=state');
  });

  it('Authentication success when given the same state', function(done) {
    const api = {
      post: (url, data) => {
        return new Promise((resolve, reject) => {
          const payload = {};
          payload.access_token = 'test_token';

          assert.equal(url, 'https://todoist.com/oauth/access_token');
          assert.equal(data.client_id, 'id');
          assert.equal(data.client_secret, 'secret');
          assert.equal(data.code, 'code');
          assert.equal(data.redirect_uri, null);

          resolve({ url: url, data: data, payload: payload, });
        });
      },
      setAccessToken: (token) => {
        return new Promise((resolve, reject) => {
          resolve();
        });
      }
    };

    const oauth = OAuth(api, 'id', 'secret', 'state');

    oauth
      .auth
      .authenticate('code', 'state')
      .then(() => {
        done();
      });
  });

  it('Authentication fail when given a different state', function(done) {
    const api = {
      post: (url, data) => {
        return new Promise((resolve, reject) => {
          resolve({ url: url, data: data, });
        });
      },
      setAccessToken: (token) => {
        return new Promise((resolve, reject) => {
          resolve();
        });
      }
    };

    const oauth = OAuth(api, 'id', 'secret', 'state');

    oauth
      .auth
      .authenticate('code', 'not state')
      .catch((err) => {
        assert.equal(err, 'State mismatch, request may have been compromised');
        done();
      })
  });

  it('Revokes an access token', function(done) {
    const api = {
      post: (url, data) => {
        return new Promise((resolve, reject) => {
          resolve({ url: url, data: data, });
        });
      },
      setAccessToken: (token) => {
        return new Promise((resolve, reject) => {
          resolve();
        });
      }
    };

    const oauth = OAuth(api, 'id', 'secret', 'state');

    oauth
      .auth
      .revokeAccessToken('token')
      .then((response) => {
        assert.equal(response.url, 'https://todoist.com/api/access_tokens/revoke');
        assert.equal(response.data.client_id, 'id');
        assert.equal(response.data.client_secret, 'secret');
        assert.equal(response.data.access_token, 'token');
        done();
      });
  });
});