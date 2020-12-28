import { defHttp } from '/@/utils/http/axios';

export enum TradeApi {
  /**
   * 投诉 [管理员][运营商] 发起投诉->运营商审核->管理员审核
   */
  RefundOrderPage = '/yi/trade/RefundOrderPage', // 列表
  RefundOrderAudit = '/yi/trade/RefundOrderAudit', // [管理员] 处理
  RefundOrderBAudit = '/yi/trade/RefundOrderBAudit', // [运营商] 处理
  RefundOrderHisPage = '/yi/trade/RefundOrderHisPage', // 历史

  /**
   * 大师提现 [管理员] 大师发起提现->管理员审核
   */
  MasterDrawMoneyPage = '/yi/trade/MasterDrawMoneyPage', // 列表
  MasterDrawMoneyAudit = '/yi/trade/MasterDrawMoneyAudit', // 处理
  MasterDrawMoneyHisPage = '/yi/trade/MasterDrawMoneyHisPage', // 历史

  /**
   * 运营商提现 [管理员] 运营商发起提现->管理员审核
   */
  BrokerDrawMoneyPage = '/yi/trade/BrokerDrawMoneyPage', // 列表
  BrokerDrawMoneyAudit = '/yi/trade/BrokerDrawMoneyAudit', // 处理
  BrokerDrawMoneyHisPage = '/yi/trade/BrokerDrawMoneyHisPage', // 历史

  /**
   * 提现账户 [管理员][运营商]
   */
  BankCardInfoPage = '/yi/trade/BankCardInfoPage', // 列表
  BankCardInfoCh = '/yi/trade/BankCardInfoCh', // 修改

  /**
   * 商城订单 [管理员] [运营商]
   */
  BOProductOrderPage = '/yi/trade/BOProductOrderPage', // [管理员] 订单列表
  ProductOrderDelivery = '/yi/trade/ProductOrderDelivery', // [管理员] 发货
  ProductOrderHisPage = '/yi/trade/ProductOrderHisPage', // 商品历史订单
  BoYiOrderPage = '/yi/trade/BoYiOrderPage', // [管理员] 大师订单
  YiOrderHisPage = '/yi/trade/YiOrderHisPage', // 大师历史订单

  /**
   * 账务 [管理员][运营商]
   */
  BusinessPlatPage = '/yi/trade/BusinessPlatPage', //[管理员] 对账单
  IncomePlatPage = '/yi/trade/IncomePlatPage', //[管理员] 收入
  IncomePlatMonthPage = '/yi/trade/IncomePlatMonthPage', //[管理员] 收入月度统计
  BusinessBrokerPage = '/yi/trade/BusinessBrokerPage', // [运营商] 对账单
  BusinessBrokerMonthPage = '/yi/trade/BusinessBrokerMonthPage', // 收入月度统计

  /**
   * 运营商余额
   */
  RemainderBrokerGet = '/yi/trade/RemainderBrokerGet',

  /**
   * 运营商发起提现申请
   */
  BrokerDrawMoneyAdd = '/yi/trade/BrokerDrawMoneyAdd',

  /**
   * 账务调整 修改用户余额
   * "c_1":"acc_type业务类型: user/master/broker/",
   * "c_2":"multi_id:根据不同的类型为uid/master_id/broker_id"
   */
  accountAdjust = '/yi/trade/AccountAdjust',
}

/**
 * 运营商余额
 */
export function remainderBrokerGet(params: any) {
  return defHttp.request<any>({
    url: TradeApi.RemainderBrokerGet,
    method: 'POST',
    params,
  });
}

/**
 * 商城订单
 */
export function bOProductOrderPage(params: any) {
  return defHttp.request<any>({
    url: TradeApi.BOProductOrderPage,
    method: 'POST',
    params,
  });
}

/**
 * 大师订单
 */
export function boYiOrderPage(params: any) {
  return defHttp.request<any>({
    url: TradeApi.BoYiOrderPage,
    method: 'POST',
    params,
  });
}

/**
 * 商城订单发货
 */
export function productOrderDelivery(params: any) {
  return defHttp.request<any>({
    url: TradeApi.ProductOrderDelivery,
    method: 'POST',
    params,
  });
}

/**
 * 商城订单历史
 */
export function productOrderHisPage(params: any) {
  return defHttp.request<any>({
    url: TradeApi.ProductOrderHisPage,
    method: 'POST',
    params,
  });
}

/**
 * 大师订单历史
 */
export function yiOrderHisPage(params: any) {
  return defHttp.request<any>({
    url: TradeApi.YiOrderHisPage,
    method: 'POST',
    params,
  });
}

/**
 * 运营商发起提现申请
 */
export function brokerDrawMoneyAdd(params: any) {
  return defHttp.request<any>({
    url: TradeApi.BrokerDrawMoneyAdd,
    method: 'POST',
    params,
  });
}

/**
 * 退货列表
 */
export function refundOrderPage(params: any) {
  return defHttp.request<any>({
    url: TradeApi.RefundOrderPage,
    method: 'POST',
    params,
  });
}

/**
 * 退货处理 管理员
 */
export function refundOrderAudit(params: any) {
  return defHttp.request<any>({
    url: TradeApi.RefundOrderAudit,
    method: 'POST',
    params,
  });
}

/**
 * 退货处理 运营商
 */
export function refundOrderBAudit(params: any) {
  return defHttp.request<any>({
    url: TradeApi.RefundOrderBAudit,
    method: 'POST',
    params,
  });
}

/**
 * 退货历史
 */
export function refundOrderHisPage(params: any) {
  return defHttp.request<any>({
    url: TradeApi.RefundOrderHisPage,
    method: 'POST',
    params,
  });
}

/**
 * [运营商] 对账单
 */
export function businessBrokerPage(params: any) {
  return defHttp.request<any>({
    url: TradeApi.BusinessBrokerPage,
    method: 'POST',
    params,
  });
}
/**
 * [管理员] 对账单
 */
export function businessPlatPage(params: any) {
  return defHttp.request<any>({
    url: TradeApi.BusinessPlatPage,
    method: 'POST',
    params,
  });
}

/**
 * 运营商提现列表
 */
export function brokerDrawMoneyPage(params: any) {
  return defHttp.request<any>({
    url: TradeApi.BrokerDrawMoneyPage,
    method: 'POST',
    params,
  });
}

/**
 * 运营商提现处理
 */
export function brokerDrawMoneyAudit(params: any) {
  return defHttp.request<any>({
    url: TradeApi.BrokerDrawMoneyAudit,
    method: 'POST',
    params,
  });
}

/**
 * 运营商提现历史
 */
export function brokerDrawMoneyHis(params: any) {
  return defHttp.request<any>({
    url: TradeApi.BrokerDrawMoneyHisPage,
    method: 'POST',
    params,
  });
}

/**
 * 大师提现列表
 */
export function masterDrawMoneyPage(params: any) {
  return defHttp.request<any>({
    url: TradeApi.MasterDrawMoneyPage,
    method: 'POST',
    params,
  });
}

/**
 * 大师提现处理
 */
export function masterDrawMoneyAudit(params: any) {
  return defHttp.request<any>({
    url: TradeApi.MasterDrawMoneyAudit,
    method: 'POST',
    params,
  });
}

/**
 * 大师提现历史
 */
export function masterDrawMoneyHis(params: any) {
  return defHttp.request<any>({
    url: TradeApi.MasterDrawMoneyHisPage,
    method: 'POST',
    params,
  });
}
