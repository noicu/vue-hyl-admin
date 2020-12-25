import { defHttp } from '/@/utils/http/axios';

export enum TradeApi {
  /**
   * 退货 [管理员][运营商] 发起退货->运营商审核->管理员审核
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
   * 运营商提现 [管理员] 大师发起提现->管理员审核
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
  YiOrderHisPage = '/yi/trade/YiOrderHisPage', // 大师历史订单

  /**
   * 账务 [管理员][运营商]
   */
  BusinessPlatPage = '/yi/trade/BusinessPlatPage', //[管理员] 对账单
  IncomePlatPage = '/yi/trade/IncomePlatPage', //[管理员] 收入
  IncomePlatMonthPage = '/yi/trade/IncomePlatMonthPage', //[管理员] 收入月度统计
  BusinessBrokerPage = '/yi/trade/BusinessBrokerPage', // 收入月度统计
  BusinessBrokerMonthPage = '/yi/trade/BusinessBrokerMonthPage', // 收入月度统计

  /**
   * 运营商余额
   */
  RemainderBrokerGet = '/yi/trade/RemainderBrokerGet',
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
