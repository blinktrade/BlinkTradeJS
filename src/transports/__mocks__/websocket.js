import nodeify from 'nodeify';
import EventEmitter from 'eventemitter2';
import messages from './messages';

export default jest.fn().mockImplementation(() => {
  return {
    eventEmitter: new EventEmitter({ wildcard: true, delimiter: ':' }),

    connect(callback) {
      return nodeify.extend(new Promise((resolve) => {
        setTimeout(() => {
          this.eventEmitter.emit('OPEN', {});
          return resolve({ connected: true });
        });
      })).nodeify(callback);
    },

    sendMessageAsPromise(req) {
      this.req = req;
      return new Promise((resolve) => {
        const type = req.MsgType;
        const mock = messages[type];
        const res = mock ? mock(req) : {};
        this.eventEmitter.emit(res.MsgType, res);
        return resolve(res);
      });
    },

    emitterPromise(promise, callback) {
      promise.on = (event, listener) => {
        this.eventEmitter.on(event, listener);
        return promise;
      };

      return nodeify.extend(promise).nodeify(callback);
    },
  };
});
