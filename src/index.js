if (!global._babelPolyfill) {
  require('babel-polyfill');
}

import ResourceHelper from './resources/resourceHelper';
import Api from './api';
import CommandCreator from './commandCreator';
import CommandQueue from './commandQueue';
import Client from './client';

const commandQueue = CommandQueue();
const api = Api(commandQueue);
const commandCreator = CommandCreator();
const resourceHelper = ResourceHelper(api, commandCreator);

const client = Client(api, resourceHelper);

module.exports = () => client;
