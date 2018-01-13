import assert from 'assert';

import Api from '../lib/api';
import CommandCreator from '../lib/commandCreator';
import CommandQueue from '../lib/commandQueue';
import Client from '../lib/client';
import ResourceHelper from '../lib/resources/resourceHelper';

let api;
let commandQueue;
let commandCreator;
let resourceHelper;
let client;

describe('Todoist API client', () => {
  before(function() {
    commandQueue = CommandQueue();
    api = Api(commandQueue);
    commandCreator = CommandCreator();
    resourceHelper = ResourceHelper(api, commandCreator);
    client = Client(api, resourceHelper);
  });

  it('Has a sync property', function() {
    assert.ok(client.hasOwnProperty('sync'));
  });

  it('Has a commit property', function() {
    assert.ok(client.hasOwnProperty('commit'));
  });
  
  it('Has an oauth property', function() {
    assert.ok(client.hasOwnProperty('oauth'));
  });

  it('Has an items property which is an object type', function() {
    assert.ok(client.hasOwnProperty('items'));
    assert.ok(typeof client.items === 'object');
  });

  it('Has a projects property which is an object type', function() {
    assert.ok(client.hasOwnProperty('projects'));
    assert.ok(typeof client.projects === 'object');
  });
});
