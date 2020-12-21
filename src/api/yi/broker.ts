import { GetListParams, ResultList } from '../model/base';
import { BrokerInfo, BrokerApply, BrokerModules, Api } from './model/broker';
export * from './model/broker';
import { defHttp } from '/@/utils/http/axios';

/**
 * @description: 获取运营商列表
 */
export function brokerInfoList(params: GetListParams<BrokerInfo>) {
  return defHttp.request<ResultList<BrokerInfo>>({
    url: Api.BROKER_INFO_PAGE_URL,
    method: 'POST',
    params,
  });
}

/**
 * @description: 获取申请运营商列表
 */
export function brokerApplyList(params: GetListParams<BrokerApply>) {
  return defHttp.request<ResultList<BrokerApply>>({
    url: Api.BROKER_APPLY_PAGE_URL,
    method: 'POST',
    params,
  });
}

/**
 * @description: 获取运营商模块
 */
export function brokerModuleList(id: number) {
  return defHttp.request<ResultList<BrokerApply>>({
    url: Api.BROKER_MODULE_LIST,
    method: 'POST',
    params: {
      broker_id: id,
    },
  });
}

/**
 * @description: 修改运营商模块
 */
export function brokerModuleCh(params: BrokerModules, id: number) {
  return defHttp.request<ResultList<BrokerApply>>({
    url: Api.BROKER_MODULE_CH,
    method: 'POST',
    params: {
      broker_id: id,
      m: params,
    },
  });
}

/**
 * @description: 启用停用代理
 */
export function brokerSetEnable(params: number, id: number) {
  return defHttp.request<boolean>({
    url: Api.BROKER_SET_ENABLE,
    method: 'POST',
    params: {
      broker_id: id,
      enabled: params,
    },
  });
}
