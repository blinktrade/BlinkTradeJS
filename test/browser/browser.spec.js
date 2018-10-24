import { BlinkTradeWS } from '../../src';

jest.mock('../../src/util/fingerPrint');

describe('Browser environment', () => {
  test('Should match mock fingerprint', () => {
    const blinktrade = new BlinkTradeWS();
    expect(blinktrade.transport.fingerPrint).toBe('MOCK_FINGERPRINT');
  });
});
