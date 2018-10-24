import { BlinkTradeWS } from '../../src';

jest.mock('../../src/util/stun');
jest.mock('../../src/util/macaddress');

describe('Node environment', () => {
  test('Should match stunt mock', () => {
    const blinktrade = new BlinkTradeWS();
    expect(blinktrade.transport.stun).toEqual({ local: null, public: [] });
    blinktrade.transport.getStun();
    expect(blinktrade.transport.stun).toBe('MOCK_STUN');
  });

  test('Should match macaddress mock', () => {
    const blinktrade = new BlinkTradeWS();
    expect(blinktrade.transport.fingerPrint).toBe('MOCK_MACADDRESS');
  });
});
