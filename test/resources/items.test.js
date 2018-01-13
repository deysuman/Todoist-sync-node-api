import assert from 'assert';

import Api from '../../lib/api';
import CommandCreator from '../../lib/commandCreator';
import CommandQueue from '../../lib/commandQueue';
import Client from '../../lib/client';
import ResourceHelper from '../../lib/resources/resourceHelper';

let api;
let commandQueue;
let commandCreator;
let resourceHelper;
let client;

describe('Todoist API items resource', function() {
  before(function() {
    commandQueue = CommandQueue();
    api = Api(commandQueue);
    commandCreator = CommandCreator();
    resourceHelper = ResourceHelper(api, commandCreator);
    client = Client(api, resourceHelper);
  });

  beforeEach(function() {
    commandQueue.clear();
  });

  it('Creates with content "Test"', function() {
    const queue = commandQueue.getQueue();
    assert.ok(queue.length === 0);

    client.items.create('Test');

    // Ensure the command has been queued
    const updatedQueue = commandQueue.getQueue();
    assert.ok(updatedQueue.length === 1);

    // Ensure the command has the required fields
    const command = updatedQueue[0];
    assert.ok(command.type === 'item_add');
    assert.ok(command.hasOwnProperty('args'));
    assert.ok(command.args.hasOwnProperty('content'));
  });

  it('Updates an item with new name "Updated item"', function() {
    const queue = commandQueue.getQueue();
    assert.ok(queue.length === 0);

    const id = 1;

    client.items.update(id, {
      name: 'Updated item',
    });

    // Ensure the command has been queued
    const updatedQueue = commandQueue.getQueue();
    assert.ok(updatedQueue.length === 1);

    const updateCommand = updatedQueue[0];
    assert.ok(updateCommand.type === 'item_update');
    assert.ok(updateCommand.hasOwnProperty('args'));
    assert.ok(updateCommand.args.hasOwnProperty('id'));
    assert.ok(updateCommand.args.id === id);
    assert.ok(updateCommand.args.hasOwnProperty('name'));
    assert.ok(updateCommand.args.name === 'Updated item');
  });

  it('Removes a single item', function() {
    const queue = commandQueue.getQueue();
    assert.ok(queue.length === 0);

    const id = 1;

    client.items.remove(id);

    // Ensure the command has been queued
    const updatedQueue = commandQueue.getQueue();
    assert.ok(updatedQueue.length === 1);

    const removeCommand = updatedQueue[0];
    assert.ok(removeCommand.type === 'item_delete');
    assert.ok(removeCommand.hasOwnProperty('args'));
    assert.ok(removeCommand.args.hasOwnProperty('ids'));
    assert.ok(removeCommand.args.ids.length === 1);
    assert.ok(removeCommand.args.ids[0] === id);
  });

  it('Removes multiple items', function() {
    const queue = commandQueue.getQueue();
    assert.ok(queue.length === 0);

    let itemIds = [];

    itemIds.push(1);
    itemIds.push(2);

    client.items.remove(itemIds);

    // Ensure the command has been queued
    const updatedQueue = commandQueue.getQueue();
    assert.ok(updatedQueue.length === 1);

    const removeCommand = updatedQueue[0];
    assert.ok(removeCommand.type === 'item_delete');
    assert.ok(removeCommand.hasOwnProperty('args'));
    assert.ok(removeCommand.args.hasOwnProperty('ids'));
    assert.ok(removeCommand.args.ids.length === 2);
    assert.ok(removeCommand.args.ids[0] === itemIds[0]);
    assert.ok(removeCommand.args.ids[1] === itemIds[1]);
  });

  it('Moves an item from one project to another', function() {
    const queue = commandQueue.getQueue();
    assert.ok(queue.length === 0);

    const firstProjectId = 1;
    const secondProjectId = 2;
    const itemId = 3;

    client.items.move(firstProjectId, secondProjectId, itemId);

    // Ensure the command has been queued
    const updatedQueue = commandQueue.getQueue();
    assert.ok(updatedQueue.length === 1);

    const moveCommand = updatedQueue[0];
    assert.ok(moveCommand.type === 'item_move');
    assert.ok(moveCommand.hasOwnProperty('args'));
    assert.ok(moveCommand.args.hasOwnProperty('project_items'));
    assert.ok(Object.keys(moveCommand.args.project_items).length === 1);
    assert.ok(parseInt(Object.keys(moveCommand.args.project_items)[0], 10) === firstProjectId);
    assert.ok(moveCommand.args.project_items[firstProjectId].length === 1);
    assert.ok(moveCommand.args.project_items[firstProjectId][0] === itemId);
    assert.ok(moveCommand.args.hasOwnProperty('to_project'));
    assert.ok(moveCommand.args.to_project === secondProjectId);
  });

  it('Moves multiple items from one project to another', function() {
    const queue = commandQueue.getQueue();
    assert.ok(queue.length === 0);

    const firstProjectId = 1;
    const secondProjectId = 2;
    const firstItemId = 3;
    const secondItemId = 4;

    client.items.move(
      firstProjectId,
      secondProjectId,
      [firstItemId, secondItemId]
    );

    // Ensure the command has been queued
    const updatedQueue = commandQueue.getQueue();
    assert.ok(updatedQueue.length === 1);

    const moveCommand = updatedQueue[0];
    assert.ok(moveCommand.type === 'item_move');
    assert.ok(moveCommand.hasOwnProperty('args'));
    assert.ok(moveCommand.args.hasOwnProperty('project_items'));
    assert.ok(Object.keys(moveCommand.args.project_items).length === 1);
    assert.ok(parseInt(Object.keys(moveCommand.args.project_items)[0], 10) === firstProjectId);
    assert.ok(moveCommand.args.project_items[firstProjectId].length === 2);
    assert.ok(moveCommand.args.project_items[firstProjectId][0] === firstItemId);
    assert.ok(moveCommand.args.project_items[firstProjectId][1] === secondItemId);
    assert.ok(moveCommand.args.hasOwnProperty('to_project'));
    assert.ok(moveCommand.args.to_project === secondProjectId);
  });

  it('Closes an item', function() {
    const queue = commandQueue.getQueue();
    assert.ok(queue.length === 0);

    const id = 1;

    client.items.close(id);

    // Ensure the command has been queued
    const updatedQueue = commandQueue.getQueue();
    assert.ok(updatedQueue.length === 1);

    const updateCommand = updatedQueue[0];
    assert.ok(updateCommand.type === 'item_close');
    assert.ok(updateCommand.hasOwnProperty('args'));
    assert.ok(updateCommand.args.hasOwnProperty('ids'));
    assert.ok(updateCommand.args.ids[0] === id);
  });

  it('Closes multiple items', function() {
    const queue = commandQueue.getQueue();
    assert.ok(queue.length === 0);

    const firstItemId = 1;
    const secondItemId = 2;

    client.items.close([firstItemId, secondItemId]);

    // Ensure the command has been queued
    const updatedQueue = commandQueue.getQueue();
    assert.ok(updatedQueue.length === 1);

    const updateCommand = updatedQueue[0];
    assert.ok(updateCommand.type === 'item_close');
    assert.ok(updateCommand.hasOwnProperty('args'));
    assert.ok(updateCommand.args.hasOwnProperty('ids'));
    assert.ok(updateCommand.args.ids[0] === firstItemId);
    assert.ok(updateCommand.args.ids[1] === secondItemId);
  });

  it('Uncompletes an item', function() {
    const queue = commandQueue.getQueue();
    assert.ok(queue.length === 0);

    const id = 1;

    client.items.uncomplete(id);

    // Ensure the command has been queued
    const updatedQueue = commandQueue.getQueue();
    assert.ok(updatedQueue.length === 1);

    const updateCommand = updatedQueue[0];
    assert.ok(updateCommand.type === 'item_uncomplete');
    assert.ok(updateCommand.hasOwnProperty('args'));
    assert.ok(updateCommand.args.hasOwnProperty('ids'));
    assert.ok(updateCommand.args.ids[0] === id);
  });

  it('Uncompletes multiple items', function() {
    const queue = commandQueue.getQueue();
    assert.ok(queue.length === 0);

    const firstItemId = 1;
    const secondItemId = 2;

    client.items.uncomplete([firstItemId, secondItemId]);

    // Ensure the command has been queued
    const updatedQueue = commandQueue.getQueue();
    assert.ok(updatedQueue.length === 1);

    const updateCommand = updatedQueue[0];
    assert.ok(updateCommand.type === 'item_uncomplete');
    assert.ok(updateCommand.hasOwnProperty('args'));
    assert.ok(updateCommand.args.hasOwnProperty('ids'));
    assert.ok(updateCommand.args.ids[0] === firstItemId);
    assert.ok(updateCommand.args.ids[1] === secondItemId);
  });
});
