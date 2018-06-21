import * as R from 'ramda';
import * as reqs from './requestTypes';
import * as actions from './actionTypes';

const msgToAction = R.compose(R.invertObj, R.map(R.head));

export const MsgActionReq = {
  1:   [actions.HEARTBEAT, reqs.TestReqID],
  BE:  [actions.LOGIN, reqs.UserReqID],
  V:   [actions.MD_FULL_REFRESH, reqs.MDReqID],
  x:   [actions.SECURITY_LIST, reqs.SecurityReqID],
  e:   [actions.SECURITY_STATUS_SUBSCRIBE, reqs.SecurityStatusReqID],
  D:   [actions.ORDER_SEND, reqs.ClOrdID],
  F:   [actions.ORDER_CANCEL, reqs.ClOrdID],
  U2:  [actions.BALANCE, reqs.BalanceReqID],
  U6:  [actions.WITHDRAW_REQUEST, reqs.WithdrawReqID],
  U4:  [actions.ORDER_HISTORY, reqs.OrdersReqID],
  U18: [actions.DEPOSIT_REQUEST, reqs.DepositReqID],
  U20: [actions.DEPOSIT_METHODS, reqs.DepositMethodReqID],
  U24: [actions.WITHDRAW_CONFIRM, reqs.WithdrawReqID],
  U26: [actions.WITHDRAW_LIST, reqs.WithdrawListReqID],
  U30: [actions.DEPOSIT_LIST, reqs.DepositListReqID],
  U32: [actions.TRADE_HISTORY, reqs.TradeHistoryReqID],
  U34: [actions.LEDGER_LIST, reqs.LedgerListReqID],
  U70: [actions.WITHDRAW_CANCEL, reqs.WithdrawCancelReqID],
};

export const MsgActionRes = {
  0:   [actions.HEARTBEAT, reqs.TestReqID],
  BF:  [actions.LOGIN, reqs.UserReqID],
  W:   [actions.MD_FULL_REFRESH, reqs.MDReqID],
  X:   [actions.MD_INCREMENT, reqs.MDReqID],
  8:   [actions.EXECUTION_REPORT, reqs.ClOrdID],
  y:   [actions.SECURITY_LIST, reqs.SecurityReqID],
  f:   [actions.SECURITY_STATUS_SUBSCRIBE, reqs.SecurityStatusReqID],
  U3:  [actions.BALANCE, reqs.BalanceReqID],
  U7:  [actions.WITHDRAW_REQUEST, reqs.WithdrawReqID],
  U5:  [actions.ORDER_HISTORY, reqs.OrdersReqID],
  U9:  [actions.WITHDRAW_REFRESH, reqs.ClOrdID],
  U19: [actions.DEPOSIT_REQUEST, reqs.DepositReqID],
  U21: [actions.DEPOSIT_METHODS, reqs.DepositMethodReqID],
  U23: [actions.DEPOSIT_REFRESH, reqs.ClOrdID],
  U25: [actions.WITHDRAW_CONFIRM, reqs.WithdrawReqID],
  U27: [actions.WITHDRAW_LIST, reqs.WithdrawListReqID],
  U31: [actions.DEPOSIT_LIST, reqs.DepositListReqID],
  U33: [actions.TRADE_HISTORY, reqs.TradeHistoryReqID],
  U35: [actions.LEDGER_LIST, reqs.LedgerListReqID],
  U71: [actions.WITHDRAW_CANCEL, reqs.WithdrawCancelReqID],
};

export const ActionMsgReq = msgToAction(MsgActionReq);
export const ActionMsgRes = msgToAction(MsgActionRes);
