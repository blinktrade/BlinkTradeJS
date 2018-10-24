import {
  reqs,
  setRequest,
  deleteRequest,
  generateRequestId,
} from '../../src/listener';

let TestReqID = 0;

const promise = {
  resolve: () => {},
  reject: () => {},
};

describe('Request Listeners', () => {
  test('Register Request TestReqID', () => {
    TestReqID = generateRequestId();
    setRequest({ MsgType: '1', TestReqID }, promise);
    expect(reqs.size).toBe(1);
    expect(reqs.get('TestReqID:' + TestReqID)).toEqual(promise);
  });

  test('Register a second TestReqID', () => {
    TestReqID = generateRequestId();
    setRequest({ MsgType: '1', TestReqID }, promise);
    expect(reqs.size).toBe(2);
    expect(reqs.get('TestReqID:' + TestReqID)).toEqual(promise);
  });

  test('Delete Request from a response message', () => {
    deleteRequest({ MsgType: '0', TestReqID });
    expect(reqs.size).toBe(1);
  });
});
