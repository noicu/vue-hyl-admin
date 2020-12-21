import { GetListParams, ResultList } from '../model/base';
import { MasterInfo, MasterCh, MasterUID, MasterInfoFull, Api } from './model/master';
export * from './model/master';
import { defHttp } from '/@/utils/http/axios';

/**
 * @description: 获取大师列表
 */
export function masterInfoList(params: GetListParams<MasterInfo>) {
  return defHttp.request<ResultList<MasterInfo>>({
    url: Api.MASTER_INFO_PAGE,
    method: 'POST',
    params,
  });
}

/**
 * @description: 禁用/启用大师
 */
export function masterCh(params: MasterCh) {
  return defHttp.request<boolean>({
    url: Api.MASTER_SET_ENABLE,
    method: 'POST',
    params,
  });
}

/**
 * @description: 大师详情
 */
export function masterInfoFull(params: MasterUID) {
  return defHttp.request<MasterInfoFull>({
    url: Api.MASTER_INFO_FULL_GET,
    method: 'POST',
    params,
  });
}
