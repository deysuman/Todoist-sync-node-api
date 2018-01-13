import assert from 'assert';

import Api from '../lib/api';
import CommandQueue from '../lib/commandQueue';
import CommandCreator from '../lib/commandCreator';

let api;
let commandQueue;
let commandCreator;

describe('Todoist API api interface', () => {
  before(function() {
    commandQueue = CommandQueue();
    api = Api(commandQueue);
    commandCreator = CommandCreator();
  });

  beforeEach(function() {
    commandQueue.clear();
  });

  it('Queues a valid command', function() {
    assert.ok((commandQueue.getQueue()).length === 0);

    const command = commandCreator.create('test_type', {
      testParam: 'test'
    });

    api.queueCommand(command);

    assert.ok((commandQueue.getQueue()).length === 1);
  });

  it('Does not queue an invalid command', function() {
    assert.ok((commandQueue.getQueue()).length === 0);

    const command = commandCreator.create(null, {
      testParam: 'test'
    });

    try {
      api.queueCommand(command);
    } catch (e) {
      assert.ok((commandQueue.getQueue()).length === 0);
    }
  });

  it('Returns a promise when calling sync', function() {
    assert.ok(api.sync() instanceof Promise);
  });

  it('Returns a promise when calling commit', function() {
    assert.ok(api.commit() instanceof Promise);
  });
});
