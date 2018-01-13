/**
 * The command queue is not so much a queue but more so an array with
 * a reduced interface.
 *
 * @return {Object} The command queue interface.
 */
const CommandQueue = () => {
  let queue = [];

  const add = (cmd) => {
    queue.push(cmd);
  };

  const clear = () => {
    queue = [];
  };

  const getQueue = () => {
    return queue;
  };

  return {
    add: add,
    clear: clear,
    getQueue: getQueue,
  };
};

export default CommandQueue;
