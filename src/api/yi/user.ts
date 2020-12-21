import { Api, EnabledUser } from './model/user';
import { defHttp } from '/@/utils/http/axios';
export * from './model/user';

/**
 * @description: 禁用/启用用户
 */
export function adminCh(params: EnabledUser) {
  return defHttp.request<boolean>({
    url: Api.SET_USER_ENABLED,
    method: 'POST',
    params,
  });
}
