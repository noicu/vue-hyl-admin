import { GetListParams, ResultList } from '../model/base';
import { AdminInfo, Api } from './model/admin';
import { EnabledUser, UID } from './model/user';
export * from './model/admin';
import { defHttp } from '/@/utils/http/axios';

/**
 * @description: 获取系统管理员列表
 */
export function adminInfoList(params: GetListParams<AdminInfo>) {
  return defHttp.request<ResultList<AdminInfo>>({
    url: Api.SYS_ADMIN_PAGE,
    method: 'POST',
    params,
  });
}

/**
 * @description: 禁用/启用管理员
 */
export function adminCh(params: EnabledUser) {
  return defHttp.request<boolean>({
    url: Api.SYS_ADMIN_CH,
    method: 'POST',
    params,
  });
}

/**
 * @description: 删除管理员
 */
export function adminDel(params: UID) {
  return defHttp.request<boolean>({
    url: Api.SYS_ADMIN_RM,
    method: 'POST',
    params,
  });
}
