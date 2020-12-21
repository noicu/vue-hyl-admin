import { Api, RegStatsParams, RegStatsResult } from './model/info';
export * from './model/info';
import { defHttp } from '/@/utils/http/axios';

/**
 * @description: 统计大师注册数据
 */
export function regMasterStats(params: RegStatsParams) {
  return defHttp.request<RegStatsResult[]>({
    url: Api.REG_MASTER_STATS,
    method: 'POST',
    params,
  });
}

/**
 * @description: 统计用户注册数据
 */
export function regUserStats(params: RegStatsParams) {
  return defHttp.request<RegStatsResult[]>({
    url: Api.REG_USER_STATS,
    method: 'POST',
    params,
  });
}
