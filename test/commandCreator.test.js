import assert from 'assert';

import CommandCreator from '../lib/commandCreator';


let commandCreator;

describe('Todoist API command creator', () => {
  before(function() {
    commandCreator = CommandCreator();
  });

  it('Creates a command object from the arguments given', function() {
    const commandType = 'test_type';
    const command = commandCreator.create(commandType);

    assert.ok(typeof command === 'object');
    assert.ok(command.hasOwnProperty('type'));
    assert.ok(command.type === commandType)
    assert.ok(command.hasOwnProperty('uuid'));
    assert.ok(command.hasOwnProperty('temp_id'));
    assert.ok(command.hasOwnProperty('args'));
  });

  it('Does not create a command with invalid parameters', function() {
    const commandType = null;

    let command = null;

    try {
      command = commandCreator.create(commandType);
    } catch (e) {
      assert.ok(typeof command === null);
    }
  });
});
