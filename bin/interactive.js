/* @flow */
import inquirer from 'inquirer';
import invariant from 'invariant';

import { BlinkTradeWS } from '../lib/blinktrade';
import { BaseCLI } from './cli';
import { getAuthentication } from './program';
import {
  promptMenu,
  promptLogin,
  promptStatus,
  promptMethod,
  promptCurrency,
  promptDepositRequest,
  promptWithdrawRequest,
  promptOrderHistory,
  promptOrderType,
  promptSendOrder,
  promptCancelOrder,
} from './prompts';

import type { Options } from './program';

export class InteractiveCLI extends BaseCLI {
  blinktrade: BlinkTradeWS;

  async promptMenu() {
    return inquirer.prompt(promptMenu(!!this.blinktrade.session));
  }

  async heartbeat() {
    return this.blinktrade.heartbeat();
  }

  async login(options: Options) {
    console.log('Login');
    const params = await getAuthentication(options, promptLogin);
    invariant(
      params.username && params.password,
      'BLINKTRADE_API_KEY or BLINKTRADE_API_PASSWORD was not provided',
    );
    await this.blinktrade.login({ ...params });
    console.log('Logged Successfully');
    // Don't print login message
    return false;
  }

  async requestDeposit() {
    const { currency } = await inquirer.prompt(promptCurrency);
    const data = currency !== 'BTC'
    ? (await inquirer.prompt(promptDepositRequest))
    : {};

    return super.requestDeposit({ ...data, value: data.amount, currency });
  }

  async requestDepositList() {
    const { status } = await inquirer.prompt(promptStatus);
    return super.requestDepositList({ status: status.toLowerCase() });
  }

  async requestWithdraw() {
    const { currency } = await inquirer.prompt(promptCurrency);
    const { method } = await inquirer.prompt(promptMethod);
    const data = await inquirer.prompt(promptWithdrawRequest);
    return super.requestWithdraw({ ...data, method, currency });
  }

  async requestWithdrawList() {
    const { status } = await inquirer.prompt(promptStatus);
    return super.requestWithdrawList({ status: status.toLowerCase() });
  }

  async myOrders() {
    const { filter } = await inquirer.prompt(promptOrderHistory);
    return super.myOrders({ filter });
  }

  async sendOrder() {
    const { type } = await inquirer.prompt(promptOrderType);
    const data = await inquirer.prompt(promptSendOrder(type));
    return super.sendOrder({ ...data, type });
  }

  async cancelOrder() {
    const data = await inquirer.prompt(promptCancelOrder);
    return super.cancelOrder(data);
  }

  async logout() {
    console.log('Logging out...');
    await this.blinktrade.logout();
    process.exit(0);
  }
}
