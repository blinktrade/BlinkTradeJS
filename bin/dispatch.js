/* @flow */
import { RestCLI } from './cli';
import { InteractiveCLI } from './interactive';
import { logger } from './logger';
import { getEnvironment } from './program';
import { BlinkTradeWS, BlinkTradeRest } from '../lib/blinktrade';

import type { Options } from './program';

async function runner(interactive: InteractiveCLI) {
  const { action } = await interactive.promptMenu();
  const method = interactive[action];
  method && logger(await method.call(interactive));
  runner(interactive);
}

export async function dispatchInteractive(options: Options) {
  try {
    const blinktrade = new BlinkTradeWS(getEnvironment(options));
    const interactive = new InteractiveCLI(blinktrade);

    setInterval(() => interactive.heartbeat(), 10000);

    await blinktrade.connect();
    await interactive.login(options);

    runner(interactive);

    blinktrade.on('ERROR', (error) => {
      console.log(error);
      runner(interactive);
    });
  } catch (error) {
    console.log('Error', error);
  }
}

export async function dispatch(options: Options) {
  try {
    const blinktrade = new BlinkTradeRest({
      ...getEnvironment(options),
      key: options.parent.key,
      secret: options.parent.secret,
      currency: options.currency,
    });
    const cli = new RestCLI(blinktrade);
    const action = cli[options._name];
    action && logger(await action.call(cli, options));
  } catch (error) {
    console.log(error);
  }
}
