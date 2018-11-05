/* @flow */
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import program from 'commander';
import inquirer from 'inquirer';
import invariant from 'invariant';

import { version } from '../package.json';
import { promptLogin, promptRest } from './prompts';
import {
  dispatch,
  dispatchInteractive,
} from './dispatch';

import type { BlinkTradeCurrencies } from '../src/types';

export type Commands =
  | 'ticker'
  | 'orderbook'
  | 'trades'
  | 'heartbeat'
  | 'login'
  | 'logout'
  | 'balance'
  | 'requestDeposit'
  | 'requestDepositList'
  | 'requestWithdraw'
  | 'requestWithdrawList'
  | 'requestLedger'
  | 'myOrders'
  | 'sendOrder'
  | 'cancelOrder';

type AuthPrompts =
  | typeof promptRest
  | typeof promptLogin;

export type Options = {
  _name: Commands,
  currency?: BlinkTradeCurrencies,
  parent: {
    key?: string,
    secret?: string,
    prod?: boolean,
    credentials?: string,
    testnet?: boolean,
    brokerId?: number,
  },
};

function auth(callback) {
  return async (options: Options) => {
    const data = await getAuthentication(options, promptRest);
    invariant(data.key && data.secret, 'Key or secret was not provided');
    return callback({ ...options, parent: { ...options.parent, ...data }});
  };
}

type AuthParsed = {
  key: string,
  secret: string,
  username: string,
  password: string,
};

export function getAuthentication(options: Options, prompt: AuthPrompts): AuthParsed {
  const envPath = path.resolve(process.cwd(), options.parent.credentials || '');

  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
  }

  const key = process.env.BLINKTRADE_API_KEY || '';
  const secret = process.env.BLINKTRADE_API_SECRET || '';
  const password = process.env.BLINKTRADE_API_PASSWORD || '';

  return (!key && (!secret || !password))
    ? (inquirer.prompt(prompt))
    : { key, secret, password, username: key };
}

export function getEnvironment(options: Options) {
  return {
    prod: options.parent.prod || (!options.parent.testnet && false),
    brokerId: parseInt(options.parent.brokerId),
  };
}

export default function () {
  program
    .version(version, '-v, --version')
    .option('--key <key>', 'API Key')
    .option('--secret <secret>', 'API Secret')
    .option('--credentials <path>', 'path to dotenv file')
    .option('-b, --brokerId <brokerId>', 'Broker ID')
    .option('-p, --prod', 'Use the production environment')
    .option('-t, --testnet', 'Use the testnet environment');

  program
    .command('connect')
    .description('Start websocket interactive environment')
    .action(dispatchInteractive);

  program
    .command('ticker')
    .description('Request ticker')
    .option('-c, --currency <currency>', 'Currency of the endpoint')
    .action(dispatch);

  program
    .command('orderbook')
    .description('Request orderbook')
    .option('-c, --currency <currency>', 'Currency of the endpoint')
    .action(dispatch);

  program
    .command('trades')
    .description('Request trade history')
    .option('-c, --currency <currency>', 'Currency of the endpoint')
    .option('-l, --limit <number>', 'Limit of trades to be returned')
    .option('-s, --since <number>', 'Trade ID used to paginate')
    .action(dispatch);

  program
    .command('balance')
    .description('Request balance')
    .action(auth(dispatch));

  program
    .command('requestDeposit')
    .description('Request deposit')
    .option('-v, --value <value>', 'Amount value of the deposit, in case of fiat')
    .option('-c, --currency <currency>', 'Currency of the deposit .eg: BRL, BTC')
    .option('-m, --method <id>', 'Method ID of the deposit')
    .action(auth(dispatch));

  program
    .command('requestDepositList')
    .description('Request deposit list')
    .option('--page <number>', 'Pagination offset')
    .option('--pageSize <number>', 'Pagination size')
    .option('--status <status>', 'all, unconfirmed, pending, inprogress, completed, cancelled')
    .action(auth(dispatch));

  program
    .command('requestWithdraw')
    .description('Request withdraw')
    .option('-a, --amount <number>', 'Amount to withdrawal')
    .option('-c, --currency <currency>', 'Currency of the withdraw .eg: BRL, BTC')
    .option('-m, --method <method>', 'Method of the withdraw .eg: bitcoin, bank_name')
    .option('-d, --data <data>', 'Dynamic data represented by a json stringified eg: "{AccountNumber: 99999-9, AccountBranch: 001}"')
    .action(auth(dispatch));

  program
    .command('requestWithdrawList')
    .description('Request withdraw list')
    .option('--page <number>', 'Pagination offset')
    .option('--pageSize <number>', 'Pagination size')
    .option('--status <status>', 'all, unconfirmed, pending, inprogress, completed, cancelled')
    .action(auth(dispatch));

  program
    .command('confirmWithdraw')
    .description('Confirm a withdraw request')
    .option('--id <number>', 'Withdraw ID to confirm')
    .option('--token <number>', 'Confirmation token sent by email')
    .option('--secondFactor <number>', 'Second factor token')
    .action(auth(dispatch));

  program
    .command('cancelWithdraw')
    .description('Cancel a withdraw request')
    .option('--id <number>', 'Withdraw ID to cancel')
    .action(auth(dispatch));

  program
    .command('requestLedger')
    .description('Request Ledger')
    .option('--page <number>', 'Pagination offset')
    .option('--pageSize <number>', 'Pagination size')
    .action(auth(dispatch));

  program
    .command('requestBrokerList')
    .description('Request Broker List')
    .action(auth(dispatch));

  program
    .command('myOrders')
    .description('List order history')
    .option('--status <status>', 'open, filled or cancelled')
    .option('--page <number>', 'Pagination offset')
    .option('--pageSize <number>', 'Pagination size')
    .action(auth(dispatch));

  program
    .command('sendOrder')
    .description('Place an order')
    .option('--type <type>', 'Order type e.g: MARKET, LIMIT, STOP, STOP_LIMIT')
    .option('--side <side>', 'Order side, e.g: BUY, SELL')
    .option('--price <price>', 'Order price, e.g: 6000')
    .option('--amount <amount>', 'Order amount, e.g: 0.1')
    .option('--stopPrice <stopprice>', 'Stop price in case of STOP or STOP_LIMIT order type')
    .option('--symbol <symbol>', 'Required symbol, e.g.: BTCBRL')
    .option('--postOnly', 'Ensures the order will never be executed')
    .option('--clientId', 'Optional client id')
    .action(auth(dispatch));

  program
    .command('cancelOrder')
    .description('Cancel an order')
    .option('--orderId <orderId>', 'Order ID of the order to be cancelled')
    .option('--clientId <clientId>', 'Client ID of the order to be cancelled')
    .action(auth(dispatch));

  program.parse(process.argv);

  if (!program.args.length) {
    program.help();
  }
}
