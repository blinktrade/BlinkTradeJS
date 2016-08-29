import { expect } from 'chai';

import {
  getRequest,
  deleteRequest,
  registerRequest,
  generateRequestId,
  registerEventEmitter,
} from '../src/listener';

let TestReqID = 0;
let TestReqID2 = 0;

const promise = {
  resolve: () => {},
  reject: () => {},
};

describe('Listeners', () => {
  it('Register Listener TestReqID', () => {
    TestReqID = generateRequestId();

    const listeners = registerRequest({ TestReqID }, promise);
    expect(listeners).to.be.eql({
      TestReqID: [{ ReqId: TestReqID.toString(), ...promise }],
    });
  });

  it('Register Second TestReqID', () => {
    TestReqID2 = generateRequestId();

    const listeners = registerRequest({ TestReqID: TestReqID2 }, promise);
    expect(listeners).to.be.eql({
      TestReqID: [
        { ReqId: TestReqID.toString(), ...promise },
        { ReqId: TestReqID2.toString(), ...promise },
      ],
    });
  });

  it('Register EventEmitter function', () => {
    const callback = () => {};
    registerEventEmitter({ TestReqID }, callback);
    const request = getRequest({ TestReqID });
    expect(request).to.be.eql({
      ReqId: TestReqID.toString(),
      ...promise,
      resolve: null,
      reject: null,
      callback,
    });
  });

  it('Delete Listener', () => {
    const listeners = deleteRequest('TestReqID');
    expect(listeners).to.be.eql({});
  });
});
