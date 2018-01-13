import assert from 'assert';

import CommandQueue from '../lib/commandQueue';

let commandQueue;

describe('Todoist API command queue', () => {
  before(function() {
    commandQueue = CommandQueue();
  });

  beforeEach(function() {
    commandQueue.clear();
  })

  it('Can return the current queue', function() {
    const queue = commandQueue.getQueue();
    assert.ok(Array.isArray(queue));

    commandQueue.add('test');
    const updatedQueue = commandQueue.getQueue();
    assert.ok(Array.isArray(updatedQueue));
    assert.ok(updatedQueue.length === 1);
  });

  it('Adds a value to the queue', function() {
    assert.ok((commandQueue.getQueue()).length === 0);

    const val = 'test';
    commandQueue.add(val);
    const queue = commandQueue.getQueue();

    assert.ok(queue.length === 1);
    assert.ok(queue[0] === val);
  });

  it('Adds multiple values to the queue', function() {
    assert.ok((commandQueue.getQueue()).length === 0);

    const valsAmount = 10;
    for (let i = 0; i < valsAmount; i++) {
      commandQueue.add(i);
    }
    const queue = commandQueue.getQueue();

    assert.ok(queue.length === valsAmount);
  });

  it('Clears the queue', function() {
    assert.ok((commandQueue.getQueue()).length === 0);

    const valsAmount = 10;
    for (let i = 0; i < valsAmount; i++) {
      commandQueue.add(i);
    }

    assert.ok((commandQueue.getQueue()).length === valsAmount);

    commandQueue.clear();
    assert.ok((commandQueue.getQueue()).length === 0);
  });
});
