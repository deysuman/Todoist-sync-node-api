import assert from 'assert';

import Api from '../../lib/api';
import CommandCreator from '../../lib/commandCreator';
import CommandQueue from '../../lib/commandQueue';
import ResourceHelper from '../../lib/resources/resourceHelper';

let commandQueue;
let resourceHelper;

describe('Todoist API resource helper', function() {
  before(function() {
    commandQueue = CommandQueue();
    const api = Api(commandQueue);
    const commandCreator = CommandCreator();
    resourceHelper = ResourceHelper(api, commandCreator);
  });

  it('Adds a command to the command queue', function() {
    assert.ok((commandQueue.getQueue()).length === 0);
    resourceHelper.addToQueue('test_type', { 'id': 1 });
    assert.ok((commandQueue.getQueue()).length === 1);
  });

  it('Wraps an int value in an array', function() {
    const val = 1;
    const wrappedValue = resourceHelper.wrapWithArray(val);
    assert.ok(Array.isArray(wrappedValue));
    assert.ok(wrappedValue[0] === val);
  });

  it('Wraps a string value in an array', function() {
    const val = 'test';
    const wrappedValue = resourceHelper.wrapWithArray(val);
    assert.ok(Array.isArray(wrappedValue));
    assert.ok(wrappedValue[0] === val);
  });

  it('Wraps a boolean value in an array', function() {
    const val = true;
    const wrappedValue = resourceHelper.wrapWithArray(val);
    assert.ok(Array.isArray(wrappedValue));
    assert.ok(wrappedValue[0] === val);
  });

  it('Wraps a object value in an array', function() {
    const val = {};
    const wrappedValue = resourceHelper.wrapWithArray(val);
    assert.ok(Array.isArray(wrappedValue));
    assert.ok(wrappedValue[0] === val);
  });

  it('Wraps a function value in an array', function() {
    const val = () => {};
    const wrappedValue = resourceHelper.wrapWithArray(val);
    assert.ok(Array.isArray(wrappedValue));
    assert.ok(wrappedValue[0] === val);
  });

  it('Does not wraps an array in an array', function() {
    const val = [];
    const wrappedValue = resourceHelper.wrapWithArray(val);
    assert.ok(typeof wrappedValue[0] === 'undefined');
  });
});
